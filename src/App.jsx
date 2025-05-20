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
import Navigation from "./components/Books/Navigation"
import Reservations from "./components/Books/Reservations"
import Home from "./components/Auth/Home"

function App() {
	const [allBooks, setAllBooks] = useState([])
	const [searchResults, setSearchResults] = useState([])
	const [user, setUser] = useState({})
	const [reservations, setReservations] = useState([])

	const navigate = useNavigate()
	const location = useLocation()
	const { pathname } = location


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
	}, [reservations.length])




	// Authentication
	const authenticate = async (token) => {
		// console.log(authenticate(`${token}`))
		try {
			if (!token) {
				throw Error("No token found!")
			}
			const response = await axios.get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			// console.log("Authenticate response:", response.data)
			setUser(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		const loggedInToken = window.localStorage.getItem("token")
		if (loggedInToken) {
			authenticate(loggedInToken)
		}
	}, [user.id, reservations.length])

	// Reservations
	useEffect(() => {
		const fetchReservations = async (token) => {
			try {
				const { data } = await axios.get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations", {
					headers: {
						"Authorization": `Bearer ${token}`
					}
				})
				console.log("reservations:", data)
				setReservations(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchReservations(window.localStorage.getItem("token"))
	}, [user.id, reservations.length])


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
			// console.log("pathname:", pathname)
			navigate(pathname)
		} catch (error) {
			console.error(error)
		}
	}

	const checkReservation = (bookid) => {
		if (user.id) {
			return reservations.find((reservation) => {
				return reservation.bookid === bookid
			})
		}
	}


	// Displayed Items	
	return (
		<div>
			<h1>Book Buddy - The Library App</h1>
			<Navigation user={user} pathname={pathname} />
			{
				location.pathname === "/register" ? (
					null
				) : (
					<div>
						{
							location.pathname === "/" ? (
								null
							) : (
								user.id ? (
									<Welcome user={user} setUser={setUser} />
								) : (
									<Login authenticate={authenticate} />
								)
							)
						}
						<hr />
					</div>
				)
			}


			<Routes>
				<Route path="/" element={<Home allBooks={allBooks} user={user} />} />
				<Route path="/books" element={<Books allBooks={allBooks} user={user} reservations={reservations} setReservations={setReservations} searchForBooks={searchForBooks} makeReservation={makeReservation} checkReservation={checkReservation} />} />
				<Route path="/books/:id" element={<SingleBook allBooks={allBooks} setAllBooks={setAllBooks} searchResults={searchResults} user={user} makeReservation={makeReservation} checkReservation={checkReservation} />} />
				<Route path="/books/search/?" element={<Search allBooks={allBooks} searchResults={searchResults} setSearchResults={setSearchResults} />} />
				<Route path="/register" element={<Register />} />
				<Route path="/reservations" element={<Reservations user={user} reservations={reservations} setReservations={setReservations} />} />
				<Route path="/account/:id" element={<Account user={user} />} />
			</Routes>
		</div>
	)
}

export default App