import { Link } from "react-router-dom"

const Navigation = ({ user }) => {
	return (
		<nav>
			<Link to="/">Home</Link>
			<Link to="/books">Books</Link>
			{user.id ? (
				<>
					<p><Link to="/reservations">Reservations</Link></p>
					<p><Link to="/account">Account</Link></p>
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