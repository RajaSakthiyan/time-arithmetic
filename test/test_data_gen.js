// test("", function(assert) {
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

function to12hourCase() {
  testcases = [];
  for (let i = 0; i < 24; i++) {
    let meridiem = i < 12 ? "am" : "pm";
    let hour = i < 12 ? i : i - 12;
    testcases.push({
      input:
        ("0" + String(i)).slice(-2, 3) +
        ":" +
        String(Math.round(i * 2.5)) +
        ":" +
        String(Math.round(i * 2.5)),
      expected: {
        hour: hour,
        minute: Math.round(i * 2.5),
        second: Math.round(i * 2.5),
        meridiem: meridiem,
      },
    });
  }
  console.log(testcases);
}

function get12hourCase() {
  testcases = [];
  for (let i = 0; i < 24; i++) {
    let meridiem = i < 12 ? "am" : "pm";
    let hour = i < 12 ? i : i - 12;
    testcases.push({
      input: {
        hour: hour,
        minute: Math.round(i * 2.5),
        second: Math.round(i * 2.5),
        meridiem: meridiem,
      },
      expected:
        ("0" + String(hour)).slice(-2, 3) +
        ":" +
        String(Math.round(i * 2.5)) +
        ":" +
        String(Math.round(i * 2.5)) +
        " " +
        meridiem,
    });
  }
  console.log(testcases);
}

function to24hourCase() {
  testcases = [];
  for (let i = 0; i < 24; i++) {
    let meridiem = i < 12 ? "am" : "pm";
    let hour = i < 12 ? i : i - 12;
    testcases.push({
      input:
        ("0" + String(hour)).slice(-2, 3) +
        ":" +
        String(Math.round(i * 2.5)) +
        ":" +
        String(Math.round(i * 2.5)) +
        " " +
        meridiem,
      expected: {
        hour: i,
        minute: Math.round(i * 2.5),
        second: Math.round(i * 2.5),
      },
    });
  }
  console.log(testcases);
}

function get24hourCase() {
  testcases = [];
  for (let i = 0; i < 24; i++) {
    testcases.push({
      input: {
        hour: i,
        minute: Math.round(i * 2.5),
        second: Math.round(i * 2.5),
      },
      expected:
        ("0" + String(i)).slice(-2, 3) +
        ":" +
        String(Math.round(i * 2.5)) +
        ":" +
        String(Math.round(i * 2.5)),
    });
  }
  console.log(testcases);
}

function gethourCase() {
  testcases = [];
  for (let i = 0; i < 24; i++) {
    testcases.push({
      input:
        String(i) +
        " hours " +
        String(Math.round(i * 2.5)) +
        " minutes " +
        String(Math.round(i * 2.5)) +
        " seconds",
      expected: {
        hour: i,
        minute: Math.round(i * 2.5),
        second: Math.round(i * 2.5),
      },
    });
  }
  console.log(testcases);
}

function getAddTestCases() {
  testcases = [
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
  for (let i = 0; i < 24; i++) {
    let meridiem = i < 12 ? "am" : "pm";
    let hour = i < 12 ? i : i - 12;
    testcases.push({
      input1:
        ("0" + String(hour)).slice(-2, 3) +
        ":" +
        String(Math.round(i * 2.5)) +
        ":" +
        String(Math.round(i * 2.5)) +
        " " +
        meridiem,
      input2: {
        hour: i,
        minute: Math.round(i * 2.5),
        second: Math.round(i * 2.5),
      },
      expected: {
        day: 0,
        hour: hour * 2,
        minute: Math.round(i * 2.5) * 2,
        second: Math.round(i * 2.5) * 2,
        meridiem: null,
        clock: "24-hour",
      },
    });
  }
  console.log(testcases);
}

getAddTestCases();
