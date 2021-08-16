import React, {useEffect, useRef} from 'react';

const Canvas = () => {
    const canvasRef = useRef(null)
    const width = '100%'
    const height = 500

    const setRect = (x, y, w, h) => {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    const draw = ctx => {
        ctx.fillStyle = '#985D5D'
        ctx.strikeStyle = '#E6FF00'
        ctx.lineHeight = 3
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        canvas.height = height
        canvas.style.backgroundColor = '#c7c7c7'

        draw(context)
    }, [draw])

    return <canvas style={{width}} ref={canvasRef}/>
};

export default Canvas;