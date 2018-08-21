'use strict';

const Regex24Hour = /^([0]?[1,2]?[0-9])\W*?([0-5][0-9])\W*?([0-5][0-9])?$/i
const Regex12Hour = /^(0?[1-9]|1[0-2])\W*?([0-5]?[0-9])\W*?([0-5][0-9])?(?:\s*?|\W*?)([AP]M)$/i
const RegExHour = /^(?:(\d*?)\s*?hours?)?\s*?(?:(\d*?)\s*?minutes?)?\s*?(?:(\d*?)\s*?seconds?)?$/i


const globalFunctions = {

    /**
     * Convert 24-hour format to 12-hour object.
     *
     * @param {string} hour 24 hour format to convert
     * @return {object} { hour, minute, second, meridiem }
     */
    to12Hour: function to12Hour(hour) {
        let _24 = null
        if (typeof hour === "string")
            _24 = globalFunctions.get24Hour(hour)
        else
            _24 = hour
        if (!_24.hour)
            return null
        let _hour = parseInt(_24.hour)
        let meridiem = _hour < 12 ? 'am' : 'pm';
        return {
            hour: ('0' + String((_hour + 11) % 12 + 1)).slice(-2, 3),
            minute: ('0' + String(_24.minute)).slice(-2, 3),
            second: ('0' + String(_24.second)).slice(-2, 3),
            meridiem: meridiem,
        };
    },

    /**
     * Convert 12-hour format to 24-hour object.
     *
     * @param {string} hour 12 hour format to convert
     * @return {object} { hour, minute, second }
     */
    to24Hour: function to24Hour(hour) {
        let _12 = null
        if (typeof hour === "string")
            _12 = globalFunctions.get12Hour(hour)
        else
            _12 = hour
        if (!_12.hour)
            return null
        return {
            hour: ('0' + String((_12.meridiem.toLowerCase() === 'am' ? 0 : 12) + (parseInt(_12.hour) % 12))).slice(-2, 3),
            minute: ('0' + String(_12.minute)).slice(-2, 3),
            second: ('0' + String(_12.second)).slice(-2, 3),
        }
    },

    /**
     * get obejct from 24-hour format.
     *
     * @param {string} str 24 hour format
     * @return {object} { hour, minute, second }
     */
    get24Hour: (str) => {
        let matches = str.trim().match(Regex24Hour) || []
        return {
            hour: matches[1] || null,
            minute: matches[2] || null,
            second: matches[3] || null
        }

    },

    /**
     * get obejct from 12-hour format.
     *
     * @param {string} str 12 hour format
     * @return {object} { hour, minute, second, meridiem }
     */
    get12Hour: (str) => {
        let matches = str.trim().match(Regex12Hour) || []
        return {
            hour: matches[1] || null,
            minute: matches[2] || null,
            second: matches[3] || null,
            meridiem: matches[4].toLowerCase() || null
        }

    },

    /**
     * get obejct from hours minutes seconds format.
     *
     * @param {string} str hours minutes seconds format
     * @return {object} { hour, minute, second}
     */
    getHour: (str) => {
        let matches = str.trim().match(RegExHour) || []
        return {
            hour: matches[1] || null,
            minute: matches[2] || null,
            second: matches[3] || null
        }

    },

    add24Hour: (_24hours, hours, minutes) => {
        let [_hours, _minutes] = _24hours.split(':').map(val => parseInt(val))
        _hours += (hours + Math.floor((_minutes + minutes) / 60))
        _minutes = Math.floor((_minutes + minutes) % 60)
        if (_hours >= 24)
            _hours -= 24
        return ('0' + String(_hours)).slice(-2, 3) + ':' + ('0' + String(_minutes)).slice(-2, 3)

    },

    compare24Hour: (_24hours1, _24hours2) => {
        let [_hours1, _minutes1] = _24hours1.split(':').map(val => parseInt(val))
        let [_hours2, _minutes2] = _24hours2.split(':').map(val => parseInt(val))
        if (_hours1 > _hours2)
            return true
        return false
    }
};

module.exports = globalFunctions
console.log(globalFunctions.add24Hour("23:21", 3, 46));