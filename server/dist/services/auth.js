import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
//Verify the token and add the user to the request object
// export const authenticateToken = (token: string | undefined) => {
//   if (!token) {
//     return null;
//   }
//   try {
//     const secretKey = process.env.JWT_SECRET_KEY || '';
//     const decoded = jwt.verify(token.replace('Bearer', ''), secretKey) as JwtPayload;
//     return decoded;
//   } catch (error) {
//     console.error('Invalid token', error);
//     return null;
//   }
// };
// //Function to sign a token 
// export const signToken = (username: string, email: string, _id: unknown) => {
//   const payload = { username, email, _id };
//   const secretKey = process.env.JWT_SECRET_KEY || '';
//   return jwt.sign(payload, secretKey, { expiresIn: '1h' });
// };
//Middleware-like functiont o extract user from request for Apollo Server
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader); //Log auth header for debugging
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return; //Stop the request here
    }
    const token = authHeader.split(' ')[1]; //Extract the token from "Bearer <token>"
    const secretKey = process.env.JWT_SECRET_KEY || '';
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; //Attach user info to request
        next(); //Proceed to the next middleware/controller
    }
    catch (error) {
        console.error('Invalid token', error);
        res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
};
//Function to Sign a New Token
export const signToken = (username, email, _id) => {
    const payload = { username, email, _id };
    const secretKey = process.env.JWT_SECRET_KEY || '';
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};
// export const contextMiddleware = ({ req }: { req: any }) => {
//   const token = req.headers.authorization?.split(" ")[1] || "";
//   if (!token) return { user: null };
//   try {
//     const secretKey = process.env.JWT_SECRET_KEY || "";
//     const decoded = jwt.verify(token, secretKey) as JwtPayload;
//     return { user: decoded };
//   } catch (error) {
//     console.error("Invalid token", error);
//     return { user: null };
//   }
// };
// export const contextMiddleware = ({ req }: { req: any }) => {
//Extract the token from the request headers
export const contextMiddleware = ({ req }) => {
    const token = req.headers.authorization || '';
    let user = null;
    //Clone the request and response objects
    const reqClone = { headers: { authorization: token }, user: null };
    const resClone = { status: () => ({ json: () => { } }) };
    const next = () => { user = reqClone.user; };
    authenticateToken(reqClone, resClone, next);
    return { user };
};
