import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie=(userId,res)=>{

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {    
        expiresIn: '30d',
    });
    res.cookie('token', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 24 * 60 * 60 * 1000
    });
    return token
   

}

export default generateTokenAndSetCookie;