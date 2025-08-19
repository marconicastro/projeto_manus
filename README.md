# 📚 Sistema de Checkout - Ebook Controle de Trips no Maracujá

Sistema de checkout completo e moderno para venda de ebooks, desenvolvido com Next.js 15, TypeScript e integrado com Meta Pixel para rastreamento de conversões.

## 🎯 **Visão Geral**

Este projeto é uma solução completa de e-commerce para venda de ebooks, especificamente desenvolvida para o produto "Guia Prático de Controle do Trips no Maracujá". O sistema inclui desde a página de vendas até a confirmação de pedido, com rastreamento completo do funil de vendas.

## ✨ **Funcionalidades Principais**

### 🛒 **Sistema de Checkout**
- Formulário completo com validação
- Múltiplos planos (Ebook, Ebook com desconto, Mentoria)
- Diversas formas de pagamento (PIX, Cartão de Crédito, Boleto)
- Interface responsiva e mobile-first
- Timer de urgência para conversão

### 📊 **Rastreamento e Analytics**
- Integração completa com Meta Pixel (Facebook)
- Eventos personalizados para todo o funil
- Rastreamento de conversões e ROI
- Iniciação de checkout, compras e downloads

### 📧 **Sistema de Confirmação**
- Página de confirmação de pedido
- Sistema de download de ebooks
- Integração com WhatsApp para suporte
- Envio automático de emails de confirmação

### 🎨 **Design e UX/UI**
- Interface moderna com shadcn/ui
- Design responsivo para todos os dispositivos
- Elementos de prova social e urgência
- Otimizado para conversão

## 🚀 **Tecnologias Utilizadas**

