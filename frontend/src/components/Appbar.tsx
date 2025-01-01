import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
	return (
		<div className="border-b flex justify-between px-10 py-2">
			<Link
				to={"/blogs"}
				className="flex items-center cursor-pointer">
				ThoughtStream
			</Link>
			<div className="flex gap-4 items-center">
				<Link to={"/publish"}>
					<button
						type="button"
						className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-3xl text-sm px-6 py-1.5">
						New Post Publish
					</button>
				</Link>
				<Avatar
					name="Saiganesh"
					size="big"
				/>
			</div>
		</div>
	);
};
