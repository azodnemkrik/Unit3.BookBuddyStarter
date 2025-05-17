import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"

const Search = ({ allBooks }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchResults, setSearchResults] = useState([])
    const navigate = useNavigate()

    const nameSearch = searchParams.get("book").toLowerCase()
    console.log("nameSearch", nameSearch)

    useEffect(() => {
        const result = allBooks.filter((book) => {
            return book.title.toLowerCase().includes(nameSearch)
        })
        console.log("result", result)
        setSearchResults(result)
    }, [allBooks])


    const clearSearch = () => {
        console.log("clearSearch")
        setSearchResults([])
        navigate("/books")
    }

    return (
        <div>
            <h3>Search Results for "<span className="nameSearch">{nameSearch}</span>":</h3>
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
                                {
                                    book.available ? (
                                        // <span className="isAvailable">Available</span>
                                        <button onClick={() => checkOutBook()}>Checkout Book</button>
                                    ) : (
                                        <span className="notAvailable">Currently Not Available</span>)
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