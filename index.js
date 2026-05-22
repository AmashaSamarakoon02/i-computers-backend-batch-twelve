import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import authenticateUser from './middlewares/authenticate.js';
import productRouter from './routes/productRouter.js';
import dotenv from 'dotenv';
dotenv.config();

const mongoUri=process.env.MONGO_URI;
mongoose.connect(mongoUri).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

 const app = express();
app.use(express.json());

app.use("/users", userRouter);

app.use(authenticateUser);

app.use("/products", productRouter);

// app.get("/", 
//     ()=>{ //arrow function
//         console.log('Get request received');
//     }
// )

// app.get("/about", 
//     ()=>{ //arrow function
//         console.log('About page request received');
//     }
// )


app.listen(3000, 
    ()=>{ //arrow function
        console.log('Server is running');
    }
)

// app.get("/", 
//     ()=>{ //arrow function
//         console.log('Get request received');
//     }
// )

