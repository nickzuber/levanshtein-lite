'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MIN = Math.min;

/**
 * Takes two strings as parameters and computes the Levenshtein
 * distance between the two strings. This currently is a derivation
 * of the Wagner–Fischer algorithm, only instead of using an entire
 * a x b matrix, I use two arrays size a so we don't waste memory.
 *
 * @param  {string}    a  First string argument.
 * @param  {string}    b  Second string argument.
 * @param  {[number]}  k  Optional maximum distance, algorithm will exit early if reached during calcuation
 * @return {number}       The levenstein distance of the two strings.
 */
var levenshtein = function levenshtein(a, b) {
  var k = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  if (typeof a !== 'string' || typeof b !== 'string') {
    throw new TypeError('First and second parameters for levenshtein-lite function must be of type string.');
  } else if (k && typeof k !== 'number') {
    throw new TypeError('Third parameters for levenshtein-lite function must be of type number.');
  }

  if (a.length > b.length) {
    var temp = a;
    a = b;
    b = temp;
  }

  a = a.toLowerCase().trim();
  b = b.toLowerCase().trim();
  var aLength = a.length;
  var bLength = b.length;
  var column_crawler_0 = [];
  var column_crawler_1 = [];
  if (a === b) return 0;
  if (aLength === 0) return a.length;
  if (bLength === 0) return b.length;

  for (var i = 0; i < aLength + 1; ++i) {
    column_crawler_0[i] = i;
    column_crawler_1[i] = 0;
  }

  for (var j = 1; j < bLength + 1; ++j) {
    column_crawler_1[0] = j;
    for (var _i = 1; _i < aLength + 1; ++_i) {
      var cost = a[_i - 1] === b[j - 1] ? 0 : 1;
      column_crawler_1[_i] = MIN(column_crawler_1[_i - 1] + 1, column_crawler_0[_i] + 1, column_crawler_0[_i - 1] + cost);
    }
    if (k && MIN.apply(undefined, column_crawler_1) > k) {
      return -1;
    }
    column_crawler_1.map(function (e, i) {
      column_crawler_0[i] = e;
    });
  }
  return column_crawler_1.pop();
};

exports.default = levenshtein;
module.exports = exports['default'];