// All API routes
// Sve API rute

const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/',controller.getAllPosts);
router.get('/:postID',controller.getPostByID);
router.get('/search/:searchQuery',controller.searchForPost);
router.post('/',controller.createPost);
router.post('/login',controller.loginSystem);
router.put('/comment',controller.postComment);
router.delete('/:postID',controller.deletePost);

module.exports = router;