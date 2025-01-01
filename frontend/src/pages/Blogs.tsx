import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { Skeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
	const { loading, blogs } = useBlogs();

	if (loading) {
		return (
			<div>
				<Appbar />
                <div className="flex flex-col gap-6">
				<Skeleton />
				<Skeleton />
				<Skeleton />
				<Skeleton />
				<Skeleton />
				<Skeleton />
                </div>
			</div>
		);
	}
	return (
		<div>
			<Appbar />
			<div className="flex justify-center mt-3">
				<div className="flex flex-col gap-3 min-w-[50vw]">
					{blogs.map((blog) => (
						<BlogCard
							key={blog.id}
							id={blog.id}
							authorName={blog.author.name || "Anonymous"}
							title={blog.title}
							content={blog.content}
							publishedDate={"27th feb 2003"}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
