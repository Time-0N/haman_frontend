import {GameResult} from "./GameResult.ts";

export type HangmanGameProps = {
    changeHangmanGame: (key: string, value: string | number | string[] | boolean) => void;
}

export type HangmanRunningGameProps = {
    changeHangmanGame: (key: string, value: string | number | string[] | boolean) => void;
    hangmanGame: HamanGame;
}

export type HamanGame = {
    gameIsRunning: boolean,
    gameResult: GameResult,
    correctLetters: string[],
    guessedLetters: string[],
    errors: number,
}