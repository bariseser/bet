const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Match = require('./Match');  // Match modelini import ediyoruz

/**
 * @swagger
 * components:
 *   schemas:
 *     createBet:
 *      type: object
 *      properties:
 *        userId:
 *          type: integer
 *          description: userId
 *          example: 1
 *        matchId:
 *          type: integer
 *          description: matchId
 *          items:
 *            type: integer
 *            example: 1
 *        betId:
 *          type: integer
 *          description: bet type
 *          items:
 *            type: integer
 *            example: 1
 *     betResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the request was successful.
 *           example: true
 *         bet:
 *           type: object
 *           properties:
 *             userId:
 *               type: integer
 *               description: The unique identifier for the user placing the bet.
 *               example: 1
 *             matchIds:
 *               type: array
 *               description: A list of match IDs associated with the bet.
 *               items:
 *                 type: integer
 *               example: [3, 4]
 *             createdAt:
 *               type: string
 *               format: date-time
 *               description: The timestamp when the bet was created.
 *               example: "2024-12-28T17:55:05.924Z"
 *     betsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the request was successful.
 *           example: true
 *         bets:
 *           type: array
 *           description: A list of bets placed by users.
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The unique identifier for the bet.
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 description: The unique identifier for the user who placed the bet.
 *                 example: 1
 *               matchIds:
 *                 type: array
 *                 description: A list of match IDs associated with the bet.
 *                 items:
 *                   type: integer
 *                 example: [3, 4]
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: The timestamp when the bet was created.
 *                 example: "2024-12-28T17:55:05.000Z"
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 description: The timestamp when the bet was last updated.
 *                 example: "2024-12-28T17:55:05.000Z"
 *     errorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the request was successful.
 *           example: false
 *         message:
 *           type: string
 *           description: A message describing the error.
 *           example: "Error Message"
 *     validationErrorResponse:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           description: A list of validation errors.
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: The type of the error (e.g., field-level error).
 *                 example: "field"
 *               msg:
 *                 type: string
 *                 description: The error message describing the validation issue.
 *                 example: "Home team is required"
 *               path:
 *                 type: string
 *                 description: The field or path that caused the validation error.
 *                 example: "home_team"
 *               location:
 *                 type: string
 *                 description: The location of the error (e.g., body, query, params).
 *                 example: "body"
 */
const Bet = sequelize.define('bet', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'match_user_unique',
    },
    matchId: {
        type: DataTypes.TINYINT,
        allowNull: false,
        unique: 'match_user_unique',
        references: {
            model: Match,
            key: 'matchId',
        },
    },
    betId: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,
    },
});
Bet.belongsTo(Match, { foreignKey: 'matchId', as: 'match' });

module.exports = Bet;
