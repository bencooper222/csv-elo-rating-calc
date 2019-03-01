const elo = require('elo-rating');
// maybe graduate k?
exports.createLeagueEloRankings = (leagueRecords, start = 750, k = 30) => {
  const leagueName = Object.keys(leagueRecords)[0];
  return {
    [leagueName]: leagueRecords[leagueName].reduce(
      (acc, { firstTeam, secondTeam, week, game, winner }) => {
        const genericObj = { week, game };
        if (acc[firstTeam] == null)
          acc[firstTeam] = [
            Object.assign({ elo: start }, { week: 1, game: 0 }),
          ];
        if (acc[secondTeam] == null)
          acc[secondTeam] = [
            Object.assign({ elo: start }, { week: 1, game: 0 }),
          ];

        const firstTeamStartElo = acc[firstTeam][acc[firstTeam].length - 1].elo,
          secondTeamStartElo = acc[secondTeam][acc[secondTeam].length - 1].elo;

        const firstTeamObj = Object.assign({}, genericObj),
          secondTeamObj = Object.assign({}, genericObj);

        const eloResult = elo.calculate(
          firstTeamStartElo,
          secondTeamStartElo,
          winner,
          k,
        );
        if (firstTeam === 'Fnatic' || secondTeam === 'Fnatic')
          console.log(
            firstTeam,
            secondTeam,
            winner,
            firstTeamStartElo,
            secondTeamStartElo,
            eloResult,
          );

        firstTeamObj.elo = eloResult.playerRating;
        secondTeamObj.elo = eloResult.opponentRating;

        acc[firstTeam].push(firstTeamObj);
        acc[secondTeam].push(secondTeamObj);

        return acc;
      },
      {},
    ),
  };
};
