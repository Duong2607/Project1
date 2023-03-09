import clothingService from '../services/clothingService';
let handleGetAllClothing = async(req, res) => {
    let clothings = await clothingService.getAllClothing();
    // if(!name) {
    //     return res.status(200).json({
    //         errCode: 0,
    //         errMessage: 'Missing Required parametes',
    //         clothings: []
    //     })
    // }
    if(clothings){
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        clothings
    })
    }
}



let handleGetClothing = async(req, res) => {
    let name = req.query.name
    let clothing = await clothingService.getClothing(name);
    if(clothing){
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            clothing
        })
    }
}

let handleGetClothingByType = async(req, res) => {
    let type = req.query.type
    let clothings = await clothingService.getClothingByType(type);
    if(clothings){
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            clothings
        })
    }
}

let handleCreatClothing = async(req, res) => {
    let data = await clothingService.creatClothing(req.body);
    
    return res.status(200).json({
        errCode: data.errCode,
        errMessage: data.errMessage,
        clothing: data.clothing
    });
}

let handleUpdateClothing = async(req, res) => {
    let data = await clothingService.updateClothing(req.body);
    return res.status(200).json({
        errCode: data.errCode,
        errMessage: data.errMessage,
        udclothing: data.udclothing
    });
}

let handleDeleteClothing = async(req, res) => {
    if(req.body.id){
        let data = await clothingService.deleteClothing(req.body.id);
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

module.exports = {
    handleGetAllClothing: handleGetAllClothing,
    handleGetClothing: handleGetClothing,
    handleGetClothingByType, handleGetClothingByType,
    handleCreatClothing: handleCreatClothing,
    handleUpdateClothing: handleUpdateClothing,
    handleDeleteClothing: handleDeleteClothing,
}