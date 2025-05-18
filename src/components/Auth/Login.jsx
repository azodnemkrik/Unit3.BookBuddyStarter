import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = ({ authenticate }) => {

	const navigate = useNavigate()

	const login = async (formData) => {
		const email = formData.get("email")
		const password = formData.get("password")
		const user = {
			email,
			password,
		}
		try {
			const data = await axios.post("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login", user)
			console.log("\nLogin.jsx - token added to local storage, then PULLED from local storage, then sent to App.jsx:", data.data.token)
			window.localStorage.setItem("token", data.data.token)
			authenticate(window.localStorage.getItem("token"))
		} catch (error) {
			console.log(error.status)
			if(error.status == 401) {
				alert("Your login combination was not found in our database.\nPlease re-check your credentials or create a new account.")
			} else if (error.status == 400){
				alert("Please login using a registered email address and password combination.")
			}
		}
	}

	return (
		<div className="loginContainer">
			<form action={login}>
				<div className="loginBox loginPrompt">
				<h3>Login to access your account.</h3>
					<label>
						Email: <input type="text" name="email" />
					</label><br />
					<label>
						Password: <input type="password" name="password" />
					</label><br />
					<button>Login</button>
				</div>
			</form>
			<h4> or </h4>
			<div className="loginBox createAccountStyle">
				<h3>Create an account.</h3>
				<button onClick={()=>navigate("/register")}>Register Now</button>
			</div>
		</div>
	)
}

export default Login