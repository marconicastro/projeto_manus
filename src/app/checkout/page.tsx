import CheckoutSuspenseWrapper from './suspense-wrapper'
import CheckoutContent from './checkout-content'

export default function CheckoutPage() {
  return (
    <CheckoutSuspenseWrapper>
      <CheckoutContent />
    </CheckoutSuspenseWrapper>
  )
}