"use strict";

const Regex24Hour = /^([0]?[1,2]?[0-9])\W*?([0-5][0-9])\W*?([0-5][0-9])?$/i;
const Regex12Hour = /^(0?[1-9]|1[0-2])\W*?([0-5]?[0-9])\W*?([0-5][0-9])?(?:\s*?|\W*?)([AP]M)$/i;
const RegExHour = /^(?:(\d*?)\s*?hours?)?\s*?(?:(\d*?)\s*?minutes?)?\s*?(?:(\d*?)\s*?seconds?)?$/i;
const Regex24HourDelimit = /^[0]?[1,2]?[0-9](\W*?)[0-5][0-9]\W*?(?:[0-5][0-9])?$/i;
const Regex12HourDelimit = /^(?:0?[1-9]|1[0-2])(\W*?)(?:[0-5]?[0-9])\W*?(?:[0-5][0-9])?(?:\s*?|\W*?)(?:[AP]M)$/i;

const globalFunctions = {
  /**
   * Convert 24-hour format to 12-hour object.
   *
   * @param {string} hour 24 hour format to convert
   * @return {object} { hour, minute, second, meridiem }
   */
  to12Hour: function to12Hour(hour) {
    if (typeof hour === "string") hour = globalFunctions.get24Hour(hour);
    return {
      hour: ((hour.hour + 11) % 12) + 1,
      minute: hour.minute,
      second: hour.second,
      meridiem: (hour.hour + 1) ? (hour.hour < 12 ? "am" : "pm") : NaN
    };
  },

  /**
   * Convert 12-hour format to 24-hour object.
   *
   * @param {string} hour 12 hour format to convert
   * @return {object} { hour, minute, second }
   */
  to24Hour: function to24Hour(hour) {
    if (typeof hour === "string") hour = globalFunctions.get12Hour(hour);
    return {
      hour:
        (hour.meridiem.toLowerCase() === "am" ? 0 : 12) +
        (hour.hour % 12),
      minute: hour.minute,
      second: hour.second
    };
  },

  /**
   * get obejct from 24-hour format.
   *
   * @param {string} str 24 hour format
   * @return {object} { hour, minute, second }
   */
  get24Hour: _24hour => {
    if (typeof _24hour === "string") {
      let matches = _24hour.trim().match(Regex24Hour) || [];
      if (!matches.length) return {
        hour: NaN,
        minute: NaN,
        second: NaN
      }
      return {
        hour: parseInt(matches[1]) || 0,
        minute: parseInt(matches[2]) || 0,
        second: parseInt(matches[3]) || 0
      }
    }
    return ("0" + String(_24hour.hour)).slice(-2, 3) +
      ":" +
      ("0" + String(_24hour.minute)).slice(-2, 3) +
      ':' +
      ("0" + String(_24hour.second)).slice(-2, 3)
  },

  /**
   * get obejct from 12-hour format.
   *
   * @param {string} str 12 hour format
   * @return {object} { hour, minute, second, meridiem }
   */
  get12Hour: _12hour => {
    if (typeof _12hour === "string") {
      let matches = _12hour.trim().match(Regex12Hour) || [];
      if (!matches.length) return {
        hour: NaN,
        minute: NaN,
        second: NaN,
        meridiem: 'NaN'
      }
      return {
        hour: parseInt(matches[1]) || 0,
        minute: parseInt(matches[2]) || 0,
        second: parseInt(matches[3]) || 0,
        meridiem: (matches[4] || "").toLowerCase() || null
      };
    }
    return ("0" + String(_12hour.hour)).slice(-2, 3) +
      ":" +
      ("0" + String(_12hour.minute)).slice(-2, 3) +
      ':' +
      ("0" + String(_12hour.second)).slice(-2, 3) +
      ' ' + _12hour.meridiem
  },

  /**
   * get obejct from hours minutes seconds format.
   *
   * @param {string} str hours minutes seconds format
   * @return {object} { hour, minute, second}
   */
  getHour: hour => {
    if (typeof hour === "string") {
      let matches = hour.trim().match(RegExHour) || [];
      if (!matches.length) return {
        hour: NaN,
        minute: NaN,
        second: NaN,
        meridiem: 'NaN'
      }
      return {
        hour: parseInt(matches[1]) || 0,
        minute: parseInt(matches[2]) || 0,
        second: parseInt(matches[3]) || 0
      };
    }
    return {
      hour: hour.hour || 0,
      minute: hour.minute || 0,
      second: hour.second || 0
    }
  },

  _add24Hour: (_24hour, hour) => {
    let _hours =
      _24hour.hour + (hour.hour) + Math.floor((_24hour.minute + (hour.minute)) / 60);
    if (_hours >= 24) _hours -= 24;
    let _minutes = Math.floor((_24hour.minute + (hour.minute) + Math.floor((_24hour.second + (hour.second)) / 60)) % 60);
    let _seconds = Math.floor((_24hour.second + (hour.second)) % 60);
    return {
      hour: _hours,
      minute: _minutes,
      second: _seconds
    }
  },

  _add12Hour: (_12hour, hour) => {
    let _24hour = globalFunctions.to24Hour(_12hour)
    if (_24hour)
      return globalFunctions.to12Hour(
        globalFunctions._add24Hour(
          _24hour, hour)
      )
    return null
  },

  addHour: (_hour, hour) => {
    if (Regex24Hour.test(_hour))
      return globalFunctions._add24Hour(globalFunctions.get24Hour(_hour), globalFunctions.getHour(hour))
    else if (Regex12Hour.test(_hour))
      return globalFunctions._add12Hour(globalFunctions.get12Hour(_hour), globalFunctions.getHour(hour))
    else
      return null
  },

  _diff24Hour: (_24hour, hour) => {
    let _hours =
      Math.abs(Math.abs(_24hour.hour - hour.hour) - Math.floor(Math.abs(_24hour.minute - hour.minute) / 60));
    if (_hours >= 24) _hours -= 24;
    let _minutes = Math.floor(Math.abs(Math.abs(_24hour.minute - hour.minute) - Math.floor(Math.abs(_24hour.second - hour.second) / 60)) % 60);
    let _seconds = Math.floor(Math.abs(_24hour.second - hour.second) % 60);
    return {
      hour: _hours,
      minute: _minutes,
      second: _seconds
    }
  },

  _diff12Hour: (_12hour, hour) => {
    let _24hour = globalFunctions.to24Hour(_12hour)
    if (_24hour)
      return globalFunctions.to12Hour(
        globalFunctions._diff24Hour(
          _24hour, hour)
      )
    return null
  },

  diffHour: (_hour, hour) => {
    if (Regex24Hour.test(_hour))
      return globalFunctions._add24Hour(globalFunctions.get24Hour(_hour), globalFunctions.getHour(hour))
    else if (Regex12Hour.test(_hour))
      return globalFunctions._add12Hour(globalFunctions.get12Hour(_hour), globalFunctions.getHour(hour))
    else
      return null
  },

  compareHour: (hours1, hours2) => {
    let match1 = (Regex24HourDelimit.test(hours1.trim()) &&
        hours1.trim().match(Regex24HourDelimit)) ||
      (Regex12HourDelimit.test(hours1.trim()) &&
        hours1.trim().match(Regex12HourDelimit));
    let match2 = (Regex24HourDelimit.test(hours2.trim()) &&
        hours2.trim().match(Regex24HourDelimit)) ||
      (Regex12HourDelimit.test(hours2.trim()) &&
        hours2.trim().match(Regex12HourDelimit));
    if (!match1 && !match2)
      return null
    let _hours1 = parseInt(hours1.slice(0, hours1.indexOf(match1[1])));
    let _hours2 = parseInt(hours2.slice(0, hours2.indexOf(match2[1])));
    return {
      eq: _hours1 == _hours2,
      gt: _hours1 > _hours2,
      gte: _hours1 >= _hours2,
      lt: _hours1 < _hours2,
      lte: _hours1 <= _hours2,
      ne: _hours1 != _hours2,
    }
  }
};

module.exports = globalFunctions;
console.log(globalFunctions.addHour("15:12:28", "23 hours 23 minutes 46 seconds"));
console.log(globalFunctions.compareHour("28:12:28", "22:12:28").gt);
console.log(globalFunctions.addHour("03:12:28 PM", "23 hours 23 minutes 46 seconds"));
console.log(globalFunctions.addHour("01:12:28 PM", {
  hour: 23,
  minute: 23
}));