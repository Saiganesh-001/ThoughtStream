import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

export const Fullblog = ({ blog }: { blog: Blog }) => {
	return (
		<div className="grid grid-cols-12 pt-200 max-w-[80vw] mx-auto pt-12 gap-7">
			<div className="flex flex-col gap-2 col-span-8 ">
				<div className="text-4xl font-extrabold ">{blog.title}</div>
				<div className="text-gray-500">Post on 2nd December 2023</div>
				<div className="max-w-[40vw]">{blog.content}</div>
			</div>
			<div className="col-span-4">
				<div className="text-slate-600">Author</div>
				<div className="flex items-center gap-5 mt-4" >
					<div>
                        <Avatar name={blog.author.name || "Anonymous"} />
                    </div>
					<div>
						<div className="text-lg-xl font-bold">{blog.author.name || "Anonymous"}</div>
						<div className=" text-slate-500">
							Random catch phraase about the author abilities to catch user attentions
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
