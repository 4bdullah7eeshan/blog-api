const asyncHandler = require("express-async-handler");

const getCommentsByPostId = asyncHandler(async (req, res) => {
    const { postId } = req.params; // post id will be needed

});

const createComment = asyncHandler(async (req, res) => {
    const { postId } = req.params;

});

const deleteComment = asyncHandler(async (req, res) => {
    const { id } = req.params; // id of the comment

});

module.exports = {
    getCommentsByPostId,
    createComment,
    deleteComment,
};
