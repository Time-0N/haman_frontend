import './App.css'
import {HamanGame} from "./HamanGame.ts";
import {useEffect, useState} from "react";
import HamanStartGame from "./HamanStartGame.tsx";
import HamanGameLoop from "./HamanGameLoop.tsx";
import axios from "axios";

function App() {

    const [gameState, setGameState] = useState<HamanGame>({
        gameIsRunning: false,
        gameResult: "RUNNING",
        correctLetters: [],
        guessedLetters: [],
        errors: 0
    })

    function fetchGameState() {
        axios.get("/haman/getHaman")
            .then(response => {
                const newGameState = response.data
                console.log(response.data)
                newGameState.correctLetters = newGameState.correctLetters.split("")
                setGameState(newGameState)
            })
    }

    useEffect(fetchGameState, [])

    const changeGameState = (key: string, value: string | number | string[] | boolean) => {
        const newValues: HamanGame = {
            ...gameState,
            [key]: value,
        }

        setGameState(newValues);
    }

    return (
        <>
            <div>
            {gameState.gameIsRunning ? <HamanGameLoop hangmanGame={gameState} changeHangmanGame={changeGameState}/> : <HamanStartGame changeHangmanGame={changeGameState} />}
            </div>
        </>
    )
}

export default App
