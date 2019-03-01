const { createTeamGameRecords } = require('./parse'),
  { createLeagueEloRankings } = require('./eloGenerator');

(() => {
  const parsedRecords = createTeamGameRecords('cron/data.csv');

  const eloRecords = Object.keys(parsedRecords).map(league =>
    league === 'LEC'
      ? createLeagueEloRankings({ [league]: parsedRecords[league] }, 2800, 40)
      : {},
  );
  console.log(eloRecords);
  require('fs').writeFileSync(
    'display/data/elo.json',
    JSON.stringify(eloRecords),
  );
})();
