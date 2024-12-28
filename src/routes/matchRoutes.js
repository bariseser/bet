const express = require('express');
const {createMatch, getMatches} = require('../controllers/matchController');
const { body, validationResult } = require('express-validator');

const validateMatchRequest = [
    body('league').notEmpty().withMessage('League is required'),
    body('home_team').notEmpty().withMessage('Home team is required'),
    body('away_team').notEmpty().withMessage('Away team is required'),
    body('start_time').notEmpty().withMessage('Start time is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const router = express.Router();

/**
 * @swagger
 * /matches:
 *   post:
 *     summary: Create Match Data
 *     tags: [Matches]
 *     description: this endpoint creates new match data on matches table
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/matchRequest'
 *     responses:
 *       '200':
 *         description: A list of matches
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/matchResponse'
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/validationErrorResponse'
 */
router.post('/', validateMatchRequest, createMatch);

/**
 * @swagger
 * /matches:
 *   get:
 *     summary: Get Matches
 *     tags: [Matches]
 *     description: Get Matches
 *     responses:
 *       '200':
 *         description: A list of matches
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/matchesResponse'
 *       '500':
 *         description: Internal server error
 */
router.get('/', getMatches);

module.exports = router;
