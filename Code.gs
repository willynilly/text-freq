
var _ = loadLodash();

/**
 * Returns an array of tokens for a string
 *
 * @param {string} the text to parse 
 * @param {string} the delimiter used for parsing.  By default it is a comma.
 * @return {string[]} 
 */
function WORD_TOKENS(text, delimiter) {
  if (typeof text !== 'string') {
    return [];
  }
  if (delimiter === undefined) {
    delimiter = ',';
  }
  var tokens = text.trim().toLowerCase().split(delimiter);
  tokens = _.filter(_.uniq(_.map(tokens, function(token){return token.trim();})), function(token) { return token !== null && token !== undefined && token !== ''}).sort(); 
  return tokens;
}


/**
 * Returns a word frequency dictionary
 *
 * @param {string} text The string to be analyzed for word frequencies
 * @param {string} the delimiter used for parsing.  By default it is a comma.
 * @return {Object} 
 */
function WORD_FREQS(text, delimiter) {
  var words = WORD_TOKENS(text, delimiter);
  var freqs = _.transform(words, function(result, word) {
    if (!(word in result)) {
      result[word] = 0;
    }
    result[word]++;
  }, {});
  return freqs;
}

/**
 * Returns word frequencies of a string as a comma separated string
 *
 * @param {string} text The string to be analyzed for word frequencies
 * @param {string} the delimiter used for parsing.  By default it is a comma.
 * @param {string} the delimiter used for output.  By default it is a comma followed by a space.
 * @return {string} 
 */
function WORD_FREQS_TO_STRING(text, inputDelimiter, outputDelimiter) {
  if (outputDelimiter === undefined) {
    outputDelimiter = ', ';
  }
  var freqs = WORD_FREQS(text, inputDelimiter);
  return _.map(_.keys(freqs), function(word) {
    return word + ':' + freqs[word];
  }).join(outputDelimiter);
}

/**
 * Returns the sum of word frequencies for an array of target words for a string
 *
 * @param {string} text The string to be analyzed for word frequencies
 * @param {string[]} targetWords  The words to search for and count
 * @param {string} the delimiter used for parsing.  By default it is a comma.
 * @return {string} 
 */
function WORD_FREQS_SUM(text, targetWords, delimiter) {
  if (typeof targetWords !== 'string') {
    return null;
  }
  targetWords = _.uniq(WORD_TOKENS(targetWords, delimiter));
  var freqs = WORD_FREQS(text, delimiter);
  return _.reduce(targetWords, function(result, targetWord) {
    if (targetWord in freqs){
      result += freqs[targetWord];
      return result;
    }
  }, 0);
}

/**
 * Returns word frequencies of a string as a JSON string
 *
 * @param {string} text The string to be analyzed for word frequencies
 * @param {string} the delimiter used for parsing.  By default it is a comma.
 * @param {string} the string used for spacing the JSON output string. By default it is a string composed of 4 spaces.
 * @return {string} 
 */
function WORD_FREQS_TO_JSON(text, delimiter, spacing) {
  if (spacing === undefined) {
    spacing = '    ';
  }
  var freqs = WORD_FREQS(text, delimiter);
  return JSON.stringify(freqs, null, spacing);
}