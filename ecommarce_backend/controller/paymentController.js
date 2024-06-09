import Razorpay from 'razorpay';
const instance = new Razorpay(
    {
        key_id:"rtp-test_sxchftd56mhd4",key_secret:"cvg452sgtjkdkkj",
    }
);

const checkout = async (req, res)=>{
    const option = {
        amount:50000,
        currency:"INR"
    } 
    const order = await instance.orders.create(option);
    res.json({
        success: true,
        order
    })
}

const paymentVerification = async (req, res)=>{
   const {razorpayOrderId,razorpayPaymentId} = req.body;
   res.json({razorpayOrderId,razorpayPaymentId});
}

export const paymentController = {
    checkout,paymentVerification
}