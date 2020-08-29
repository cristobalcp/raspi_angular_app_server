"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Hemos de correr los comandos tsc -w y nodemon javascript/ 
// siempre, si queremos ver los cambios on live (2 terminales)
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
// Import Routes
const user_1 = __importDefault(require("./routes/user"));
const contact_1 = __importDefault(require("./routes/contact"));
const img_1 = __importDefault(require("./routes/img"));
const about_me_1 = __importDefault(require("./routes/about_me"));
const technology_1 = __importDefault(require("./routes/technology"));
const new_1 = __importDefault(require("./routes/new"));
const server = new server_1.default();
// Body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// Cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
// File Upload
server.app.use(express_fileupload_1.default());
// Routes 
server.app.use('/user', user_1.default);
server.app.use('/contact', contact_1.default);
server.app.use('/image', img_1.default);
server.app.use('/about', about_me_1.default);
server.app.use('/tech', technology_1.default);
server.app.use('/new', new_1.default);
// Connect BBDD
mongoose_1.default.connect('mongodb://localhost:27017/RaspiAppBD', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err)
        throw 'err';
    console.log('RaspiAppBD OnLine');
});
// Start Server
server.start(() => { console.log(`Servidor raspi_app_server corriendo en el puerto ${server.port}`); });
