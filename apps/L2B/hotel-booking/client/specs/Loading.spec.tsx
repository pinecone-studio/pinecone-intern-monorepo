import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import { act } from "react-dom/test-utils"
import Loading from "@/app/(main)/_components/Loading"

jest.useFakeTimers()

describe("Loading component", () => {
  test("renders logo and loading message", () => {
    render(<Loading />)


    expect(screen.getByText("Pedia")).toBeInTheDocument()


    expect(screen.getByText("Please Wait...")).toBeInTheDocument()
  })

  test("spinner rotates over time", () => {
    render(<Loading />)

    const spinner = document.querySelector("div[style*='rotate']")

    const initialTransform = spinner?.style.transform


    act(() => {
      jest.advanceTimersByTime(150)
    })

    const updatedTransform = spinner?.style.transform

    expect(updatedTransform).not.toBe(initialTransform)
    expect(updatedTransform).toMatch(/rotate\(\d+deg\)/)
  })
})