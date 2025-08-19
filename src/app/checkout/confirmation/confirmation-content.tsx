'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { useMetaPixel } from '@/hooks/useMetaPixel'
import { useRouter, useSearchParams } from 'next/navigation'

interface OrderData {
  orderId: string
  name: string
  email: string
  plan: {
    name: string
    price: number
    description: string
    features: string[]
  }
  paymentMethod: string
  status: string
  createdAt: string
}

export default function ConfirmationContent() {
  const { trackEbookPurchase, trackMentoriaPurchase, trackEbookDownload } = useMetaPixel()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orderId) {
      router.push('/')
      return
    }

    // Retrieve order data from localStorage (in real app, this would come from backend)
    const storedOrder = localStorage.getItem('currentOrder')
    if (storedOrder) {
      const order = JSON.parse(storedOrder)
      setOrderData(order)
      
      // Track successful purchase
      if (order.plan.name.includes('Mentoria')) {
        trackMentoriaPurchase(order.plan.price)
      } else {
        trackEbookPurchase(order.plan.price)
      }
    }
    setLoading(false)
  }, [orderId, router, trackEbookPurchase, trackMentoriaPurchase])

  const handleDownloadEbook = () => {
    trackEbookDownload() // Track ebook download
    toast({
      title: "Iniciando download...",
      description: "Seu ebook está sendo baixado.",
    })
    // In real app, this would trigger actual download
    setTimeout(() => {
      window.open('/api/download/ebook', '_blank')
    }, 1000)
  }

  const handleWhatsAppSupport = () => {
    window.open('https://wa.me/5577998276042?text=Olá! Acabei de comprar o e-book e preciso de ajuda.', '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando informações do pedido...</p>
        </div>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-red-600">Pedido não encontrado</CardTitle>
            <CardDescription>
              Não foi possível encontrar as informações do seu pedido.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/')} className="w-full">
              Voltar para página inicial
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
            Pagamento Confirmado!
          </h1>
          <p className="text-gray-600 text-lg">
            Obrigado por sua compra! Seu pedido foi processado com sucesso.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Details */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Detalhes do Pedido
                </CardTitle>
                <CardDescription>
                  Informações sobre sua compra
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Número do pedido:</span>
                  <Badge variant="outline">{orderData.orderId}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data:</span>
                  <span>{new Date(orderData.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className="bg-green-600">Confirmado</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Forma de pagamento:</span>
                  <span className="capitalize">{orderData.paymentMethod.replace('_', ' ')}</span>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Produto adquirido:</h4>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-semibold">{orderData.plan.name}</h5>
                        <p className="text-sm text-gray-600">{orderData.plan.description}</p>
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        R$ {orderData.plan.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">O que você recebeu:</h4>
                  <ul className="space-y-1">
                    {orderData.plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <span className="text-green-600">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Próximos passos</CardTitle>
                <CardDescription>
                  O que fazer agora para começar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h5 className="font-semibold">Baixe seu ebook</h5>
                      <p className="text-sm text-gray-600">
                        Acesse imediatamente o conteúdo completo em PDF
                      </p>
                      <Button 
                        onClick={handleDownloadEbook}
                        className="mt-2 w-full bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        📥 Baixar Ebook Agora
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h5 className="font-semibold">Verifique seu e-mail</h5>
                      <p className="text-sm text-gray-600">
                        Enviamos um e-mail com todos os detalhes e links de acesso
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h5 className="font-semibold">Entre no grupo exclusivo</h5>
                      <p className="text-sm text-gray-600">
                        Conecte-se com outros produtores e compartilhe experiências
                      </p>
                    </div>
                  </div>

                  {orderData.plan.name.includes('Mentoria') && (
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        4
                      </div>
                      <div>
                        <h5 className="font-semibold">Agende seu acompanhamento</h5>
                        <p className="text-sm text-gray-600">
                          Nossa equipe entrará em contato para agendar as sessões de mentoria
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="bg-amber-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-amber-800 mb-2">📞 Precisa de ajuda?</h5>
                  <p className="text-sm text-amber-700 mb-3">
                    Nossa equipe de suporte está disponível para ajudar você com qualquer dúvida.
                  </p>
                  <Button 
                    onClick={handleWhatsAppSupport}
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    size="sm"
                  >
                    💬 Falar com Suporte no WhatsApp
                  </Button>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">✅ Garantia de satisfação</h5>
                  <p className="text-sm text-green-700">
                    Lembre-se: você tem 7 dias de garantia. Se não ficar satisfeito, devolvemos seu dinheiro sem perguntas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Importante</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold mb-2">📧 Acesso por e-mail</h5>
                  <p className="text-sm text-gray-600">
                    Você receberá um e-mail em <strong>{orderData.email}</strong> com:
                  </p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Link para download do ebook</li>
                    <li>• Acesso ao grupo exclusivo</li>
                    <li>• Instruções para usar a planilha</li>
                    <li>• Link para a videoaula</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">🔒 Segurança e privacidade</h5>
                  <p className="text-sm text-gray-600">
                    Seus dados estão seguros conosco. Nunca compartilhamos suas informações com terceiros e todos os pagamentos são processados com criptografia de ponta a ponta.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Button 
            onClick={() => router.push('/')}
            variant="outline"
            className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
          >
            Voltar para página inicial
          </Button>
        </div>
      </div>
    </div>
  )
}