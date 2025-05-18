import { Link, useNavigate, useParams } from "react-router-dom"

const SingleBook = ({ allBooks, setAllBooks }) => {
	const params = useParams()
	const id = params.id * 1
	console.log("id:", id)

	const navigate = useNavigate()

	const book = allBooks.find((book) => {
		return book.id === id
	})
	console.log("book:", book)

	const backToLibrary = () => {
		navigate("/books")
	}

	return (
		<div className="singleBookContainer">
			<div className="singleBookLayout">
				<div className="singleBookLeft">
					<img className="bookImage" src={book.coverimage} />
				</div>
				<div className="singleBookRight">
					<h2>{book.title}</h2>
					<h3>By: {book.author}</h3>
					<p className="description">{book.description}</p>
					<h4>Current Status: {book.available ? (<span className="isAvailable">Available</span>) : (<span className="notAvailable">Currently Not Available</span>)} </h4>
				</div>
			</div>
			<button onClick={() => backToLibrary()}>Back to Library</button>
		</div>
	)
}
		
export default SingleBook