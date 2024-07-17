import { createContext } from "react"

export const FormContext = createContext<any>({})
export const BoardContext = createContext<any>({})
export const PlayersContext = createContext<PlayersContextType>({
	players: [],
	setPlayers: () => {},
	setInstance: () => {},
	setFormSubmit: () => {}
})
export const HighScoresContext = createContext<HighScoresContextType>({
	removedIndexes: [],
	setRemovedIndexes: () => {},
	pictures: [],
	setPicture: () => {},
	highScores: [],
	setHighScores: () => {}
})
interface HighScoresContextType {
	removedIndexes: number[],
	setRemovedIndexes: React.Dispatch<React.SetStateAction<number[]>>,
	pictures: string[],
	setPicture: React.Dispatch<React.SetStateAction<string[]>>,
	highScores: Player[],
    setHighScores: React.Dispatch<React.SetStateAction<Player[]>>
}

interface PlayersContextType {
    players: Player[]
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
	setInstance: React.Dispatch<React.SetStateAction<string>>
	setFormSubmit: React.Dispatch<React.SetStateAction<boolean>>
}
export interface Player {
	name: string,
	role: string,
	score: number
}