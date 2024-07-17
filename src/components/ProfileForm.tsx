import { SetStateAction, useContext } from "react"
import { FormContext } from "../Contexts"
import { useTranslation } from 'react-i18next'
import HomeButton from "../HomeButton"

export default function ProfileForm({instance}: any) {
const {
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
	} = useContext(FormContext)
	
const {t} = useTranslation()

function valueCheck (value: string, setValue: React.Dispatch<React.SetStateAction<string>>) {
		if (value.trim() === '') return setValue('')
		let lastChar = value[value.length - 1]
		let secondLastChar = value[value.length - 2]
		if (lastChar === ' ' && secondLastChar === ' ') return
		setValue(value)
}

const [minSymbolLimit, maxSymbolLimit]:number[] = [3, 15]

function PlayerOneAnnotation () {
	if (nameOne.length < 3) return <div className="formAnnotation">{t('player1MinSymbol' )} {minSymbolLimit} {t('symbol')}</div>
	if (nameOne.length > 15) return <div className="formAnnotation">{t('player1MaxSymbol')} {nameOne.length} / {maxSymbolLimit} {t('symbol')}</div>
	if (nameOne === nameTwo) return <div className="formAnnotation">{t('playerMatch')}</div>
}

function PlayerTwoAnnotation () {
	if (nameTwo.length < 3) return <div className="formAnnotation">{t('player2MinSymbol')} {minSymbolLimit} {t('symbol')}</div>
	if (nameTwo.length > 15) return <div className="formAnnotation">{t('player1MaxSymbol')} {nameTwo.length} / {maxSymbolLimit} {t('symbol')}</div>
	if (nameTwo === nameOne) return <div className="formAnnotation">{t('playerMatch')}</div>
}

function handleOptionChange (event: { target: { value: SetStateAction<string>, name: SetStateAction<string>, checked: SetStateAction<boolean> } }) {
	event.target.name === 'playerOneSymbol' 
		? setPlayerOneRole(event.target.value)
		: setPlayerTwoRole(event.target.value)
}

function handleSubmit (event: { preventDefault: () => void }) {
	event.preventDefault()

	if (nameOne.length >= minSymbolLimit && 
		nameOne.length <= maxSymbolLimit && 
		nameTwo.length >= minSymbolLimit && 
		nameTwo.length <= maxSymbolLimit &&
		nameOne !== nameTwo) {
			const players = [
				{
					name: nameOne,
					role: playerOneRole,
					score: 0
				},
				{
					name: nameTwo,
					role: playerTwoRole,
					score: 0
				}
			]
			const LS = localStorage.getItem(instance)
			if (!LS) {
				localStorage.setItem(instance, JSON.stringify(players))
				setHighScores(players)
			} else {
				const data = JSON.parse(LS)
				const getPlayerOneIndex = data.findIndex((item: any) => item.name === nameOne)
				const getPlayerTwoIndex = data.findIndex((item: any) => item.name === nameTwo)
				getPlayerOneIndex !== -1 ? players[0].score = data[getPlayerOneIndex].score : data.push(players[0])
				getPlayerTwoIndex !== -1 ? players[1].score = data[getPlayerTwoIndex].score : data.push(players[1])
				setHighScores(data)
				localStorage.setItem(instance, JSON.stringify(data))
			}
			submitPlayersForm(true, players)
	} 
}

  return (
	<div className="profileForm">
		<HomeButton />
		<h2>{t('gameName')}</h2>
		<form onSubmit={handleSubmit}>
			<label >{t('player1')}:</label><br />
			<input 
				type="radio"
				name="playerOneSymbol"
				value="O"
				checked={playerOneRole === 'O'}
				onChange={handleOptionChange}
			/>
			<label htmlFor="">O</label>
			<input 
				type="radio" 
				name="playerOneSymbol"
				value="X"
				checked={playerOneRole === 'X'}
				onChange={handleOptionChange}
			/>
			<label htmlFor="">X</label>
			<input
				id="playerOneInput"
				type="text"
				required
				placeholder={t('player1Name')}
				value={nameOne}
				onChange={(e) => valueCheck(e.target.value, setNameOne)}
			 />
			 <div className="annotationContainer">
				<PlayerOneAnnotation />
			 </div>
			 <hr />
			<label>{t('player2')}:</label><br />
			<input 
				type="radio" 
				name="playerTwoSymbol"
				value="O"
				checked={playerTwoRole === 'O'}
				onChange={handleOptionChange}
			/>
			<label htmlFor="">O</label>
			<input 
				type="radio" 
				name="playerTwoSymbol"
				value="X"
				checked={playerTwoRole === 'X'}
				onChange={handleOptionChange}
			/>
			<label htmlFor="">X</label>
			<input 
				id="playerTwoInput"
				type="text"
				required
				placeholder={t('player2Name')}
				value={nameTwo}
				onChange={(e) => valueCheck(e.target.value, setNameTwo)}
			 />
			<div className="annotationContainer">
				<PlayerTwoAnnotation />
			</div>
			 <button type="submit">{t('submit')}</button>
		</form>
	</div>
  )
}