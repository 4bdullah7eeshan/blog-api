const asyncHandler = require("express-async-handler");

const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await prisma.post.findMany({
        include: {
            author: true,
            comments: true,
        },
    });

    res.status(200).json(posts);

});

const getPostById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
        where: { id: Number(id) },
        include: {
            author: true,
            comments: true,
        },
    });

    if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
    }
    
    res.status(200).json(post);
    
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
