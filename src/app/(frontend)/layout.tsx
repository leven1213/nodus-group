import React from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './styles.css'

export const metadata = {
  title: 'Nodus Group — Commercial Fitouts Melbourne',
  description:
    'Nodus Group designs and delivers fitouts built to perform from day one, and built to last.',
}

export default async function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
