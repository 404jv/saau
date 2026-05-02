import type { BannerVariant } from '../lib/auth-api'

type FormBannerVariant = BannerVariant | 'success'

type FormBannerProps = {
  heading: string
  message: string
  variant?: FormBannerVariant
  onDismiss?: () => void
  onRetry?: () => void
  retryLabel?: string
}

export default function FormBanner({
  heading,
  message,
  variant = 'unknown',
  onDismiss,
  onRetry,
  retryLabel = 'Tentar de novo',
}: FormBannerProps) {
  const isSuccess = variant === 'success'
  const isGoogle = variant === 'oauth_failed' || variant === 'oauth_cancelled'

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={[
        'relative mb-5 rounded-xl border-2 border-dashed border-dark p-3 sm:p-4 pr-9',
        'shadow-[3px_3px_0_rgba(30,30,30,0.85)] -rotate-[0.8deg]',
        'animate-[saau-banner-in_280ms_cubic-bezier(.34,1.56,.64,1)_both]',
        isSuccess
          ? 'bg-[color-mix(in_srgb,var(--color-teal)_22%,var(--color-paper))]'
          : 'bg-[color-mix(in_srgb,var(--color-pink)_18%,var(--color-paper))]',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className="absolute -top-2 left-1/2 w-12 h-3 bg-yellow/80 rotate-3 rounded-sm shadow-sm origin-center -translate-x-1/2 animate-[saau-banner-tape_360ms_ease-out_80ms_both]"
      />

      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="shrink-0 mt-0.5">
          {isSuccess ? <PawSuccessIcon /> : <PawAlertIcon />}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-main text-base sm:text-lg text-dark leading-tight m-0">{heading}</p>
          <p className="font-body text-sm text-dark/80 leading-snug m-0 mt-1">{message}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className={[
                'inline-flex items-center gap-1.5 mt-2 font-main text-sm underline underline-offset-2 hover:no-underline transition-colors',
                isGoogle ? 'text-google' : 'text-red',
              ].join(' ')}
            >
              <RetryArrow />
              {retryLabel}
            </button>
          )}
        </div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fechar aviso"
          className="absolute top-1 right-1.5 w-7 h-7 grid place-items-center rounded-full text-dark/40 hover:text-dark hover:bg-dark/5 transition-colors text-2xl leading-none font-main"
        >
          ×
        </button>
      )}
    </div>
  )
}

function PawAlertIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
      <g fill="none" stroke="var(--color-red)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="16" cy="22" rx="6.5" ry="5" fill="var(--color-paper)" />
        <ellipse cx="7.5" cy="14" rx="2.6" ry="3.6" transform="rotate(-18 7.5 14)" fill="var(--color-paper)" />
        <ellipse cx="24.5" cy="14" rx="2.6" ry="3.6" transform="rotate(18 24.5 14)" fill="var(--color-paper)" />
        <ellipse cx="12.5" cy="9" rx="2" ry="2.6" fill="var(--color-paper)" />
        <ellipse cx="19.5" cy="9" rx="2" ry="2.6" fill="var(--color-paper)" />
      </g>
      <text x="16" y="25.5" textAnchor="middle" fontSize="9" fontWeight="800" fill="var(--color-red)">!</text>
    </svg>
  )
}

function PawSuccessIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
      <g fill="none" stroke="var(--color-teal)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="16" cy="20" rx="7" ry="5.5" fill="var(--color-paper)" />
        <path d="M11.5 20 l3.2 3.2 l5.6 -6.4" />
      </g>
    </svg>
  )
}

function RetryArrow() {
  return (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M3 8a5 5 0 1 1 1.5 3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 5l0 3l3 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
