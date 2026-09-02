import type { SVGProps } from 'react'

export type IconName =
  | 'arrow'
  | 'bank'
  | 'basket'
  | 'bill'
  | 'card'
  | 'cash'
  | 'check'
  | 'cloudOff'
  | 'food'
  | 'github'
  | 'health'
  | 'history'
  | 'home'
  | 'lock'
  | 'message'
  | 'mic'
  | 'palette'
  | 'play'
  | 'plus'
  | 'replay'
  | 'shield'
  | 'spark'
  | 'tap'

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    ...props,
  }

  switch (name) {
    case 'arrow':
      return <svg {...common}><path d="M5 12h14M14 7l5 5-5 5" /></svg>
    case 'bank':
      return <svg {...common}><path d="M3 10h18M5 10v8M9.7 10v8M14.3 10v8M19 10v8M3 19h18M12 3l9 5H3l9-5Z" /></svg>
    case 'basket':
      return <svg {...common}><path d="m7 10 5-6 5 6M4 10h16l-1.3 9H5.3L4 10Z" /><path d="M9 13v3M15 13v3" /></svg>
    case 'bill':
      return <svg {...common}><path d="M7 3h8l4 4v14H7V3Z" /><path d="M15 3v5h4M10 12h6M10 16h4" /></svg>
    case 'card':
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M3 10h18M7 15h4" /></svg>
    case 'cash':
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M9 8h6M9 12h5M12 8v9" /></svg>
    case 'check':
      return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>
    case 'cloudOff':
      return <svg {...common}><path d="m3 3 18 18M7.2 7.2A6.3 6.3 0 0 1 18 11a4.5 4.5 0 0 1 1.7 8.2M6 19a4 4 0 0 1-1-7.9" /></svg>
    case 'food':
      return <svg {...common}><path d="M6 3v7M3.5 3v4.5A2.5 2.5 0 0 0 6 10M8.5 3v4.5A2.5 2.5 0 0 1 6 10v11M15 3v18M15 3c3.2 2.4 4 6.5 0 9" /></svg>
    case 'github':
      return <svg {...common} fill="currentColor" stroke="none"><path d="M12 2.2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.62-3.37-1.2-3.37-1.2-.45-1.17-1.11-1.48-1.11-1.48-.91-.63.07-.62.07-.62 1 .08 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.36-2.22-.26-4.56-1.13-4.56-5a3.96 3.96 0 0 1 1.03-2.72c-.1-.26-.45-1.29.1-2.68 0 0 .84-.27 2.75 1.04a9.4 9.4 0 0 1 5 0c1.91-1.31 2.75-1.04 2.75-1.04.55 1.39.2 2.42.1 2.68a3.95 3.95 0 0 1 1.03 2.72c0 3.89-2.34 4.74-4.57 5 .36.31.68.92.68 1.87v2.78c0 .27.18.58.69.48A10 10 0 0 0 12 2.2Z" /></svg>
    case 'health':
      return <svg {...common}><rect x="4" y="7" width="16" height="13" rx="3" /><path d="M9 7V5h6v2M12 10v7M8.5 13.5h7" /></svg>
    case 'history':
      return <svg {...common}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 4v4h4M12 7v5l3 2" /></svg>
    case 'home':
      return <svg {...common}><path d="m4 10 8-7 8 7v10h-6v-6h-4v6H4V10Z" /></svg>
    case 'lock':
      return <svg {...common}><rect x="4" y="10" width="16" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></svg>
    case 'message':
      return <svg {...common}><path d="M4 5h16v12H8l-4 4V5Z" /><path d="M8 9h8M8 13h5" /></svg>
    case 'mic':
      return <svg {...common}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" /></svg>
    case 'palette':
      return <svg {...common}><path d="M12 3a9 9 0 0 0 0 18h1.4a1.8 1.8 0 0 0 1.2-3.1 1.8 1.8 0 0 1 1.2-3.1H18A3 3 0 0 0 21 12a9 9 0 0 0-9-9Z" /><circle cx="7.5" cy="11" r=".8" fill="currentColor" /><circle cx="10" cy="7" r=".8" fill="currentColor" /><circle cx="15" cy="7.5" r=".8" fill="currentColor" /></svg>
    case 'play':
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="4" /><path d="m10 9 5 3-5 3V9Z" /></svg>
    case 'plus':
      return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>
    case 'replay':
      return <svg {...common}><path d="M4 9V4l3 3a8 8 0 1 1-2.2 8" /></svg>
    case 'shield':
      return <svg {...common}><path d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></svg>
    case 'spark':
      return <svg {...common}><path d="m12 2 1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2ZM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></svg>
    case 'tap':
      return <svg {...common}><path d="M12 11V5a1 1 0 0 1 2 0v6h1a2 2 0 0 1 2 2v4a4 4 0 0 1-4 4h-2a3 3 0 0 1-3-3v-3" /><path d="M8 11V9a1 1 0 0 1 2 0v2M6 12V9a1 1 0 0 1 2 0v3M4 13V10a1 1 0 0 1 2 0v3" /><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" /></svg>
  }
}

export function MoniMark({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  )
}
