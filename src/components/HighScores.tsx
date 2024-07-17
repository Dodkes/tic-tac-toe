import { useEffect, useRef, useContext } from "react"
import { PlayersContext, Player, HighScoresContext } from '../Contexts'
import { useTranslation } from 'react-i18next'

export default function HighScores({instance} : any) {
	const {players, setPlayers} = useContext(PlayersContext)
	const {t} = useTranslation()
	const {removedIndexes, setRemovedIndexes, pictures, setPicture, highScores, setHighScores} = useContext(HighScoresContext)
	const addPlayerInput = useRef<HTMLInputElement>(null)
	const isMountedAPI = useRef<boolean>(true)

	async function fetchData() {
		try {
			const pictureArray: string[] = []
			const response = await fetch(`https://randomuser.me/api/?results=2${highScores.length}`)
			const jsonData = await response.json()
	
			jsonData.results.forEach((item: { picture: { medium: string } }) => {
				const picture = item.picture.medium
				pictureArray.push(picture)
			})
			setPicture(pictureArray)
		} catch (error) {
			console.log('Fetching data failed:', error)
		}
	}

    function deleteProfile(index: number) {
		if (players.includes(highScores[index])) return
        const newArray = [...highScores]
		const newPicture = [...pictures]
        newArray.splice(index, 1)
		newPicture.splice(index, 1)
		setPicture(newPicture)
        setHighScores(newArray)
        setRemovedIndexes([...removedIndexes, index])
		localStorage.setItem(instance, JSON.stringify(newArray))
    }

	function selectProfile(index: number, role: string) {
		const selectedPlayer = highScores[index]
		if (players.includes(selectedPlayer)) {
			return
		}
		let playerIndex = players.findIndex((item) => {
			return item.role === role
		})
		const updatePlayers = [...players]
		updatePlayers[playerIndex] = selectedPlayer
		selectedPlayer.role = role
		setPlayers(updatePlayers)
	}
	
	function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
		event?.preventDefault()
		if (!addPlayerInput.current) return
		const playerName = addPlayerInput.current.value
		const newPlayer: Player = {
			name: playerName,
			role: 'X',
			score: 0
		}
		const array = [...highScores]
		const getPlayerMatch = array.findIndex((item: any) => item.name === playerName)
		if (getPlayerMatch !== -1) return
		array.push(newPlayer)
		setHighScores(array)
	}

	function AddPlayer () {
		return(<>
			<form className="addPlayerForm" onSubmit={handleSubmit}>	
				<label>Add Player: </label>
				<input
					id="addPlayerInput"
					type="text"
					required
					placeholder="Player name"
					ref={addPlayerInput}
				/>
				<button 
					id="addPlayerButton" 
					type="submit">
					Add
				</button>
			</form>
		</>)
	}

	useEffect(() => {
		if (isMountedAPI.current) {
			fetchData()
			isMountedAPI.current = false
		}
	},[])

    return (
        <div>
            <h3>High Scores</h3>
            <table className="scoreTable">
                <thead>
                    <tr>
						<th>{`${t('play')} X`}</th>
						<th>{`${t('play')} O`}</th>
						<th>{t('photo')}</th>
                        <th>{t('player')}</th>
                        <th>Score</th>
                        <th>{`${t('delete')} ${t('profile')}`}</th>
                    </tr>
                </thead>
                <tbody>
                    {highScores.map((value, index) => (
                        <tr key={index}>
							<td onClick={() => selectProfile(index, 'X')} className="select">{t('select')} X</td>
							<td onClick={() => selectProfile(index, 'O')} className="select">{t('select')} O</td>
							<td><img className="profilePicture" src={pictures[index]} alt="picture" /></td>
                            <td>{value.name}</td>
                            <td><b>{value.score}</b></td>
                            <td onClick={() => deleteProfile(index)} className="delete">{t('delete')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
			<AddPlayer />
        </div>
    )
}