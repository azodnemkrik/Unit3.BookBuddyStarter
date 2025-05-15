import { Link } from "react-router-dom"

const Books = ({ allBooks }) => {

	return (
		<div className="booksContainer">
			{
				allBooks.map((book) => {
					return (
						<Link to={`/books/{book.id}`}>
						<div className="book" key={book.id}>
							<h3>Title: {book.title}</h3>
							<p>Author:{book.author}</p>
							<img src={book.coverimage} />
							{/* <p className="description">{book.description}</p> */}
						</div>
						</Link>
					)
				})
			}
		</div>
	)
}

export default Books