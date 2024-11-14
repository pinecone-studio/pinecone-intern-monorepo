import { SvgCircle, SvgPedia } from '@/components/svgs/Svgs';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe("Export svgs", () => {
    it("should render the svg pedia", () => {
        render(<SvgPedia />)
    })

    it("should render the svg circle", () => {
        render(<SvgCircle />)
    })
})