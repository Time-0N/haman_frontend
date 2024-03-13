import {useState} from "react";
import axios from "axios";
import {HangmanRunningGameProps} from "./HamanGame.ts";
import {Guess} from "./Guess.ts";

export default function HamanGameLoop(props: HangmanRunningGameProps) {

    const [input, setInput] = useState<Guess>({
        guess: ""
    });
    const [correctLetters, setCorrectLetters] = useState<string[]>(props.hangmanGame.correctLetters)

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        axios.post("/haman/guessWord", input)
            .then((response) => {
                props.changeHangmanGame("correctLetters", response.data.correctLetters)
                props.changeHangmanGame("errors", response.data.errors)
                setCorrectLetters(response.data.correctLetters.split(""))
            })
    }


    return (
        <>
            <div>
                {correctLetters.map((letter, index) => (
                    <span key={index}>{letter}</span>
                ))}
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <input type={"text"} maxLength={1} placeholder={"Enter a character..."} onChange={(event) => {
                        setInput({guess: event.target.value});
                    }}/>
                    <input type={"submit"} value={"submit"}/>
                </form>
            </div>
        </>
    )

}