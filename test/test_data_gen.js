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

gethourCase();
