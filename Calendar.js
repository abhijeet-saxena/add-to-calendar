const TIME_UNITS = {
  MINUTES: "TM",
  HOURS: "TH",
  DAYS: "D",
  WEEKS: "W",
};

class CalendarInvite {
  constructor(timeZone = {}) {
    const {
      zone = "Asia/Kolkata",
      name = "IST",
      offsetFrom = "+0530",
      offsetTo = "+0530",
    } = timeZone;

    this.timeZone = {
      zone,
      name,
      offsetFrom,
      offsetTo,
    };

    this.events = [];
    this.template = null;
  }

  addEvent(event) {
    this.events.push(event);
  }

  addMultipleEvents(events = []) {
    this.events = [...this.events, ...events];
  }

  generateInvite() {
    let template = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//itsrockyy.me//add-to-calendar
CALSCALE:GREGORIAN
BEGIN:VTIMEZONE
TZID:${this.timeZone.zone}
TZURL:http://tzurl.org/zoneinfo-outlook/${this.timeZone.zone}
X-LIC-LOCATION:${this.timeZone.zone}
BEGIN:STANDARD
TZOFFSETFROM:${this.timeZone.offsetFrom}
TZOFFSETTO:${this.timeZone.offsetTo}
TZNAME:${this.timeZone.name}
DTSTART:19700101T000000
END:STANDARD
END:VTIMEZONE`;

    this.events.forEach((item, index) => {
      item.uid += `/#${index + 1}`;
      template += item.toString();
    });

    template += "\nEND:VCALENDAR";

    console.log(template);

    const dlink = document.createElement("a");
    dlink.download = "invite.ics";
    dlink.target = "_blank";
    dlink.innerText = "CLick Me";
    dlink.href = `data:text/calendar;charset=utf-8;base64,${window.btoa(
      template
    )}`;
    document.body.appendChild(dlink);
    // dlink.click();
  }
}

class CalendarEvent {
  constructor(title = "", description = "", options = {}) {
    const {
      geo = { lat: "", long: "" },
      location = "",
      url = "",
      timeTransparency = null,
      busyStatus = null,
      timeZone = {
        zone: "Asia/Kolkata",
        name: "IST",
        offsetFrom: "+0530",
        offsetTo: "+0530",
      },
    } = options;
    this.creationTimeStamp =
      new Date().toISOString().split(".")[0].replace(/\-|:/g, "") + "Z";
    this.uid = `${this.creationTimeStamp}@itsrockyy.me/add-to-calendar`;
    this.title = title;
    this.description = description;
    this.url = url;
    this.location = location;
    this.timeZone = timeZone;
    this.geo = { lat: geo.lat, long: geo.long };
    this.geo = geo;
    this.timeTransparency = timeTransparency;
    this.busyStatus = busyStatus;
    this.trigger = "-PT30M";
    this.allDay = false;
    this.dateStart = null;
    this.dateEnd = null;
  }

  setDateTime(allDay = false, dateStart, dateEnd, timeStart, timeEnd) {
    if (allDay) {
      this.dateStart = `VALUE=DATE:${dateStart}`;
      this.dateEnd = `VALUE=DATE:${dateEnd}`;
    } else {
      this.dateStart = `TZID=${this.timeZone.zone}:${dateStart}T${timeStart}`;
      this.dateEnd = `TZID=${this.timeZone.zone}:${dateEnd}T${timeEnd}`;
    }
  }

  setAlarm(duration = 30, units = "MINUTES", before = true) {
    let trigger = before ? "-P" : "P";
    switch (units) {
      case "HOURS":
        trigger += `T${duration}H`;
        break;
      case "DAYS":
        trigger += `${duration}D`;
        break;
      case "WEEKS":
        trigger += `${duration}W`;
        break;
      case "MINUTES":
      default:
        trigger += `T${duration}M`;
    }
    this.trigger = trigger;
  }

  printEvent() {
    console.log(this);
  }

  toString() {
    return `
BEGIN:VEVENT
DTSTAMP:${this.creationTimeStamp}
UID:${this.uid}
DTSTART;${this.dateStart}
DTEND;${this.dateEnd}
SUMMARY:${this.title}
URL:${this.url}
DESCRIPTION:${this.description}
LOCATION:${this.location}
GEO:${this.geo.lat};${this.geo.long}
TRANSP:${this.timeTransparency}
X-MICROSOFT-CDO-BUSYSTATUS:${this.busyStatus}
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Test
TRIGGER:${this.trigger}
END:VALARM
END:VEVENT`;
  }
}
// RRULE:FREQ=DAILY;INTERVAL=9;UNTIL=20200929T063000Z]
// RRULE:FREQ=YEARLY;INTERVAL=9;BYMONTH=9;BYMONTHDAY=6;COUNT=7
// RRULE:FREQ=MONTHLY;INTERVAL=9;BYMONTHDAY=6;COUNT=3
// RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=SU,MO,TU,WE,TH,FR,SA;COUNT=2
