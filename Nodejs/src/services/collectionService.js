import collection from "../model/collection"

let handleUserGetDataCollection = (name) => {
    return new Promise(async (resolve, reject) =>{
        try {
            let collectionsData = {}

            if(name === 'ALL'){
                let collections = await collection.find({})
                if(collections) {
                    collectionsData.errCode = 0,
                    collectionsData.errMessage = 'OK',
                    collectionsData.collection = collections
                }
            }else {
                if(name){
                let collection1 = await collection.findOne({
                    name: name
                })
                if(collection1) {
                    collectionsData.errCode = 0,
                    collectionsData.errMessage = 'OK',
                    collectionsData.collection = collection1
                }
            }else {
                    collectionsData.errCode =1,
                    collectionsData.errMessage = 'err',
                    collectionsData.collection = {}
                }
            }
            resolve(collectionsData)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserGetDataCollection
}