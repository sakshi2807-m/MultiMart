import mongoose from "mongoose";



const connectDB =async(req, res) => {
    mongoose.connection.on("connected", ()=>console.log("Database is Connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/multimart`)
}


export default connectDB
