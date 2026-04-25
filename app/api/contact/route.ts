import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { messagesStore } from '@/lib/messages-store'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, services, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const newMessage = messagesStore.addMessage({
      name,
      email,
      services: services || [],
      message,
    })

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage,
    })
  } catch (error) {
    console.error('Error saving contact message:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
