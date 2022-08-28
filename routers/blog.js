const express = require('express');
const router = express.Router()

const Blog = require('../Models/blogschema');

router.get('/', (req, res) => {
    res.send("Hello blogs");
})


//Add a blog
router.post('/create', async(req, res) => {
    const { title, description } = req.body;
    try {
        const newBlog = await Blog.create({
            title: title,
            description: description
        })
        res.json(newBlog);
    } catch (error) {
        res.status(500).json({ error })
    }
})


//get all blogs
router.get('/allblogs', async(req, res) => {
    const blogs = await Blog.find();
    res.json(blogs);
})


//get blog by id
router.get('/getblog/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ 'error': "Not found" });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error })
    }

})


//update blog
router.put('/updateblog/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const { title, description } = req.body;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ 'error': "Not found" });
        }

        const newBlog = {};

        if (title) {
            newBlog.title = title
        }
        if (description) {
            newBlog.description = description
        }

        let bl = await Blog.findByIdAndUpdate(id, { $set: newBlog }, { new: true });
        res.json(bl);

    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router