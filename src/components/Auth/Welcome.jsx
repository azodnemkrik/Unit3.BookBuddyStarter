import { useNavigate } from "react-router-dom"

const Welcome = ({ user, setUser }) => {
    const navigate = useNavigate()

    const logOut = () => {
        window.localStorage.removeItem("token")
        setUser({})
    }

    return (
        <div>
            <h3>Welcome back, {user.firstname}!</h3>
            <button onClick={() => logOut()}>Log out</button>
        </div>
    )
}

export default Welcome