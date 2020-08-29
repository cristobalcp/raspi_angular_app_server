// Hemos de correr los comandos tsc -w y nodemon javascript/ 
// siempre, si queremos ver los cambios on live (2 terminales)
import Server from "./classes/server";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import fileupload from "express-fileupload";
import cors from 'cors';

// Import Routes
import userRoutes from "./routes/user";
import contactRoutes from "./routes/contact";
import imageRoutes from "./routes/img";
import aboutMeRoutes from "./routes/about_me";
import techRoutes from "./routes/technology";
import newRoutes from "./routes/new";

const server = new Server();

// Body Parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// Cors
server.app.use(cors({ origin: true, credentials: true }));

// File Upload
server.app.use(fileupload());

// Routes 
server.app.use('/user', userRoutes);
server.app.use('/contact', contactRoutes);
server.app.use('/image', imageRoutes);
server.app.use('/about', aboutMeRoutes);
server.app.use('/tech', techRoutes);
server.app.use('/new', newRoutes);

// Connect BBDD
mongoose.connect(
    'mongodb://localhost:27017/RaspiAppBD',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) throw 'err';
        console.log('RaspiAppBD OnLine');
    }
);

// Start Server
server.start(() => { console.log(`Servidor raspi_app_server corriendo en el puerto ${server.port}`) }); 