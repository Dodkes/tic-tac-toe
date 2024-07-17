import { Link } from "react-router-dom"


export default function HomeButton() {
  return (
	<div className="menuRouteContainer">
		<Link to='/'><button className='menuRouteButton'>HOME</button></Link>
	</div>
  )
}
