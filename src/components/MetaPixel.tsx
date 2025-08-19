'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function MetaPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Inicializar o Meta Pixel apenas no cliente
    if (typeof window !== 'undefined') {
      // Carregar o script do Facebook Pixel
      const script = document.createElement('script')
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '295192146682415');
      `
      document.head.appendChild(script)

      // Adicionar o noscript
      const noscript = document.createElement('noscript')
      noscript.innerHTML = `
        <img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=295192146682415&ev=PageView&noscript=1"
        />
      `
      document.head.appendChild(noscript)

      // Track initial page view
      if (window.fbq) {
        window.fbq('track', 'PageView')
      }
    }
  }, [])

  // Track page views when route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView')
    }
  }, [pathname, searchParams])

  return null
}

// Funções para rastrear eventos personalizados
export const trackMetaPixelEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters)
  }
}

// Eventos comuns pré-definidos
export const trackLead = () => trackMetaPixelEvent('Lead')
export const trackPurchase = (value: number, currency: string = 'BRL') => 
  trackMetaPixelEvent('Purchase', { value, currency })
export const trackAddToCart = () => trackMetaPixelEvent('AddToCart')
export const trackCompleteRegistration = () => trackMetaPixelEvent('CompleteRegistration')

// Adicionar tipos ao objeto window
declare global {
  interface Window {
    fbq: any
  }
}