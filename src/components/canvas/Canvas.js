import React, {useEffect, useRef} from 'react';
import {fabric} from "fabric";

const Canvas = ({setCanvas}) => {
    useEffect(() => {
        setCanvas(initCanvas());
    }, []);
    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            height: 500,
            width: 500
        })
    )
    return <canvas id='canvas'/>
};

export default Canvas;