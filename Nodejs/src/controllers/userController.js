import userService from "../services/userService";
let handleLogin =  async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    
    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    // check email exist(ton tai)
    // compare password(kiem tra dung mk k)
    // return userInfor
    // access_token:JWT json web token

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleCreatNewUser = async(req, res) => {
    let userData = await userService.creatNewUser(req.body);
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
    });
}

let handleGetAllUser = async(req, res) => {
    let data = await userService.getAllUser();
    return res.status(200).json({
        errCode: data.errCode,
        errMessage: data.errMessage,
        user: data.user? data.user: {}
    })
}

let handleUpdateUser = async(req, res) => {
    let data = await userService.updateUser(req.body);
    return res.status(200).json({
        errCode: data.errCode,
        errMessage: data.errMessage,
        udUser: data.udUser
    });
}

let handleDeleteUser = async(req, res) => {
    if(req.body.id){
        let data = await userService.deleteUser(req.body.id);
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
    handleCreatNewUser: handleCreatNewUser,
    handleGetAllUser: handleGetAllUser,
    handleUpdateUser: handleUpdateUser,
    handleDeleteUser: handleDeleteUser
} 