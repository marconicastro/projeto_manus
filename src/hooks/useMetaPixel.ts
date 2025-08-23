'use client'

import { trackLead, trackPurchase, trackAddToCart, trackCompleteRegistration, trackMetaPixelEvent } from '@/components/MetaPixel'

export const useMetaPixel = () => {
  return {
    // Eventos padrão
    trackLead,
    trackPurchase,
    trackAddToCart,
    trackCompleteRegistration,
    
    // Evento personalizado
    trackEvent: trackMetaPixelEvent,
    
    // Eventos específicos para o seu negócio
    trackEbookPurchase: (value: number) => trackPurchase(value, 'BRL'),
    trackMentoriaPurchase: (value: number) => trackPurchase(value, 'BRL'),
    trackFormSubmission: () => trackLead(),
    trackWhatsAppClick: () => trackMetaPixelEvent('Contact'),
    trackEbookDownload: () => trackMetaPixelEvent('Lead', { content_name: 'Ebook Trips' }),
    trackCheckoutInitiation: () => trackMetaPixelEvent('InitiateCheckout'),
  }
}