"use strict";

const Regex24Time = /^(0?[1,2]?[0-9])\W*?([0-5]?[0-9])\W*?([0-5]?[0-9])?$/i;
const Regex12Time =
  /^(0?[1-9]|1[0-2])\W*?([0-5]?[0-9])\W*?([0-5]?[0-9])?(?:\s*?|\W*?)([AP]M)$/i;
const RegExTime =
  /^(?:(\d*?)\s*?hours?)?\s*?(?:(\d*?)\s*?minutes?)?\s*?(?:(\d*?)\s*?seconds?)?$/i;

/**
 * Convert 24-hour format to 12-hour object.
 *
 * @param {(string|object)} time
 * @param {string} time 24 hour formatted time in string
 * @param {object} time { hour, minute, second, meridiem }
 * @returns {object} { day, hour, minute, second, meridiem }
 */
const to12Hour = (time) => {
  if (typeof time === "string") time = toObject(time);
  const _12Hour = {
    hour: ((time.hour + 11) % 12) + 1,
    minute: time.minute,
    second: time.second,
    meridiem: null,
  };
  if (isNaN(time.hour)) _12Hour.meridiem = null;
  else if (time.hour < 12) _12Hour.meridiem = "am";
  else if (time.hour >= 12) _12Hour.meridiem = "pm";
  if (time.day) _12Hour.day = time.day;
  return _12Hour;
};

const to24Hour = (time) => {
  /**
   * Convert 12-hour format to 24-hour object.
   *
   * @param {string} time 12 hour format to convert
   * @returns {object} { day, hour, minute, second, meridiem }
   */
  if (typeof time === "string") time = toObject(time);
  const _24Hour = {
    hour: time.hour,
    minute: time.minute,
    second: time.second,
    meridiem: null,
  };
  if (time.meridiem === "am") _24Hour.hour = time.hour % 12;
  else if (time.meridiem === "pm") _24Hour.hour = 12 + (time.hour % 12);
  if (time.day) _24Hour.day = time.day;
  return _24Hour;
};

const toObject = (time) => {
  /**
   * @param {string} time e.g. "01:03:03" or "01:03:03 am"
   * @returns {object} { hour, minute, second, meridiem }
   */
  const toObj = {
    hour: NaN,
    minute: NaN,
    second: NaN,
    meridiem: null,
  };
  time = time.trim();
  let matches =
    time.match(RegExTime) ||
    time.match(Regex12Time) ||
    time.match(Regex24Time) ||
    [];
  if (matches.length) {
    toObj.hour = parseInt(matches[1]) || 0;
    toObj.minute = parseInt(matches[2]) || 0;
    toObj.second = parseInt(matches[3]) || 0;
    toObj.meridiem = (matches[4] || "").toLowerCase() || null;
  }
  return toObj;
};

const toString = (time) => {
  /**
   * @param {object} time 24 hour object { hour, minute, second }
   * @param {int} time.hour hour, value should be either in the range of 1 to 23
   * @param {int} time.minute minute, value should be either in the range of 1 to 59
   * @param {int} time.second second, value should be either in the range of 1 to 59
   * @param {int} time.meridiem meridiem, value should be either 'am' or 'pm and null for 12-hour clock
   * @returns {string} hour e.g. "01:03:03" or "01:03:03 am"
   */
  return `${("0" + String(time.hour)).slice(-2, 3)}:${(
    "0" + String(time.minute)
  ).slice(-2, 3)}:${("0" + String(time.second)).slice(-2, 3)}${
    time.meridiem ?? null ? " " + time.meridiem : ""
  }`;
};

const _add24Hours = (time1, time2) => {
  /**
   * @param {object} time1 24 hour object { day, hour, minute, second, meridiem }
   * @param {int} time1.hour hour, value should be either in the range of 1 to 23
   * @param {int} time1.minute minute, value should be either in the range of 1 to 59
   * @param {int} time1.second second, value should be either in the range of 1 to 59
   * @param {int} time1.meridiem meridiem, value should be either 'am' or 'pm and null for 12-hour clock
   * @param {object} time2 24 hour object { day, hour, minute, second, meridiem }
   * @param {int} time2.hour hour, value should be either in the range of 1 to 23
   * @param {int} time2.minute minute, value should be either in the range of 1 to 59
   * @param {int} time2.second second, value should be either in the range of 1 to 59
   * @param {int} time2.meridiem meridiem, value should be either 'am' or 'pm and null for 12-hour clock
   * @returns {object} hour object { day, hour, minute, second, meridiem }
   */
  let hours =
    time1.hour + time2.hour + Math.floor((time1.minute + time2.minute) / 60);
  let minutes = Math.floor(
    (time1.minute +
      time2.minute +
      Math.floor((time1.second + time2.second) / 60)) %
      60
  );
  let seconds = Math.floor((time1.second + time2.second) % 60);
  return {
    day: Math.floor(hours / 24),
    hour: Math.floor(hours % 24),
    minute: minutes,
    second: seconds,
    meridiem: null,
  };
};

