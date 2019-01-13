const stringSimilarity = require('string-similarity');

function findBestMatch(mainString, targetStrings) {
  return stringSimilarity.findBestMatch(mainString, targetStrings)
    .bestMatchIndex;
}

module.exports = { findBestMatch };
