import React, {useState} from "react";
import Canvas from "./components/canvas/Canvas";
import './App.css'

function App() {
    const [drag, setDrag] = useState();
    const onDragStartHandler = e => {
        // console.log(e.currentTarget,'_+_+_+_+_')
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
        if (type === 'rect') {
            console.log('add rect')
        }
        if (type === 'ellipse') {
            console.log('add ellipse')
        }
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
                {drag
                    ? <div onDragStart={onDragStartHandler}
                           onDragLeave={onDragLeaveHandler}
                           onDragOver={onDragStartHandler}
                           onDrop={onDropHandler}
                           className='canvasDropWrapper'
                    >
                        <Canvas/>
                    </div>
                    : <div onDragStart={onDragStartHandler}
                           onDragLeave={onDragLeaveHandler}
                           onDragOver={onDragStartHandler}
                           className='canvasWrapper'
                    >
                        <Canvas/>
                    </div>
                }

            </div>
        </div>

    );
}

export default App;
