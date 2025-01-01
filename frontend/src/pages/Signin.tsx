import Auth from "../components/Auth";
import Quote from "../components/Quote";

const Signin = () => {
	return (
		<div>
			<div className="grid grid-cols-1 lg:grid-cols-2 ">
				<div>
					<Quote />
				</div>
				<div className="lg:visible invisible">
					<Auth type="signin" />
				</div>
			</div>
		</div>
	);
};

export default Signin;
