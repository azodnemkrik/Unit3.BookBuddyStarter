import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {
	const navigate = useNavigate()

	const register = async (formData) => {
		const firstname = formData.get("firstname")
		const lastname = formData.get("lastname")
		const email = formData.get("email")
		const password = formData.get("password")
		const user = {
			firstname,
			lastname,
			email,
			password,
		}
		try {
			const {data} = await axios.post("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register", user, {
				headers: {
					"Authorization" : `Bearer ${token}`
				}
			})
			console.log("registering data:", data)
			alert("Thank you for signing up!")
			navigate("/")
		} catch (error) {
			console.error("error:", error)
		}
	}

	return (
		<div className="registerContainer">
			<form action={register}>
				<div className="registerForm">
				<h3>Please provide the following information.</h3>
					<label>
						First: <input type="text" name="firstname" />
					</label>
				
					<label>
						Last: <input type="text" name="lastname" />
					</label>
				
					<label>
						Email <i>(required)</i>:<input type="text" name="email" required/>
					</label>

					<label>
						Password <i>(required)</i>: <input type="text" name="password" required/>
					</label>
					<button>Submit Registration</button>
				</div>
			</form>
			<button onClick={()=>navigate("/")}>Cancel</button>
		</div>
	)
}

/*
firstname	
string
the first name of the user

lastname	
string
the last name of the user

email
required
string
the email of the user

password
*/

export default Register