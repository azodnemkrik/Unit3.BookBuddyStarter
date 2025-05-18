import { Link } from "react-router-dom"

const Navigation = ({ user , pathname }) => {
	return (
		<nav>
			<Link to="/" className={ pathname === "/" ? "selected" : ""}>Home</Link>
			<Link to="/books" className={ pathname === "/books" ? "selected" : ""}>Books</Link>
			{user.id ? (
				<>
					<p><Link to="/reservations" className={ pathname === "/reservations" ? "selected" : ""}>Reservations</Link></p>
					<p><Link to="/account" className={ pathname === "/account" ? "selected" : ""}>Account</Link></p>
				</>
				) : (
				<>
					<p className="requiresLogin">Reservations</p>
					<p className="requiresLogin">Account</p>
				</>
				)
			}
		</nav>
	)
}

export default Navigation