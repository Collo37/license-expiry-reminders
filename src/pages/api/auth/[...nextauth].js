import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
// import clientPromise from "@/database/connectDB";

export const authOptions = {
    session: {
        strategy: "jwt"
    },
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
                        console.log(client);
                    }

                    connectDB();
                    
                    const { email, password } = credentials;
                    // get user and password from database

                    // dummy usernames
                    const user = {
                        email: "cowlduor37@gmail.com",
                        password: "1234567890",
                    };

                    if(user.email === email &&  user.password === password) {
                        return {
                            id: "1234",
                            name: "Collins Oduor"
                        }
                    }
                } catch(error) {
                    throw new Error(error);
                }
            }
        })
    ]
};

export default NextAuth(authOptions);