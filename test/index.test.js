"use strict";

let tape = require("tape");
let hour = require("..");

tape("to12Hour", function(assert) {
  let testcases = [
    {
      input: "00:00:00",
      expected: { hour: 12, minute: 0, second: 0, meridiem: "am" }
    },
    /* no zero prefix */
    {
      input: "01:3:03",
      expected: { hour: 1, minute: 3, second: 3, meridiem: "am" }
    },
    {
      input: "02:5:5",
      expected: { hour: 2, minute: 5, second: 5, meridiem: "am" }
    },
    {
      input: "03:08:8",
      expected: { hour: 3, minute: 8, second: 8, meridiem: "am" }
    },
    {
      input: "4:10:10",
      expected: { hour: 4, minute: 10, second: 10, meridiem: "am" }
    },
    {
      input: "05:13:13",
      expected: { hour: 5, minute: 13, second: 13, meridiem: "am" }
    },
    /* different delimiter */
    {
      input: "06.15.15",
      expected: { hour: 6, minute: 15, second: 15, meridiem: "am" }
    },
    {
      input: "07-18-18",
      expected: { hour: 7, minute: 18, second: 18, meridiem: "am" }
    },
    {
      input: "08/20/20",
      expected: { hour: 8, minute: 20, second: 20, meridiem: "am" }
    },
    {
      input: "09 23 23",
      expected: { hour: 9, minute: 23, second: 23, meridiem: "am" }
    },
    {
      input: "10: 25: 25",
      expected: { hour: 10, minute: 25, second: 25, meridiem: "am" }
    },
    {
      input: "11 :28 :28",
      expected: { hour: 11, minute: 28, second: 28, meridiem: "am" }
    },
    {
      input: "12:30:30",
      expected: { hour: 12, minute: 30, second: 30, meridiem: "pm" }
    },
    {
      input: "13:33:33",
      expected: { hour: 1, minute: 33, second: 33, meridiem: "pm" }
    },
    {
      input: "14:35:35",
      expected: { hour: 2, minute: 35, second: 35, meridiem: "pm" }
    },
    {
      input: "15:38:38",
      expected: { hour: 3, minute: 38, second: 38, meridiem: "pm" }
    },
    {
      input: "16:40:40",
      expected: { hour: 4, minute: 40, second: 40, meridiem: "pm" }
    },
    {
      input: "17:43:43",
      expected: { hour: 5, minute: 43, second: 43, meridiem: "pm" }
    },
    /* also support object */
    {
      input: { hour: 18, minute: 45, second: 45 },
      expected: { hour: 6, minute: 45, second: 45, meridiem: "pm" }
    },
    {
      input: { hour: 19, minute: 48, second: 48 },
      expected: { hour: 7, minute: 48, second: 48, meridiem: "pm" }
    },
    {
      input: { hour: 20, minute: 50, second: 50 },
      expected: { hour: 8, minute: 50, second: 50, meridiem: "pm" }
    },
    {
      input: { hour: 21, minute: 53, second: 53 },
      expected: { hour: 9, minute: 53, second: 53, meridiem: "pm" }
    },
    {
      input: { hour: 22, minute: 55, second: 55 },
      expected: { hour: 10, minute: 55, second: 55, meridiem: "pm" }
    },
    {
      input: { hour: 23, minute: 58, second: 58 },
      expected: { hour: 11, minute: 58, second: 58, meridiem: "pm" }
    }
  ];

  testcases.forEach(function(each_case) {
    assert.deepEqual(
      hour.to12Hour(each_case.input),
      each_case.expected,
      ") should convert as 12-hour format"
    );
  });

  assert.end();
});

