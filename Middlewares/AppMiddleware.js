const appMidlleware= (req,res,next)=>{
    console.log("inside the application midleware");
    next()
}

module.exports=appMidlleware