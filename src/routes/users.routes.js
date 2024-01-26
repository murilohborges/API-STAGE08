const { Router, request, response } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload.js");

const UsersController = require("../controllers/UsersController.js");
const UserAvatarController = require("../controllers/UserAvatarController.js");
const ensureAuthenticaded = require("../middlewares/ensureAuthenticaded.js")

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

//Essa middleware verifica-se se o usuário é um administrador, caso ela seja usada, deve ser colocada na rota post do usersRoutes
// function myMiddleware(request, response, next) {

//   if(!request.body.isAdmin) {
//     return response.json({ "message": "user unauthorized" })
//   }

//   next();
// }


const usersController = new UsersController();
const userAvatarController = new UserAvatarController();


usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticaded, usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticaded, upload.single("avatar"), userAvatarController.update);


module.exports = usersRoutes;