import { AuthenticationError } from "apollo-server-express";
import User from "../models/User";
import { signToken } from "../services/auth";
//import { Query, trusted } from "mongoose";
//import { deleteBook, getSingleUser, login } from "../controllers/user-controller";

const resolvers = {
    Query: {
        //Get a single user by ID/Username
        getSingleUser: async (_parent: any, { id, username }: { id?: string; username?: string }, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('Not logged in');
            }
            const foundUser = await User.findOne({
                $or: [{_id: id }, { username }],
            });

            if (!foundUser) {
                throw new Error('Cannot find a user with this id or username!');
            }

            return foundUser;
        },
    },

    Mutation: {
        //Create a new user and return a token
        createUser: async (_parent: any, { username, email, password }: { username: string; email: string; password: string }) => {
            const user = await User.create({ username, email, password });
            if (!user) {
                throw new Error('Something went wron while create the user');
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        //Log in a user and return a token
        login: async (_parent: any, { username, email, password }: { username?: string, email: string; password: string }) => {
            const user = await User.findOne({ 
                $or: [{ username }, { email }] 
            });

            if (!user) {
                throw new AuthenticationError('Cannot find this user');
            }

            const isPasswordValid = await user.isCorrectPassword(password);
            if (!isPasswordValid) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        //Save a book to user's savedBooks list
        saveBook: async (_parent: any, { book }: { book: any }, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: book } },
                { new: true, runValidators: true}
            );

            if (!updatedUser) {
                throw new Error('Could not save book');
            }

            return updatedUser;
    },

    //Remove a book from user's savedBooks list
    deleteBook: async (_parent: any, { bookId }: { bookId: string }, context: any) => {
        if (!context.user) {
            throw new AuthenticationError('You need to be logged in!');
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true}
        );
        if (!updatedUser) {
            throw new Error('No user with this id found.');
        }

        return updatedUser;
    },
    },
};

export default resolvers;