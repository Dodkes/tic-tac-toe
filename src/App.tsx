import { useEffect, useRef, useState } from 'react'
import './style.scss'
import ProfileForm from './components/ProfileForm'
import Game from './components/Game'
import Menu from './Menu'
import { Player, FormContext, HighScoresContext, PlayersContext, BoardContext } from './Contexts'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

function App() {
	const [formSubmit, setFormSubmit] = useState<boolean>(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const [players , setPlayers] = useState<Player[]>([])
	const {t} = useTranslation()
	const [nameOne, setNameOne] = useState('')
	const [nameTwo, setNameTwo] = useState('')
	const [playerOneRole, setPlayerOneRole] = useState('O')
	const [playerTwoRole, setPlayerTwoRole] = useState('X')
	const [squares, setSquares] = useState({
		squareArray: Array(9).fill(null),
		xIsNext: true
	})
    const [removedIndexes, setRemovedIndexes] = useState<number[]>([])
	const [pictures, setPicture] = useState<string[]>([])
	const [instance, setInstance] = useState('')
	const LS = localStorage.getItem(instance)
	let initialHighScores 
	if (LS) {initialHighScores = JSON.parse(LS)} else {initialHighScores = []}
    const [highScores, setHighScores] = useState<Player[]>(initialHighScores)

	useEffect(() => {
		if (players[0] === undefined || players[1] === undefined) return
		const getPlayerOneIndex = highScores.findIndex(player => player.name === players[0].name)
		const getPlayerTwoIndex = highScores.findIndex(player => player.name === players[1].name)
			const HS = [...highScores]
			if (getPlayerOneIndex !== -1 && players[0] !== undefined) {
				HS[getPlayerOneIndex] = players[0]
			} 
			if (getPlayerTwoIndex !== -1 && players[1] !== undefined) {
				HS[getPlayerTwoIndex] = players[1]
			} 
			setHighScores(HS)
		localStorage.setItem(instance, JSON.stringify(HS))
	}, [players])

	useEffect(() => {
		(playerOneRole === 'O') 
			? setPlayerTwoRole('X') 
			: setPlayerTwoRole('O')
	}, [playerOneRole])
	
	
	useEffect(() => {
		(playerTwoRole === 'O') 
			? setPlayerOneRole('X') 
			: setPlayerOneRole('O')
	}, [playerTwoRole])

	useEffect(() => {
		i18next.changeLanguage(navigator.language)
	}, [])

	function submitPlayersForm (value: boolean, players: Player[]) {
		setFormSubmit(value)
		setPlayers(players)
	}

	return (
		<>
			<div className='dropdown'>
				<button className='dropdownButton' onClick={() => dropdownRef.current?.classList.toggle('show')}>{t('language')}</button>
				<div className='languageContent' ref={dropdownRef}>
					<button onClick={() => i18next.changeLanguage('en')}>{t('en')}</button>
					<button onClick={() => i18next.changeLanguage('sk')}>{t('sk')}</button>
				</div>
			</div>
			<HighScoresContext.Provider 
			value={{
				removedIndexes, 
				setRemovedIndexes, 
				pictures, 
				setPicture,
				highScores,
				setHighScores
				}}>
				<BoardContext.Provider 
				value={{
					squares, 
					setSquares
					}}>
					<FormContext.Provider 
					value={{
						nameOne, 
						setNameOne, 
						nameTwo, 
						setNameTwo, 
						submitPlayersForm, 
						playerOneRole, 
						setPlayerOneRole, 
						playerTwoRole, 
						setPlayerTwoRole,
						setHighScores
						}}>
							<PlayersContext.Provider 
							value={{
								players, 
								setPlayers,
								setInstance,
								setFormSubmit
								}}>
									<Router>
										<Routes>
												<Route path='/' element={<Menu />}/>
												<Route path='/instance1' element={formSubmit ? <Game instance={'instance1'}/> : <ProfileForm instance={'instance1'}/>} />
												<Route path='/instance2' element={formSubmit ? <Game instance={'instance2'}/> : <ProfileForm instance={'instance2'}/>} />
										</Routes>
									</Router>
							</PlayersContext.Provider>
					</FormContext.Provider>
				</BoardContext.Provider>
			</HighScoresContext.Provider>
		</>
	)
}

export default App