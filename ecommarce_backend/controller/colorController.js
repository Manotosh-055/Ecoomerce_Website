import Color from "../models/colorModel.js";

class colorController {
    static createColor = async (req, res) => {
        try {
            const { title } = req.body;
            if (!title) {
                res.status(400).send({ "message": "All fields are required" });
            }
            const newcolor = new Color({
                title: title,
            })
            const new_color = await newcolor.save();
            res.status(200).send(new_color);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static getallColor = async (req, res) => {
        try {
            const allcolor = await Color.find();
            res.status(200).send(allcolor);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static getaColor = async (req, res) => {
        const {id} = req.params;
        const findcolor = await Color.findById(id);
        try {
            if(!findcolor){
                res.status(404).send({ "status": "error", "message": "colorId is not found" });
            }
            res.status(200).send(findcolor);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static updateColor = async (req, res) => {
        const {id} = req.params;
        const {title} = req.body;
        const findcolor = await Color.findById(id);
        try {
            if(!findcolor){
                res.status(404).send({ "status": "error", "message": "colorId is not found" });
            }
            const updatecolor = await Color.findOneAndUpdate(
                { _id: id},
                { title: title},
                { new: true }
            )
            //res.status(200).send({ "status": "success", "message": "Product category updated successfully" })
            res.status(200).json(updatecolor);
        }
        catch(error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static deleteColor = async (req,res) => {
        const {id} = req.params;
        //console.log(id);
        const findcolor = await Color.findById(id);
        try{
            if(!findcolor){
                res.status(404).send({ "status": "error", "message": "colorId is not found" });
            }
            const deletecolor = await Color.deleteOne({_id:id});
            res.status(200).send({ "status": "success", "message": "color deleted successfully", deletecolor, findcolor});
 
        }catch(err){
            res.status(404).json(err);
        }
    }
}

export default colorController;
