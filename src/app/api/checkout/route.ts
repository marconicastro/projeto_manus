import { NextRequest, NextResponse } from 'next/server'

interface CheckoutRequest {
  name: string
  email: string
  phone: string
  document: string
  address: string
  city: string
  state: string
  zipCode: string
  paymentMethod: 'credit_card' | 'pix' | 'boleto'
  plan: 'ebook' | 'mentoria' | 'ebook_discount'
}

const plans = {
  ebook: { price: 86.00, name: 'Ebook Completo' },
  mentoria: { price: 299.90, name: 'Mentoria Personalizada' },
  ebook_discount: { price: 69.90, name: 'Ebook com Desconto' }
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'document', 'address', 'city', 'state', 'zipCode']
    for (const field of requiredFields) {
      if (!body[field as keyof CheckoutRequest]) {
        return NextResponse.json(
          { error: `O campo ${field} é obrigatório` },
          { status: 400 }
        )
      }
    }

    // Validate plan
    if (!plans[body.plan]) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      )
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Get plan details
    const planDetails = plans[body.plan]

    // Simulate payment processing
    // In a real application, you would integrate with payment gateways like:
    // - Stripe, Mercado Pago, PagSeguro, etc.
    
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate processing time

    // Create order object
    const order = {
      orderId,
      customer: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        document: body.document,
        address: {
          street: body.address,
          city: body.city,
          state: body.state,
          zipCode: body.zipCode
        }
      },
      plan: {
        type: body.plan,
        name: planDetails.name,
        price: planDetails.price
      },
      payment: {
        method: body.paymentMethod,
        status: 'confirmed',
        transactionId: `TXN-${Date.now()}`
      },
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Send confirmation email
    try {
      const emailResponse = await fetch(`${request.nextUrl.origin}/api/email/confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: body.email,
          name: body.name,
          orderId: order.orderId,
          plan: order.plan,
          downloadLink: `${request.nextUrl.origin}/api/download/ebook`
        }),
      })

      if (emailResponse.ok) {
        console.log('Confirmation email sent successfully')
      } else {
        console.error('Failed to send confirmation email')
      }
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError)
      // Don't fail the checkout if email fails
    }

    // In a real application, you would:
    // 1. Save the order to your database
    // 2. Integrate with payment gateway
    // 3. Handle webhooks for payment confirmation
    // 4. Send customer notifications

    // For demo purposes, we'll just return the order
    return NextResponse.json({
      success: true,
      order,
      message: 'Pagamento processado com sucesso!'
    })

  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    )
  }
}