tape("get12Hour", function(assert) {
  let testcases = [
    {
      input: { hour: 12, minute: 0, second: 0, meridiem: "am" },
      expected: "12:00:00 am"
    },
    {
      input: { hour: 1, minute: 3, second: 3, meridiem: "am" },
      expected: "01:03:03 am"
    },
    {
      input: { hour: 2, minute: 5, second: 5, meridiem: "am" },
      expected: "02:05:05 am"
    },
    {
      input: { hour: 3, minute: 8, second: 8, meridiem: "am" },
      expected: "03:08:08 am"
    },
    {
      input: { hour: 4, minute: 10, second: 10, meridiem: "am" },
      expected: "04:10:10 am"
    },
    {
      input: { hour: 5, minute: 13, second: 13, meridiem: "am" },
      expected: "05:13:13 am"
    },
    {
      input: { hour: 6, minute: 15, second: 15, meridiem: "am" },
      expected: "06:15:15 am"
    },
    {
      input: { hour: 7, minute: 18, second: 18, meridiem: "am" },
      expected: "07:18:18 am"
    },
    {
      input: { hour: 8, minute: 20, second: 20, meridiem: "am" },
      expected: "08:20:20 am"
    },
    {
      input: { hour: 9, minute: 23, second: 23, meridiem: "am" },
      expected: "09:23:23 am"
    },
    {
      input: { hour: 10, minute: 25, second: 25, meridiem: "am" },
      expected: "10:25:25 am"
    },
    {
      input: { hour: 11, minute: 28, second: 28, meridiem: "am" },
      expected: "11:28:28 am"
    },
    {
      input: { hour: 0, minute: 30, second: 30, meridiem: "pm" },
      expected: "00:30:30 pm"
    },
    {
      input: { hour: 1, minute: 33, second: 33, meridiem: "pm" },
      expected: "01:33:33 pm"
    },
    {
      input: { hour: 2, minute: 35, second: 35, meridiem: "pm" },
      expected: "02:35:35 pm"
    },
    {
      input: { hour: 3, minute: 38, second: 38, meridiem: "pm" },
      expected: "03:38:38 pm"
    },
    {
      input: { hour: 4, minute: 40, second: 40, meridiem: "pm" },
      expected: "04:40:40 pm"
    },
    {
      input: { hour: 5, minute: 43, second: 43, meridiem: "pm" },
      expected: "05:43:43 pm"
    },
    {
      input: { hour: 6, minute: 45, second: 45, meridiem: "pm" },
      expected: "06:45:45 pm"
    },
    {
      input: { hour: 7, minute: 48, second: 48, meridiem: "pm" },
      expected: "07:48:48 pm"
    },
    {
      input: { hour: 8, minute: 50, second: 50, meridiem: "pm" },
      expected: "08:50:50 pm"
    },
    {
      input: { hour: 9, minute: 53, second: 53, meridiem: "pm" },
      expected: "09:53:53 pm"
    },
    {
      input: { hour: 10, minute: 55, second: 55, meridiem: "pm" },
      expected: "10:55:55 pm"
    },
    {
      input: { hour: 11, minute: 58, second: 58, meridiem: "pm" },
      expected: "11:58:58 pm"
    }
  ];

  testcases.forEach(function(each_case) {
    assert.deepEqual(
      hour.get12Hour(each_case.input),
      each_case.expected,
      ") should convert as readable 12-hour format"
    );
  });

  assert.end();
});

tape("to24Hour", function(assert) {
  let testcases = [
    /* no zero prefix */
    {
      input: "12:0:0 am",
      expected: { hour: 0, minute: 0, second: 0, meridiem: null }
    },
    {
      input: "1:3:3 am",
      expected: { hour: 1, minute: 3, second: 3, meridiem: null }
    },
    {
      input: "2:05:5 am",
      expected: { hour: 2, minute: 5, second: 5, meridiem: null }
    },
    {
      input: "3:8:08 am",
      expected: { hour: 3, minute: 8, second: 8, meridiem: null }
    },
    {
      input: "4:10:10 am",
      expected: { hour: 4, minute: 10, second: 10, meridiem: null }
    },
    {
      input: "05:13:13 am",
      expected: { hour: 5, minute: 13, second: 13, meridiem: null }
    },
    {
      input: "06:15:15 am",
      expected: { hour: 6, minute: 15, second: 15, meridiem: null }
    },
    {
      input: "07:18:18 am",
      expected: { hour: 7, minute: 18, second: 18, meridiem: null }
    },
    {
      input: "08:20:20 am",
      expected: { hour: 8, minute: 20, second: 20, meridiem: null }
    },
    {
      input: "09:23:23 am",
      expected: { hour: 9, minute: 23, second: 23, meridiem: null }
    },
    {
      input: "10:25:25 am",
      expected: { hour: 10, minute: 25, second: 25, meridiem: null }
    },
    {
      input: "11:28:28 am",
      /* different delimiter */
      expected: { hour: 11, minute: 28, second: 28, meridiem: null }
    },
    {
      input: "12-30-30 pm",
      expected: { hour: 12, minute: 30, second: 30, meridiem: null }
    },
    {
      input: "01/33/33 pm",
      expected: { hour: 13, minute: 33, second: 33, meridiem: null }
    },
    {
      input: "02.35.35 pm",
      expected: { hour: 14, minute: 35, second: 35, meridiem: null }
    },
    {
      input: "03 38 38 pm",
      expected: { hour: 15, minute: 38, second: 38, meridiem: null }
    },
    {
      input: "04: 40: 40 pm",
      expected: { hour: 16, minute: 40, second: 40, meridiem: null }
    },
    {
      input: "05 :43 :43 pm",
      expected: { hour: 17, minute: 43, second: 43, meridiem: null }
    },
    /* also support object */
    {
      input: { hour: 6, minute: 45, second: 45, meridiem: "pm" },
      expected: { hour: 18, minute: 45, second: 45, meridiem: null }
    },
    {
      input: { hour: 7, minute: 48, second: 48, meridiem: "pm" },
      expected: { hour: 19, minute: 48, second: 48, meridiem: null }
    },
    {
      input: { hour: 8, minute: 50, second: 50, meridiem: "pm" },
      expected: { hour: 20, minute: 50, second: 50, meridiem: null }
    },
    {
      input: { hour: 9, minute: 53, second: 53, meridiem: "pm" },
      expected: { hour: 21, minute: 53, second: 53, meridiem: null }
    },
    {
      input: { hour: 10, minute: 55, second: 55, meridiem: "pm" },
      expected: { hour: 22, minute: 55, second: 55, meridiem: null }
    },
    {
      input: { hour: 11, minute: 58, second: 58, meridiem: "pm" },
      expected: { hour: 23, minute: 58, second: 58, meridiem: null }
    }
  ];

  testcases.forEach(function(each_case) {
    assert.deepEqual(
      hour.to24Hour(each_case.input),
      each_case.expected,
      ") should convert as 24-hour format"
    );
  });

  assert.end();
});

