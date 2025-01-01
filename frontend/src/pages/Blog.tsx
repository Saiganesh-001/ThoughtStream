import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { Fullblog } from "../components/Fullblog";
import { Appbar } from "../components/Appbar";
import { Skeleton } from "../components/Skeleton";

const Blog = () => {
	const { id } = useParams();
	const {blog, loading } = useBlog({
		id: id || "",
	});

	if (loading || !blog) {
		return (
			<div>
				<Appbar />
				<div className="grid grid-cols-2 min-w-[100vw] mt-12 ml-10">
					<div className="col-span-1 mx-auto">
						<div className="h-10 bg-gray-200 rounded-full min-w-[40vw]  mx-auto mb-4"></div>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
					</div>
					<div className="col-span-1 pl-32">
						<Skeleton />
						<Skeleton />
					</div>
				</div>
			</div>
		);
	}
	return (
		<div>
			<Appbar />
			<div className="">
				<Fullblog blog={blog} />
			</div>
		</div>
	);
};

export default Blog;
