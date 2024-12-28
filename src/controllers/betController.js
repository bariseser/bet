const { Op } = require('sequelize');
const Match = require('../models/match');
const Bet = require('../models/bet');

exports.createBet = async (req, res) => {
    try {
        const { matchId, userId, betId } = req.body;

        // Timeout control
        const timeout = parseInt(process.env.BET_TIMEOUT) || 2;

        const matches = await Match.findByPk(matchId);

        if (matches.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid match IDs.' });
        }

        const betTime = new Date().getTime();

        // Timeout control
        if (new Date().getTime() - betTime > timeout * 1000) {
            return res.status(400).json({ success: false, message: 'The timeout period for the coupon has passed.' });
        }

        try {
            const [bet, created] = await Bet.upsert(
                {
                    userId,
                    matchId,
                    betId,
                },
                {
                    where: { matchId, userId },
                }
            );
            res.status(201).json({ success: true, bet });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while creating the coupon.' });
    }
};

exports.getBets = async (req, res) => {
    try {
        const { userId } = req.params;

        const bets = await Bet.findAll({
            where: {userId},
            include: [
                {
                    model: Match,
                    as: 'match',
                },
            ],
        });

        if (bets.length === 0) {
            return res.status(404).json({ success: false, message: 'coupon not found.' });
        }

        res.status(200).json({ success: true, bets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while retrieving coupons.' });
    }
};

exports.getBetById = async (req, res) => {
    try {
        const { betId } = req.params;
        const bet = await Bet.findByPk(betId);

        if (!bet) {
            return res.status(404).json({ success: false, message: 'coupon not found' });
        }

        res.status(200).json({ success: true, bet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while canceling the coupon' });
    }
};

exports.deleteBet = async (req, res) => {
    try {
        const { betId } = req.params;

        const bet = await Bet.findByPk(betId);

        if (!bet) {
            return res.status(404).json({ success: false, message: 'Not found' });
        }

        await bet.destroy();

        res.status(200).json({ success: true, message: 'coupon cancelled.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while canceling the coupon.' });
    }
};