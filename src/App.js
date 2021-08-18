import React, {useEffect, useState} from "react";
import './App.css'
import {fabric} from 'fabric'

function App() {
    const [drag, setDrag] = useState()
    const [canvas, setCanvas] = useState('')

    useEffect(() => {
        setCanvas(initCanvas());
        window.addEventListener('keypress', deleteElement)
        return () => window.removeEventListener('keypress', deleteElement);
    }, [])

    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            height: 500,
            width: 500
        })
    )

    const onDragStartHandler = e => {
        e.preventDefault()
        setDrag(true)
    }
    const onDragLeaveHandler = e => {
        e.preventDefault()
        setDrag(false)
    }
    const onDropHandler = e => {
        const droppedElement = e.currentTarget.getAttribute('id')
        e.preventDefault()
        setDrag(false)
        if (droppedElement) {
            addElementOnCanvas(droppedElement)
        }
    }

    const addElementOnCanvas = type => {
        let element
        if (type === 'rect') {
            element = new fabric.Rect({
                width: 150,
                height: 80,
                fill: '#3265ff',
                stroke: '#152c6f',
            })
        }
        if (type === 'ellipse') {
            element = new fabric.Ellipse({
                rx: 75,
                ry: 40,
                fill: '#54ff32',
                stroke: '#246f15'
            })
        }
        canvas.add(element)
    }

    const deleteElement = e => {
        const key = e.code
        if (key === 'KeyD') {
            const activeObj = canvas.getActiveObject()
            canvas.remove(activeObj)
        }
        // у меня на клавиатуре не работала клавиша Delete, поэтому я поставила обработчик на клавишу D
        // в if условие можно заменить на key === 'Delete'
    }
    if (canvas) {
        let left1 = 0;
        let top1 = 0;
        let scale1x = 0;
        let scale1y = 0;
        let width1 = 0;
        let height1 = 0;

        canvas.on('object:moving', e => {
            let obj = e.target;
            if (obj.height > obj.canvas.height || obj.height > obj.canvas.width) {
                return;
            }
            obj.setCoords();
            if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
                obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
                obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
            }
            if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
                obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
                obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
            }
        });
        canvas.on('object:scaling', e => {
            let obj = e.target;
            obj.setCoords();
            let brNew = obj.getBoundingRect();

            if (((brNew.width + brNew.left) >= obj.canvas.width) || ((brNew.height + brNew.top) >= obj.canvas.height) || ((brNew.left < 0) || (brNew.top < 0))) {
                obj.left = left1;
                obj.top = top1;
                obj.scaleX = scale1x;
                obj.scaleY = scale1y;
                obj.width = width1;
                obj.height = height1;
            } else {
                left1 = obj.left;
                top1 = obj.top;
                scale1x = obj.scaleX;
                scale1y = obj.scaleY;
                width1 = obj.width;
                height1 = obj.height;
            }
        });
    }

    return (
        <div className='mainContainer'>
            <div className='figureContainer'>
                <div className='header'>Figures</div>
                <div className='figuresWrapper'>
                    <div draggable onDragEnd={onDropHandler} id='ellipse' className='figure ellipse'/>
                    <div draggable id='rect' onDragEnd={onDropHandler} className='figure rectangle'/>
                </div>
            </div>
            <div className='canvasContainer'>
                <div className='header'>Canvas</div>
                <div onDragStart={onDragStartHandler}
                     onDragLeave={onDragLeaveHandler}
                     onDragOver={onDragStartHandler}
                     onDrop={onDropHandler}
                     className={drag ? 'canvasDropWrapper' : 'canvasWrapper'}
                >
                    <canvas id='canvas'/>
                </div>
            </div>
        </div>

    )
}

export default App
