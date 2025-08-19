'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { useMetaPixel } from '@/hooks/useMetaPixel'
import { useRouter, useSearchParams } from 'next/navigation'

interface CheckoutForm {
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
  ebook: {
    name: 'Ebook Completo',
    price: 86.00,
    description: 'Guia Prático de Controle do Trips no Maracujá + Bônus Exclusivos',
    features: ['Ebook completo em PDF', 'Planilha de monitoramento', 'Vídeo aula exclusiva', 'Acesso ao grupo']
  },
  mentoria: {
    name: 'Mentoria Personalizada',
    price: 299.90,
    description: 'Ebook + 4 semanas de acompanhamento + consultoria mensal',
    features: ['Tudo do plano Ebook', '4 semanas de suporte WhatsApp', 'Consultoria mensal', 'Resultados garantidos']
  },
  ebook_discount: {
    name: 'Ebook com Desconto',
    price: 69.90,
    description: 'Oferta especial por tempo limitado',
    features: ['Ebook completo em PDF', 'Planilha de monitoramento', 'Vídeo aula exclusiva', 'Acesso ao grupo'],
    badge: 'ECONOMIZE R$ 16,10'
  }
}

export default function CheckoutContent() {
  const { trackEbookPurchase, trackMentoriaPurchase, trackLead, trackCheckoutInitiation } = useMetaPixel()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const planParam = searchParams.get('plan') as 'ebook' | 'mentoria' | 'ebook_discount' | null
  const [isProcessing, setIsProcessing] = useState(false)
  const [form, setForm] = useState<CheckoutForm>({
    name: '',
    email: '',
    phone: '',
    document: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'pix',
    plan: planParam || 'ebook'
  })

  const [timeLeft, setTimeLeft] = useState({
    minutes: 14,
    seconds: 59
  })

  useEffect(() => {
    // Track checkout initiation
    trackCheckoutInitiation()

    // Countdown timer for urgency
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else {
          clearInterval(timer)
          return { minutes: 0, seconds: 0 }
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [trackCheckoutInitiation])

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Validate form
      if (!form.name || !form.email || !form.phone || !form.document) {
        throw new Error('Por favor, preencha todos os campos obrigatórios')
      }

      // Track purchase attempt
      const selectedPlan = plans[form.plan]
      if (form.plan === 'mentoria') {
        trackMentoriaPurchase(selectedPlan.price)
      } else {
        trackEbookPurchase(selectedPlan.price)
      }

      // Send data to API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar pagamento')
      }

      // Store order data for confirmation page
      localStorage.setItem('currentOrder', JSON.stringify(data.order))

      // Redirect to confirmation page
      router.push(`/checkout/confirmation?orderId=${data.order.orderId}`)
      
      toast({
        title: "Pagamento confirmado!",
        description: "Sua compra foi processada com sucesso.",
      })

    } catch (error) {
      toast({
        title: "Erro no processamento",
        description: error instanceof Error ? error.message : "Ocorreu um erro durante o processamento do pagamento.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const selectedPlan = plans[form.plan]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
            Finalize sua compra
          </h1>
          <p className="text-gray-600">
            Último passo para transformar sua produção de maracujá
          </p>
          
          {/* Urgency Timer */}
          <div className="mt-4 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full">
            <span className="text-sm font-semibold">⏰ Oferta expira em:</span>
            <span className="font-mono font-bold">
              {timeLeft.minutes}:{timeLeft.seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Informações de pagamento</CardTitle>
                <CardDescription>
                  Preencha seus dados para finalizar a compra
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Personal Information */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-700">Dados pessoais</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome completo *</Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          value={form.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="document">CPF/CNPJ *</Label>
                        <Input
                          id="document"
                          value={form.document}
                          onChange={(e) => handleInputChange('document', e.target.value)}
                          required
                          placeholder="000.000.000-00"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Address Information */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-700">Endereço</h3>
                    <div>
                      <Label htmlFor="address">Endereço *</Label>
                      <Input
                        id="address"
                        value={form.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                        placeholder="Rua, número, complemento"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">Cidade *</Label>
                        <Input
                          id="city"
                          value={form.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          required
                          placeholder="Sua cidade"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado *</Label>
                        <Select value={form.state} onValueChange={(value) => handleInputChange('state', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="UF" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AC">AC</SelectItem>
                            <SelectItem value="AL">AL</SelectItem>
                            <SelectItem value="AP">AP</SelectItem>
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="BA">BA</SelectItem>
                            <SelectItem value="CE">CE</SelectItem>
                            <SelectItem value="DF">DF</SelectItem>
                            <SelectItem value="ES">ES</SelectItem>
                            <SelectItem value="GO">GO</SelectItem>
                            <SelectItem value="MA">MA</SelectItem>
                            <SelectItem value="MT">MT</SelectItem>
                            <SelectItem value="MS">MS</SelectItem>
                            <SelectItem value="MG">MG</SelectItem>
                            <SelectItem value="PA">PA</SelectItem>
                            <SelectItem value="PB">PB</SelectItem>
                            <SelectItem value="PR">PR</SelectItem>
                            <SelectItem value="PE">PE</SelectItem>
                            <SelectItem value="PI">PI</SelectItem>
                            <SelectItem value="RJ">RJ</SelectItem>
                            <SelectItem value="RN">RN</SelectItem>
                            <SelectItem value="RS">RS</SelectItem>
                            <SelectItem value="RO">RO</SelectItem>
                            <SelectItem value="RR">RR</SelectItem>
                            <SelectItem value="SC">SC</SelectItem>
                            <SelectItem value="SP">SP</SelectItem>
                            <SelectItem value="SE">SE</SelectItem>
                            <SelectItem value="TO">TO</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="zipCode">CEP *</Label>
                        <Input
                          id="zipCode"
                          value={form.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          required
                          placeholder="00000-000"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Plan Selection */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-700">Escolha seu plano</h3>
                    <Select value={form.plan} onValueChange={(value: any) => handleInputChange('plan', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o plano" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ebook">Ebook Completo - R$ 86,00</SelectItem>
                        <SelectItem value="ebook_discount">Ebook com Desconto - R$ 69,90</SelectItem>
                        <SelectItem value="mentoria">Mentoria Personalizada - R$ 299,90</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-700">Forma de pagamento</h3>
                    <Select value={form.paymentMethod} onValueChange={(value: any) => handleInputChange('paymentMethod', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a forma de pagamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pix">PIX (Pagamento instantâneo)</SelectItem>
                        <SelectItem value="credit_card">Cartão de Crédito</SelectItem>
                        <SelectItem value="boleto">Boleto Bancário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processando...' : `Finalizar compra - R$ ${selectedPlan.price.toFixed(2)}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumo do pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{selectedPlan.name}</h4>
                      <p className="text-sm text-gray-600">{selectedPlan.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        R$ {selectedPlan.price.toFixed(2)}
                      </div>
                      {selectedPlan.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {selectedPlan.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h5 className="font-semibold text-sm">O que está incluído:</h5>
                  <ul className="space-y-1">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <span className="text-green-600">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">✅ Garantia de 7 dias</h5>
                  <p className="text-sm text-green-700">
                    Se não ficar satisfeito, devolvemos seu dinheiro sem perguntas.
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">📧 Entrega imediata</h5>
                  <p className="text-sm text-blue-700">
                    Após a confirmação do pagamento, você receberá acesso imediato ao conteúdo.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}