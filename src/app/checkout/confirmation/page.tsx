import ConfirmationSuspenseWrapper from './suspense-wrapper'
import ConfirmationContent from './confirmation-content'

export default function ConfirmationPage() {
  return (
    <ConfirmationSuspenseWrapper>
      <ConfirmationContent />
    </ConfirmationSuspenseWrapper>
  )
}