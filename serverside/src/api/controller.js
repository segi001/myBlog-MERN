// All API route functions
// Sve funkcije ruta API-ja

const monk = require('monk');              
const Joi = require('@hapi/joi');
const SRS = require('secure-random-string');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

// Calling the database and collections
// Poziv base podataka i kolekcija baze
const db = monk(process.env.MONGO_URI);
const blogPosts = db.get('posts');
const adminUser = db.get('admin');

// Schemes written using @hapi/joi library for validating data before initial database control
// Seme pisane uz pomoc @hapi/joi bibliokete za verfikaciju poslatih podaktaka pre nego sto udju u bazu podataka
const blogPostSchema = Joi.object({
  title : Joi.string().required(),
  content : Joi.string().required(),
  date : Joi.string().required(),
  tags : Joi.array().required(),
  comments : Joi.array().required(),
  views : Joi.number().required(),
});

const blogPostCommentSchema = Joi.object({
    token : Joi.string().required(),
    postID : Joi.string().required(),
    name : Joi.string().required(),
    comment : Joi.string().required(),
});

const adminSchema = Joi.object({
    username : Joi.string().trim().required(),
    password : Joi.string().trim().required()
})

exports.getAllPosts = async (req,res,next) => {
    try {
        const items = await blogPosts.find({});
        res.json(items);
    } catch (err) {
        next(err);
    }
}
exports.getPostByID = async (req,res,next) => {
    try {
        const { postID } = req.params;
        const item = await blogPosts.findOne({_id:postID});
        const currentViewCount = await blogPosts.findOne({_id:postID},'views');
        // Increase number of post views everytime GET request is succesful
        // Broj pregleda se poveca svaki put kada je GET zahtev uspesan
        await blogPosts.findOneAndUpdate({_id:postID},{$set : {views : currentViewCount.views += 1}});
        res.json(item);
    } catch (err) {
        next(err);
    }
}
exports.searchForPost = async (req,res,next) => {
    try {
        const {searchQuery} = req.params;
        const items = await blogPosts.find({title:{$gt : searchQuery}});
        res.json(items);
    } catch (err) {
        next(err);
    }
}
exports.createPost = async (req,res,next) => {
    try {
        const validatedValue = await blogPostSchema.validateAsync(req.body);
        await blogPosts.insert(validatedValue);
        res.send(200);
    } catch (err) {
        next(err);
    }
}
exports.postComment = async (req,res,next) => {
    try {
        const commentToken = SRS({length:5});
        req.body['token'] = commentToken;
        const validateComment = await blogPostCommentSchema.validateAsync(req.body);
        await blogPosts.findOneAndUpdate({_id:req.body.postID},{$push : {comments : validateComment}});
        res.send(200);
    } catch (err) {
        next(err);
    }
}
exports.deletePost = async (req,res,next) => {
    try {
        const {postID} = req.params;
        await blogPosts.findOneAndDelete({_id:postID});
        res.send(200);
    } catch (err) {
        next(err);
    }
}
exports.loginSystem = async (req,res,next) => {
    try {
        // Checking initial data sent and if its good we are going to retrieve informations from database
        // Provera poslatih podataka i ako su validni mozemo nastaviti preuzimanje podataka iz baze podataka
        const value = await adminSchema.validateAsync(req.body);
        const doc = await adminUser.findOne({username:'admin'});
        // Using given algorithm and given secret key to generate encrypted value for password
        // Koriscenje algoritma i tajnog kljuca da bi kreirali bezbednu informaciju 
        const algorithm = 'aes-256-ctr';
        const secretKey = process.env.SECRET_KEY;
    
        if (doc.username != value.username) { // If username is not valid send an 403 status / Ako username polje nije validno poslati 403
            res.json({status:403});
        } else {
            // Decryption of password value saved in database
            // Dekripcija sifre sacuvane u bazi podataka
            const decipher = crypto.createDecipheriv(algorithm,secretKey,Buffer.from(doc.iv,'hex')); 
            const decrypted = Buffer.concat([decipher.update(Buffer.from(doc.password,'hex')),decipher.final()]);
            // Final password retrived from the database
            // Konacna sifra 
            const passToString = decrypted.toString();
            if (passToString != value.password) { // If password is not valid send an 403 status / Ako password polje nije validno poslati 403
                res.json({status:403});
            } else {
                const payload = {
                    token : crypto.randomBytes(64).toString('hex'), // Creation of AUTHTOKEN cookie / Kreacija AUTHTOKEN kolacica
                };
                const token = jwt.sign(payload,'shhhhh'); // Converting it to JSON Web Token / Konvercija u JSON Web Token
                // Final JSON response with 200 status
                // Konacan JSON odgovor sa 200 statusom
                res.json({ 
                    status : 200,
                    token : token
                });
            }
        }
    } catch (err) {
        next(err);
    }
}