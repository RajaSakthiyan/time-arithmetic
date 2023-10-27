"use strict";

let tape = require("tape");
let timeArithmetic = require("../index");

tape("to12Hour", function (assert) {
  let testcases = [
    {
      input: "00:00:00",
      expected: {
        hour: 12,
        minute: 0,
        second: 0,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    /* no zero prefix */
    {
      input: "01:3:03",
      expected: {
        hour: 1,
        minute: 3,
        second: 3,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "02:5:5",
      expected: {
        hour: 2,
        minute: 5,
        second: 5,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "03:08:8",
      expected: {
        hour: 3,
        minute: 8,
        second: 8,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "4:10:10",
      expected: {
        hour: 4,
        minute: 10,
        second: 10,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "05:13:13",
      expected: {
        hour: 5,
        minute: 13,
        second: 13,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    /* different delimiter */
    {
      input: "06.15.15",
      expected: {
        hour: 6,
        minute: 15,
        second: 15,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "07-18-18",
      expected: {
        hour: 7,
        minute: 18,
        second: 18,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "08/20/20",
      expected: {
        hour: 8,
        minute: 20,
        second: 20,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "09 23 23",
      expected: {
        hour: 9,
        minute: 23,
        second: 23,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "10: 25: 25",
      expected: {
        hour: 10,
        minute: 25,
        second: 25,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "11 :28 :28",
      expected: {
        hour: 11,
        minute: 28,
        second: 28,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "12:30:30",
      expected: {
        hour: 12,
        minute: 30,
        second: 30,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: "13:33:33",
      expected: {
        hour: 1,
        minute: 33,
        second: 33,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: "14:35:35",
      expected: {
        hour: 2,
        minute: 35,
        second: 35,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: "15:38:38",
      expected: {
        hour: 3,
        minute: 38,
        second: 38,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: "16:40:40",
      expected: {
        hour: 4,
        minute: 40,
        second: 40,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: "17:43:43",
      expected: {
        hour: 5,
        minute: 43,
        second: 43,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    /* also support object */
    {
      input: { hour: 18, minute: 45, second: 45 },
      expected: {
        hour: 6,
        minute: 45,
        second: 45,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: { hour: 19, minute: 48, second: 48 },
      expected: {
        hour: 7,
        minute: 48,
        second: 48,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: { hour: 20, minute: 50, second: 50 },
      expected: {
        hour: 8,
        minute: 50,
        second: 50,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: { hour: 21, minute: 53, second: 53 },
      expected: {
        hour: 9,
        minute: 53,
        second: 53,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: { hour: 22, minute: 55, second: 55 },
      expected: {
        hour: 10,
        minute: 55,
        second: 55,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: { hour: 23, minute: 58, second: 58 },
      expected: {
        hour: 11,
        minute: 58,
        second: 58,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: { hour: 0, minute: 58, second: 58 },
      expected: {
        hour: 12,
        minute: 58,
        second: 58,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: { hour: 1, minute: 58, second: 58 },
      expected: {
        hour: 1,
        minute: 58,
        second: 58,
        meridiem: "am",
        clock: "12-hour",
      },
    },
  ];

  testcases.forEach(function (each_case) {
    assert.deepEqual(
      timeArithmetic.to12Hour(each_case.input),
      each_case.expected,
      ") should convert as 12-hour format"
    );
  });

  assert.end();
});

tape("to24Hour", function (assert) {
  let testcases = [
    /* no zero prefix */
    {
      input: "12:0:0 am",
      expected: {
        hour: 0,
        minute: 0,
        second: 0,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "1:3:3 am",
      expected: {
        hour: 1,
        minute: 3,
        second: 3,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "2:05:5 am",
      expected: {
        hour: 2,
        minute: 5,
        second: 5,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "3:8:08 am",
      expected: {
        hour: 3,
        minute: 8,
        second: 8,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "4:10:10 am",
      expected: {
        hour: 4,
        minute: 10,
        second: 10,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "05:13:13 am",
      expected: {
        hour: 5,
        minute: 13,
        second: 13,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "06:15:15 am",
      expected: {
        hour: 6,
        minute: 15,
        second: 15,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "07:18:18 am",
      expected: {
        hour: 7,
        minute: 18,
        second: 18,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "08:20:20 am",
      expected: {
        hour: 8,
        minute: 20,
        second: 20,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "09:23:23 am",
      expected: {
        hour: 9,
        minute: 23,
        second: 23,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "10:25:25 am",
      expected: {
        hour: 10,
        minute: 25,
        second: 25,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "11:28:28 am",
      /* different delimiter */
      expected: {
        hour: 11,
        minute: 28,
        second: 28,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "12-30-30 pm",
      expected: {
        hour: 12,
        minute: 30,
        second: 30,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "01/33/33 pm",
      expected: {
        hour: 13,
        minute: 33,
        second: 33,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "02.35.35 pm",
      expected: {
        hour: 14,
        minute: 35,
        second: 35,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "03 38 38 pm",
      expected: {
        hour: 15,
        minute: 38,
        second: 38,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "04: 40: 40 pm",
      expected: {
        hour: 16,
        minute: 40,
        second: 40,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "05 :43 :43 pm",
      expected: {
        hour: 17,
        minute: 43,
        second: 43,
        meridiem: null,
        clock: "24-hour",
      },
    },
    /* also support object */
    {
      input: { hour: 6, minute: 45, second: 45, meridiem: "pm" },
      expected: {
        hour: 18,
        minute: 45,
        second: 45,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: { hour: 7, minute: 48, second: 48, meridiem: "pm" },
      expected: {
        hour: 19,
        minute: 48,
        second: 48,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: { hour: 8, minute: 50, second: 50, meridiem: "pm" },
      expected: {
        hour: 20,
        minute: 50,
        second: 50,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: { hour: 9, minute: 53, second: 53, meridiem: "pm" },
      expected: {
        hour: 21,
        minute: 53,
        second: 53,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: { hour: 10, minute: 55, second: 55, meridiem: "pm" },
      expected: {
        hour: 22,
        minute: 55,
        second: 55,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: { hour: 11, minute: 58, second: 58, meridiem: "pm" },
      expected: {
        hour: 23,
        minute: 58,
        second: 58,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: { hour: 12, minute: 55, second: 55, meridiem: "am" },
      expected: {
        hour: 0,
        minute: 55,
        second: 55,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: { hour: 1, minute: 58, second: 58, meridiem: "am" },
      expected: {
        hour: 1,
        minute: 58,
        second: 58,
        meridiem: null,
        clock: "24-hour",
      },
    },
  ];

  testcases.forEach(function (each_case) {
    assert.deepEqual(
      timeArithmetic.to24Hour(each_case.input),
      each_case.expected,
      ") should convert as 24-hour format"
    );
  });

  assert.end();
});

tape("toString, 24-hour clock", function (assert) {
  let testcases = [
    {
      input: { hour: 12, minute: 0, second: 0, meridiem: null },
      expected: "12:00:00",
    },
    {
      input: { hour: 1, minute: 3, second: 3, meridiem: null },
      expected: "01:03:03",
    },
    {
      input: { hour: 2, minute: 5, second: 5, meridiem: null },
      expected: "02:05:05",
    },
    {
      input: { hour: 3, minute: 8, second: 8, meridiem: null },
      expected: "03:08:08",
    },
    {
      input: { hour: 4, minute: 10, second: 10, meridiem: null },
      expected: "04:10:10",
    },
    {
      input: { hour: 5, minute: 13, second: 13, meridiem: null },
      expected: "05:13:13",
    },
    {
      input: { hour: 6, minute: 15, second: 15, meridiem: null },
      expected: "06:15:15",
    },
    {
      input: { hour: 7, minute: 18, second: 18, meridiem: null },
      expected: "07:18:18",
    },
    {
      input: { hour: 8, minute: 20, second: 20, meridiem: null },
      expected: "08:20:20",
    },
    {
      input: { hour: 9, minute: 23, second: 23, meridiem: null },
      expected: "09:23:23",
    },
    {
      input: { hour: 10, minute: 25, second: 25, meridiem: null },
      expected: "10:25:25",
    },
    {
      input: { hour: 11, minute: 28, second: 28, meridiem: null },
      expected: "11:28:28",
    },
    {
      input: { hour: 12, minute: 30, second: 30 },
      expected: "12:30:30",
    },
    {
      input: { hour: 13, minute: 33, second: 33 },
      expected: "13:33:33",
    },
    {
      input: { hour: 14, minute: 35, second: 35 },
      expected: "14:35:35",
    },
    {
      input: { hour: 15, minute: 38, second: 38 },
      expected: "15:38:38",
    },
    {
      input: { hour: 16, minute: 40, second: 40 },
      expected: "16:40:40",
    },
    {
      input: { hour: 17, minute: 43, second: 43 },
      expected: "17:43:43",
    },
    {
      input: { hour: 18, minute: 45, second: 45 },
      expected: "18:45:45",
    },
    {
      input: { hour: 19, minute: 48, second: 48 },
      expected: "19:48:48",
    },
    {
      input: { hour: 20, minute: 50, second: 50 },
      expected: "20:50:50",
    },
    {
      input: { hour: 21, minute: 53, second: 53 },
      expected: "21:53:53",
    },
    {
      input: { hour: 22, minute: 55, second: 55 },
      expected: "22:55:55",
    },
    {
      input: { hour: 23, minute: 58, second: 58 },
      expected: "23:58:58",
    },
  ];

  testcases.forEach(function (each_case) {
    assert.deepEqual(
      timeArithmetic.toString(each_case.input),
      each_case.expected,
      ") should convert to string"
    );
  });

  assert.end();
});

tape("toString, 12-hour clock", function (assert) {
  let testcases = [
    {
      input: { hour: 12, minute: 0, second: 0, meridiem: "am" },
      expected: "12:00:00 am",
    },
    {
      input: { hour: 1, minute: 3, second: 3, meridiem: "am" },
      expected: "01:03:03 am",
    },
    {
      input: { hour: 2, minute: 5, second: 5, meridiem: "am" },
      expected: "02:05:05 am",
    },
    {
      input: { hour: 3, minute: 8, second: 8, meridiem: "am" },
      expected: "03:08:08 am",
    },
    {
      input: { hour: 4, minute: 10, second: 10, meridiem: "am" },
      expected: "04:10:10 am",
    },
    {
      input: { hour: 5, minute: 13, second: 13, meridiem: "am" },
      expected: "05:13:13 am",
    },
    {
      input: { hour: 6, minute: 15, second: 15, meridiem: "am" },
      expected: "06:15:15 am",
    },
    {
      input: { hour: 7, minute: 18, second: 18, meridiem: "am" },
      expected: "07:18:18 am",
    },
    {
      input: { hour: 8, minute: 20, second: 20, meridiem: "am" },
      expected: "08:20:20 am",
    },
    {
      input: { hour: 9, minute: 23, second: 23, meridiem: "am" },
      expected: "09:23:23 am",
    },
    {
      input: { hour: 10, minute: 25, second: 25, meridiem: "am" },
      expected: "10:25:25 am",
    },
    {
      input: { hour: 11, minute: 28, second: 28, meridiem: "am" },
      expected: "11:28:28 am",
    },
    {
      input: { hour: 0, minute: 30, second: 30, meridiem: "pm" },
      expected: "00:30:30 pm",
    },
    {
      input: { hour: 1, minute: 33, second: 33, meridiem: "pm" },
      expected: "01:33:33 pm",
    },
    {
      input: { hour: 2, minute: 35, second: 35, meridiem: "pm" },
      expected: "02:35:35 pm",
    },
    {
      input: { hour: 3, minute: 38, second: 38, meridiem: "pm" },
      expected: "03:38:38 pm",
    },
    {
      input: { hour: 4, minute: 40, second: 40, meridiem: "pm" },
      expected: "04:40:40 pm",
    },
    {
      input: { hour: 5, minute: 43, second: 43, meridiem: "pm" },
      expected: "05:43:43 pm",
    },
    {
      input: { hour: 6, minute: 45, second: 45, meridiem: "pm" },
      expected: "06:45:45 pm",
    },
    {
      input: { hour: 7, minute: 48, second: 48, meridiem: "pm" },
      expected: "07:48:48 pm",
    },
    {
      input: { hour: 8, minute: 50, second: 50, meridiem: "pm" },
      expected: "08:50:50 pm",
    },
    {
      input: { hour: 9, minute: 53, second: 53, meridiem: "pm" },
      expected: "09:53:53 pm",
    },
    {
      input: { hour: 10, minute: 55, second: 55, meridiem: "pm" },
      expected: "10:55:55 pm",
    },
    {
      input: { hour: 11, minute: 58, second: 58, meridiem: "pm" },
      expected: "11:58:58 pm",
    },
  ];

  testcases.forEach(function (each_case) {
    assert.deepEqual(
      timeArithmetic.toString(each_case.input),
      each_case.expected,
      ") should convert to string"
    );
  });

  assert.end();
});

tape("toObject, 24-hour clock", function (assert) {
  let testcases = [
    {
      input: "12:00:00",
      expected: {
        hour: 12,
        minute: 0,
        second: 0,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "01:03:03",
      expected: {
        hour: 1,
        minute: 3,
        second: 3,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "02:05:05",
      expected: {
        hour: 2,
        minute: 5,
        second: 5,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "03:08:08",
      expected: {
        hour: 3,
        minute: 8,
        second: 8,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "04:10:10",
      expected: {
        hour: 4,
        minute: 10,
        second: 10,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "05:13:13",
      expected: {
        hour: 5,
        minute: 13,
        second: 13,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "06:15:15",
      expected: {
        hour: 6,
        minute: 15,
        second: 15,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "07:18:18",
      expected: {
        hour: 7,
        minute: 18,
        second: 18,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "08:20:20",
      expected: {
        hour: 8,
        minute: 20,
        second: 20,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "09:23:23",
      expected: {
        hour: 9,
        minute: 23,
        second: 23,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "10:25:25",
      expected: {
        hour: 10,
        minute: 25,
        second: 25,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "11:28:28",
      expected: {
        hour: 11,
        minute: 28,
        second: 28,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "12:30:30",
      expected: {
        hour: 12,
        minute: 30,
        second: 30,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "13:33:33",
      expected: {
        hour: 13,
        minute: 33,
        second: 33,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "14:35:35",
      expected: {
        hour: 14,
        minute: 35,
        second: 35,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "15:38:38",
      expected: {
        hour: 15,
        minute: 38,
        second: 38,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "16:40:40",
      expected: {
        hour: 16,
        minute: 40,
        second: 40,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "17:43:43",
      expected: {
        hour: 17,
        minute: 43,
        second: 43,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "18:45:45",
      expected: {
        hour: 18,
        minute: 45,
        second: 45,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "19:48:48",
      expected: {
        hour: 19,
        minute: 48,
        second: 48,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "20:50:50",
      expected: {
        hour: 20,
        minute: 50,
        second: 50,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "21:53:53",
      expected: {
        hour: 21,
        minute: 53,
        second: 53,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "22:55:55",
      expected: {
        hour: 22,
        minute: 55,
        second: 55,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "23:58:58",
      expected: {
        hour: 23,
        minute: 58,
        second: 58,
        meridiem: null,
        clock: "24-hour",
      },
    },
  ];

  testcases.forEach(function (each_case) {
    assert.deepEqual(
      timeArithmetic.toObject(each_case.input),
      each_case.expected,
      ") should convert to object"
    );
  });

  assert.end();
});

tape("toObject, 12-hour clock", function (assert) {
  let testcases = [
    {
      input: "12:00:00 am",
      expected: {
        hour: 12,
        minute: 0,
        second: 0,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "01:03:03 am",
      expected: {
        hour: 1,
        minute: 3,
        second: 3,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "02:05:05 am",
      expected: {
        hour: 2,
        minute: 5,
        second: 5,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "03:08:08 am",
      expected: {
        hour: 3,
        minute: 8,
        second: 8,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "04:10:10 am",
      expected: {
        hour: 4,
        minute: 10,
        second: 10,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "05:13:13 am",
      expected: {
        hour: 5,
        minute: 13,
        second: 13,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "06:15:15 am",
      expected: {
        hour: 6,
        minute: 15,
        second: 15,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "07:18:18 am",
      expected: {
        hour: 7,
        minute: 18,
        second: 18,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "08:20:20 am",
      expected: {
        hour: 8,
        minute: 20,
        second: 20,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "09:23:23 am",
      expected: {
        hour: 9,
        minute: 23,
        second: 23,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "10:25:25 am",
      expected: {
        hour: 10,
        minute: 25,
        second: 25,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "11:28:28 am",
      expected: {
        hour: 11,
        minute: 28,
        second: 28,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "12:30:30 pm",
      expected: {
        hour: 12,
        minute: 30,
        second: 30,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: "01:33:33 pm",
      expected: {
        hour: 1,
        minute: 33,
        second: 33,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: "02:35:35 pm",
      expected: {
        hour: 2,
        minute: 35,
        second: 35,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: "03:38:38 pm",
      expected: {
        hour: 3,
        minute: 38,
        second: 38,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: "04:40:40 pm",
      expected: {
        hour: 4,
        minute: 40,
        second: 40,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: "05:43:43 pm",
      expected: {
        hour: 5,
        minute: 43,
        second: 43,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: "06:45:45 pm",
      expected: {
        hour: 6,
        minute: 45,
        second: 45,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: "07:48:48 pm",
      expected: {
        hour: 7,
        minute: 48,
        second: 48,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: "08:50:50 pm",
      expected: {
        hour: 8,
        minute: 50,
        second: 50,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: "09:53:53 pm",
      expected: {
        hour: 9,
        minute: 53,
        second: 53,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: "10:55:55 pm",
      expected: {
        hour: 10,
        minute: 55,
        second: 55,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: "11:58:58 pm",
      expected: {
        hour: 11,
        minute: 58,
        second: 58,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
  ];

  testcases.forEach(function (each_case) {
    assert.deepEqual(
      timeArithmetic.toObject(each_case.input),
      each_case.expected,
      ") should convert to string"
    );
  });

  assert.end();
});

tape("toString, generic test", function (assert) {
  let testcases = [
    {
      input: { hour: 0, minute: 0, second: 0, meridiem: null },
      expected: "00:00:00",
    },
    {
      input: { hour: 1, minute: 3, second: 3, meridiem: null },
      expected: "01:03:03",
    },
    {
      input: { hour: 2, minute: 5, second: 5, meridiem: null },
      expected: "02:05:05",
    },
    {
      input: { hour: 3, minute: 8, second: 8, meridiem: null },
      expected: "03:08:08",
    },
    {
      input: { hour: 4, minute: 10, second: 10, meridiem: null },
      expected: "04:10:10",
    },
    {
      input: { hour: 5, minute: 13, second: 13, meridiem: null },
      expected: "05:13:13",
    },
    {
      input: { hour: 6, minute: 15, second: 15, meridiem: null },
      expected: "06:15:15",
    },
    {
      input: { hour: 7, minute: 18, second: 18, meridiem: null },
      expected: "07:18:18",
    },
    {
      input: { hour: 8, minute: 20, second: 20, meridiem: null },
      expected: "08:20:20",
    },
    {
      input: { hour: 9, minute: 23, second: 23, meridiem: null },
      expected: "09:23:23",
    },
    {
      input: { hour: 10, minute: 25, second: 25, meridiem: "am" },
      expected: "10:25:25 am",
    },
    {
      input: { hour: 11, minute: 28, second: 28, meridiem: "pm" },
      expected: "11:28:28 pm",
    },
    {
      input: { hour: 12, minute: 30, second: 30, meridiem: null },
      expected: "12:30:30",
    },
    {
      input: { hour: 13, minute: 33, second: 33, meridiem: null },
      expected: "13:33:33",
    },
    {
      input: { hour: 14, minute: 35, second: 35, meridiem: null },
      expected: "14:35:35",
    },
    {
      input: { hour: 15, minute: 38, second: 38, meridiem: null },
      expected: "15:38:38",
    },
    {
      input: { hour: 16, minute: 40, second: 40, meridiem: null },
      expected: "16:40:40",
    },
    {
      input: { hour: 17, minute: 43, second: 43, meridiem: null },
      expected: "17:43:43",
    },
    {
      input: { hour: 18, minute: 45, second: 45, meridiem: null },
      expected: "18:45:45",
    },
    {
      input: { hour: 19, minute: 48, second: 48, meridiem: null },
      expected: "19:48:48",
    },
    {
      input: { hour: 20, minute: 50, second: 50, meridiem: null },
      expected: "20:50:50",
    },
    {
      input: { hour: 21, minute: 53, second: 53, meridiem: null },
      expected: "21:53:53",
    },
    {
      input: { hour: 22, minute: 55, second: 55, meridiem: null },
      expected: "22:55:55",
    },
    {
      input: { hour: 23, minute: 58, second: 58, meridiem: null },
      expected: "23:58:58",
    },
  ];
  testcases.forEach(function (each_case) {
    assert.deepEqual(
      timeArithmetic.toString(each_case.input),
      each_case.expected,
      ") should convert as string"
    );
  });
  assert.end();
});

tape("toObject, generic test", function (assert) {
  let testcases = [
    {
      input: "0 hours 0 minutes 0 seconds",
      expected: {
        hour: 0,
        minute: 0,
        second: 0,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "1 hours 3 minutes 3 seconds",
      expected: {
        hour: 1,
        minute: 3,
        second: 3,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "2 hours 5 minutes 5 seconds",
      expected: {
        hour: 2,
        minute: 5,
        second: 5,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "3 hours 8 minutes 8 seconds",
      expected: {
        hour: 3,
        minute: 8,
        second: 8,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "4 hours 10 minutes 10 seconds",
      expected: {
        hour: 4,
        minute: 10,
        second: 10,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "5 hours 13 minutes 13 seconds",
      expected: {
        hour: 5,
        minute: 13,
        second: 13,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "6 hours 15 minutes 15 seconds",
      expected: {
        hour: 6,
        minute: 15,
        second: 15,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "7 hours 18 minutes 18 seconds",
      expected: {
        hour: 7,
        minute: 18,
        second: 18,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "8 hours 20 minutes 20 seconds",
      expected: {
        hour: 8,
        minute: 20,
        second: 20,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "9 hours 23 minutes 23 seconds",
      expected: {
        hour: 9,
        minute: 23,
        second: 23,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "10:25:25 AM",
      expected: {
        hour: 10,
        minute: 25,
        second: 25,
        meridiem: "am",
        clock: "12-hour",
      },
    },
    {
      input: "11:28:28 PM",
      expected: {
        hour: 11,
        minute: 28,
        second: 28,
        meridiem: "pm",
        clock: "12-hour",
      },
    },
    {
      input: "12 hours 30 minutes 30 seconds",
      expected: {
        hour: 12,
        minute: 30,
        second: 30,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "13 hours 33 minutes 33 seconds",
      expected: {
        hour: 13,
        minute: 33,
        second: 33,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "14:35:35",
      expected: {
        hour: 14,
        minute: 35,
        second: 35,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "15-38-38",
      expected: {
        hour: 15,
        minute: 38,
        second: 38,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "16:40:40",
      expected: {
        hour: 16,
        minute: 40,
        second: 40,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "17 hours 43 minutes 43 seconds",
      expected: {
        hour: 17,
        minute: 43,
        second: 43,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "18 hours 45 minutes 45 seconds",
      expected: {
        hour: 18,
        minute: 45,
        second: 45,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "19 hours 48 minutes 48 seconds",
      expected: {
        hour: 19,
        minute: 48,
        second: 48,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "20 hours 50 minutes 50 seconds",
      expected: {
        hour: 20,
        minute: 50,
        second: 50,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "21 hours 53 minutes 53 seconds",
      expected: {
        hour: 21,
        minute: 53,
        second: 53,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "22 hours 55 minutes 55 seconds",
      expected: {
        hour: 22,
        minute: 55,
        second: 55,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input: "23 hours 58 minutes 58 seconds",
      expected: {
        hour: 23,
        minute: 58,
        second: 58,
        meridiem: null,
        clock: "24-hour",
      },
    },
  ];
  testcases.forEach(function (each_case) {
    assert.deepEqual(
      timeArithmetic.toObject(each_case.input),
      each_case.expected,
      ") should convert as object"
    );
  });
  assert.end();
});

tape("compare", function (assert) {
  assert.deepEqual(
    timeArithmetic.compare("14:23:45", "2.23.45 PM").eq,
    true,
    ") should equals hour"
  );
  assert.deepEqual(
    timeArithmetic.compare("12.23.45", "11.23.45").gt,
    true,
    ") should greater than hour"
  );
  assert.deepEqual(
    timeArithmetic.compare("11.23.45 ", "11.23.45").gte,
    true,
    ") should equals  hour"
  );
  assert.deepEqual(
    timeArithmetic.compare("1:23:45 PM", "11.23.45 AM").gte,
    true,
    ") should greater hour"
  );
  assert.deepEqual(
    timeArithmetic.compare("11.23.45 AM", "13:23:45").lt,
    true,
    ") should lesser than hour"
  );
  assert.deepEqual(
    timeArithmetic.compare("2:23:45 AM", "1:23:45 PM").lte,
    true,
    ") should lesser than  hour"
  );
  assert.deepEqual(
    timeArithmetic.compare("2:23:45 PM", "14:45:21").lte,
    true,
    ") should equals hour"
  );
  assert.deepEqual(
    timeArithmetic.compare("2:23:45 PM", "2:23:45 AM").ne,
    true,
    ") should not equals hour"
  );

  assert.end();
});

tape("add", function (assert) {
  let testcases = [
    {
      input1: "00:0:0 am",
      input2: { hour: 0, minute: 0, second: 0 },
      expected: {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "01:3:3 am",
      input2: { hour: 1, minute: 3, second: 3 },
      expected: {
        day: 0,
        hour: 2,
        minute: 6,
        second: 6,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "02:5:5 am",
      input2: { hour: 2, minute: 5, second: 5 },
      expected: {
        day: 0,
        hour: 4,
        minute: 10,
        second: 10,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "03:8:8 am",
      input2: { hour: 3, minute: 8, second: 8 },
      expected: {
        day: 0,
        hour: 6,
        minute: 16,
        second: 16,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "04:10:10 am",
      input2: { hour: 4, minute: 10, second: 10 },
      expected: {
        day: 0,
        hour: 8,
        minute: 20,
        second: 20,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "05:13:13 am",
      input2: { hour: 5, minute: 13, second: 13 },
      expected: {
        day: 0,
        hour: 10,
        minute: 26,
        second: 26,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "06:15:15 am",
      input2: { hour: 6, minute: 15, second: 15 },
      expected: {
        day: 0,
        hour: 12,
        minute: 30,
        second: 30,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "07:18:18 am",
      input2: { hour: 7, minute: 18, second: 18 },
      expected: {
        day: 0,
        hour: 14,
        minute: 36,
        second: 36,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "08:20:20 am",
      input2: { hour: 8, minute: 20, second: 20 },
      expected: {
        day: 0,
        hour: 16,
        minute: 40,
        second: 40,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "09:23:23 am",
      input2: { hour: 9, minute: 23, second: 23 },
      expected: {
        day: 0,
        hour: 18,
        minute: 46,
        second: 46,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "10:25:25 am",
      input2: { hour: 10, minute: 25, second: 25 },
      expected: {
        day: 0,
        hour: 20,
        minute: 50,
        second: 50,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "11:28:28 am",
      input2: { hour: 11, minute: 28, second: 28 },
      expected: {
        day: 0,
        hour: 22,
        minute: 56,
        second: 56,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "00:30:30 pm",
      input2: { hour: 12, minute: 30, second: 30 },
      expected: {
        day: 0,
        hour: 0,
        minute: 60,
        second: 60,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "01:33:33 pm",
      input2: { hour: 13, minute: 33, second: 33 },
      expected: {
        day: 0,
        hour: 2,
        minute: 66,
        second: 66,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "02:35:35 pm",
      input2: { hour: 14, minute: 35, second: 35 },
      expected: {
        day: 0,
        hour: 4,
        minute: 70,
        second: 70,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "03:38:38 pm",
      input2: { hour: 15, minute: 38, second: 38 },
      expected: {
        day: 0,
        hour: 6,
        minute: 76,
        second: 76,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "04:40:40 pm",
      input2: { hour: 16, minute: 40, second: 40 },
      expected: {
        day: 0,
        hour: 8,
        minute: 80,
        second: 80,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "05:43:43 pm",
      input2: { hour: 17, minute: 43, second: 43 },
      expected: {
        day: 0,
        hour: 10,
        minute: 86,
        second: 86,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "06:45:45 pm",
      input2: { hour: 18, minute: 45, second: 45 },
      expected: {
        day: 0,
        hour: 12,
        minute: 90,
        second: 90,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "07:48:48 pm",
      input2: { hour: 19, minute: 48, second: 48 },
      expected: {
        day: 0,
        hour: 14,
        minute: 96,
        second: 96,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "08:50:50 pm",
      input2: { hour: 20, minute: 50, second: 50 },
      expected: {
        day: 0,
        hour: 16,
        minute: 100,
        second: 100,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "09:53:53 pm",
      input2: { hour: 21, minute: 53, second: 53 },
      expected: {
        day: 0,
        hour: 18,
        minute: 106,
        second: 106,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "10:55:55 pm",
      input2: { hour: 22, minute: 55, second: 55 },
      expected: {
        day: 0,
        hour: 20,
        minute: 110,
        second: 110,
        meridiem: null,
        clock: "24-hour",
      },
    },
    {
      input1: "11:58:58 pm",
      input2: { hour: 23, minute: 58, second: 58 },
      expected: {
        day: 0,
        hour: 22,
        minute: 116,
        second: 116,
        meridiem: null,
        clock: "24-hour",
      },
    },
  ];
  testcases.forEach(function (each_case) {
    assert.deepEqual(
      timeArithmetic.add(each_case.input1, each_case.input2),
      each_case.expected,
      ` ― add(${each_case.input1}, ${each_case.input2}) should add two inputs and gives 24-hour object`
    );
  });

  assert.end();
});
