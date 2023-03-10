import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import clothingController from "../controllers/clothingcontroller";
import clientController from "../controllers/clientController";
import blogController from "../controllers/blogController";
import cartController from "../controllers/cartController";
import orderController from "../controllers/orderController";
let router = express.Router();

let initWebRouters = (app) => {
    router.get('/', homeController.getHomePage);



    router.post('/api/login', userController.handleLogin);
    router.post('/api/creat-new-user',userController.handleCreatNewUser);
    router.get('/api/get-all-user',userController.handleGetAllUser );
    router.delete('/api/delete-user',userController.handleDeleteUser);
    router.get('/api/get-all-clothing', clothingController.handleGetAllClothing);
    router.get('/api/get-clothing-by-name', clothingController.handleGetClothing);
    router.get('/api/get-clothing-by-type',clothingController.handleGetClothingByType);
    router.post('/api/sign-up', clientController.handleSignUp);
    router.post('/api/login-client', clientController.handleLogin);
    router.delete('/api/delete-client',clientController.handleDeleteClient)
    router.get('/api/get-blog', blogController.handleGetBlog);
    router.post('/api/get-cart',cartController.handleGetCart);
    router.post('/api/add-clothing-to-cart', cartController.handleAddClothingToCard);
    router.put('/api/update-cart', cartController.handleUpdateCard);
    router.delete('/api/delete-cart', cartController.handleDeleteCard);
    router.post('/api/add-order',orderController.handleAddOrder);
    router.get('/api/get-all-orders',orderController.handleGetAllOrder);
    router.post('/api/get-orders-by-id',orderController.handleGetOrderById);
    router.delete('/api/delete-all-cart',cartController.handleDeleteAllCart);
    router.post('/api/check-sum-clothing',cartController.handleCheckSumClothing);
    router.put('/api/update-clothing',clothingController.handleUpdateClothing);
    router.delete('/api/delete-clothing',clothingController.handleDeleteClothing);
    router.post('/api/creat-clothing',clothingController.handleCreatClothing);
    router.get('/api/get-all-client',clientController.handleGetAllClient);
    router.get('/login', (req, res) => {
        return res.send('login')
    });
    
    return app.use("/",router);

}

module.exports = initWebRouters;