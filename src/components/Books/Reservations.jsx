import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const Reservations = ({ user, reservations, setReservations }) => {
	const navigate = useNavigate()

	const deleteReservation = async (resID) => {
		try {
			await axios.delete(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${resID}`, {
				headers: {
					"Authorization": `Bearer ${window.localStorage.getItem("token")}`
				}
			})
			setReservations(reservations.filter((reservation) => { reservation.id !== resID }))
			navigate("/reservations")
		} catch (error) {
			console.error(error.message)
		}
	}

	return (
		<>
			{user.id ? (
				<div>
					<h3>{user.firstname}'s Reservations</h3>
					<div className="booksContainer">
						{
							reservations.map((reservation) => {
								return (
									<div className="book" key={reservation.id}>
										<h3 className="reservationID">Reservation: #{reservation.id}</h3>
										<div key={reservation.id}>
											<Link to={`/books/${reservation.bookid}`}>
												<div>
													<h3>{reservation.title}</h3>
													<p>By: {reservation.author}</p>
													<img className="bookImage" src={reservation.coverimage} />
												</div>
												<button onClick={() => { deleteReservation(reservation.id) }}>Return this book</button>
											</Link>
										</div>
									</div>
								)
							})
						}
					</div>
				</div>
			) : (
				<h3>User not Logged in.</h3>
			)}
			<hr />
		</>
	)
}

export default Reservations