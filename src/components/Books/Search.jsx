import { useEffect } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"

const Search = ({ allBooks, searchResults, setSearchResults , makeReservation , checkReservation , user }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const nameSearch = searchParams.get("book").toLowerCase()

    useEffect(() => {
        const result = allBooks.filter((book) => {
            return book.title.toLowerCase().includes(nameSearch)
        })
        setSearchResults(result)
    }, [allBooks])


    const clearSearch = () => {
        setSearchResults([])
        navigate("/books")
    }

    return (
        <div>
            <h3>Found <span className="nameSearch">{searchResults.length}</span> search results for "<span className="nameSearch">{nameSearch}</span>":</h3>
            <button onClick={() => { clearSearch() }}>Clear Search Results</button>
            <div className="booksContainer">
                {
                    searchResults.map((book) => {
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
                                        ) : (
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

export default Search