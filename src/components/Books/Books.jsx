import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const Books = ({ allBooks, user, reservations, setReservations }) => {
	const navigate = useNavigate()

	const searchForBooks = (formData) => {
		const target = formData.get("searchBar").toLowerCase()
		if (target !== "") {
			// console.log("target:", target)
			navigate(`/books/search/?book=${target}`)
		}
	}

	const makeReservation = async (book) => {
		console.log("Make a Reservation!", book.id)
		const reservation = {
			bookId: book.id
		}
		try {
			const { data } = await axios.post("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations", reservation, {
				headers: {
					"Authorization": `Bearer ${window.localStorage.getItem("token")}`
				}
			})
			console.log(data)
		} catch (error) {

		}
		// makeReservation(window.localStorage.getItem("token"))
	}

	return (
		<div>
			<h3>Search for a book title:</h3>
			<form action={searchForBooks}>
				<input type="text" name="searchBar" defaultValue="" />
				<button>Search</button>
			</form>
			<div className="booksContainer">
				{
					allBooks.map((book) => {
						return (
							<div className="book" key={book.id}>
								<Link to={`/books/${book.id}`} key={book.id}>
									<div>
										<h3>{book.title}</h3>
										<p>By: {book.author}</p>
										<img className="bookImage" src={book.coverimage} />
									</div>
								</Link>
								{book.available ? (
									<>
										<span className="isAvailable">Available</span>
										{
											user.id ? (
												<button onClick={() => { makeReservation(book) }}>Reserve</button>
											) : (
												<p>Login to Reserve</p>
											)
										}
									</>
								) : (
									<span className="notAvailable">Currently Not Available</span>
								)}
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export default Books