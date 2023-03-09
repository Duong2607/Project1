import e from "express";

import blog from "../model/blog";
let getBlog = () => {
    return new Promise(async (resolve, reject) =>{
        try {
            let blogs = ''
            blogs = await blog.find({})
            resolve(blogs)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getBlog: getBlog,
}