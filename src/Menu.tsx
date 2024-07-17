import { useContext } from "react";
import { PlayersContext } from '../src/Contexts'
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Menu() {
	const {setInstance, setFormSubmit} = useContext(PlayersContext)
	const {t} = useTranslation()

	function handleInstance (value: string) {
		setFormSubmit(false)
		setInstance(value)
	}

  return (
	<div>
		<Link to='instance1'>
			<button className="instanceButton1" onClick={() => handleInstance('instance1')}>{t('gameName')} 1</button>
		</Link>
		<Link to='instance2'>
			<button className="instanceButton2" onClick={() => handleInstance('instance2')}>{t('gameName')} 2</button>
		</Link>
	</div>
  )
}
