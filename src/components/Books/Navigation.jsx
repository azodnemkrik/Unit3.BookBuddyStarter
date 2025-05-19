import { Link } from "react-router-dom"

const Navigation = ({ user , pathname }) => {
	return (
		<nav>
			<p><Link to="/" className={ pathname === "/" ? "selected" : ""}>Home</Link></p>
			<p><Link to="/books" className={ pathname === "/books" ? "selected" : ""}>Books</Link></p>
			{user.id ? (
				<>
					<p><Link to="/reservations" className={ pathname === "/reservations" ? "selected" : ""}>Reservations</Link></p>
					<p><Link to={`/account/${user.id}`} className={ pathname === "/account" ? "selected" : ""}>Account</Link></p>
				</>
				) : (
				<>
					<p className="requiresLogin" alt="Requires Login">Reservations</p>
					<p className="requiresLogin" alt="Requires Login">Account</p>
				</>
				)
			}
		</nav>
	)
}

export default Navigation