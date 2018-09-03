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
    if (!hour.hour) return null;
    let _hour = parseInt(hour.hour);
    return {
      hour: ("0" + String(((_hour + 11) % 12) + 1)).slice(-2, 3),
      minute: ("0" + String(hour.minute)).slice(-2, 3),
      second: ("0" + String(hour.second)).slice(-2, 3),
      meridiem: _hour < 12 ? "am" : "pm"
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
    if (!hour.hour) return null;
    return {
      hour: (
        "0" +
        String(
          (hour.meridiem.toLowerCase() === "am" ? 0 : 12) +
          (parseInt(hour.hour) % 12)
        )
      ).slice(-2, 3),
      minute: ("0" + String(hour.minute)).slice(-2, 3),
      second: ("0" + String(hour.second)).slice(-2, 3)
    };
  },

  /**
   * get obejct from 24-hour format.
   *
   * @param {string} str 24 hour format
   * @return {object} { hour, minute, second }
   */
  get24Hour: str => {
    let matches = str.trim().match(Regex24Hour) || [];
    return {
      hour: parseInt(matches[1]) || 0,
      minute: parseInt(matches[2]) || 0,
      second: parseInt(matches[3]) || 0
    };
  },

  /**
   * get obejct from 12-hour format.
   *
   * @param {string} str 12 hour format
   * @return {object} { hour, minute, second, meridiem }
   */
  get12Hour: str => {
    let matches = str.trim().match(Regex12Hour) || [];
    return {
      hour: parseInt(matches[1]) || 0,
      minute: parseInt(matches[2]) || 0,
      second: parseInt(matches[3]) || 0,
      meridiem: matches[4].toLowerCase() || null
    };
  },

  /**
   * get obejct from hours minutes seconds format.
   *
   * @param {string} str hours minutes seconds format
   * @return {object} { hour, minute, second}
   */
  getHour: str => {
    let matches = str.trim().match(RegExHour) || [];
    return {
      hour: parseInt(matches[1]) || 0,
      minute: parseInt(matches[2]) || 0,
      second: parseInt(matches[3]) || 0
    };
  },

  add24Hour: (_24hour, hour) => {
    if (typeof hour === "string") hour = globalFunctions.getHour(hour);
    _24hour = globalFunctions.get24Hour(_24hour);
    let _hours =
      _24hour.hour + (hour.hour || 0) + Math.floor((_24hour.minute + (hour.minute || 0)) / 60);
    if (_hours >= 24) _hours -= 24;
    let _minutes = Math.floor((_24hour.minute + (hour.minute || 0) + Math.floor((_24hour.second + (hour.second || 0)) / 60)) % 60);
    let _seconds = Math.floor((_24hour.second + (hour.second || 0)) % 60);
    return (
      ("0" + String(_hours)).slice(-2, 3) +
      ":" +
      ("0" + String(_minutes)).slice(-2, 3) +
      ':' +
      ("0" + String(_seconds)).slice(-2, 3)

    );
  },

  add12Hour: (_12hour, hour) => {
    if (typeof hour === "string") hour = globalFunctions.getHour(hour);
    _12hour = globalFunctions.get12Hour(_12hour);
    let _hours =
      _12hour.hour + (hour.hour || 0) + Math.floor((_12hour.minute + (hour.minute || 0)) / 60);
    if (_hours >= 24) _hours -= 24;
    let _minutes = Math.floor((_12hour.minute + (hour.minute || 0) + Math.floor((_12hour.second + (hour.second || 0)) / 60)) % 60);
    let _seconds = Math.floor((_12hour.second + (hour.second || 0)) % 60);
    return (
      ("0" + String(_hours)).slice(-2, 3) +
      ":" +
      ("0" + String(_minutes)).slice(-2, 3) +
      ':' +
      ("0" + String(_seconds)).slice(-2, 3)

    );
  },

  compare24Hour: (_24hours1, _24hours2) => {
    let matches = _24hours1.trim().match(Regex24HourDelimit);
    if (!matches) return null
    let _hours1 = parseInt(_24hours1.slice(0, _24hours1.indexOf(matches[1])));
    let _hours2 = parseInt(_24hours2.slice(0, _24hours2.indexOf(matches[1])));
    if (_hours1 > _hours2) return true;
    return false;
  }
};

module.exports = globalFunctions;
console.log(globalFunctions.add24Hour("21:12:28", "1 hours 23 minutes 46 seconds"));
console.log(globalFunctions.compare24Hour("28:12:28", "22:12:28"));