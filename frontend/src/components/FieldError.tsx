type FieldErrorProps = {
  id: string
  message?: string
}

export default function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null
  return (
    <>
      <span aria-hidden="true" className="saau-wavy block h-[4px] mt-1.5 opacity-90" />
      <p
        id={id}
        role="alert"
        className="text-[13px] font-body text-red mt-1 flex items-start gap-1.5 leading-snug animate-[saau-field-in_220ms_ease-out_both]"
      >
        <span aria-hidden="true" className="font-main text-base leading-none">↳</span>
        <span>{message}</span>
      </p>
    </>
  )
}
