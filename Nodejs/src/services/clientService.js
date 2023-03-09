import e from "express";
import Client from "../model/client";

let handleClientLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let clientData = {};
            let isExist = await checkClientEmail(email);
            if(isExist) {
                //client already exist
                
                let client = await Client.findOne({email: email})
                if(client) {
                    //compare password'
                    let check = compareClientPassword(client.password,password);
                    if(check) {
                        clientData.errCode = 0;
                        clientData.errMessage = 'Ok';
                        client.password = undefined;
                        clientData.client = client;
                    }else {
                        clientData.errCode = 3;
                        clientData.errMessage = 'Wrong password';
                    }

                }else {
                    clientData.errCode = 2;
                    clientData.errMessage = `client's not found`
                }                                  
                                    
            }else {
                //return error
                clientData.errCode = 1
                clientData.errMessage = `Your's Email isn't exist in your system. Plz try other email`
            }

            resolve(clientData)
        } catch (e) {
            reject(e)
        }
    }) 
}
let compareClientPassword = (serverPassword, clientPassword ) => {
            if(serverPassword == clientPassword){
                    return true;
                 }
                 else{return false;}
            } 
    
    // return new Promise((resolve, reject) => {
    //     try {
    //          if(client.password === clientPassword){
    //             resolve(true)
    //          }
    //          else{resolve}
    //     } catch (e) {
    //         reject(e)
    //     }
    // })


let checkClientEmail = (clientEmail) =>{
    let client;    
    return new Promise(async(resolve, reject) =>{
            try {
                await Client.findOne({email: clientEmail})
                            .then(doc => {
                                if(doc) {
                                     client = doc

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

let handleClientSignUp = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let isExist = await checkClientEmail(data.email);
            if(!isExist){
                const client1 = new Client({
                    email: data.email,
                    password: data.password,
                    first_Name: data.first_Name,
                    last_Name: data.last_Name,
                    
                });
                await client1.save();
                console.log(client1);
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

let getAllClient = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let client = await Client.find({});
            if(client) {
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    client: client
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

module.exports = {
    handleClientLogin: handleClientLogin,
    handleClientSignUp: handleClientSignUp,
    getAllClient: getAllClient
}