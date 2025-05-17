import axios from "axios"

const Login = () => {

	const login = async (formData) => {
		const email = formData.get("email")
		const password = formData.get("password")
		const user = {
			username,
			password
		}
		try {
			const data = await axios.post("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login")
			console.log("data:", data)
		} catch (error) {
			console.error("error:", error)
		}
	}

	return (
		<div className="loginContainer">
			<form>
				<div className="loginBox loginPrompt">
				<h3>Login to access your account.</h3>
					<label>
						Email: <input type="text" name="email" />
					</label><br />
					<label>
						Password: <input type="text" name="password" />
					</label><br />
					<button>Login</button>
				</div>
			</form>
			<h4>- or -</h4>
			<div className="loginBox createAccountPrompt">
				<h3>Create an account.</h3>
				<button>Sign Up Now</button>
			</div>
		</div>
	)
}

export default Login