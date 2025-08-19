'use client'

import { useMetaPixel } from '@/hooks/useMetaPixel'

export default function BackRedirectPage() {
  const { trackLead } = useMetaPixel()

  const handleSiteRedirect = () => {
    trackLead() // Rastrear quando usuário volta para o site
    window.location.href = 'https://seusite.com'
  }

  const handleGoBack = () => {
    trackLead() // Rastrear quando usuário volta para página anterior
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Obrigado pelo seu interesse!
          </h1>
          <p className="text-gray-600">
            Seu cadastro foi realizado com sucesso.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            Escolha uma das opções abaixo para continuar:
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSiteRedirect}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Voltar para o site
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Voltar para página anterior
          </button>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <p>
            Clique em um dos botões acima para continuar.
          </p>
        </div>
      </div>
    </div>
  )
}