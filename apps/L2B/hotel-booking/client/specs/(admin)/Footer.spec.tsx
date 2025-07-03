import { render, screen } from '@testing-library/react'
import  Footer  from '@/app/(admin)/_components/Footer'
import '@testing-library/jest-dom'

describe('Footer component', () => {
  it('renders the logo link to home', () => {
    render(<Footer />)
    const logo = screen.getByText('Pedia')
    expect(logo).toBeInTheDocument()
    expect(logo.closest('a')).toHaveAttribute('href', '/')
  })

  it('displays the copyright', () => {
    render(<Footer />)
    const copyrightText = screen.getByText('© Copyright 2024')
    expect(copyrightText).toBeInTheDocument()
  })

  it('has the nested circle logo', () => {
    render(<Footer />)
    const outerCircle = screen.getByRole('presentation', { hidden: true })
    expect(outerCircle).toBeInTheDocument()
  })
})