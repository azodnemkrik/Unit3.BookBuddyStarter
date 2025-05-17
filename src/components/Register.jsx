import { useNavigate } from "react-router-dom"

const Register = () => {
	const navigate = useNavigate()
	return (
		<div className="registerContainer">
			<form>
				<div className="registerForm">
				<h3>Please provide the following information.</h3>
					<label>
						First: <input type="text" name="firstname" />
					</label>
				
					<label>
						Last: <input type="text" name="lastname" />
					</label>
				
					<label>
						Email: <input type="text" name="email" required/>
					</label>

					<label>
						Password: <input type="text" name="password" required/>
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