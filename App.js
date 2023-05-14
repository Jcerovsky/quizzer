import React, {useState} from "react"
import MainPage from './MainPage'

export default function App() {
    
    return (
        <main>
            <img className="blue-blob" src='images/blob-blue.png'/>
            <img className="yellow-blob" src='images/blob-yellow.png'/>
            <MainPage />
        </main>
    )
}

