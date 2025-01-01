import { Link } from "react-router-dom";

interface BlogCardProps {
	authorName: string;
	title: string;
	content: string;
	publishedDate: string;
    id: string;
}

export const BlogCard = ({ authorName, title, content, publishedDate, id }: BlogCardProps) => {
	return (
		<Link to={`/blog/${id}`}>
            <div className="border-b border-slate-200 pb-4 flex flex-col gap-1 cursor-pointer">
			<div className="flex gap-2">
				<div className="flex flex-col justify-center">
					<Avatar name={authorName} />
				</div>
				<div className="font-semibold text-slate-600">{authorName}</div>
                <div>
                    &#9679;
                </div>
				<div className="font-thin text-slate-500">{publishedDate}</div>
			</div>
			<div className="text-xl font-semibold">{title}</div>
			<div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
			<div className="text-slate-500 text-sm font-thin">{`${Math.ceil(content.length / 100)} minute(s) read`}</div>
		</div>
        </Link>
	);
};

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
	return (
		<div className={`relative inline-flex items-center justify-center ${size ===
        "small" ? "h-6 w-6" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
			<span className={`${size === "small" ? "text-xs" : "text-md"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
		</div>
	);
}
