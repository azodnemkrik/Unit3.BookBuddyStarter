import { useEffect, useState } from "react"
import Account from "./components/Account"
import Books from "./components/Books"
import Login from "./components/Login"
import Navigations from "./components/Navigations"
import Register from "./components/Register"
import SingleBook from "./components/SingleBook"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import Search from "./components/Search"


function App() {
	const [token, setToken] = useState(null)
	const [ allBooks , setAllBooks ] = useState([])
	const navigate = useNavigate()
	const location = useLocation()


	// Retrieve Books
	useEffect(()=>{
		const fetchBooks = async () => {
			try {
				const { data } = await axios.get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
				console.log(data)
				setAllBooks(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchBooks()
	}, [])


	// Displayed Items	
	return (
		<div>
			<h1>The Library App</h1>
			{
				location.pathname === "/register" ? (
					null
				) : (
					<div>
						<Login/>
						<hr />
					</div>
				)
			}

			<Routes>
				<Route path="/" element={<Books allBooks={allBooks} />} />
				<Route path="/books" element={<Books allBooks={allBooks} />} />
				<Route path="/books/:id" element={<SingleBook allBooks={allBooks} setAllBooks={setAllBooks} />} />
				<Route path="/books/search/?" element={<Search allBooks={allBooks} />} />
				<Route path="/register" element={<Register/>} />
			</Routes>
		</div>
	)
}

export default App


/* <h1><img id='logo-image'/>Library App</h1>

<p>Complete the React components needed to allow users to browse a library catalog, check out books, review their account, and return books that they've finished reading.</p>

<p>You may need to use the `token` in this top-level component in other components that need to know if a user has logged in or not.</p>

<p>Don't forget to set up React Router to navigate between the different views of your single page application!</p> */
