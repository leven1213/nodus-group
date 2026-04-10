import React from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './styles.css'

export const metadata = {
  title: 'Nodus Build — Commercial Fitouts in Melbourne',
  description:
    'Nodus Build designs and delivers fitouts built to perform from day one, and built to last.',
}

export default async function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Nav />
        <main
          style={{
            position: 'relative',
            zIndex: 1,
            background: 'var(--color-white)',
            marginBottom: '100svh',
          }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
