import Blog from "../models/blogModel.js";

class blogController {
    static createBlogPost = async (req, res) => {

        try {
            const { title, description, category, images } = req.body;
            const userId = req.user._id;
            const newBlog = new Blog({
                title: title,
                description: description,
                category: category,
                images: images,
                author: userId
            })
            const blog = await newBlog.save();
            res.status(200).send(blog);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static getallBlogs = async (req, res) => {
        try {
            const blogs = await Blog.find();
            res.status(200).send(blogs);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    // static getallBlogUser = async (req, res) => {
    //     try {
    //         // const blogs= await BlogModel.find();
    //         const userId = req.user._id;
    //         const blogs = await BlogModel.find({ author: userId }).populate({
    //             path: 'author',
    //             select: '-password'
    //         });
    //         res.status(200).send({ "status": "success", blogs: blogs })
    //     }
    //     catch (error) {
    //         console.log(error);
    //         res.status(500).send({ "message": "failed" })
    //     }
    // }

    static updateBlogPost = async (req, res) => {
        const { id } = req.params;
        const { title, description, category } = req.body;
        const findBlog = await Blog.findById(id);
        if (findBlog) {
            try {
                const updateBlog = await Blog.findOneAndUpdate(
                    { _id: id},
                    { title: title, description: description, category: category},
                    { new: true }
                )
                res.status(200).send({ "status": "success", "message": "Post updated successfully", blog: updateBlog })
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ "message": "failed" })
            }
        }
        else {
            res.status(404).send({ "status": "error", "message": "blogId is not found" });
        }

    }

    static getaBlog = async (req, res) => {
        const { id } = req.params;
        const findBlog = await Blog.findById(id).populate('likes');
        try {
            if (!findBlog) {
                res.status(404).send({ "status": "error", "message": "blogId is not found" });
            }
            const updateBlogViews = await Blog.findOneAndUpdate(
                { _id: id },
                { $inc: { numViews: 1 } },
                { new: true },
            );
            res.status(200).send(findBlog);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" });
        }
    }

    static deleteBlogPost = async (req, res) => {
        const { id } = req.params;
        try {
            const deleteBlog = await Blog.deleteOne({ _id: id });
            if (deleteBlog.deletedCount === 0) {
                res.status(404).send({ "status": "error", "message": "blogId is not found", blog: deleteBlog });
            }
            else res.status(200).send({ "status": "success", "message": " deleted successfully" });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" });
        }
    }


    static LikeBlog = async (req, res) => {
        const { blogId } = req.body;
        const findBlog = await Blog.findById(blogId);
        const loginUserId = req.user._id;
        try {
            if (!findBlog) {
                res.status(404).send({ "status": "error", "message": "blogId is not found" });
            }
            const isLiked = findBlog.isLiked;
            const alreadyDisliked = findBlog.dislikes.find(
                (userId) => userId.toString() === loginUserId.toString()
            );
            if (alreadyDisliked) {
                await Blog.findByIdAndUpdate(
                    { _id: blogId },
                    {
                        $pull: { dislikes: loginUserId },
                        isDisliked: false,
                    },
                    { new: true },
                );
            }
            if (isLiked) {
                const findBlog = await Blog.findByIdAndUpdate(
                    { _id: blogId },
                    {
                        $pull: { likes: loginUserId },
                        isLiked: false,
                    },
                    { new: true },
                );
                res.status(200).send(findBlog);
            }
            else {
                const findBlog = await Blog.findByIdAndUpdate(
                    { _id: blogId },
                    {
                        $push: { likes: loginUserId },
                        isLiked: true,
                    },
                    { new: true },
                );
                res.status(200).send(findBlog);
            }

        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }


    static DislikeBlog = async (req, res) => {
        const { blogId } = req.body;
        const findBlog = await Blog.findById(blogId);
        const loginUserId = req.user._id;
        try {
            if (!findBlog) {
                res.status(404).send({ "status": "error", "message": "blogId is not found" });
            }
            const isDisliked = findBlog.isDisliked;
            const alreadyliked = findBlog.likes.find(
                (userId) => userId.toString() === loginUserId.toString()
            );
            if (alreadyliked) {
                await Blog.findByIdAndUpdate(
                    { _id: blogId },
                    {
                        $pull: { likes: loginUserId },
                        isLiked: false,
                    },
                    { new: true },
                );
            }
            if (isDisliked) {
                const findBlog = await Blog.findByIdAndUpdate(
                    { _id: blogId },
                    {
                        $pull: { dislikes: loginUserId },
                        isDisliked: false,
                    },
                    { new: true },
                );
                res.status(200).send(findBlog);
            }
            else {
                const findBlog = await Blog.findByIdAndUpdate(
                    { _id: blogId },
                    {
                        $push: { dislikes: loginUserId },
                        isDisliked: true,
                    },
                    { new: true },
                );
                res.status(200).send(findBlog);
            }

        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

}
export default blogController;