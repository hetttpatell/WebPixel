import { Link } from 'react-router'

export default function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-sans font-black text-sm uppercase tracking-widest px-8 py-4 border-4 border-black cursor-pointer select-none transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-none'

  const variants = {
    primary:
      'bg-hot-red text-ink shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
    secondary:
      'bg-vivid-yellow text-ink shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
    outline:
      'bg-white text-ink shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
  }

  const classes = `${baseClasses} ${variants[variant] || variants.primary} ${className}`

  if (href) {
    const isExternal =
      href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      )
    }
    return (
      <Link to={href} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
