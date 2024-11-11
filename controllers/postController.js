const asyncHandler = require("express-async-handler");

const getAllPosts = asyncHandler(async (req, res) => {

});

const getPostById = asyncHandler(async (req, res) => {
    const { id } = req.params; // id must be there
    
});

const createPost = asyncHandler(async (req, res) => {

});

const updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params;

});

const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;

});

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
