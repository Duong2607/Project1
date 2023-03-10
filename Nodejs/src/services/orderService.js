import e from "express";
import clothing from "../model/clothing";
import order from "../model/order";
let getAllOrder = () => {
    return new Promise(async (resolve, reject) =>{
        try {
            let orders = ''
                orders = await order.find({})
            if(orders) {
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    orders: orders
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Không có đơn hàng nào',
                    orders: orders
                })
            }

            
        } catch (e) {
            reject(e);
        }
    })
}

let getOrderByIdClient = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            console.log(id);
            let orders = await order.find({
                idUser: id
            })
            if(orders) {
                console.log(orders)
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    orders: orders
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Không có đơn hàng nào',
                    orders: orders
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let handleAddNewOrder = (data) => {
    return new Promise(async(resolve,reject) => {
        try {
            data.cart.forEach(async item => {
                // let a = item.sizeClothing
                await clothing.findOne({ 
                    name: item.nameClothing})
                    .then(async doc => {
                        if( doc) {
                            doc[`sum_size_${item.sizeClothing}`]= doc[`sum_size_${item.sizeClothing}`] - item.count;
                            await doc.save()
                        }else{
                            resolve(false)
                        }
                    })
                    .catch(err => {
                    reject(err)
                    })
            });
            
            // let ExistClothing = await checkClothing(data.sizeClothing, data.nameClothing, data.idUser);
            if(data.idUser&&data.cart&&data.price&&data.fullName&&data.email) {
                const neworder = new order({
                    idUser: data.idUser,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    cart: data.cart,
                    fullName: data.fullName,
                    price: data.price,
                    status: data.status,
                    delivery: false,
                    email: data.email,
                    paymentMethods: data.paymentMethods
                });
                await neworder.save();
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    order: neworder
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing'
                })
            }
                

            
            
        } catch (error) {
            reject(error)
        }
    })
}



module.exports = {
    getAllOrder: getAllOrder,
    handleAddNewOrder: handleAddNewOrder,
    getOrderByIdClient: getOrderByIdClient
}