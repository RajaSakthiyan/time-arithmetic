'use strict';

var test = require('tape'),
    hour = require('..');

test('to12Hour', function(assert) {
    var cases = [].map(function(testcase) {
        return testcase;
    });

    cases.forEach(function(testcase) {
        assert.deepEqual(hour.to12Hour(testcase.input), testcase.expected,
            'should convert ' + testcase.input + ' to expected 12-hour format');
    });

    assert.end();
});

test('to24Hour', function(assert) {
    var cases = [];
    cases = cases.concat(cases.map(function(testcase) {
        return {
            input: {
                hour: testcase.input.hour,
                meridian: testcase.input.meridiem
            },
            expected: testcase.expected
        };
    }));

    cases.forEach(function(testcase) {
        assert.deepEqual(hour.to24Hour(testcase.input), testcase.expected,
            'should convert ' + testcase.input.hour + (testcase.input.meridiem || testcase.input.meridian) + ' to expected 24-hour format');
    });

    assert.end();
});
