// __tests__/Footer.spec.tsx

import { render, screen } from '@testing-library/react'
import Footer from '@/app/_components/Footer'
import '@testing-library/jest-dom'


jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || 'mocked image'} />
  },
}))

describe('Footer component', () => {
  it('renders logo and company name', () => {
    render(<Footer />)
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument()
    expect(screen.getByText(/Home Vault/i)).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<Footer />)
    expect(screen.getByText(/support@pedia.mn/i)).toBeInTheDocument()
    expect(screen.getByText(/\+976 \(11\) 123-4567/)).toBeInTheDocument()
    expect(screen.getByText(/Available 24\/7/)).toBeInTheDocument()
  })

  it('renders social media icons', () => {
    render(<Footer />)
    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(1)
  })

  it('renders copyright text', () => {
    render(<Footer />)
    expect(
      screen.getByText(/© 2024 Booking Mongolia. All Rights Reserved./i)
    ).toBeInTheDocument()
  })
})
