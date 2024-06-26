import { Post } from "../models/posts.model.js"

async function create({ post }){
    return await Post.create(post)
}
async function getAll(){
    return await Post.find().populate("plantId")
}
async function getAllByParams({options}){
    return await Post.find({...options}).populate("plantId")
}
async function getById({id}){
    return await Post.findById(id).populate("plantId")
}
async function updateById({id,newData,populateData}){
    if(populateData)
        return  await Post.findByIdAndUpdate(id, newData, { new: true }).populate("plantId")
    return await Post.findByIdAndUpdate(id, newData, { new: true }).populate("plantId")
}
async function deleteById({id}){
    return await Posts.findByIdAndDelete(id)
}

export {
    create,
    getAll,
    getAllByParams,
    getById,
    updateById,
    deleteById
}