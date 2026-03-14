const PLATFORM_STYLES = {
  chatgpt:    { label: 'ChatGPT',    bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300' },
  perplexity: { label: 'Perplexity', bg: 'bg-aria-100',    text: 'text-aria-700',    border: 'border-aria-300' },
  google:     { label: 'Google AIO', bg: 'bg-amber-100',   text: 'text-amber-700',   border: 'border-amber-300' },
  claude:     { label: 'Claude',     bg: 'bg-jasper-100',  text: 'text-jasper-700',  border: 'border-jasper-300' },
  gemini:     { label: 'Gemini',     bg: 'bg-blue-100',    text: 'text-blue-700',    border: 'border-blue-300' },
}

export function PlatformChip({ platform, size = 'sm' }) {
  const style = PLATFORM_STYLES[platform?.toLowerCase()] || { label: platform, bg: 'bg-xeo-subtle', text: 'text-xeo-muted', border: 'border-xeo-border' }
  const sizeClasses = size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1'
  return (
    <span className={`inline-flex items-center font-semibold rounded-full border ${style.bg} ${style.text} ${style.border} ${sizeClasses}`}>
      {style.label}
    </span>
  )
}
