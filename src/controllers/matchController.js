const Match = require('../models/match');

exports.createMatch = async (req, res) => {
    try {
        const { league, home_team, away_team, start_time } = req.body;

        const homeWinRate = (Math.random() * (3 - 1) + 1).toFixed(2);
        const drawRate = (Math.random() * (3 - 1) + 1).toFixed(2);
        const awayWinRate = (Math.random() * (3 - 1) + 1).toFixed(2);

        const match = await Match.create({
            league,
            home_team,
            away_team,
            home_win_rate: homeWinRate,
            draw_rate: drawRate,
            away_win_rate: awayWinRate,
            start_time,
        });

        res.status(201).json({ success: true, match });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while adding a match' });
    }
};

exports.getMatches = async (req, res) => {
    try {
        const matches = await Match.findAll({ order: [['start_time', 'ASC']] }); // Başlama zamanına göre sırala
        res.status(200).json({ success: true, matches });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while retrieving matches.' });
    }
};