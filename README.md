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