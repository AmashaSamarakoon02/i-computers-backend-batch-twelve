import express from 'express';
import mongoose from 'mongoose';
import studentRouter from './routes/studentsRouter.js';
import userRouter from './routes/userRouter.js';
import authenticateUser from './middlewares/authenticate.js';
import productRouter from './routes/productRouter.js';


const mongoUri="mongodb://admin:1234@ac-rfctgge-shard-00-00.tsppl6x.mongodb.net:27017,ac-rfctgge-shard-00-01.tsppl6x.mongodb.net:27017,ac-rfctgge-shard-00-02.tsppl6x.mongodb.net:27017/?ssl=true&replicaSet=atlas-y066j1-shard-0&authSource=admin&appName=Cluster0"
mongoose.connect(mongoUri).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

 const app = express();
app.use(express.json());

app.use("/users", userRouter);

app.use(authenticateUser);

app.use("/students", studentRouter);

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

