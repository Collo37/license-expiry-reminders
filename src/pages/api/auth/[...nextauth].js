import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
// import clientPromise from "@/database/connectDB";

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                
            },
            pages: {
                signIn: "/auth/signin",
                error: "/auth/signin"
            },
            authorize(credentials, req){
                try{
                    const connectDB = async () => {
                        const uri = process.env.DATABASE_URL;
                        const options = {
                            useUnifiedTopology: true,
                            useNewUrlParser: true
                        };
                        
                        const client = new MongoClient(uri, options);
                    }

                    connectDB();
                    
                    const { email, password } = credentials;
                    console.log(email, password);
                    // get user and password from database

                    // dummy usernames
                    const user = {
                        email: "test@test.com",
                        password: "1234567890",
                    };

                    if(user.email === email &&  user.password === password) {
                        return {
                            status: "success",
                            id: "1234",
                            name: "Collins Oduor"
                        }
                    } 
                } catch(error) {
                    console.log(error)
                    throw new Error(error);
                }
            }
        })
    ]
};

export default NextAuth(authOptions);