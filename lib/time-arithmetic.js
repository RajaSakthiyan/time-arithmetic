"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // index.js
  var require_time_arithmetic = __commonJS({
    "index.js"(exports, module) {
      var Regex24Hour = /^(0?[1,2]?[0-9])\W*?([0-5]?[0-9])\W*?([0-5]?[0-9])?$/i;
      var Regex12Hour = /^(0?[1-9]|1[0-2])\W*?([0-5]?[0-9])\W*?([0-5]?[0-9])?(?:\s*?|\W*?)([AP]M)$/i;
      var RegExHour = /^(?:(\d*?)\s*?hours?)?\s*?(?:(\d*?)\s*?minutes?)?\s*?(?:(\d*?)\s*?seconds?)?$/i;
      var timeArithmetic = {
        /**
         * Convert 24-hour format to 12-hour object.
         *
         * @param {string} hour 24 hour format to convert
         * @return {object} { hour, minute, second, meridiem }
         */
        to12Hour: function to12Hour(hour) {
          if (typeof hour === "string")
            hour = timeArithmetic.get24Hour(hour);
          return {
            hour: (hour.hour + 11) % 12 + 1,
            minute: hour.minute,
            second: hour.second,
            meridiem: hour.hour + 1 ? hour.hour < 12 ? "am" : "pm" : NaN
          };
        },
        to24Hour: function to24Hour(hour) {
          if (typeof hour === "string")
            hour = timeArithmetic.get12Hour(hour);
          return {
            hour: hour.meridiem ? (hour.meridiem.toLowerCase() === "am" ? 0 : 12) + hour.hour % 12 : NaN,
            minute: hour.minute,
            second: hour.second,
            meridiem: null
          };
        },
        get24Hour: (_24hour) => {
          if (typeof _24hour === "string") {
            let matches = _24hour.trim().match(Regex24Hour) || [];
            if (!matches.length)
              return {
                hour: NaN,
                minute: NaN,
                second: NaN,
                meridiem: null
              };
            return {
              hour: parseInt(matches[1]) || 0,
              minute: parseInt(matches[2]) || 0,
              second: parseInt(matches[3]) || 0,
              meridiem: null
            };
          }
          return ("0" + String(_24hour.hour)).slice(-2, 3) + ":" + ("0" + String(_24hour.minute)).slice(-2, 3) + ":" + ("0" + String(_24hour.second)).slice(-2, 3);
        },
        get12Hour: (_12hour) => {
          if (typeof _12hour === "string") {
            let matches = _12hour.trim().match(Regex12Hour) || [];
            if (!matches.length)
              return {
                hour: NaN,
                minute: NaN,
                second: NaN,
                meridiem: null
              };
            return {
              hour: parseInt(matches[1]) || 0,
              minute: parseInt(matches[2]) || 0,
              second: parseInt(matches[3]) || 0,
              meridiem: (matches[4] || "").toLowerCase() || null
            };
          }
          return ("0" + String(_12hour.hour)).slice(-2, 3) + ":" + ("0" + String(_12hour.minute)).slice(-2, 3) + ":" + ("0" + String(_12hour.second)).slice(-2, 3) + " " + _12hour.meridiem;
        },
        getHour: (hour) => {
          if (typeof hour === "string") {
            hour = hour.trim();
            let matches = hour.match(RegExHour) || hour.match(Regex12Hour) || hour.match(Regex24Hour) || [];
            if (!matches.length)
              hour = {
                hour: NaN,
                minute: NaN,
                second: NaN,
                meridiem: null
              };
            else
              hour = {
                hour: parseInt(matches[1]) || 0,
                minute: parseInt(matches[2]) || 0,
                second: parseInt(matches[3]) || 0,
                meridiem: (matches[4] || "").toLowerCase() || null
              };
          }
          return {
            hour: hour.hour || 0,
            minute: hour.minute || 0,
            second: hour.second || 0,
            meridiem: hour.meridiem || null
          };
        },
        _add24Hour: (_24hour, hour) => {
          hour = hour.meridiem ? timeArithmetic.to24Hour(hour) : hour;
          let _hours = _24hour.hour + hour.hour + Math.floor((_24hour.minute + hour.minute) / 60);
          let _minutes = Math.floor(
            (_24hour.minute + hour.minute + Math.floor((_24hour.second + hour.second) / 60)) % 60
          );
          let _seconds = Math.floor((_24hour.second + hour.second) % 60);
          return {
            day: Math.floor(_hours / 24),
            hour: Math.floor(_hours % 24),
            minute: _minutes,
            second: _seconds,
            meridiem: null
          };
        },
        _add12Hour: (_12hour, hour) => {
          let _24hour = timeArithmetic.to24Hour(_12hour);
          if (_24hour) {
            _24hour = timeArithmetic._add24Hour(_24hour, hour);
            let _12hour2 = timeArithmetic.to12Hour(_24hour);
            _12hour2.day = _24hour.day;
            return _12hour2;
          }
          return null;
        },
        addHour: (_hour, hour) => {
          if (Regex24Hour.test(_hour))
            return timeArithmetic._add24Hour(
              timeArithmetic.get24Hour(_hour),
              timeArithmetic.getHour(hour)
            );
          else if (Regex12Hour.test(_hour))
            return timeArithmetic._add12Hour(
              timeArithmetic.get12Hour(_hour),
              timeArithmetic.getHour(hour)
            );
          else
            return null;
        },
        _diff24Hour: (_24hour, hour) => {
          let _hours = 0;
          let _minutes = 0;
          let _seconds = _24hour.second - hour.second;
          if (_seconds < 0) {
            _seconds += 60;
            _minutes = -1;
          }
          _minutes += _24hour.minute - hour.minute;
          if (_minutes < 0) {
            _minutes += 60;
            _hours = -1;
          }
          _hours += _24hour.hour - hour.hour;
          if (_hours < 0)
            _hours += 24;
          return {
            hour: _hours,
            minute: _minutes,
            second: _seconds,
            meridiem: null
          };
        },
        _diff12Hour: (_12hour, hour) => {
          let _24hour = timeArithmetic.to24Hour(_12hour);
          let _dif24 = timeArithmetic._diff24Hour(_24hour, hour);
          if (_24hour)
            return timeArithmetic.to12Hour(_dif24);
          return null;
        },
        diffHour: (_hour, hour) => {
          if (Regex24Hour.test(_hour))
            return timeArithmetic._diff24Hour(
              timeArithmetic.get24Hour(_hour),
              timeArithmetic.getHour(hour)
            );
          else if (Regex12Hour.test(_hour))
            return timeArithmetic._diff12Hour(
              timeArithmetic.get12Hour(_hour),
              timeArithmetic.getHour(hour)
            );
          else
            return null;
        },
        compareHour: (hours1, hours2) => {
          let _hours1 = timeArithmetic.getHour(hours1);
          let _hours2 = timeArithmetic.getHour(hours2);
          _hours1 = _hours1.meridiem ? timeArithmetic.to24Hour(_hours1) : _hours1;
          _hours2 = _hours2.meridiem ? timeArithmetic.to24Hour(_hours2) : _hours2;
          return {
            eq: _hours1.hour == _hours2.hour,
            gt: _hours1.hour > _hours2.hour,
            gte: _hours1.hour >= _hours2.hour,
            lt: _hours1.hour < _hours2.hour,
            lte: _hours1.hour <= _hours2.hour,
            ne: _hours1.hour != _hours2.hour
          };
        }
      };
      module.exports = timeArithmetic;
    }
  });
  require_time_arithmetic();
})();
