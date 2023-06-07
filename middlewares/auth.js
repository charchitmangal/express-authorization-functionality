const jwt = require("jsonwebtoken");
require("dotenv").config;

exports.auth = (req, res, next) => {
    try{
        const token=req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer", "");
 
        if(!token || token===undefined) {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
                message:error.message
            })
        }

        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;

        } catch(error){
            return res.status(401).json({
                success:false,
                message:'Invalid Token'
            });
        }

        next();
    } catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went Wrong, while verifying token'
        });
    }
}

exports.isStudent = (req, res, next) => {
    try{
        if(req.user.role !== 'Student'){
            return res.status(401).json({
                success:false,
                message:'This is PROTECTED route for students'
        })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:'User role cannot be verified'
        });
    }
}

exports.isAdmin = (req, res, next) => {
    try{
        if(req.user.role !== 'Admin'){
            return res.status(401).json({
                success:false,
                message:'This is PROTECTED route for students'
        })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:'User role cannot be verified'
        });
    }
}




