const projects = require('../Models/projectSchema')


// add the project details
exports.addUserProject=async (req,res)=>{
    console.log("inside addUserProject");

    // get user id
    const userId = req.payload
    // get projectimage
    const projectImage=req.file.filename
    // get project details
    const {title,language,gitHub,link,overview} = req.body

    // console.log(userId,title,language,gitHub,link,overview,projectImage);

    // logic for adding project
    // res.status(200).json("Add user project request received")
    try{
        //m if github is presnt
        const existingProject = await projects.findOne({gitHub})
        if (existingProject) {
            res.status(402).json("Project allready exist")
            
        }
        else{
            // git is not present in mongodb then create a new project deatails 
            const newProject= new projects({
                title,language,gitHub,link,overview,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    }
    catch(err){
        res.status(404).json({message:err.message})
    }

  
}

// get all user-projects

exports.getAllUserProjects = async (req,res)=>{
    // get user id
    const userId = req.payload;
    // get all projects of particular user
    try{
        //api call
        const userProject = await projects.find({userId})
        res.status(200).json(userProject)


    }
    catch(err){
        res.status(401).json("internal server error " + err.message);

    }

}

// get all projects

exports.getAllProjects= async (req,res)=>{

        const searchKey = req.query.search

        const query ={
            language:{
                 $regex : searchKey,
                 $options : "i"
            }
        }

    try{
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects) // send all projects to frontend

    }
    catch(err){
        res.status(401).json("internal server error " + err.message);

    }
}

// get home project

exports.getHomeProjects = async(req,res)=>{
    try{
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject) // send all projects to frontend

    }
    catch(err){
        res.status(401).json("internal server error " + err.message);

    }
}

// update project details

exports.updateProject=async(req,res)=>{
    const {title,language,gitHub,link,overview,projectImage} = req.body
    const uploadImage = req.file?req.file.filename:projectImage
    userId = req.payload
    const {pid}= req.params
    try{
        const updateProject = await projects.findByIdAndUpdate({_id:pid},{title,language,gitHub,link,overview,projectImage:uploadImage,userId})
        await updateProject.save()
        res.status(200).json(updateProject)
    }catch(err){
        res.status(401).json("internal server error " + err.message);

    }
}

// delete the project
exports.deleteProject = async (req,res)=>{
    const {pid}=req.params;
    try{
        const deleteUserProject = await projects.findOneAndDelete({_id:pid})
        res.status(200).json(deleteUserProject);

    }
    catch(err){
        res.status(401).json("internal server error " + err.message);

    }
}