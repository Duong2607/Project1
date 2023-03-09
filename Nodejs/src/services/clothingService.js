import e from "express";

import clothing from "../model/clothing";
let getAllClothing = () => {
    return new Promise(async (resolve, reject) =>{
        try {
            let clothings = ''
                clothings = await clothing.find({})
            resolve(clothings)
        } catch (e) {
            reject(e);
        }
    })
}

let getClothing = (name) => {
    return new Promise(async (resolve, reject) =>{
        try {
        
            let clothings = await clothing.findOne({name: name})
            resolve(clothings)
        } catch (e) {
            reject(e);
        }
    })
}

let getClothingByType = (type) => {
    return new Promise(async (resolve, reject) =>{
        try {
        
            let clothings = await clothing.find({type: type});
            resolve(clothings);
        } catch (e) {
            reject(e);
        }
    })
}

let creatClothing = (data) => {
    return new Promise(async(resolve,reject) => {
        try {
            // let ExistClothing = await checkClothing(data.sizeClothing, data.nameClothing, data.idUser);
            if(data.nameClothing&&data.price&&data.imgClothing&&data.color&&
                data.sum_size_1.toString(10)&&data.sum_size_2.toString(10)
                &&data.sum_size_3.toString(10)&&data.sum_size_4.toString(10)
                &&data.collection&&data.type) {
                const newclothing = new clothing({
                    name: data.nameClothing,
                    img: data.imgClothing,
                    price: data.price,
                    type: data.type,
                    color: data.color,
                    collection_name: data.collection,
                    sum_size_1: data.sum_size_1,
                    sum_size_2: data.sum_size_2,
                    sum_size_3: data.sum_size_3,
                    sum_size_4: data.sum_size_4
                });
                await newclothing.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Tạo thành công',
                    clothing: newclothing
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Miss Data'
                })
            }
                

            
            
        } catch (error) {
            reject(error)
        }
    })
}

let updateClothing = (data) => {
    return new Promise(async(resolve,reject)=> {
        try {
            console.log(typeof data.sum_size_1);

            if(data.nameClothing&&data.price&&data.imgClothing&&data.color&&
                data.sum_size_1.toString(10)&&data.sum_size_2.toString(10)
                &&data.sum_size_3.toString(10)&&data.sum_size_4.toString(10)) {
                await clothing.findOne({
                    _id: data.idClothing
                })
                .then(async(udClothing) => {
                    udClothing.name= data.nameClothing;
                    udClothing.img= data.imgClothing;
                    udClothing.price= data.price;
                    udClothing.color= data.color;
                    udClothing.collection_name= data.collection;
                    udClothing.type= data.type;
                    udClothing.sum_size_1= data.sum_size_1;
                    udClothing.sum_size_2= data.sum_size_2;
                    udClothing.sum_size_3= data.sum_size_3;
                    udClothing.sum_size_4= data.sum_size_4;

                    await udClothing.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Cập nhật thành công',
                        udClothing: udClothing
                    })

                })
                .catch(()=>{
                    resolve({
                        errCode: 1,
                        errMessage: 'Not Found Clothing',
                    })
                })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'Miss Data',
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteClothing = (idClothing) => {
    return new Promise(async(resolve,reject) => {
        try {
            await clothing.deleteOne({
                _id: idClothing
            })
            .then(() => {
                resolve({
                    errCode: 0,
                    errMessage: 'Xóa thành công'
                })
            })
            .catch(()=> {
                resolve({
                    errCode: 1,
                    errMessage: 'Fail'
                })
                })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllClothing: getAllClothing,
    getClothing: getClothing,
    getClothingByType: getClothingByType,
    creatClothing: creatClothing,
    updateClothing: updateClothing,
    deleteClothing: deleteClothing,
}