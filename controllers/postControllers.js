const asyncHandler = require("express-async-handler");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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
    const { title, content } = req.body;
    
    if (!title || !content) {
        res.status(400).json({ message: "Title and content are required" });
        return;
    }

    const post = await prisma.post.create({
        data: {
            title,
            content,
            authorId: req.user.id,
        },
    });

    res.status(201).json(post);

});

const updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content, published } = req.body;

    const post = await prisma.post.findUnique({
        where: { id: Number(id) },
    });

    if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
    }

    if (post.authorId !== req.user.id && req.user.role !== 'AUTHOR') {
        res.status(403).json({ message: "You are not authorized to edit this post" });
        return;
    }

    const updatedPost = await prisma.post.update({
        where: { id: Number(id) },
        data: {
            title: title || post.title,
            content: content || post.content,
            published: published !== undefined ? published : post.published,
        },
    });

    res.status(200).json(updatedPost);

});

const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
        where: { id: Number(id) },
    });

    if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
    }

    if (post.authorId !== req.user.id && req.user.role !== 'AUTHOR') {
        res.status(403).json({ message: "You are not authorized to delete this post" });
        return;
    }

    await prisma.post.delete({
        where: { id: Number(id) },
    });

    res.status(200).json({ message: "Post deleted successfully" });

});

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
