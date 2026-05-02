import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: ticket, error: ticketError } = await supabase
    .from('support_tickets')
    .select('*')
    .eq('id', id)
    .single()

  if (ticketError) {
    return NextResponse.json({ error: ticketError.message }, { status: 500 })
  }

  const { data: messages, error: messagesError } = await supabase
    .from('ticket_messages')
    .select('*')
    .eq('ticket_id', id)
    .order('created_at', { ascending: true })

  if (messagesError) {
    return NextResponse.json({ error: messagesError.message }, { status: 500 })
  }

  return NextResponse.json({ ticket, messages })
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const supabase = await createClient()

  const updateData: Record<string, unknown> = {}

  if (body.status) {
    updateData.status = body.status
    if (body.status === 'closed') {
      updateData.closed_at = new Date().toISOString()
    }
  }

  const { data, error } = await supabase
    .from('support_tickets')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
