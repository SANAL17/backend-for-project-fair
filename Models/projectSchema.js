const mongosoe = require('mongoose')

const projectSchema = new mongosoe.Schema({
    title:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    gitHub:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        required:true
    },
    projectImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
})

const projects = mongosoe.model("project",projectSchema)

module.exports = projects