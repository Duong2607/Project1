import collectionService from "../services/collectionService"
let handleGetDataCollection = async(req, res) => {
    let name = req.body.name;
    if(!name) {
        // return res.status(500).json({
        //     errCode: 1,
        //     errMessage: 'Missing',

 
        // })
        
        let collection = await collectionService.handleUserGetDataCollection('November Collection');

        return res.status(200).json({
        errCode: collection.errCode,
        errMessage: collection.errMessage,
        collection: collection.collection
    })
    }
    let collection = await collectionService.handleUserGetDataCollection(name);

    return res.status(200).json({
        errCode: collection.errCode,
        errMessage: collection.errMessage,
        collection: collection.collection
    })
}

module.exports = {
    handleGetDataCollection: handleGetDataCollection
}