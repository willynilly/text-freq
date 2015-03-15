
var _ = loadLodash();

/**
 * Returns an array of tokens for a string
 *
 * @param {string} the text to parse 
 * @param {string} the delimiter used for parsing.  By default it is a comma.
 * @return {string[]} 
 */
function WORD_TOKENS(text, delimiter) {
  if (!_.isString(text)) {
    return [];
  }
  delimiter = getDelimiterFromInput_(delimiter);
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
  delimiter = getDelimiterFromInput_(delimiter);
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
 * @param {string} text The string or 2d-array of cells containing strings to be analyzed for word frequencies
 * @param {string} the delimiter used for parsing.  By default it is a comma.
 * @param {string} the delimiter used for output.  By default it is a comma followed by a space.
 * @return {string} 
 */
function WORD_FREQS_TO_STRING(text, inputDelimiter, outputDelimiter) {
  inputDelimiter = getDelimiterFromInput_(inputDelimiter, ',');
  text = getTextFromInput_(text, inputDelimiter);
  outputDelimiter = getDelimiterFromInput(outputDelimiter, ', ');
 
  var freqs = WORD_FREQS(text, inputDelimiter);
  return _.map(_.keys(freqs), function(word) {
    return word + ':' + freqs[word];
  }).join(outputDelimiter);
}

/**
 * Returns the sum of word frequencies for an array of target words for a string
 *
 * @param {string} text The string or 2d-array of cells containing strings to be analyzed for word frequencies
 * @param {string[]} targetWords  The words to search for and count
 * @param {string} the delimiter used for parsing.  By default it is a comma.
 * @return {string} 
 */
function WORD_FREQS_SUM(text, targetWords, delimiter) {
  delimiter = getDelimiterFromInput_(delimiter);
  text = getTextFromInput_(text, delimiter);
  if (!_.isString(targetWords)) {
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
 * @param {string} text The string or 2d-array of cells containing strings to be analyzed for word frequencies
 * @param {string} the delimiter used for parsing.  By default it is a comma.
 * @param {string} the string used for spacing the JSON output string. By default it is a string composed of 4 spaces.
 * @return {string} 
 */
function WORD_FREQS_TO_JSON(text, delimiter, spacing) {
  delimiter = getDelimiterFromInput_(delimiter);
  text = getTextFromInput_(text, delimiter);
  if (text === null) {
    return null;
  }
  if (spacing === undefined) {
    spacing = '    ';
  }
  var freqs = WORD_FREQS(text, delimiter);
  return JSON.stringify(freqs, null, spacing);
}

function getDelimiterFromInput_(input, defaultDelimiter) {
  if (defaultDelimiter === undefined) {
    defaultDelimiter = ',';
  }
  var delimiter = input;
  if (delimiter === undefined) {
    delimiter = defaultDelimiter;
  }
  return delimiter;
}

function getTextFromInput_(input, delimiter) {
  var text = null;
  if (_.isArray(input)) {
    text = _.map(input, function(textArray) {
      return textArray.join(delimiter);
    }).join(delimiter);
  } else if (_.isString(input)) {
    text = input;
  }
  return text;
}