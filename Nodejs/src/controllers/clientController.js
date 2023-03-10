import clientService from '../services/clientService';
let handleLogin =  async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    
    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing inputs parameter!'
        })
    }

    let userData = await clientService.handleClientLogin(email, password);
    // check email exist(ton tai)
    // compare password(kiem tra dung mk k)
    // return userInfor
    // access_token:JWT json web token

    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        client: userData.client ? userData.client : {}
    })
}

let handleSignUp = async(req, res) => {
    let message = await clientService.handleClientSignUp(req.body);
    return res.status(200).json(message);
}

let handleGetAllClient = async(req, res) => {
    let data = await clientService.getAllClient();
    return res.status(200).json({
        errCode: data.errCode,
        errMessage: data.errMessage,
        client: data.client? data.client: {}
    })
}

let handleDeleteClient = async(req, res) => {
    if(req.body.id){
        let data = await clientService.deleteClient(req.body.id);
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
    handleLogin: handleLogin,
    handleSignUp: handleSignUp,
    handleGetAllClient: handleGetAllClient,
    handleDeleteClient: handleDeleteClient
} 