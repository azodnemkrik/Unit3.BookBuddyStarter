import { Link, useNavigate } from "react-router-dom"

const Books = ({ allBooks }) => {

	const navigate = useNavigate()

	const searchForBooks = (formData) => {
		const target = formData.get("searchBar").toLowerCase()
		if(target !== ""){
			console.log("target:", target)
			navigate(`/books/search/?book=${target}`)
		}
	}

	const checkOutBook = () => {
		console.log("Check it out!")
	}

	return (
		<div>
			<h3>Search for a book title:</h3>
			<form action={searchForBooks}>
				<input type="text" name="searchBar"  defaultValue=""/>
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
										<img className="bookImage" src={book.coverimage}/>
									</div>
								</Link>
								{
									book.available ? (
										// <span className="isAvailable">Available</span>
										// <button onClick={() => checkOutBook()}>Checkout Book</button>
										<span className="isAvailable">Available</span>
									) : (
										<span className="notAvailable">Currently Not Available</span>
									)
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