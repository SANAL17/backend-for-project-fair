const express =  require('express')

const UserController= require('../Controllers/UserControler')
const projectController = require('../Controllers/ProjectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

//create router object  of express to define path
const router = new express.Router()

//Using router object to define path

//Register API  http://localhost:4000/register - frontend

router.post('/register',UserController.register)

// login API  http://localhost:4000/login
router.post('/login',UserController.login)

// Add user projectApi http://localhost:4000/project/add
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)


// get all user projects path http://localhost:4000/project/all-user-projects
router.get('/project/all-user-projects',jwtMiddleware,projectController.getAllUserProjects)

// get all  projects path http://localhost:4000/project/all-project
router.get('/project/all-project',jwtMiddleware,projectController.getAllProjects)



// get home project path http://localhost:4000/project/home-project
router.get('/project/home-project',projectController.getHomeProjects)

// update project  http://localhost:4000/project/update-project/5578989
router.put('/project/update-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.updateProject)

// delete project  http://localhost:4000/project/delete-project/:pid
router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteProject)




module.exports = router