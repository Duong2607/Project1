import e from "express";
import clothing from "../model/clothing";
import cart from "../model/cart";
let getCart = (data) => {
    return new Promise(async (resolve, reject) =>{
        try {
            let cartData = {}
            let carts = await cart.find({idUser: data.idUser})
            let newcart = JSON.stringify(carts)
            if(newcart)
            {
                cartData.errCode = 0;
                cartData.errMessage = 'Ok';
                cartData.cart = carts;
            } if(newcart === '[]') {
                cartData.errCode = 1;
                cartData.errMessage = 'Giỏ hàng chưa có sản phẩm';
                cartData.cart = carts;
            }
            resolve(cartData)
        } catch (e) {
            reject(e);
        }
    })
}

let addClothingToCart = (data) => {
    return new Promise(async(resolve,reject) => {
        try {
            let ExistSumClothing = await checkSumClothing(data.sizeClothing, data.nameClothing);
            if(ExistSumClothing) {
                
                let ExistClothing = await checkClothing(data.sizeClothing, data.nameClothing, data.idUser);
                if(ExistClothing){
                    let limitCount = await checkLimitClothing(ExistClothing.count, ExistClothing.nameClothing, ExistClothing.sizeClothing);
                    if(limitCount) {
                        //tăn,g số lượng
                        ExistClothing.count++;
                        await ExistClothing.save();
                        resolve({
                            errCode: 1,
                            errMessage: 'tăng số lượng',
                            ExistClothing
                        })
                    } else {
                        resolve({
                            errCode: 3,
                            errMessage: 'Không đủ hàng'
                        })
                    }
                    
                } else{
                    
                        const cart1 = new cart({
                            idUser: data.idUser,
                            idClothing: data.idClothing,
                            nameClothing: data.nameClothing,
                            priceClothing: data.priceClothing,
                            sizeClothing: data.sizeClothing,
                            count: 1,
                            img: data.img,
        
                        });
                        await cart1.save();
                        resolve({
                            errCode: 0,
                            errMessage: 'OK'
                        })

                }
            }else {
                resolve({
                    errCode: 2,
                    errMessage: 'Hết Hàng'
                })
            }


            
        } catch (error) {
            reject(error)
        }
    })
}

let updateCart = (idCart, status) => {
    return new Promise(async(resolve, reject) => {
        try {
            await cart.findOne({
                _id: idCart
            })
            .then(async(udcart) => {
                
                if(status == '+'){
                    let limitCount = await checkLimitClothing(udcart.count, udcart.nameClothing, udcart.sizeClothing);
                    if(limitCount) {
                        udcart.count++;
                        await udcart.save();
                        resolve({
                            errCode: 0,
                            errMessage: 'OK',
                            udcart: udcart
                        })
                    } else {
                        resolve({
                            errCode: 3,
                            errMessage: 'Không đủ hàng',
                            udcart: ''
                        })
                    }
                    
                }else{
                    if(status == '-'){
                        udcart.count--;
                        await udcart.save();
                        resolve({
                            errCode: 0,
                            errMessage: 'OK',
                            udcart: udcart
                        })

                    }
                    else {
                        resolve({
                            errCode: 1,
                            errMessage: 'Fail'
                        })
                    }
                }
                
            })
            .catch( () => {
                resolve({
                    errCode: 2,
                    errMessage: 'Not Find Cart'
                })

            }
            )
        } catch (error) {
            reject(error)
        }
        
    })
}
let deleteCart = (idCart) => {
    return new Promise(async(resolve, reject) => {
        try {
            await cart.deleteOne({
                _id: idCart
            })
            .then(() => {
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
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

let deleteAllCart = (idUser) => {
    return new Promise(async(resolve, reject) => {
        // let carts = await cart.find({idUser: idUser})
        try {
        //     await Promise.all(Object.values(carts).map(async (item) => {
        //         await item.deleteOne({_id: item._id}) // an empty mongodb selector object ({}) must be passed as the filter argument
        //         .then(() => {
        //             resolve({
        //                 errCode: 0,
        //                 errMessage: 'OK'
        //             })
        //         })
        //         .catch(()=> {
        //             resolve({
        //                 errCode: 1,
        //                 errMessage: 'Fail'
        //             })
        //             })
        //     }));
            await cart.deleteMany({idUser: idUser}) // an empty mongodb selector object ({}) must be passed as the filter argument
                .then(() => {
                    resolve({
                        errCode: 0,
                        errMessage: 'OK'
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

let checkClothing = (size, name, idUser) => {
    return new Promise(async(resolve,reject) => {
        try {
            await cart.findOne({
                // nameClothing: name,
                idUser: idUser,
                sizeClothing: size,
                nameClothing: name
            })
            .then(doc => {
                if(doc) {
                    resolve(doc)
                }else{
                    resolve(false)
                }
            })
            .catch(err => {
            reject(err)
            })
        } catch (error) {
            reject(error)
        }
    })
}

// Kiểm tra còn hàng k

let checkSumClothing = (size, name) => {
    return new Promise(async(resolve, reject) => {
        try {
            await clothing.findOne({
                name: name,
                
            })
            .then( clothing => {
                if(clothing){
                    if(clothing[`sum_size_${size}`]<=0) {
                        resolve(
                            0
                            )
                    } else {
                        resolve(
                            1
                        )
                    }
                }
                
            })
            .catch(err => {
                reject(err);
            })
        } catch (e) {
            reject(e)
        }
    })
}

// Kiểm tra số lượng đặt có vượt quá số hàng có k

let checkLimitClothing = (orderCount, name, size) => {
    return new Promise( async(resolve,reject)=> {
        try {
            await clothing.findOne({
                name: name,
            })
            .then(clothing => {
                if(clothing[`sum_size_${size}`]<=orderCount) {
                    resolve(0);
                } else {
                    resolve(1);
                }
            })
            .catch(e => {
                reject(e);
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getCart: getCart,
    addClothingToCart: addClothingToCart,
    updateCart: updateCart,
    deleteCart: deleteCart,
    deleteAllCart: deleteAllCart,
    checkSumClothing: checkSumClothing
}
