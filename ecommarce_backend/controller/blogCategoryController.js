import BlogCategory from "../models/blogCategoryModel.js";

class blogCategoryController {
    static createBlogCategory = async (req, res) => {
        try {
            const { title } = req.body;
            if (!title) {
                res.status(400).send({ "message": "All fields are required" });
            }
            const newBlogCategory = new BlogCategory({
                title: title,
            })
            const newBcategory = await newBlogCategory.save();
            res.status(200).send(newBcategory);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static getallBlogCategory = async (req, res) => {
        try {
            const allBlogCategory = await BlogCategory.find();
            res.status(200).send(allBlogCategory);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static getaBlogCategory = async (req, res) => {
        const {id} = req.params;
        const findBlogCategory = await BlogCategory.findById(id);
        try {
            if(!findBlogCategory){
                res.status(404).send({ "status": "error", "message": "blogCategoryId is not found" });
            }
            res.status(200).send(findBlogCategory);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static updateBlogCategory = async (req, res) => {
        const {id} = req.params;
        const {title} = req.body;
        const findBlogCategory = await BlogCategory.findById(id);
        try {
            if(!findBlogCategory){
                res.status(404).send({ "status": "error", "message": "blogCategoryId is not found" });
            }
            const updateBcategory = await BlogCategory.findOneAndUpdate(
                { _id: id},
                { title: title},
                { new: true }
            )
            //res.status(200).send({ "status": "success", "message": "Product category updated successfully" })
            res.status(200).json(updateBcategory);
        }
        catch(error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static deleteBlogCategory = async (req,res) => {
        const {id} = req.params;
        //console.log(id);
        const findBlogCategory = await BlogCategory.findById(id);
        try{
            if(!findBlogCategory){
                res.status(404).send({ "status": "error", "message": "blogCategoryId is not found" });
            }
            const deleteBcategory = await BlogCategory.deleteOne({_id:id});
            res.status(200).send({ "status": "success", "message": "blog category deleted successfully", DBcategory:deleteBcategory });
 
        }catch(err){
            res.status(404).json(err);
        }
    }
}

export default blogCategoryController;
