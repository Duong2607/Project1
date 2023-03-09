import e from "express";
import user from "../model/user";
import User from "../model/user";
let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist) {
                //user already exist
                
                let user = await User.findOne({email: email})
                if(user) {
                    //compare password'
                    let check = compareUserPassword(user.password,password);
                    if(check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        user.password = undefined;
                        userData.user = user;
                    }else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }

                }else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                }                                  
                                    
            }else {
                //return error
                userData.errCode = 1
                userData.errMessage = `Your's Email isn't exist in your system. Plz try other email`
            }

            resolve(userData)
        } catch (e) {
            reject(e)
        }
    }) 
}
let compareUserPassword = (serverPassword, clientPassword ) => {
            if(serverPassword == clientPassword){
                    return true;
                 }
                 else{return false;}
            } 

let checkUserEmail = (userEmail) =>{
    let user;    
    return new Promise(async(resolve, reject) =>{
            try {
                await User.findOne({email: userEmail})
                            .then(doc => {
                                if(doc) {
                                     user = doc

                                    resolve(true)
                                }else{
                                    resolve(false)
                                }
                            })
            .catch(err => {
                reject(err)
            })
                            
                
            } catch (e) {
                reject(e);
                console.log('fail');

            }
        })
}

let creatNewUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let isExist = await checkUserEmail(data.email);
            if(!isExist){
                const user1 = new User({
                    email: data.email,
                    password: data.password,
                    first_Name: data.first_Name,
                    last_Name: data.last_Name,
                    
                });
                await user1.save();
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })

            }else {
                resolve({
                    errCode: 1,
                    errMessage: 'Email already exists'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUser = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await User.find({});
            if(user) {
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    user: user
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Fail'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateUser = (data) => {
    return new Promise(async(resolve,reject)=> {
        try {
            if(data) {
                await User.findOne({
                    _id: data.id,
                    first_Name: data.first_Name,
                    last_Name: data.last_Name 
                })
                .then(async(udUser) => {
                    udUser.first_Name= data.first_Name;
                    udUser.last_Name= data.last_Name;

                    await udUser.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Cập nhật thành công',
                        udUser: udUser
                    })

                })
                .catch(()=>{
                    resolve({
                        errCode: 1,
                        errMessage: 'Not Found User',
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

let deleteUser = (idUser) => {
    return new Promise(async(resolve,reject) => {
        try {
            await User.deleteOne({
                _id: idUser
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
    handleUserLogin: handleUserLogin,
    creatNewUser: creatNewUser,
    getAllUser: getAllUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}