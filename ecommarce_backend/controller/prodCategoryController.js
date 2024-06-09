import ProdCategory from "../models/prodCategoryModel.js";

class prodCategoryController {
    static createCategory = async (req, res) => {
        try {
            const { title } = req.body;
            if (!title) {
                res.status(400).send({ "message": "All fields are required" });
            }
            const newProdCategory = new ProdCategory({
                title: title,
            })
            const newPcategory = await newProdCategory.save();
            res.status(200).send(newPcategory);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static getallProdCategory = async (req, res) => {
        try {
            const allProdCategory = await ProdCategory.find();
            res.status(200).send(allProdCategory);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static getaProdCategory = async (req, res) => {
        const {id} = req.params;
        const findProdCategory = await ProdCategory.findById(id);
        try {
            if(!findProdCategory){
                res.status(404).send({ "status": "error", "message": "prodCategoryId is not found" });
            }
            res.status(200).send(findProdCategory);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static updateProdCategory = async (req, res) => {
        const {id} = req.params;
        const {title} = req.body;
        const findProdCategory = await ProdCategory.findById(id);
        try {
            if(!findProdCategory){
                res.status(404).send({ "status": "error", "message": "prodCategoryId is not found" });
            }
            const updatePcategory = await ProdCategory.findOneAndUpdate(
                { _id: id},
                { title: title},
                { new: true }
            )
            //res.status(200).send({ "status": "success", "message": "Product category updated successfully" })
            res.status(200).json(updatePcategory);
        }
        catch(error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static deleteProdCategory = async (req,res) => {
        const {id} = req.params;
        const findProdCategory = await ProdCategory.findById(id);
        try{
            if(!findProdCategory){
                res.status(404).send({ "status": "error", "message": "prodCategoryId is not found" });
            }
            const deletePcategory = await ProdCategory.deleteOne({_id:id});
            res.status(200).send({ "status": "success", "message": "Prod category deleted successfully",deletePcategory});
 
        }catch(err){
            res.status(404).json(err);
        }
    }
}

export default prodCategoryController;
