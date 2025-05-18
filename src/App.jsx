import { useEffect, useState } from "react"
import Account from "./components/Auth/Account"
import Books from "./components/Books/Books"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import SingleBook from "./components/Books/SingleBook"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import Search from "./components/Books/Search"
import Welcome from "./components/Auth/Welcome"


function App() {
	const [allBooks, setAllBooks] = useState([])
	const [searchResults, setSearchResults] = useState([])
	const [user, setUser] = useState({})

	const navigate = useNavigate()
	const location = useLocation()


	// Retrieve Books
	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const { data } = await axios.get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
				// console.log(data)
				setAllBooks(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchBooks()
	}, [])


	// Authentication
	const authenticate = async (token) => {
		console.log("\nApp.jsx - 'authenticate' function received the token:", token)
		console.log("\n")
		try {
			if(!token) {
				throw Error("No token found!")				
			}
			const response = await axios.get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login" , {
				headers: {
					"Authorization" : `Bearer ${token}`
				}
			})
			console.log("Authenticate response:", response)
			// setUser(response)

		} catch (error) {
			console.error(error)
		}

	}
	
	useEffect(()=>{
		const loggedInToken = window.localStorage.getItem("token")
		if(loggedInToken) {
			authenticate(loggedInToken)
		}
	}, [user.id])


	// Displayed Items	
	return (
		<div>
			<h1>The Library App</h1>
			{
				location.pathname === "/register" ? (
					null
				) : (
					<div>
						{
							user.id ? 
								<Welcome user={user} setUser={setUser} />
							 : (
								<Login authenticate={authenticate}/>
							)
						}
						<hr />
					</div>
				)
			}

			<Routes>
				<Route path="/" element={<Books allBooks={allBooks} />} />
				<Route path="/books" element={<Books allBooks={allBooks} />} />
				<Route path="/books/:id" element={<SingleBook allBooks={allBooks} setAllBooks={setAllBooks} searchResults={searchResults} />} />
				<Route path="/books/search/?" element={<Search allBooks={allBooks} searchResults={searchResults} setSearchResults={setSearchResults} />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	)
}

export default App