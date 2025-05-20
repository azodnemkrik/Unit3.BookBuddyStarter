import { Link } from "react-router-dom"
import gsap from "gsap";
import { useGSAP } from '@gsap/react'

const Books = ({ allBooks, user , searchForBooks , makeReservation , checkReservation }) => {

	useGSAP(() => {
		allBooks.length > 0 ? (
			gsap.from(".book", {
				duration:1 , autoAlpha: 0 , rotation:90, scale: 0 , y: 300 , ease: 'power4.inOut' , boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)" , stagger: .05 
			})
		):(
			console.log("Loading...")
		)
	})
	
	// Functions moved to App.jsx

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