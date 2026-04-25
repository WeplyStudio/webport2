// Shared in-memory storage for contact messages
export interface Message {
  id: number
  name: string
  email: string
  services: string[]
  message: string
  created_at: string
  is_read: boolean
}

class MessagesStore {
  private messages: Message[] = []
  private messageId: number = 1

  addMessage(data: Omit<Message, 'id' | 'created_at' | 'is_read'>): Message {
    const newMessage: Message = {
      ...data,
      id: this.messageId++,
      created_at: new Date().toISOString(),
      is_read: false,
    }
    this.messages.push(newMessage)
    return newMessage
  }

  getAllMessages(): Message[] {
    return this.messages.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  }

  getMessageById(id: number): Message | undefined {
    return this.messages.find((m) => m.id === id)
  }

  updateMessage(id: number, updates: Partial<Omit<Message, 'id'>>): Message | null {
    const index = this.messages.findIndex((m) => m.id === id)
    if (index === -1) return null

    this.messages[index] = { ...this.messages[index], ...updates }
    return this.messages[index]
  }

  deleteMessage(id: number): boolean {
    const index = this.messages.findIndex((m) => m.id === id)
    if (index === -1) return false

    this.messages.splice(index, 1)
    return true
  }

  markAsRead(id: number): Message | null {
    return this.updateMessage(id, { is_read: true })
  }

  deleteAll(): void {
    this.messages = []
  }
}

// Singleton instance
export const messagesStore = new MessagesStore()
