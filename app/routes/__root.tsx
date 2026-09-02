/// <reference types="vite/client" />
import {
  HeadContent,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import * as React from 'react'
import appCss from '~/styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'moni - Private expense tracking for iPhone' },
      {
        name: 'description',
        content:
          'A fast, offline expense tracker for iPhone. Log purchases in seconds, understand your budget, and keep every rupee on-device.',
      },
      { name: 'theme-color', content: '#F4F6EE' },
      {
        property: 'og:title',
        content: 'moni - Private expense tracking for iPhone',
      },
      {
        property: 'og:description',
        content:
          'Log purchases in seconds. No account, no bank linking, and no network calls.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://moni.workers.dev' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'moni - Private expense tracking for iPhone' },
      {
        name: 'twitter:description',
        content: 'Log purchases in seconds and keep every rupee on-device.',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'canonical', href: 'https://moni.workers.dev' },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    ],
  }),
  shellComponent: RootLayout,
})

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
