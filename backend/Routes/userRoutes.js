// Desc: user routes
import express from "express";
import {signUp, login, considerableCourses, purchaseCourse, allBuyings, updateRating, freeCourses, 
    braintreeTokenController, brainTreePaymentController, courseWithId, 
    courseVideos, purschasedFreeCourse, resetPassword, addComment, getComments, 
    deleteComment, addReply, addFeedback,
    getPosts,
    addPost,
    getPostById} from '../Controller/userController.js'
import authenticateUserJWT from '../Authentication/userAuth.js'
import { me } from "../Controller/adminController.js";

const app = express();

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.get('/courses', authenticateUserJWT, considerableCourses);
userRouter.post('/courses/:courseId', authenticateUserJWT, purchaseCourse);
userRouter.get('/purchasedCourses', authenticateUserJWT, allBuyings);
userRouter.post('/updateRating/:courseId', authenticateUserJWT, updateRating);
userRouter.get('/me', authenticateUserJWT, me);
userRouter.get('/freecourses', authenticateUserJWT, freeCourses)
userRouter.get("/braintree/token", braintreeTokenController);
userRouter.get("/courses/:courseId", authenticateUserJWT, courseWithId)
userRouter.get('/course/videos/:courseId', authenticateUserJWT, courseVideos)
userRouter.post('/purschase/course/:courseId', authenticateUserJWT, purschasedFreeCourse)
userRouter.post('/course/comments/:courseId', authenticateUserJWT, addComment);
userRouter.get('/course/comments/:courseId', authenticateUserJWT, getComments);
userRouter.delete('/course/comments/:courseId/:commentId', authenticateUserJWT, deleteComment);
userRouter.post('/course/comments/replies/:courseId/:commentId', authenticateUserJWT, addReply);
userRouter.delete('/course/comments/replies/:courseId/:commentId/:replyId', authenticateUserJWT, deleteComment);
userRouter.post('/course/feedback/:courseId', authenticateUserJWT,(req, res, next) => {console.log('feedback passed middleware'); next();}, addFeedback);
userRouter.get('/blog', authenticateUserJWT, getPosts);
userRouter.post('/blog', authenticateUserJWT, addPost);
userRouter.get('/blog/:postId', authenticateUserJWT, getPostById);
//payments
userRouter.post("/braintree/payment", authenticateUserJWT,brainTreePaymentController);
userRouter.put('/resetPassword', resetPassword);

export default userRouter;