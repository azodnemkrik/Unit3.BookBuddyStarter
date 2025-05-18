import { Link } from "react-router-dom"

const Home = ({ user }) => {
    return (
        <div className="homeContainer">
            <h2>Welcome to Book Buddy - The Library App.</h2>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy5UKJvRRjvrOLiP-txPQ7fJjLNQppoTqV3hov6K7e01qEuMXEyVOC60Cs8in9EgomZjA&usqp=CAU" />
            <h3>Come browse our library of books!</h3>
            {
                user.id ? (
                    <>
                    <h3> Glad you're back, {user.firstname}!</h3><h4>Don't forget to check & update your,<br/>book <Link to="/reservations" className="registerNowLink">reservations</Link> or view your <Link to={`/account/${user.id}`} className="registerNowLink">account</Link>!</h4>
                    </>
                ) : (
                    <h4> See one you're interested in?<br/><Link to="/books" className="registerNowLink">Log in</Link> to reserve books!<br/>Not a member? <Link to="/register" className="registerNowLink">Register now</Link>!</h4>
                )
            }
        </div>
    )
}
export default Home