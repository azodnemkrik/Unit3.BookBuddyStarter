const Account = ({ user }) => {
	return (
		<div>
			<h2>Account Information</h2>
			<h4>First Name: <span className="userData">{user.firstname}</span></h4>
			<h4>Last Name: <span className="userData">{user.lastname}</span></h4>
			<h4>Email: <span className="userData">{user.email}</span></h4>
			<h4>ID: <span className="userData">{user.id}</span></h4>
			<hr />
		</div>
	)
}

export default Account