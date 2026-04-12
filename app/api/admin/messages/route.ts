import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { messagesStore } from '@/lib/messages-store'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-in-production'
)

async function verifyAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload
  } catch {
    return null
  }
}

// GET - Fetch all messages
export async function GET() {
  const auth = await verifyAuth()

  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const messages = messagesStore.getAllMessages()
  return NextResponse.json({ messages })
}

// POST - Create a new message (can be from admin or contact form)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, services, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newMessage = messagesStore.addMessage({
      name,
      email,
      services: services || [],
      message,
    })

    return NextResponse.json({ success: true, data: newMessage })
  } catch {
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    )
  }
}

// PATCH - Update message (mark as read, update content)
export async function PATCH(request: NextRequest) {
  const auth = await verifyAuth()

  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, is_read, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Message ID required' }, { status: 400 })
    }

    let result
    if (is_read !== undefined) {
      result = messagesStore.markAsRead(id)
    } else {
      result = messagesStore.updateMessage(id, updates)
    }

    if (!result) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: result })
  } catch {
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a message
export async function DELETE(request: NextRequest) {
  const auth = await verifyAuth()

  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '0')

    if (!id) {
      return NextResponse.json({ error: 'Message ID required' }, { status: 400 })
    }

    const deleted = messagesStore.deleteMessage(id)

    if (!deleted) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    )
  }
}
