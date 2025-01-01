import { SignupInput } from "@saiganesh-001/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
	const [postInputs, setPostInputs] = useState<SignupInput>({
		name: "",
		email: "",
		password: "",
	});

	async function sendRequest() {
		try {
			const response = await axios.post(`${BACKEND_URL}/api/v1/user${type === 'signup' ? "/signup" : "/signin"}`, postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
		} catch (e) {

        }
	}

	return (
		<div className="h-screen flex justify-center flex-col items-center">
			<div className="text-3xl font-extrabold">Create an account</div>
			<div className="text-slate-400">
				{type === "signup" ? "Already have an account?" : "Don't have an account?"}
				<Link
					className="pl-2 underline"
					to={type === "signup" ? "/signin" : "/signup"}>
					{type === "signin" ? "Sign up" : "Sign in"}
				</Link>
			</div>
			<div className="w-[20vw] flex flex-col gap-4 pt-5">
				{type === "signup" ? (
					<div>
						<LabelledInput
							label="Username"
							placeholder="Username"
							onChange={(e) => {
								setPostInputs((c) => ({
									...c,
									name: e.target.value,
								}));
							}}
						/>
					</div>
				) : null}
				<div>
					<LabelledInput
						label="Email"
						placeholder="Email"
						onChange={(e) => {
							setPostInputs((c) => ({
								...c,
								email: e.target.value,
							}));
						}}
					/>
				</div>
				<div>
					<LabelledInput
						type={"password"}
						label="Password"
						placeholder="Password"
						onChange={(e) => {
							setPostInputs((c) => ({
								...c,
								password: e.target.value,
							}));
						}}
					/>
				</div>
				<button
                    onClick={sendRequest}
					type="button"
					className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
					{type === "signup" ? "Sign up" : "Sign in"}
				</button>
			</div>
		</div>
	);
};

interface LabelledInputType {
	label: string;
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
	return (
		<div>
			<label className="block mb-2 text-sm text-black font-semibold">{label}</label>
			<input
				type={type || "text"}
				id="first_name"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				placeholder={placeholder}
				onChange={onChange}
				required
			/>
		</div>
	);
}

export default Auth;
