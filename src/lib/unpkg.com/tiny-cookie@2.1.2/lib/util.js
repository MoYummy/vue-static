'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

// Escape special characters.
function escapeRe(str) {
  return str.replace(/[.*+?^$|[\](){}\\-]/g, '\\$&');
}

// Return a future date by the given string.
function computeExpires(str) {
  var lastCh = str.charAt(str.length - 1);
  var value = parseInt(str, 10);
  var expires = new Date();

  switch (lastCh) {
    case 'Y':
      expires.setFullYear(expires.getFullYear() + value);break;
    case 'M':
      expires.setMonth(expires.getMonth() + value);break;
    case 'D':
      expires.setDate(expires.getDate() + value);break;
    case 'h':
      expires.setHours(expires.getHours() + value);break;
    case 'm':
      expires.setMinutes(expires.getMinutes() + value);break;
    case 's':
      expires.setSeconds(expires.getSeconds() + value);break;
    default:
      expires = new Date(str);
  }

  return expires;
}

// Convert an object to a cookie option string.
function convert(opts) {
  var res = '';

  // eslint-disable-next-line
  for (var key in opts) {
    if (hasOwn(opts, key)) {
      if (/^expires$/i.test(key)) {
        var expires = opts[key];

        if ((typeof expires === 'undefined' ? 'undefined' : _typeof(expires)) !== 'object') {
          expires += typeof expires === 'number' ? 'D' : '';
          expires = computeExpires(expires);
        }
        res += ';' + key + '=' + expires.toUTCString();
      } else if (/^secure$/.test(key)) {
        if (opts[key]) {
          res += ';' + key;
        }
      } else {
        res += ';' + key + '=' + opts[key];
      }
    }
  }

  if (!hasOwn(opts, 'path')) {
    res += ';path=/';
  }

  return res;
}

exports.hasOwn = hasOwn;
exports.escapeRe = escapeRe;
exports.computeExpires = computeExpires;
exports.convert = convert;