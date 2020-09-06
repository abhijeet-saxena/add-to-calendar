let settings = {};

let event = {
  uid: "20200905T193614Z-347939590@marudot.com", //ISO String of curent Date + random text
  creationTimeStamp: "20200905T191325Z", //ISO String of curent Date
  title: "Event Title", //Title of calendar event
  description: "lorem ipsum", // Entire description text
  location: "Bengaluru", //location of event
  datetime: {
    allDay: false,
    dateStart: "20200906", //YYYYMMDD
    dateEnd: "20200907", //YYYYMMDD
    timeStart: "20200906T130000", //YYYYMMDDTHHMMSS
    timeEnd: "20200906T140000", //YYYYMMDDTHHMMSS
  },
  url: "", //url (OPTIONAL)
  timeZone: {
    zone: "Asia/Kolkata",
    name: "IST",
    offsetFrom: "+0530",
    offsetTo: "+0530",
  },
  geo: {
    //lat long of venue (OPTIONAL)
    lat: 30.12,
    long: -50.123,
  },
  alarm: {
    // If alarm is required (OPTIONAL)
    before: true,
    duration: 30,
    units: "MINUTES",
  },
  timeTransparency: TRANSPARENT, //TRANSPARENT, OPAQUE
  busyStatus: FREE, //FREE, TENTATIVE, BUSY, OOF
  repeatRule: {
    frequency: DAILY, //DAILY,WEEKLY,MONTHLY,YEARLY
    interval: 1, //Some Integer
    count: 1, //Number Of Occurances
    until: "20200929T063000Z", //Date ISO String
    byDay: "SU,MO,TU,WE,TH,FR,SA", //Comma separated days, first 2 letters of each day
    byMonthDay: 6, //Day of month
  },
};

const TIME_UNITS = {
  MINUTES: "TM",
  HOURS: "TH",
  DAYS: "D",
  WEEKS: "W",
};
