import { Link } from "react-router-dom"

const SingleBook = () => {
	return (
		<div className="singleBookComponent">
			<h1>SingleBook Component</h1>
			<Link to="/books">Back to Library</Link>
			<hr />
		</div>
	)
}

export default SingleBook