### **Frontend**
- [Next.js 15](https://nextjs.org/) - Framework React com App Router
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) - Framework de estilização
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI de alta qualidade
- [Lucide React](https://lucide.dev/) - Ícones

### **Backend e APIs**
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - API endpoints
- [Prisma](https://www.prisma.io/) - ORM para banco de dados
- [SQLite](https://www.sqlite.org/) - Banco de dados leve

### **Integrações**
- [Meta Pixel](https://www.facebook.com/business/help/120325381656392) - Rastreamento de conversões
- [Socket.io](https://socket.io/) - Comunicação em tempo real
- [Z-AI Web Dev SDK](https://z.ai/) - SDK para desenvolvimento

### **Ferramentas de Desenvolvimento**
- [ESLint](https://eslint.org/) - Linting e qualidade de código
- [Prettier](https://prettier.io/) - Formatação de código
- [Nodemon](https://nodemon.io/) - Desenvolvimento com auto-reload

## 📁 **Estrutura do Projeto**

```
src/
├── app/                    # Páginas e rotas da aplicação
│   ├── api/               # API endpoints
│   │   ├── checkout/      # Processamento de pedidos
│   │   ├── download/      # Download de ebooks
│   │   └── email/         # Envio de emails
│   ├── checkout/          # Fluxo de checkout
│   │   ├── page.tsx       # Página de checkout
│   │   └── confirmation/  # Página de confirmação
│   ├── backredirect/      # Página de redirecionamento
│   ├── page.tsx           # Página principal (landing page)
│   └── layout.tsx         # Layout da aplicação
├── components/            # Componentes React
│   ├── ui/               # Componentes shadcn/ui
│   ├── MetaPixel.tsx     # Componente de rastreamento
│   └── meta-pixel-events.tsx
├── hooks/                # Custom hooks
│   ├── useMetaPixel.ts   # Hook para Meta Pixel
│   ├── useToast.ts      # Hook para notificações
│   └── use-mobile.ts    # Hook para detecção de mobile
└── lib/                  # Utilitários e configurações
    ├── db.ts            # Configuração do banco
    ├── utils.ts         # Funções utilitárias
    └── socket.ts        # Configuração Socket.io
```

## 🛠️ **Instalação e Configuração**

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn
- Conta no Meta Business (para Pixel)

### **Instalação**
```bash
# Clonar o repositório
git clone https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git

# Entrar no diretório
cd NOME-DO-REPOSITORIO

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
```

### **Configuração de Variáveis de Ambiente**
Crie um arquivo `.env.local` com as seguintes variáveis:
```env
# Meta Pixel
NEXT_PUBLIC_META_PIXEL_ID=1403975024017865

# Database (se usar Prisma)
DATABASE_URL="file:./dev.db"

# Email (se usar serviço de email)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=seu-email@dominio.com

# Payment Gateway (quando integrar)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### **Executar o Projeto**
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start

# Linting
npm run lint
```

## 📊 **Fluxo de Vendas**

1. **Landing Page** (`/`)
   - Apresentação do produto
   - Prova social e urgência
   - Botões de checkout

2. **Checkout** (`/checkout`)
   - Formulário de cadastro
   - Seleção de plano e pagamento
   - Validação e processamento

3. **Confirmação** (`/checkout/confirmation`)
   - Confirmação de pedido
   - Download do ebook
   - Suporte e próximos passos

## 🎯 **Eventos de Rastreamento**

O sistema rastreia os seguintes eventos no Meta Pixel:

- **PageView** - Visualização de páginas
- **Lead** - Iniciação de checkout
- **InitiateCheckout** - Entrada no checkout
- **Purchase** - Compra concluída
- **Contact** - Interação com WhatsApp
- **Lead** - Download do ebook

## 💳 **Integração de Pagamento**

O sistema está preparado para integrar com diversos gateways de pagamento:

### **Gateway Suportados (para implementação)**
- **Stripe** - Internacional e robusto
- **Mercado Pago** - Popular na América Latina
- **PagSeguro** - Amplamente usado no Brasil
- **Gerencianet** - Boletos e PIX

### **Exemplo de Integração com Stripe**
```typescript
// src/app/api/checkout/route.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Criar sessão de pagamento
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'brl',
      product_data: { name: planDetails.name },
      unit_amount: Math.round(planDetails.price * 100),
    },
    quantity: 1,
  }],
  mode: 'payment',
  success_url: `${req.headers.origin}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${req.headers.origin}/checkout`,
})
```

## 📧 **Sistema de Emails**

O sistema inclui envio de emails de confirmação:

### **Serviços Compatíveis**
- **Resend** - Simples e eficiente
- **SendGrid** - Robusto e escalável
- **AWS SES** - Econômico para alto volume
- **Mailgun** - API poderosa

### **Template de Email**
```html
<h1>Obrigado pela sua compra, {{name}}!</h1>
<p>Seu pedido <strong>{{orderId}}</strong> foi confirmado.</p>
<h2>Detalhes:</h2>
<ul>
  <li>Produto: {{plan.name}}</li>
  <li>Valor: R$ {{plan.price}}</li>
</ul>
<p><a href="{{downloadLink}}">Baixe seu ebook aqui</a></p>
```

## 🔧 **Personalização**

### **Alterar Planos e Preços**
```typescript
// src/app/checkout/page.tsx
const plans = {
  ebook: {
    name: 'Ebook Completo',
    price: 86.00,
    description: 'Descrição do produto',
    features: ['Feature 1', 'Feature 2']
  }
  // ... outros planos
}
```

### **Configurar Meta Pixel**
```typescript
// src/components/MetaPixel.tsx
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1403975024017865'
```

### **Personalizar Design**
- Modifique os componentes em `src/components/ui/`
- Altere as cores em `tailwind.config.ts`
- Customize o layout em `src/app/page.tsx`

## 🚀 **Deploy**

### **Vercel (Recomendado)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer deploy
vercel

# Deploy para produção
vercel --prod
```

### **Outras Plataformas**
- **Netlify**
- **Railway**
- **Digital Ocean**
- **AWS Amplify**

## 📈 **Monitoramento e Analytics**

### **Meta Events Manager**
Acesse o [Meta Events Manager](https://www.facebook.com/events_manager2) para:
- Monitorar conversões
- Configurar domínios
- Testar eventos
- Otimizar campanhas

### **Google Analytics (opcional)**
```bash
npm install @vercel/analytics
```

## 🤝 **Contribuição**

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 **Suporte**

Se você precisar de ajuda ou tiver dúvidas:

- **WhatsApp**: [Link para suporte](https://wa.me/5577998276042)
- **Email**: seu-email@dominio.com
- **Issues**: [GitHub Issues](https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO/issues)

## 🙏 **Agradecimentos**

- [Next.js](https://nextjs.org/) - Framework React incrível
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI maravilhosos
- [Tailwind CSS](https://tailwindcss.com/) - Framework de estilização poderoso
- [Meta](https://www.meta.com/) - Ferramentas de marketing digital

---

**Desenvolvido com ❤️ para produtores de maracujá brasileiros**


## Modificações Recentes (Agosto de 2025)

Este projeto foi atualizado para incluir a implementação de pixels de rastreamento e a correção de valores, conforme as seguintes especificações:

### 1. Implementação dos Pixels (Facebook e TikTok)

**Objetivo:** Rastrear o comportamento dos usuários na landing page para otimização de campanhas de marketing e análise de leads.

**Pixels Implementados:**
*   **Facebook Pixel ID:** 1403975024017865
*   **TikTok Pixel ID:** D2HMSD3C77U9B02M0HMG

**Eventos Rastreáveis na Landing Page:**

Os seguintes eventos são rastreados para ambos os pixels (Facebook e TikTok) na landing page:

*   **PageView (Visualização de Página):** Disparado sempre que a página é carregada. Essencial para medir o tráfego e o alcance da página.
*   **ViewContent (Visualização de Conteúdo):** Disparado quando o conteúdo principal da página (e-book) é visualizado. Ajuda a identificar o interesse no produto.
*   **AddToCart (Adicionar ao Carrinho):** Disparado quando o usuário clica nos botões de checkout (botões com classes `bg-amber-500` ou `from-red-600`). Indica uma intenção de compra.
*   **Lead (Lead):** Disparado quando o usuário clica nos botões de WhatsApp (`a[href*="wa.me"]` ou `button[onclick*="whatsapp"]`). Essencial para rastrear leads gerados via contato direto.

**Observação Importante sobre Eventos de Compra/Checkout:**

Os eventos de `InitiateCheckout` (Iniciar Checkout) e `Purchase` (Compra) **NÃO** estão sendo rastreados diretamente nesta landing page. Conforme sua solicitação, a integração e o rastreamento desses eventos devem ser configurados diretamente na plataforma da Hotmart. Esta abordagem garante maior precisão na coleta de dados de transações, uma vez que a Hotmart tem controle total sobre o fluxo de pagamento.

### 2. Atualização de Valores

**Objetivo:** Ajustar o preço do e-book e outros valores mencionados na página para R$ 39,90.

**Alterações Realizadas:**

Todos os valores de R$ 86,00 foram atualizados para R$ 39,90, incluindo:

*   Preço do e-book na seção principal da página.
*   Preço do e-book na barra flutuante mobile.
*   Valor do e-book no backend (arquivo `src/app/api/checkout/route.ts`) para garantir consistência em futuras integrações de pagamento, caso necessário.

### 3. Estrutura do Projeto e Arquivos Modificados

As principais modificações foram realizadas nos seguintes arquivos:

*   `src/components/MetaPixel.tsx`: Contém a lógica de inicialização dos pixels do Facebook e TikTok.
*   `src/components/meta-pixel-events.tsx`: Contém as funções para disparar os eventos específicos (PageView, ViewContent, AddToCart, Lead).
*   `src/app/page.tsx`: Arquivo principal da landing page, onde os valores foram atualizados e os eventos são chamados em resposta às interações do usuário.
*   `src/app/api/checkout/route.ts`: Arquivo de backend onde o valor do e-book foi atualizado.

### 4. Como Testar a Implementação

Para verificar a correta instalação e disparo dos pixels, siga os passos:

1.  **Acesse a Landing Page:** Utilize o link fornecido para acessar a landing page em seu navegador.
2.  **Utilize Extensões de Navegador:**
    *   **Facebook Pixel Helper:** Instale esta extensão no seu navegador (disponível para Chrome). Ela indicará se o pixel do Facebook está ativo e quais eventos estão sendo disparados.
    *   **TikTok Pixel Helper:** Instale esta extensão no seu navegador (disponível para Chrome). Ela fará o mesmo para o pixel do TikTok.
3.  **Interaja com a Página:** Navegue pela página, clique nos botões de compra e WhatsApp para testar o disparo dos eventos.

