import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Db is connected")
    } catch (error) {
        console.error("Something went worng with DB", error)
    }
}

export default connectDB