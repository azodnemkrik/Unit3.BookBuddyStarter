
const Account = ({ user }) => {
	return (
		<div>
			{
				user.id ? (
					<>
						<h3>Account Information</h3>
						<h4>First Name: <span className="userData">{user.firstname}</span></h4>
						<h4>Last Name: <span className="userData">{user.lastname}</span></h4>
						<h4>Email: <span className="userData">{user.email}</span></h4>
						<h4>ID: <span className="userData">{user.id}</span></h4>
					</>) : (
					<h3>User not Logged in.</h3>
				)
			}
			<hr />
		</div>
	)
}

export default Account