tape("get24Hour", function(assert) {
  let testcases = [
    {
      input: { hour: 12, minute: 0, second: 0, meridiem: null },
      expected: "12:00:00"
    },
    {
      input: { hour: 1, minute: 3, second: 3, meridiem: null },
      expected: "01:03:03"
    },
    {
      input: { hour: 2, minute: 5, second: 5, meridiem: null },
      expected: "02:05:05"
    },
    {
      input: { hour: 3, minute: 8, second: 8, meridiem: null },
      expected: "03:08:08"
    },
    {
      input: { hour: 4, minute: 10, second: 10, meridiem: null },
      expected: "04:10:10"
    },
    {
      input: { hour: 5, minute: 13, second: 13, meridiem: null },
      expected: "05:13:13"
    },
    {
      input: { hour: 6, minute: 15, second: 15, meridiem: null },
      expected: "06:15:15"
    },
    {
      input: { hour: 7, minute: 18, second: 18, meridiem: null },
      expected: "07:18:18"
    },
    {
      input: { hour: 8, minute: 20, second: 20, meridiem: null },
      expected: "08:20:20"
    },
    {
      input: { hour: 9, minute: 23, second: 23, meridiem: null },
      expected: "09:23:23"
    },
    {
      input: { hour: 10, minute: 25, second: 25, meridiem: null },
      expected: "10:25:25"
    },
    {
      input: { hour: 11, minute: 28, second: 28, meridiem: null },
      expected: "11:28:28"
    },
    {
      input: { hour: 12, minute: 30, second: 30 },
      expected: "12:30:30"
    },
    {
      input: { hour: 13, minute: 33, second: 33 },
      expected: "13:33:33"
    },
    {
      input: { hour: 14, minute: 35, second: 35 },
      expected: "14:35:35"
    },
    {
      input: { hour: 15, minute: 38, second: 38 },
      expected: "15:38:38"
    },
    {
      input: { hour: 16, minute: 40, second: 40 },
      expected: "16:40:40"
    },
    {
      input: { hour: 17, minute: 43, second: 43 },
      expected: "17:43:43"
    },
    {
      input: { hour: 18, minute: 45, second: 45 },
      expected: "18:45:45"
    },
    {
      input: { hour: 19, minute: 48, second: 48 },
      expected: "19:48:48"
    },
    {
      input: { hour: 20, minute: 50, second: 50 },
      expected: "20:50:50"
    },
    {
      input: { hour: 21, minute: 53, second: 53 },
      expected: "21:53:53"
    },
    {
      input: { hour: 22, minute: 55, second: 55 },
      expected: "22:55:55"
    },
    {
      input: { hour: 23, minute: 58, second: 58 },
      expected: "23:58:58"
    }
  ];

  testcases.forEach(function(each_case) {
    assert.deepEqual(
      hour.get24Hour(each_case.input),
      each_case.expected,
      ") should convert as readable 24-hour format"
    );
  });

  assert.end();
});

