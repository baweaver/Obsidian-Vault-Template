/*

A few simple utilities for date displays. I _could_ inline all of
this in the templates, but this centralizes a lot of common logic
I notice proliferating notes.

*/

class Momentary {
  constructor(dateString) {
    this.dateString = dateString;
    this.moment = moment(this.dateString);
  }

  timestamp() {
    return this.moment.format("YYYY-MM-DDTHH:mm");
  }

  // Day

  day() {
    return this.moment.format("DD");
  }

  dayName() {
    return this.moment.format("dddd");
  }

  englishDay() {
    return this.moment.format('MM-DD-YYYY');
  }

  prettyDay() {
    return this.moment.format("dddd, MMMM Do, YYYY");
  }

  // Week

  startOfWeek() {
    return this.moment.startOf('week').format('MM-DD');
  }

  startOfWeek() {
    return this.moment.startOf('week').format('YYYY-MM-DD');
  }

  endOfWeek() {
    return this.moment.endOf('week').format('YYYY-MM-DD');
  }

  englishEndOfWeek() {
    return this.moment.endOf('week').format('MM-DD-YYYY');
  }

  weekNumber() {
    return this.moment.format("WW");
  }

  // Month

  startOfMonth() {
    return this.moment.startOf('month').format('YYYY-MM-DD');
  }

  endOfMonth() {
    return this.moment.endOf('month').format('YYYY-MM-DD');
  }

  monthNumber() {
    return this.moment.format("MM");
  }

  monthName() {
    return this.moment.format("MMMM");
  }

  // Quarter

  startOfQuarter() {
    return this.moment.startOf('quarter').format('YYYY-MM-DD');
  }

  endOfQuarter() {
    return this.moment.endOf('quarter').format('YYYY-MM-DD');
  }

  quarterNumber() {
    return this.moment.format("QQ");
  }

  // Year

  yearNumber() {
    return this.moment.format("YYYY");
  }

  shortYearNumber() {
    return this.moment.format("YY");
  }

  properties() {
    return {
      day: this.day(),
      dayName: this.dayName(),
      englishDay: this.englishDay(),
      prettyDay: this.prettyDay(),
      shortStartOfWeek: this.startOfWeek(),
      startOfWeek: this.startOfWeek(),
      endOfWeek: this.endOfWeek(),
      englishEndOfWeek: this.endOfWeek(),
      weekNumber: this.weekNumber(),
      startOfMonth: this.startOfMonth(),
      endOfMonth: this.endOfMonth(),
      monthNumber: this.monthNumber(),
      monthName: this.monthName(),
      startOfQuarter: this.startOfQuarter(),
      endOfQuarter: this.endOfQuarter(),
      quarterNumber: this.quarterNumber(),
      yearNumber: this.yearNumber(),
      shortYearNumber: this.shortYearNumber(),
    }
  }
}

module.exports = Momentary;
