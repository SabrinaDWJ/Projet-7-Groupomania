// Création des actions pour le modèle "post"
const Post = require('../models/Post');


// Ajout d'un post
exports.createPost = async (req, res) => {
    try {
        const postObject = JSON.parse(req.body);
        delete postObject._id;
        let post = new Post({
            postId: postObject.postId,
            message: postObject.message,
            picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            created: postObject.created,
            createdBy: postObject.createdBy,
            likes: 0,
            usersLiked: []
        });
        await post.save();
        return res.status(201).json({ message: "Post enregistrée !" })
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal error");
    };
}

// Récupération des informations de tous les posts
exports.getAllPosts = async (req, res) => {
    try {
        let post = await Post.find();
        return res.status(200).json(post);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal error");
    }
};

// Modification des informations d'un post
exports.modifyPost = async (req, res) => {
    try {
        let postObject = req.body;
        if (req.file) {
            let post = await Post.findOne({ _id: req.params.id });
            await fs.unlink(`images/${post.picture.split('/images/')[1]}`);
            postObject.picture = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }
        await Post.updateOne({ _id: req.params.id }, {
            postId: postObject.postId,
            message: postObject.message,
        });
        return res.status(200).json({ message: 'Post modifiée !' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur interne !' });
    }
};

// Suppression d'un post 
exports.deletePost = async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id })
        const filename = post.picture.split("/images/")[1];
        await fs.unlink(`images/${filename}`)
        await post.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: "Post supprimée !" });
        ;
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal error");
    }
}

exports.likePost = async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id });
        if (!post) {
            throw res.status(404).json({ message: 'Post introuvable !' });
        }
        switch (req.body.like) {
            // Si le client Like cet post 
            case 1:
                if (!post.usersLiked.includes(req.body.userId)) {
                    // mise à jour du post
                    await post.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { likes: 1 },
                            $push: { usersLiked: req.body.userId }
                        }
                    )
                }
                break;
            // Si le client annule son choix 
            case 0:
                if (post.usersLiked.includes(req.body.userId)) {
                    // mise à jour de la sauce
                    await Post.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: req.body.userId }
                        }
                    )
                }
                break;
        }
        return res.status(200).json({ message: 'Like mis à jour !' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur interne !' });
    }
};