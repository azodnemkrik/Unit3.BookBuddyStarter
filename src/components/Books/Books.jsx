import { Link, useNavigate } from "react-router-dom"

const Books = ({ allBooks, user }) => {
	const navigate = useNavigate()

	const searchForBooks = (formData) => {
		const target = formData.get("searchBar").toLowerCase()
		if (target !== "") {
			// console.log("target:", target)
			navigate(`/books/search/?book=${target}`)
		}
	}

	const makeReservation = () => {
		console.log("Check it out!")
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
									<span className="isAvailable">Available</span>
								) : (
									<span className="notAvailable">Currently Not Available</span>
								)}
								
								{user.id ? (
									<button onClick={()=>makeReservation()}>Reserve</button>
								) : (
									<p>Login to Reserve</p>
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