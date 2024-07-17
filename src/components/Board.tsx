import { MouseEventHandler, useContext } from 'react'
import { BoardContext, PlayersContext } from '../Contexts'
import { useTranslation } from 'react-i18next'

export default function Board() {
const {players, setPlayers} = useContext(PlayersContext)
const {squares, setSquares} = useContext(BoardContext)
const {t} = useTranslation()

function resetGame () {
	setSquares({
		squareArray: Array(9).fill(null),
		xIsNext: true
	})
  }

function GameButton () {
	return ( <button className='playAgainButton' onClick={resetGame}>{t('playButton')}</button> )
}

function handleClick (i: number) {
	const newSquares = [...squares.squareArray]
    if (squares.squareArray[i] && !getDraw(squares.squareArray)) return
	if (getWinner(squares.squareArray)) return
	if (getDraw(squares.squareArray)) return

	newSquares[i] = squares.xIsNext ? 'X' : 'O'
	setSquares({
		squareArray: newSquares,
		xIsNext: !squares.xIsNext
	})

	const winner = getWinner(newSquares)

	if (typeof(winner) !== 'string') {
		return 
	} else {
		const winnerIndex = players.findIndex(player => player.role === winner)
		const loserIndex = players.findIndex(player => player.role !== winner)
		const updatePlayers = [...players]
		updatePlayers[winnerIndex].score += 1
		updatePlayers[loserIndex].score -= 1
		setPlayers(updatePlayers)
	}
}

const winner = getWinner(squares.squareArray)
const draw = getDraw(squares.squareArray)
let status

if (winner) { status = `${t('winner')}: ${winner}`
} else if (draw) { status = `${t('draw')}`
} else { status =  `${t('turn')}: ${(squares.xIsNext ? 'X' : 'O')}` }

  return (
	<div>
		<div className='playButtonContainer'>
			{ (winner || draw) && <GameButton /> }
		</div>
		<h3 className='nextTurnHeading'> {status}</h3>
		<div className='boardContainer'>
			{
				squares.squareArray.map((value: number, index: number) => (
					<Square key={index} handleClick={() => handleClick(index)} value={value}/>
				))
			}
		</div>
	</div>
  )
}

function Square (props: {handleClick: MouseEventHandler<HTMLDivElement>, value: number}) {
	return (
		<div className='square' onClick={props.handleClick} >{props.value} </div>
	)
}

function getWinner(squares: number[]) {
	const winningPositions = [
	  [0, 1, 2],
	  [3, 4, 5],
	  [6, 7, 8],
	  [0, 3, 6],
	  [1, 4, 7],
	  [2, 5, 8],
	  [0, 4, 8],
	  [2, 4, 6],
	]
	for (let i = 0; i < winningPositions.length; i++) {
	  const [a, b, c] = winningPositions[i]
	  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
		return squares[a]
	  }
	}
	return null
  }

  function getDraw (squares: number[]) {
	const array = squares.every(item => item !== null)
	return array
  }