import { all } from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"

const SingleBook = ({ allBooks, setAllBooks, user , makeReservation , checkReservation }) => {
	const navigate = useNavigate()
	const params = useParams()
	const id = params.id * 1
	const book = allBooks.find((book) => {
		return book.id === id
	})
	// console.log("book:", book)

	const backToLibrary = () => {
		navigate("/books")
	}

	return (
		<>{!book ? <h2>Loading...</h2> : (

			<div className="singleBookContainer">
				<div className="singleBookLayout">
					<div className="singleBookLeft">
						<img className="bookImage" src={book.coverimage} />
					</div>
					<div className="singleBookRight">
						<h2>{book.title}</h2>
						<h3>By: {book.author}</h3>
						<p className="description">{book.description}</p>
						<h4>Current Status: {book.available ? (
						<>
							<span className="isAvailable">Available</span><br/>
							{ user.id ? (
							<button onClick={() => { makeReservation(book) }}>Reserve</button>
							) : (
								null
							)}
						</>) : (<>{
										checkReservation(book.id) ? (
										<span className="notAvailable">Currently in your <Link className="isAvailable" to="/reservations">Reservations</Link></span>
										):(
										<span className="notAvailable">Currently Not Available</span>
										)
									}
								</>)}
						</h4>
					</div>
				</div>
				<button onClick={() => backToLibrary()}>View all Books</button>
				{
					user.id ?
						<button onClick={() => navigate("/reservations")}>View to your Reservations</button>
						: (
							null
						)
				}
			</div>
		)
		}</>
	)
}

export default SingleBook