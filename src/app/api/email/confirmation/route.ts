import { NextRequest, NextResponse } from 'next/server'

interface EmailConfirmationRequest {
  to: string
  name: string
  orderId: string
  plan: {
    name: string
    price: number
  }
  downloadLink: string
}

export async function POST(request: NextRequest) {
  try {
    const body: EmailConfirmationRequest = await request.json()

    // Validate required fields
    if (!body.to || !body.name || !body.orderId || !body.plan) {
      return NextResponse.json(
        { error: 'Dados incompletos para envio de e-mail' },
        { status: 400 }
      )
    }

    // In a real application, you would integrate with email services like:
    // - SendGrid, Mailgun, AWS SES, Resend, etc.
    
    // For demo purposes, we'll just log the email content
    console.log('=== EMAIL CONFIRMATION ===')
    console.log(`To: ${body.to}`)
    console.log(`Name: ${body.name}`)
    console.log(`Order ID: ${body.orderId}`)
    console.log(`Plan: ${body.plan.name} - R$ ${body.plan.price}`)
    console.log(`Download Link: ${body.downloadLink}`)
    console.log('========================')

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Example of how you would integrate with an email service:
    /*
    // Using Resend (example)
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'seu-email@dominio.com',
      to: [body.to],
      subject: 'Sua compra foi confirmada! 🎉',
      html: `
        <h1>Obrigado pela sua compra, ${body.name}!</h1>
        <p>Seu pedido <strong>${body.orderId}</strong> foi confirmado com sucesso.</p>
        
        <h2>Detalhes do pedido:</h2>
        <p><strong>Produto:</strong> ${body.plan.name}</p>
        <p><strong>Valor:</strong> R$ ${body.plan.price.toFixed(2)}</p>
        
        <h2>Próximos passos:</h2>
        <ol>
          <li>Baixe seu ebook: <a href="${body.downloadLink}">Clique aqui</a></li>
          <li>Entre no grupo exclusivo de produtores</li>
          <li>Acesse a planilha de monitoramento</li>
        </ol>
        
        <p>Se precisar de ajuda, responda este e-mail ou entre em contato via WhatsApp.</p>
        
        <p>Atenciosamente,<br>Equipe do Guia do Trips</p>
      `
    })
    */

    return NextResponse.json({
      success: true,
      message: 'E-mail de confirmação enviado com sucesso!'
    })

  } catch (error) {
    console.error('Email confirmation error:', error)
    return NextResponse.json(
      { error: 'Erro ao enviar e-mail de confirmação' },
      { status: 500 }
    )
  }
}