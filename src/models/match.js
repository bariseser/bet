const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * @swagger
 * components:
 *   schemas:
 *     matchRequest:
 *       type: object
 *       properties:
 *         league:
 *           type: string
 *           description: league
 *           required: true
 *         home_team:
 *           type: string
 *           description: home_team
 *           required: true
 *         away_team:
 *           type: string
 *           description: away_team
 *           required: true
 *         start_time:
 *           type: string
 *           format: date-time
 *           description: start_time
 *           required: true
 *     matchResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the request was successful
 *           example: true
 *         match:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The unique identifier for the match
 *               example: 2
 *             league:
 *               type: string
 *               description: The league name
 *               example: "Premier League"
 *             home_team:
 *               type: string
 *               description: The home team
 *               example: "arsenal"
 *             away_team:
 *               type: string
 *               description: The away team
 *               example: "fulham"
 *             home_win_rate:
 *               type: string
 *               description: The win rate for the home team
 *               example: "2.78"
 *             draw_rate:
 *               type: string
 *               description: The draw rate
 *               example: "1.50"
 *             away_win_rate:
 *               type: string
 *               description: The win rate for the away team
 *               example: "1.53"
 *             start_time:
 *               type: string
 *               format: date-time
 *               description: The match start time
 *               example: "2024-12-30T19:30:00.000Z"
 *             createdAt:
 *               type: string
 *               format: date-time
 *               description: The match creation timestamp
 *               example: "2024-12-28T17:21:52.055Z"
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               description: The match last updated timestamp
 *               example: "2024-12-28T17:21:52.055Z"
 *     matchesResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the request was successful
 *           example: true
 *         match:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The unique identifier for the match
 *                 example: 2
 *               league:
 *                 type: string
 *                 description: The league name
 *                 example: "Premier League"
 *               home_team:
 *                 type: string
 *                 description: The home team
 *                 example: "arsenal"
 *               away_team:
 *                 type: string
 *                 description: The away team
 *                 example: "fulham"
 *               home_win_rate:
 *                 type: string
 *                 description: The win rate for the home team
 *                 example: "2.78"
 *               draw_rate:
 *                 type: string
 *                 description: The draw rate
 *                 example: "1.50"
 *               away_win_rate:
 *                 type: string
 *                 description: The win rate for the away team
 *                 example: "1.53"
 *               start_time:
 *                 type: string
 *                 format: date-time
 *                 description: The match start time
 *                 example: "2024-12-30T19:30:00.000Z"
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: The match creation timestamp
 *                 example: "2024-12-28T17:21:52.055Z"
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 description: The match last updated timestamp
 *                 example: "2024-12-28T17:21:52.055Z"
 */
const Match = sequelize.define('matches', {
    league: DataTypes.STRING,
    home_team: DataTypes.STRING,
    away_team: DataTypes.STRING,
    home_win_rate: DataTypes.FLOAT,
    draw_rate: DataTypes.FLOAT,
    away_win_rate: DataTypes.FLOAT,
    start_time: DataTypes.DATE,
});

module.exports = Match;