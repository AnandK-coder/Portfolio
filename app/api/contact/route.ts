import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Here you can integrate with:
    // - Email service (SendGrid, Resend, etc.)
    // - Database to store messages
    // - Slack/Discord webhook
    // - Any other notification service

    // Example: Log to console (replace with actual service)
    console.log('Contact form submission:', { name, email, message })

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

