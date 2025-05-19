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
		console.log(`Attempting to reserve book #${book.id}`)
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
			setReservations([...reservations, data])
			navigate("/books")
		} catch (error) {
			console.error(error)
		}
	}

	const checkReservation = (bookid) => {
		return reservations.find((reservation) => {
			return reservation.bookid === bookid
		})
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
												null
											)
										}
									</>
								) : (
									<>{
										checkReservation(book.id) ? (
										<span className="notAvailable">Currently in your <Link className="isAvailable" to="/reservations">Reservations</Link></span>
										):(
										<span className="notAvailable">Currently Not Available</span>
										)
									}</>)
								}
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export default Books