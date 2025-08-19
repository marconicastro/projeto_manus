'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useMetaPixel } from '@/hooks/useMetaPixel'

export default function Home() {
  const { trackEbookPurchase, trackMentoriaPurchase, trackWhatsAppClick, trackFormSubmission } = useMetaPixel()
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  })
  const [spotsLeft, setSpotsLeft] = useState(7)
  const [mobileView, setMobileView] = useState(false)
  const [visitorsCount, setVisitorsCount] = useState(23)
  const [visitorCardMinimized, setVisitorCardMinimized] = useState(false)

  useEffect(() => {
    // Detectar mobile e scroll
    const checkMobile = () => {
      setMobileView(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Detectar scroll para minimizar card de visitantes
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 300) {
        setVisitorCardMinimized(true)
      } else {
        setVisitorCardMinimized(false)
      }
    }
    window.addEventListener('scroll', handleScroll)

    // Contador regressivo
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          clearInterval(timer)
          return { hours: 0, minutes: 0, seconds: 0 }
        }
      })
    }, 1000)

    // Simular visitantes online
    const visitorTimer = setInterval(() => {
      setVisitorsCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2
        return Math.max(15, Math.min(35, prev + change))
      })
    }, 30000)



    return () => {
      clearInterval(timer)
      clearInterval(visitorTimer)
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleCheckoutClick = () => {
    trackEbookPurchase(39.90) // Rastrear compra do e-book
    window.location.href = 'https://go.hotmart.com/I101398692S'
  }

  const handleWhatsAppContact = () => {
    trackWhatsAppClick() // Rastrear clique no WhatsApp
    window.open('https://wa.me/5577998276042?text=Olá! Tenho interesse no e-book "Guia Prático de Controle do Trips no Maracujá"', '_blank')
  }

  const handleDownsellClick = () => {
    trackEbookPurchase(39.90) // Rastrear compra com desconto
    window.location.href = 'https://go.hotmart.com/I101398692S'
  }

  const handleMentoriaClick = () => {
    trackMentoriaPurchase(299.90) // Rastrear compra da mentoria
    window.location.href = 'https://go.hotmart.com/I101398692S'
  }



  const benefits = [
    {
      title: "Acabe com Frutos Deformados",
      description: "Aprenda técnicas eficazes para eliminar as cicatrizes e manchas que desvalorizam seu maracujá."
    },
    {
      title: "Pare com a Queda de Flores",
      description: "Descubra como proteger suas flores e garantir uma polinização bem-sucedida para maior produção."
    },
    {
      title: "Controle Todas as Fases do Trips",
      description: "Domine o controle completo: ovos, larvas, pupas e adultos - quebrando o ciclo da praga."
    },
    {
      title: "Economize em Agrotóxicos",
      description: "Aplique os produtos certos na hora certa, reduzindo custos e aumentando a eficácia."
    }
  ]

  const testimonials = [
    {
      name: "José Silva",
      location: "São Paulo - SP",
      text: "Perdi quase 40% da minha produção com trips. Depois de aplicar as técnicas do e-book, minha produtividade aumentou 60%. Valeu cada centavo!"
    },
    {
      name: "Maria Oliveira",
      location: "Minas Gerais - MG",
      text: "O método de monitoramento mudou completamente meu manejo. Hoje sei exatamente quando e como agir. Meus maracujás nunca estiveram tão bonitos."
    },
    {
      name: "Carlos Santos",
      location: "Bahia - BA",
      text: "Já gastei uma fortuna com inseticidas que não funcionavam. Este guia me ensinou a usar o MIP e economizei mais de R$ 5.000 neste ciclo."
    }
  ]

  const bonuses = [
    {
      title: "Planilha de Monitoramento Digital",
      description: "Acompanhe sua lavoura com precisão profissional",
      icon: "📊"
    },
    {
      title: "Vídeo Aula: Controle Biológico",
      description: "Técnicas avançadas com inimigos naturais",
      icon: "🎥"
    },
    {
      title: "Acesso ao Grupo Exclusivo",
      description: "Compartilhe experiências com outros produtores",
      icon: "👥"
    }
  ]

  const processSteps = [
    {
      step: "1",
      title: "Compra Imediata",
      description: "Acesso instantâneo ao e-book completo + bônus exclusivos"
    },
    {
      step: "2", 
      title: "Acompanhamento 4 Semanas",
      description: "Suporte personalizado no WhatsApp para implementar as técnicas"
    },
    {
      step: "3",
      title: "Consultoria Mensal",
      description: "Resultados contínuos com acompanhamento especializado"
    }
  ]

  const faqs = [
    {
      question: "Funciona na minha região?",
      answer: "Sim! As técnicas do MIP (Manejo Integrado de Pragas) são adaptáveis a todas as regiões do Brasil. O guia inclui recomendações específicas para diferentes climas e condições de cultivo."
    },
    {
      question: "Preciso de produtos caros?",
      answer: "Não! Na verdade, você vai economizar dinheiro. O guia ensina a usar os produtos corretos nas dosagens certas, evitando desperdícios e aplicações desnecessárias."
    },
    {
      question: "Como funciona o acompanhamento?",
      answer: "Após a compra, você terá 4 semanas de suporte personalizado no WhatsApp. Eu vou te ajudar passo a passo a implementar as técnicas e tirar todas as suas dúvidas."
    },
    {
      question: "Sou iniciante, vou entender?",
      answer: "Com certeza! O e-book foi escrito em linguagem simples e prática, com passo a passo detalhado. Incluímos ilustrações e exemplos reais para facilitar o entendimento."
    },
    {
      question: "Como recebo o e-book?",
      answer: "Instantaneamente! Após a confirmação do pagamento, você recebe um e-mail com o link para baixar o e-book em PDF, que pode ser lido em qualquer dispositivo."
    },
    {
      question: "Tem garantia?",
      answer: "Sim! Oferecemos garantia de 7 dias. Se por algum motivo você não ficar satisfeito, devolvemos seu dinheiro sem perguntas."
    }
  ]

  return (
    <>


      {/* Barra Flutuante Mobile */}
      {mobileView && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-700 text-white p-4 z-40 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm">Oferta Especial</div>
              <div className="text-lg font-bold">R$ 39,90</div>
            </div>
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-green-900 font-bold px-6 py-3 rounded-full text-sm"
              onClick={handleCheckoutClick}
            >
              Quero meu E-book
            </Button>
          </div>
        </div>
      )}

      {/* Visitantes Online - Versão Inteligente */}
      <div 
        className={`fixed top-20 right-4 bg-red-600 text-white px-3 py-2 rounded-full text-sm font-bold z-30 shadow-lg hover:bg-red-700 transition-all duration-300 cursor-pointer ${
          visitorCardMinimized ? 'scale-75 opacity-80' : 'scale-100 opacity-100'
        }`}
        onClick={() => setVisitorCardMinimized(!visitorCardMinimized)}
        title={visitorCardMinimized ? "Clique para expandir" : "Prova social em tempo real - Clique para minimizar"}
      >
        {visitorCardMinimized ? '👁️' : `👁️ ${visitorsCount} pessoas online`}
      </div>

      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-50">
        {/* Hero Section com Urgência - Mobile Optimized */}
        <section className="relative overflow-hidden bg-gradient-to-r from-green-700 to-green-800 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          
          {/* Alerta de Urgência - Mobile First */}
          <div className="relative bg-red-600 py-2 sm:py-3">
            <div className="container mx-auto px-4 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-lg sm:text-xl">⚠️</span>
                  <span className="font-bold text-xs sm:text-sm">OFERTA LIMITADA!</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
                  <span className="text-xs sm:text-sm">{spotsLeft} vagas restantes</span>
                  <div className="bg-white/20 px-2 sm:px-3 py-1 rounded-full text-xs">
                    {timeLeft.hours}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative container mx-auto px-4 py-12 sm:py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-4 sm:mb-6">
                <span className="bg-amber-500 text-green-900 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                  +150 PRODUTORES TRANSFORMADOS
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Domine o Trips do Maracujá
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-green-100">
                Guia Prático e Sustentável baseado no MIP
              </p>
              <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-green-50 max-w-3xl mx-auto">
                Acabe com frutos deformados, pare com a queda de flores e recupere sua produtividade. 
                Técnicas validadas pela Embrapa.
              </p>
              
              {/* Prova Social Rápida - Mobile Optimized */}
              <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-green-200 text-sm sm:text-base">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span>⭐</span>
                  <span>4.9/5 Avaliação</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span>📈</span>
                  <span>60%+ Produtividade</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span>✅</span>
                  <span>Garantia 7 Dias</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="bg-amber-500 hover:bg-amber-600 text-green-900 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg w-full sm:w-auto"
                  onClick={handleCheckoutClick}
                >
                  🚀 Quero meu E-book + Acompanhamento
                </Button>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3">
                  <span className="text-xl sm:text-2xl font-bold">R$ 39,90</span>
                  <span className="text-xs sm:text-sm line-through ml-1 sm:ml-2">R$ 147,00</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bônus Exclusivos - Mobile Optimized */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-yellow-50 to-amber-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 mb-3 sm:mb-4">
                Bônus Exclusivos
              </h2>
              <p className="text-base sm:text-xl text-gray-600">
                Adquira hoje e receba estes bônus
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {bonuses.map((bonus, index) => (
                <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-amber-200 transform hover:scale-105">
                  <CardHeader className="text-center p-4 sm:p-6">
                    <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{bonus.icon}</div>
                    <CardTitle className="text-green-900 text-base sm:text-lg">{bonus.title}</CardTitle>
                    <CardDescription className="text-gray-600 text-sm">
                      {bonus.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center p-4 pt-0">
                    <div className="bg-red-100 text-red-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold inline-block">
                      GRÁTIS por tempo limitado!
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-6 sm:mt-8">
              <div className="bg-green-100 border-2 border-green-300 rounded-lg p-3 sm:p-4 inline-block">
                <div className="text-green-800 font-bold text-base sm:text-lg">
                  💰 Valor Total dos Bônus: R$ 441,00
                </div>
                <div className="text-green-600 text-sm">
                  Economize imediato ao comprar agora!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios Principais - Mobile Optimized */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 mb-3 sm:mb-4">
                O Que Você Vai Dominar
              </h2>
              <p className="text-base sm:text-xl text-gray-600">
                Técnicas comprovadas para transformar sua produção
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-gradient-to-br from-green-50 to-amber-50 border-green-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl sm:text-4xl">🎯</div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Como Funciona - Mobile Optimized */}
        <section className="py-12 sm:py-16 bg-gradient-to-br from-amber-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 mb-3 sm:mb-4">
                Seu Caminho para o Sucesso
              </h2>
              <p className="text-base sm:text-xl text-gray-600">
                Acompanhamento completo do início ao fim
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-amber-200">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold mx-auto mb-4 sm:mb-6">
                      {step.step}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-3 sm:mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos - Mobile Optimized */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 mb-3 sm:mb-4">
                Quem Já Transformou Sua Produção
              </h2>
              <p className="text-base sm:text-xl text-gray-600">
                Histórias reais de produtores como você
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-gradient-to-br from-green-50 to-amber-50 border-green-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-green-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="mt-4 sm:mt-6 flex text-amber-500">
                      {'⭐'.repeat(5)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ - Mobile Optimized */}
        <section className="py-12 sm:py-16 bg-gradient-to-br from-amber-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 mb-3 sm:mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-base sm:text-xl text-gray-600">
                Tire suas dúvidas sobre o e-book
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-green-200">
                    <AccordionTrigger className="text-left text-green-900 font-semibold hover:text-green-700">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Final - Mobile Optimized */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-green-700 to-green-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Está Pronto para Transformar Sua Produção?
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-green-100 max-w-2xl mx-auto">
              Não deixe o trips destruir seu maracujazeiro mais um dia. Tenha acesso imediato às técnicas que já transformaram +150 produtores.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-6 sm:mb-8">
              <Button 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-green-900 font-bold text-lg px-8 sm:px-12 py-4 sm:py-6 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg w-full sm:w-auto"
                onClick={handleCheckoutClick}
              >
                🚀 SIM! QUERO MEU E-BOOK AGORA
              </Button>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 sm:px-8 py-3 sm:py-4">
                <span className="text-2xl sm:text-3xl font-bold">R$ 86,00</span>
                <span className="text-sm line-through ml-2">R$ 147,00</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-green-200 text-sm sm:text-base">
              <div className="flex items-center gap-1 sm:gap-2">
                <span>🔒</span>
                <span>Compra Segura</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <span>⚡</span>
                <span>Acesso Imediato</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <span>💬</span>
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contato - Mobile Optimized */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 mb-3 sm:mb-4">
                Fale Conosco
              </h2>
              <p className="text-base sm:text-xl text-gray-600">
                Tire suas dúvidas antes de comprar
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <Card className="bg-gradient-to-br from-green-50 to-amber-50 border-green-200">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="text-4xl sm:text-5xl mb-4">📱</div>
                  <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-2">
                    WhatsApp Direto
                  </h3>
                  <p className="text-gray-600 mb-4 sm:mb-6">
                    Fale diretamente comigo e tire todas as suas dúvidas sobre o e-book
                  </p>
                  <div className="space-y-3">
                    <Button 
                      size="lg" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 sm:py-4 rounded-full"
                      onClick={handleWhatsAppContact}
                    >
                      💬 Falar no WhatsApp
                    </Button>
                    <div className="text-sm text-gray-600">
                      📧 maracujalucrativo@gmail.com
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer - Mobile Optimized */}
        <footer className="bg-green-900 text-white py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Sobre o E-book</h3>
                <p className="text-green-200 text-sm sm:text-base">
                  Guia completo baseado no MIP para controle eficaz do trips no maracujazeiro.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Contato</h3>
                <div className="text-green-200 text-sm sm:text-base space-y-1 sm:space-y-2">
                  <div>📧 maracujalucrativo@gmail.com</div>
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Links Úteis</h3>
                <div className="text-green-200 text-sm sm:text-base space-y-1 sm:space-y-2">
                  <div>📚 Termos de Uso</div>
                  <div>🔒 Política de Privacidade</div>
                  <div>💰 Política de Reembolso</div>
                </div>
              </div>
            </div>
            <div className="border-t border-green-800 pt-6 sm:pt-8 text-center">
              <p className="text-green-300 text-sm sm:text-base">
                © 2024 Maracujá Lucrativo. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}