const add = (time1, time2) => {
  /**
   * @param {(string|object)} time1 24 hour object { day, hour, minute, second, meridiem }
   * @param {string} time1 e.g. "01:03:03" or "01:03:03 am"
   * @param {int} time1.hour hour, value should be either in the range of 1 to 23
   * @param {int} time1.minute minute, value should be either in the range of 1 to 59
   * @param {int} time1.second second, value should be either in the range of 1 to 59
   * @param {int} time1.meridiem meridiem, value should be either 'am' or 'pm and null for 12-hour clock
   * @param {(string|object)} time2 24 hour object { day, hour, minute, second, meridiem }
   * @param {string} time1 e.g. "01:03:03" or "01:03:03 am"
   * @param {int} time2.hour hour, value should be either in the range of 1 to 23
   * @param {int} time2.minute minute, value should be either in the range of 1 to 59
   * @param {int} time2.second second, value should be either in the range of 1 to 59
   * @param {int} time2.meridiem meridiem, value should be either 'am' or 'pm and null for 12-hour clock
   * @returns {object} hour object { day, hour, minute, second, meridiem }
   */
  let hours = (time1 = typeof time1 == "string" ? toObject(time1) : time1);
  time2 = typeof time2 == "string" ? toObject(time2) : time2;
  time1 = time1.meridiem ? to24Hour(time1) : time1;
  time2 = time2.meridiem ? to24Hour(time2) : time2;
  return _add24Hours(time1, time2);
};

const _diff24Hours = (time1, time2) => {
  /**
   * @param {object} time1 24 hour object { day, hour, minute, second, meridiem }
   * @param {int} time1.hour hour, value should be either in the range of 1 to 23
   * @param {int} time1.minute minute, value should be either in the range of 1 to 59
   * @param {int} time1.second second, value should be either in the range of 1 to 59
   * @param {int} time1.meridiem meridiem, value should be either 'am' or 'pm and null for 12-hour clock
   * @param {object} time2 24 hour object { day, hour, minute, second, meridiem }
   * @param {int} time2.hour hour, value should be either in the range of 1 to 23
   * @param {int} time2.minute minute, value should be either in the range of 1 to 59
   * @param {int} time2.second second, value should be either in the range of 1 to 59
   * @param {int} time2.meridiem meridiem, value should be either 'am' or 'pm and null for 12-hour clock
   * @returns {object} hour object { day, hour, minute, second, meridiem }
   */
  let hours = 0;
  let minutes = 0;
  let seconds = time1.second - time2.second;
  if (seconds < 0) {
    seconds += 60;
    minutes = -1;
  }
  minutes += time1.minute - time2.minute;
  if (minutes < 0) {
    minutes += 60;
    hours = -1;
  }
  hours += time1.hour - time2.hour;
  if (hours < 0) hours += 24;
  return {
    hour: hours,
    minute: minutes,
    second: seconds,
    meridiem: null,
  };
};

const diff = (time1, time2) => {
  /**
   * @param {(string|object)} time1 24 hour object { day, hour, minute, second, meridiem }
   * @param {string} time1 e.g. "01:03:03" or "01:03:03 am"
   * @param {int} time1.hour hour, value should be either in the range of 1 to 23
   * @param {int} time1.minute minute, value should be either in the range of 1 to 59
   * @param {int} time1.second second, value should be either in the range of 1 to 59
   * @param {int} time1.meridiem meridiem, value should be either 'am' or 'pm and null for 12-hour clock
   * @param {(string|object)} time2 24 hour object { day, hour, minute, second, meridiem }
   * @param {string} time1 e.g. "01:03:03" or "01:03:03 am"
   * @param {int} time2.hour hour, value should be either in the range of 1 to 23
   * @param {int} time2.minute minute, value should be either in the range of 1 to 59
   * @param {int} time2.second second, value should be either in the range of 1 to 59
   * @param {int} time2.meridiem meridiem, value should be either 'am' or 'pm and null for 12-hour clock
   * @returns {object} hour object { hour, minute, second, meridiem }
   */
  time1 = typeof time1 == "string" ? toObject(time1) : time1;
  time2 = typeof time2 == "string" ? toObject(time2) : time2;
  time1 = time1.meridiem ? to24Hour(time1) : time1;
  time2 = time2.meridiem ? to24Hour(time2) : time2;
  return _diff24Hours(time1, time2);
};

const compare = (time1, time2) => {
  /**
   * @param {(string|object)} time1 24 hour object { day, hour, minute, second, meridiem }
   * @param {string} time1 e.g. "01:03:03" or "01:03:03 am"
   * @param {int} time1.hour hour, value should be either in the range of 1 to 23
   * @param {int} time1.minute minute, value should be either in the range of 1 to 59
   * @param {int} time1.second second, value should be either in the range of 1 to 59
   * @param {int} time1.meridiem meridiem, value should be either 'am' or 'pm and null for 12-hour clock
   * @param {(string|object)} time2 24 hour object { day, hour, minute, second, meridiem }
   * @param {string} time1 e.g. "01:03:03" or "01:03:03 am"
   * @param {int} time2.hour hour, value should be either in the range of 1 to 23
   * @param {int} time2.minute minute, value should be either in the range of 1 to 59
   * @param {int} time2.second second, value should be either in the range of 1 to 59
   * @param {int} time2.meridiem meridiem, value should be either 'am' or 'pm and null for 12-hour clock
   * @returns {object} object { eq, gt, gte, lt, lte, ne }
   */
  time1 = typeof time1 == "string" ? toObject(time1) : time1;
  time2 = typeof time2 == "string" ? toObject(time2) : time2;
  time1 = time1.meridiem ? to24Hour(time1) : time1;
  time2 = time2.meridiem ? to24Hour(time2) : time2;
  return {
    eq: time1.hour == time2.hour,
    gt: time1.hour > time2.hour,
    gte: time1.hour >= time2.hour,
    lt: time1.hour < time2.hour,
    lte: time1.hour <= time2.hour,
    ne: time1.hour != time2.hour,
  };
};

const timeArithmetic = {
  to12Hour,
  to24Hour,
  toObject,
  toString,
  add,
  diff,
  compare,
};

module.exports = timeArithmetic;
