
'use client'

import { useEffect } from 'react'

export default function MetaPixel() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Define global pixelId
      // @ts-ignore
      window.pixelId = "68aef5df7fe9644ed8977c6d"

      // Cria e insere o script externo do UTMify
      const script = document.createElement('script')
      script.async = true
      script.defer = true
      script.src = 'https://cdn.utmify.com.br/scripts/pixel/pixel.js'
      document.head.appendChild(script)
    }
  }, [])

  return null
}

