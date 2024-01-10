import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const SIGN_UP = async ( req, res) => {
 try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email format.' });
}
 
if (!password || password.length < 6 || !/\d/.test(password)) {
   return res.status(400).json({ message: 'Invalid password format.' });
}


    
    const user = new UserModel(
        {
            name: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1),
            email: req.body.email,
            password: hash,
            money_balance: req.body.money_balance
        }
    );
    const response = await user.save();
    const token = jwt.sign({ email: user.email, id: user._id}, process.env.JWT_SECRET, { expiresIn: "2h"});
    const refreshToken = jwt.sign({ email: user.email, id: user._id}, process.env.JWT_SECRET, { expiresIn: "24h"});

    return res.status(201).json( {message: "You signed up!", jwt: token, jwt_refresh: refreshToken });
 } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Oooops something went wrong!"})
 }    
};


const LOGIN = async ( req, res) => {
    try {
       const user = await UserModel.findOne({email: req.body.email});

       if(!user){
         return res.status(403).json({ message: "Bad autho!"})
       }

       const isPasswordMatch = bcrypt.compareSync(req.body.password, user.password);

       if(!isPasswordMatch) {
         return res.status(403).json({ message: "Email and password doesnt match!"})
       };

       const token = jwt.sign({ email: user.email, id: user._id}, process.env.JWT_SECRET, { expiresIn: "12h"});
       const refreshToken = jwt.sign({ email: user.email, id: user._id}, process.env.JWT_SECRET, { expiresIn: "24h"});

       return res.status(200).json({ token: token, refreshToken: refreshToken});

    } catch (err) {
       console.log(err);
       return res.status(500).json({ message: "Oooops something went wrong!"})
    }    
   };

  const TOKEN_REFRESH = async (req, res) => {
   try {
      const token = req.headers.authorization;
      if (!token){
         return res.status(401).json({message: "Please share valid Token!"});
     }

     const decodeToken = jwt.verify(token, process.env.JWT_SECRET);


     const newToken = jwt.sign({ email: decodeToken.email, id: decodeToken._id}, process.env.JWT_SECRET, { expiresIn: "12h"});
     return res.status(200).json({ token: newToken});

   }  catch (err) {
      console.log(err);
      if (err.name === 'TokenExpiredError') {
         return res.status(401).json({ message: "Token has expired. Please login again!" });
     }
      return res.status(500).json({ message: "Oooops something went wrong!"})
   }    
  };

  const GET_ALL_USERS = async (req, res) => {
    try {
     
      const users = await UserModel.find().sort({ name: 1 });
      return res.status(200).json({ users });


    } catch (err) {
      console.log(err);
      return res.status(404).json({ message: "Oooops something went wrong!"})
   }    
  }


  const GET_USER_BY_ID = async (req, res) => {
try{
   const user = await UserModel.findById(req.params.id)
   return res.status(200).json({user})

} catch (err) {
   console.log(err);
   return res.status(404).json({ message: "Oooops something went wrong!"})
}    

  };


 


export { SIGN_UP, LOGIN, TOKEN_REFRESH, GET_ALL_USERS, GET_USER_BY_ID,  };