tape("getHour", function(assert) {
  let testcases = [
    {
      input: "0 hours 0 minutes 0 seconds",
      expected: { hour: 0, minute: 0, second: 0, meridiem: null }
    },
    {
      input: "1 hours 3 minutes 3 seconds",
      expected: { hour: 1, minute: 3, second: 3, meridiem: null }
    },
    {
      input: "2 hours 5 minutes 5 seconds",
      expected: { hour: 2, minute: 5, second: 5, meridiem: null }
    },
    {
      input: "3 hours 8 minutes 8 seconds",
      expected: { hour: 3, minute: 8, second: 8, meridiem: null }
    },
    {
      input: "4 hours 10 minutes 10 seconds",
      expected: { hour: 4, minute: 10, second: 10, meridiem: null }
    },
    {
      input: "5 hours 13 minutes 13 seconds",
      expected: { hour: 5, minute: 13, second: 13, meridiem: null }
    },
    {
      input: "6 hours 15 minutes 15 seconds",
      expected: { hour: 6, minute: 15, second: 15, meridiem: null }
    },
    {
      input: "7 hours 18 minutes 18 seconds",
      expected: { hour: 7, minute: 18, second: 18, meridiem: null }
    },
    {
      input: "8 hours 20 minutes 20 seconds",
      expected: { hour: 8, minute: 20, second: 20, meridiem: null }
    },
    {
      input: "9 hours 23 minutes 23 seconds",
      expected: { hour: 9, minute: 23, second: 23, meridiem: null }
    },
    {
      input: "10:25:25 AM",
      expected: { hour: 10, minute: 25, second: 25, meridiem: "am" }
    },
    {
      input: "11:28:28 PM",
      expected: { hour: 11, minute: 28, second: 28, meridiem: "pm" }
    },
    {
      input: "12 hours 30 minutes 30 seconds",
      expected: { hour: 12, minute: 30, second: 30, meridiem: null }
    },
    {
      input: "13 hours 33 minutes 33 seconds",
      expected: { hour: 13, minute: 33, second: 33, meridiem: null }
    },
    {
      input: "14:35:35",
      expected: { hour: 14, minute: 35, second: 35, meridiem: null }
    },
    {
      input: "15-38-38",
      expected: { hour: 15, minute: 38, second: 38, meridiem: null }
    },
    {
      input: "16:40:40",
      expected: { hour: 16, minute: 40, second: 40, meridiem: null }
    },
    {
      input: "17 hours 43 minutes 43 seconds",
      expected: { hour: 17, minute: 43, second: 43, meridiem: null }
    },
    {
      input: "18 hours 45 minutes 45 seconds",
      expected: { hour: 18, minute: 45, second: 45, meridiem: null }
    },
    {
      input: "19 hours 48 minutes 48 seconds",
      expected: { hour: 19, minute: 48, second: 48, meridiem: null }
    },
    {
      input: "20 hours 50 minutes 50 seconds",
      expected: { hour: 20, minute: 50, second: 50, meridiem: null }
    },
    {
      input: "21 hours 53 minutes 53 seconds",
      expected: { hour: 21, minute: 53, second: 53, meridiem: null }
    },
    {
      input: "22 hours 55 minutes 55 seconds",
      expected: { hour: 22, minute: 55, second: 55, meridiem: null }
    },
    {
      input: "23 hours 58 minutes 58 seconds",
      expected: { hour: 23, minute: 58, second: 58, meridiem: null }
    }
  ];
  testcases.forEach(function(each_case) {
    assert.deepEqual(
      hour.getHour(each_case.input),
      each_case.expected,
      ") should convert as object"
    );
  });
  assert.end();
});

tape("compareHour", function(assert) {
  assert.deepEqual(
    hour.compareHour("14:23:45", "2.23.45 PM").eq,
    true,
    ") should equals hour"
  );
  assert.deepEqual(
    hour.compareHour("12.23.45", "11.23.45").gt,
    true,
    ") should greater than hour"
  );
  assert.deepEqual(
    hour.compareHour("11.23.45 ", "11.23.45").gte,
    true,
    ") should equal than  hour"
  );
  assert.deepEqual(
    hour.compareHour("1:23:45 PM", "11.23.45 AM").gte,
    true,
    ") should greater hour"
  );
  assert.deepEqual(
    hour.compareHour("11.23.45 AM", "13:23:45").lt,
    true,
    ") should lesser than hour"
  );
  assert.deepEqual(
    hour.compareHour("2:23:45 AM", "1:23:45 PM").lte,
    true,
    ") should lesser than  hour"
  );
  assert.deepEqual(
    hour.compareHour("2:23:45 PM", "14:45:21").lte,
    true,
    ") should equals hour"
  );
  assert.deepEqual(
    hour.compareHour("2:23:45 PM", "2:23:45 AM").ne,
    true,
    ") should not equals hour"
  );

  assert.end();
});

// tape("", function(assert) {
//   let testcases = [];
//   testcases.forEach(function(each_case) {
//     assert.deepEqual(
//       hour.get12Hour(each_case.input),
//       each_case.expected,
//       ") should convert as readable 12-hour format"
//     );
//   });

//   assert.end();
// });
