import React from 'react'

type PiecesProps = {
    pieces: number,
    chooseSizePieces: number,
    setPieces: (value: number) => void,
}
export const ProductPieces = ({ pieces, setPieces, chooseSizePieces }: PiecesProps) => {
    const handlePlus = () => {
        if (chooseSizePieces > pieces) setPieces(pieces + 1)
    }
    const handleMinus = () => {
        if (pieces > 1) setPieces(pieces - 1)
    }
    return (
        <div className='flex gap-1'>
            <button onClick={handleMinus} className='w-8 h-8 border border-black rounded-full flex justify-center items-center'>-</button>
            <div className='w-8 h-8 flex justify-center items-center'>{pieces}</div>
            <button onClick={handlePlus} className='w-8 h-8 border border-black rounded-full flex justify-center items-center'>+</button>
        </div>
    )
}
