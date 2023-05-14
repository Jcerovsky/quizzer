import React, {useState} from 'react'
import Quiz from "./Quiz";

export default function MainPage() {
    const [started, setStarted] = useState(false)

    
    function handleClick() {
        setStarted(true)
    }

    if (started) {
        return <Quiz/>
    }

    return (
        <div className="quizzler">
            <h1 className="quizzler-title">Quizzler</h1>
            <p className="quizzler-text">Test how quick your brain is!</p>
            <button className='start-btn btn' onClick={handleClick}>Start quiz</button>
        </div>
    )
}