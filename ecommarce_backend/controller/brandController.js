import Brand from "../models/brandModel.js";

class brandController {
    static createBrand = async (req, res) => {
        try {
            const { title } = req.body;
            if (!title) {
                res.status(400).send({ "message": "All fields are required" });
            }
            const newBrand = new Brand({
                title: title,
            })
            const newbrand = await newBrand.save();
            res.status(200).send(newbrand);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static getallBrand = async (req, res) => {
        try {
            const allBrand = await Brand.find();
            res.status(200).send(allBrand);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static getaBrand = async (req, res) => {
        const {id} = req.params;
        const findBrand = await Brand.findById(id);
        try {
            if(!findBrand){
                res.status(404).send({ "status": "error", "message": "BrandId is not found" });
            }
            res.status(200).send(findBrand);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static updateBrand = async (req, res) => {
        const {id} = req.params;
        const {title} = req.body;
        const findBrand = await Brand.findById(id);
        try {
            if(!findBrand){
                res.status(404).send({ "status": "error", "message": "BrandId is not found" });
            }
            const updatebrand = await Brand.findOneAndUpdate(
                { _id: id},
                { title: title},
                { new: true }
            )
            //res.status(200).send({ "status": "success", "message": "Product category updated successfully" })
            res.status(200).json(updatebrand);
        }
        catch(error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static deleteBrand = async (req,res) => {
        const {id} = req.params;
        //console.log(id);
        const findBrand = await Brand.findById(id);
        try{
            if(!findBrand){
                res.status(404).send({ "status": "error", "message": "BrandId is not found" });
            }
            const deletebrand = await Brand.deleteOne({_id:id});
            res.status(200).send({ "status": "success", "message": "brand deleted successfully", deletebrand, findBrand});
 
        }catch(err){
            res.status(404).json(err);
        }
    }
}

export default brandController;
