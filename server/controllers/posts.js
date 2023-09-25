import Post from "../models/Post.js"
import User from "../models/User.js"


//Create
export const createPost = async(req, res)=>{
    try{
        const {userId, description, picturePath } = req.body;
        const user = await User.findById({userId});
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);

    }catch(error){
        res.status(409).json({message: error.message, comment: "Not able to create post"});
    }
}

//Read 
export const getFeedPosts = async (req,res)=>{
    try{
        const post = await Post.find();
        res.status(200).json(post);
    }catch(error){
        res.status(404).json({message: error.message, comment: "Problem in getFeedPosts function in controller/posts.js"});
    }
}

export const getUserPosts = async (req, res)=>{
    try{
        const {userId} = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);
    }catch(error){
        res.status(404).json({message: error.message, comment: "Problem in getUserPosts function in controllers/posts.js"})
    }
}

//Update
export const likePost= async(req, res)=>{
    try{
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            postMessage.likes.delete(userId);
        }else{
            post.liked.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes : post.likes},
            {new: true}
        )

        res.status(200).json(updatedPost);

    }catch(error){
        res.status(404).json({message: error.message, comment: "Problem in likePost function in controllers/posts.js"})
    }
}