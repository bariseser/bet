const Match = require('../models/match');

const updateRates = async (io) => {
    setInterval(async () => {
        const matches = await Match.findAll();

        for (const match of matches) {
            const homeWinRate = (Math.random() * (3 - 1) + 1).toFixed(2);
            const drawRate = (Math.random() * (3 - 1) + 1).toFixed(2);
            const awayWinRate = (Math.random() * (3 - 1) + 1).toFixed(2);

            await match.update({
                home_win_rate: homeWinRate,
                draw_rate: drawRate,
                away_win_rate: awayWinRate,
            });

            io.emit('rateUpdate', {
                match_id: match.id,
                home_team: match.home_team,
                away_team: match.away_team,
                rates: { homeWinRate, drawRate, awayWinRate },
            });
        }
    }, 1000);
};

module.exports = { updateRates };
