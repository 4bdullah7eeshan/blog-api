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

    const comment = await prisma.comment.create({
        data: {
            content,
            postId: Number(postId),
            authorId: req.user.id,
        },
    });

    res.status(201).json(comment);

});

const getCommentById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const comment = await prisma.comment.findUnique({
        where: { id: Number(id) },
        include: {
            author: true,
        },
    });

    res.status(200).json(comment);

});

const deleteComment = asyncHandler(async (req, res) => {
    const { id } = req.params; // id of the comment

});

module.exports = {
    getCommentsByPostId,
    createComment,
    getCommentById,
    deleteComment,
};
