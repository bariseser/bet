const express = require('express');
const { createBet, getBets, getBetById, deleteBet } = require('../controllers/betController');
const { body, validationResult } = require('express-validator');

const validateBetRequest = [
    body('userId').notEmpty().withMessage('userId is required'),
    body('matchId').notEmpty().withMessage('matchId is required'),
    body('betId').notEmpty().isIn([1,2,3]).withMessage('betId is not valid'),
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
 * /bets:
 *   post:
 *     summary: Create Bet
 *     tags: [Bets]
 *     description: this endpoint creates new bet
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createBet'
 *     responses:
 *       '200':
 *         description: response of createBet request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/betResponse'
 *       '500':
 *         description: Internal server error
 *       '404':
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/validationErrorResponse'
 */
router.post('/', validateBetRequest, createBet);

/**
 * @swagger
 * /bets/:userId:
 *   get:
 *     summary: Get User Bet
 *     tags: [Bets]
 *     description: this endpoint creates new bet
 *     responses:
 *       '200':
 *         description: response of user bets
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/betsResponse'
 *       '500':
 *         description: Internal server error
 *       '404':
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 */
router.get('/:userId', getBets);

/**
 * @swagger
 * /bets/detail/:id:
 *   get:
 *     summary: Get Bet Detail
 *     tags: [Bets]
 *     description: this endpoint get bet detail
 *     responses:
 *       '200':
 *         description: response of bet detail
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/betResponse'
 *       '500':
 *         description: Internal server error
 *       '404':
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 */
router.get('/detail/:betId', getBetById);

router.delete('/:betId', deleteBet);

module.exports = router;
