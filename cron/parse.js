const parse = require('csv-parse/lib/sync');
const fs = require('fs-extra');

exports.createTeamGameRecords = (path = 'cdon/data.csv', writePath = false) => {
  const rawRecords = parse(fs.readFileSync(path), {
    columns: true,
    skip_empty_lines: true,
  });

  const parsedRecords = {};
  for (let i = 10; i < rawRecords.length; ) {
    const el = rawRecords[i];
    const isFirst = el.playerid === '100';
    if (!(isFirst || el.playerid === '200'))
      throw new Error('Records are invalid');

    const thisGame = isFirst
      ? {}
      : parsedRecords[el.league][parsedRecords[el.league].length - 1];
    thisGame[isFirst ? 'firstTeam' : 'secondTeam'] = el.team;
    if (isFirst) {
      thisGame.winner = el.result === '1'; // did the first team win?
      thisGame.week = el.week;
      thisGame.game = el.game;
      if (parsedRecords[el.league] == null)
        parsedRecords[el.league] = [thisGame];
      else parsedRecords[el.league].push(thisGame);
    }

    if (isFirst) i++;
    else i += 11;
  }

  Object.keys(parsedRecords).forEach(league =>
    parsedRecords[league].sort((a, b) =>
      a.week === b.week ? a.game - b.game : a.week - b.week,
    ),
  );
  if (writePath) fs.writeFileSync(writePath, JSON.stringify(parsedRecords));
  return parsedRecords;
};
