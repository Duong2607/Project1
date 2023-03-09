import orderService from "../services/orderService"
let handleAddOrder =  async (req, res) => {
    // let email = req.body.email;
    // let password = req.body.password;
    
    // if(!email || !password){
    //     return res.status(500).json({
    //         errCode: 1,
    //         errMessage: 'Missing inputs parameter!'
    //     })
    // }

    let orderData = await orderService.handleAddNewOrder(req.body);
    

    return res.status(200).json({
        errCode: orderData.errCode,
        errMessage: orderData.errMessage,
    })
}

let handleGetAllOrder = async(req, res) => {
    let orderData = await orderService.getAllOrder();
    return res.status(200).json({
        errCode: orderData.errCode,
        errMessage: orderData.errMessage,
        orders: orderData.orders ? orderData.orders : {}
    });
}



module.exports = {
    handleAddOrder: handleAddOrder,
    handleGetAllOrder: handleGetAllOrder
} 