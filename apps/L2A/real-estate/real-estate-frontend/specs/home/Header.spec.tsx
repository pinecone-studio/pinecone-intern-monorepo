import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom'
import Header from '@/app/_components/Header'

jest.mock('next/image', () => {
    const MockImage = (props: any) => <img {...props} />
    MockImage.displayName = 'MockNextImage'
    return MockImage
  })
  

describe('Header', () => {
  it('renders the logo and brand name', () => {
    render(<Header />)
    expect(screen.getByAltText('logo')).toBeInTheDocument()
    expect(screen.getByText('Home Vault')).toBeInTheDocument()
  })

  it('renders all action buttons', () => {
    render(<Header />)
    expect(screen.getByText('Зар оруулах')).toBeInTheDocument()
    expect(screen.getByText('Бүртгүүлэх')).toBeInTheDocument()
    expect(screen.getByText('Нэвтрэх')).toBeInTheDocument()
  })
})
