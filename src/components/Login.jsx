const Login = () => {
	return (
		<div>
			<h3>Login to access your account</h3>
			<form>
				<label>
					Username: <input type="text" name="username" />
				</label><br/>
				<label>
					Password: <input type="text" name="password" />
				</label><br/>
				<button>Login</button>
			</form>
		</div>
	)
}

export default Login