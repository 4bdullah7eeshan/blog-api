const asyncHandler = require("express-async-handler");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getCommentsByPostId = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const comments = await prisma.comment.findMany({
        where: { postId: Number(postId) },
        include: {
            author: true,
        },
    });

    res.status(200).json(comments);

});

const createComment = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content) {
        res.status(400).json({ message: "Content is required for the comment" });
        return;
    }

    // Handle no post situation
    const post = await prisma.post.findUnique({
        where: { id: Number(postId) },
    });

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    const comment = await prisma.comment.create({
        data: {
            content,
            postId: Number(postId),
            authorId: req.user.id,
            username: req.user.username,
        },
    });

    res.status(201).json(comment);

});

const getCommentById = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const comment = await prisma.comment.findUnique({
        where: { id: Number(commentId) },
        include: {
            author: true,
        },
    });

    if (!comment) {
        res.status(404).json({ message: "Comment not found" });
        return;
    }

    res.status(200).json(comment);

});

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const comment = await prisma.comment.findUnique({
        where: { id: Number(commentId) },
    });

    if (!comment) {
        res.status(404).json({ message: "Comment not found" });
        return;
    }

    await prisma.comment.delete({
        where: { id: Number(id) },
    });

    res.status(200).json({ message: "Comment deleted successfully" });

});

module.exports = {
    getCommentsByPostId,
    createComment,
    getCommentById,
    deleteComment,
};
