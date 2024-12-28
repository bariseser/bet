const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./src/config/database');
const matchRoutes = require('./src/routes/matchRoutes');
const betRoutes = require('./src/routes/betRoutes');
const { updateRates } = require('./src/services/socketService');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

app.use(cors({
    origin: '*'
}));

app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bilyoner APP',
            version: '1.0.0',
            description: 'API for Bilyoner',
        },
    },
    apis: ['./src/routes/*.js', './src/models/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/matches', matchRoutes);
app.use('/bets', betRoutes);

sequelize.sync().then(() => {
    server.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
    updateRates(io);
});
