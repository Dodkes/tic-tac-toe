import { useContext } from 'react'
import { PlayersContext } from '../Contexts'
import Board from './Board'
import HighScores from './HighScores'
import { useTranslation } from 'react-i18next'
import HomeButton from '../HomeButton'

export default function Game({instance}: any) {
	const {t} = useTranslation()
	const {players} = useContext(PlayersContext)

  return (
	<div className='gameContainer'>
		<div className='board'>
		<HomeButton />
			<Board />
		</div>
		<div className='scoreBoard'>
			<h3>{t('scoreBoard')}</h3>
			<table className='scoreTable'>
				<thead>
					<tr>
						<th>{t('role')}</th>
						<th>{t('player')}</th>
						<th>{t('score')}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className='role'>{players[0].role}</td>
						<td className='role'>{players[0].name}</td>
						<td>{players[0].score}</td>
					</tr>
					<tr>
						<td className='role'>{players[1].role}</td>
						<td className='role'>{players[1].name}</td>
						<td>{players[1].score}</td>
					</tr>
				</tbody>
		</table>
			<HighScores instance={instance}/>
		</div>
	</div>
  )
}