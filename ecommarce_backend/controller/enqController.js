import Enquiry from "../models/enqModel.js";

class enqController {
    static createEnquiry = async (req, res) => {
        const {name,email,mobile,comment} = req.body;
        try {
            if (!name || !email || !mobile || !comment) {
                res.status(400).send({ "message": "All fields are required" });
            }
            const new_enq = await Enquiry.create(req.body);
            res.status(200).send(new_enq);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static getallEnquiry = async (req, res) => {
        try {
            const all_enq = await Enquiry.find();
            res.status(200).send(all_enq);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static getaEnquiry = async (req, res) => {
        const {id} = req.params;
        const findEnq = await Enquiry.findById(id);
        try {
            if(!findEnq){
                res.status(404).send({ "status": "error", "message": "enqId is not found" });
            }
            res.status(200).send(findEnq);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static updateEnquiry = async (req, res) => {
        const {id} = req.params;
        const findEnq = await Enquiry.findById(id);
        try {
            if(!findEnq){
                res.status(404).send({ "status": "error", "message": "enqId is not found" });
            }
            const update_enq = await Enquiry.findOneAndUpdate( {_id:id} , req.body,
                { new: true },
            )
            //res.status(200).send({ "status": "success", "message": "Product category updated successfully" })
            res.status(200).json(update_enq);
        }
        catch(error) {
            console.log(error);
            res.status(500).send({ "message": "failed" })
        }
    }

    static deleteEnquiry = async (req,res) => {
        const {id} = req.params;
        const findEnq = await Enquiry.findById(id);
        try{
            if(!findEnq){
                res.status(404).send({ "status": "error", "message": "enqId is not found" });
            }
            const delete_enq = await Enquiry.deleteOne({_id:id});
            res.status(200).send({ "status": "success", "message": "enquiry deleted successfully", delete_enq, findEnq});
 
        }catch(err){
            res.status(404).json(err);
        }
    }
}

export default enqController;
