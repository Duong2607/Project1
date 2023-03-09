import cartService from "../services/cartService"
let handleGetCart = async(req, res) => {
  
    let cartData = await cartService.getCart(req.body);
    
    return res.status(200).json({
        errCode: cartData.errCode,
        errMessage: cartData.errMessage,
        cart: cartData.cart ? cartData.cart : {}
    })
}

let handleAddClothingToCard = async(req, res) => {
    let data = await cartService.addClothingToCart(req.body);
    return res.status(200).json({
        errCode: data.errCode,
        errMessage: data.errMessage,
    });
}

let handleUpdateCard =  async(req, res) => {
    if(req.body.data.id&&req.body.data.status ){
        let data = await cartService.updateCart(req.body.data.id,req.body.data.status);
        return res.status(200).json({
            errCode: data.errCode,
            errMessage: data.errMessage,
            udcart: data.udcart
        });
    }
    else {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing _id'
        });
    }
    
}

let handleDeleteCard =  async(req, res) => {
    if(req.body.id){
        let data = await cartService.deleteCart(req.body.id);
        return res.status(200).json({
            errCode: data.errCode,
            errMessage: data.errMessage,
          
        });
    }
    else {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing _id'
        });
    }
    
}

let handleDeleteAllCart = async(req, res) => {
    if(req.body.idUser){
        let data = await cartService.deleteAllCart(req.body.idUser);
        return res.status(200).json({
            errCode: data.errCode,
            errMessage: data.errMessage,
          
        });
    }
    else {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing _id'
        });
    }
}

let handleCheckSumClothing = async(req, res) => {
   
        let data = await cartService.checkSumClothing(req.body.sizeClothing, req.body.nameClothing);
        return res.status(200).json({
            errCode: data
        });
    
    
}

module.exports = {
    handleGetCart: handleGetCart,
    handleAddClothingToCard: handleAddClothingToCard,
    handleUpdateCard: handleUpdateCard,
    handleDeleteCard: handleDeleteCard,
    handleDeleteAllCart: handleDeleteAllCart,
    handleCheckSumClothing: handleCheckSumClothing
}