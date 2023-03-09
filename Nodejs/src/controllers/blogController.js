import blogService from "../services/blogService"
let handleGetBlog = async(req, res) => {
  
    let blogs = await blogService.getBlog();
 
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        blogs
    })
}

module.exports = {
    handleGetBlog: handleGetBlog,
  
}