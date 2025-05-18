const Reservations = ({ user, reservations }) => {
	return (
		<>
			{user.id ? (
				<div>
					<h3>{user.firstname}'s Reservations</h3>
					{
						reservations.map((reservation) => {
							return (
								<div>
									<h4>Reservation #{reservation.id}</h4>
									<p>bookid {book.bookid}</p>
									<p>title {book.title}</p>
									<p>author {book.author}</p>
									<p>description {book.description}</p>
									<p>coverimage {book.coverimage}</p>
								</div>
							)
						})
					}
				</div>
			) : (
				<h3>User not Logged in.</h3>
			)}			
			<hr />
		</>
	)
}

export default Reservations