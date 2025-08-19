'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    fbq: (event: string, action: string, params?: Record<string, any>) => void
  }
}

export function MetaPixelEvents() {
  useEffect(() => {
    // Garantir que o fbq esteja disponível
    if (typeof window !== 'undefined' && window.fbq) {
      // Evento de visualização de conteúdo
      window.fbq('track', 'ViewContent', {
        content_name: 'Guia Prático de Controle do Trips no Maracujá',
        content_category: 'E-book Agrícola',
        content_type: 'product',
        value: 86.00,
        currency: 'BRL'
      })

      // Evento de lead quando o usuário demonstra interesse
      const handleLeadEvent = () => {
        window.fbq('track', 'Lead', {
          content_name: 'Guia Prático de Controle do Trips no Maracujá',
        })
      }

      // Evento de adição ao carrinho
      const handleAddToCart = () => {
        window.fbq('track', 'AddToCart', {
          content_name: 'Guia Prático de Controle do Trips no Maracujá',
          value: 86.00,
          currency: 'BRL'
        })
      }

      // Evento de compra
      const handlePurchase = () => {
        window.fbq('track', 'Purchase', {
          content_name: 'Guia Prático de Controle do Trips no Maracujá',
          value: 86.00,
          currency: 'BRL'
        })
      }

      // Adicionar listeners aos botões de checkout
      const checkoutButtons = document.querySelectorAll('button[class*="bg-amber-500"], button[class*="from-red-600"]')
      checkoutButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart)
      })

      // Adicionar listener ao botão de WhatsApp
      const whatsappButtons = document.querySelectorAll('a[href*="wa.me"], button[onclick*="whatsapp"]')
      whatsappButtons.forEach(button => {
        button.addEventListener('click', handleLeadEvent)
      })

      return () => {
        // Cleanup dos listeners
        checkoutButtons.forEach(button => {
          button.removeEventListener('click', handleAddToCart)
        })
        whatsappButtons.forEach(button => {
          button.removeEventListener('click', handleLeadEvent)
        })
      }
    }
  }, [])

  return null
}

// Funções auxiliares para eventos específicos
export const trackMetaPixelEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params)
  }
}

export const trackCheckout = () => {
  trackMetaPixelEvent('InitiateCheckout', {
    content_name: 'Guia Prático de Controle do Trips no Maracujá',
    value: 86.00,
    currency: 'BRL'
  })
}

export const trackPurchase = (value: number = 86.00) => {
  trackMetaPixelEvent('Purchase', {
    content_name: 'Guia Prático de Controle do Trips no Maracujá',
    value: value,
    currency: 'BRL'
  })
}

export const trackLead = () => {
  trackMetaPixelEvent('Lead', {
    content_name: 'Guia Prático de Controle do Trips no Maracujá',
  })
}