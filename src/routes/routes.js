const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const UserController = require('../Controller/UserController');
const PostController = require('../Controller/PostController');
const BraintreeController = require('../Controller/BraintreeController');
const TransactionController = require('../Controller/TransactionController');
const BundleController = require('../Controller/BundleController');
const CommentController = require('../Controller/CommentController');
const multer = require('multer');

const uploadConfig = require('../config/config');
const upload = multer(uploadConfig);

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);
router.post('/findUser', UserController.findUser);
router.post('/findEmail', UserController.findEmail);
router.patch('/account/:user', [auth, upload.single('file')], UserController.updateUserProfile);
router.patch('/user', auth, UserController.patchUser);
router.get('/profile/:user', UserController.getUserProfile);
router.get('/user/:username', auth, UserController.retrieveUserData);
router.get('/creators', UserController.getCreators);
router.get('/me', auth, UserController.getMe);

router.post('/fakeData', UserController.fakeUsers);

router.post('/subscribe', auth, UserController.subscribe);
router.post('/unsubscribe', auth, UserController.unsubscribe);
router.post('/posts', [auth, upload.single('file')], PostController.store);
router.get('/posts/filter/:category', auth, PostController.getAllPosts);
router.get('/posts/:postId', auth, PostController.getPost);
router.patch('/posts/:id', [auth, upload.single('file')], PostController.editPost);
router.delete('/posts/:id', auth, PostController.deletePost);
router.patch('/posts/:id/like', auth, PostController.likePost);
router.patch('/posts/:id/unlike', auth, PostController.unlikePost);
router.post('/posts/:id/comment', auth, CommentController.comment);
router.get('/posts/:id/comments', auth, CommentController.index);
router.delete('/posts/:id/comments/:commentId', auth, CommentController.delete);
router.get('/profile/:user/posts', PostController.userPosts);
router.get('/posts', auth, PostController.index);

router.get('/client_token', auth, BraintreeController.generateCustomerToken);
router.post('/purchase/:nonce', auth, BraintreeController.createPaymentMethod);
router.post('/purchase/complete/:nonce', auth, BraintreeController.completePayment);

router.get('/transactions', auth, TransactionController.index);
router.get('/revenue', auth, TransactionController.revenueIndex);

router.post('/bundles', auth, BundleController.store);
router.get('/bundles', auth, BundleController.index);
router.patch('/bundles/:id', auth, BundleController.update);
router.delete('/bundles/:id', auth, BundleController.delete);



module.exports = router;