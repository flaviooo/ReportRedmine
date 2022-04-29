$(document).ready(function () {
    let dataweek = 'Jul 01 2022';
    console.log(
        week(2022, 4, 27),
        week(2016, 06, 11),//23     
        week(2015, 9, 26),//39 
        week(2016, 1, 1),//53
        week(2016, 1, 4),//1
        week(new Date(2016, 0, 4)),//1 
        week("11 january 2016")//2 
    );

    function week(year, month, day) {
        function serial(days) {
            return 86400000 * days;
        }
        function dateserial(year, month, day) {
            return (new Date(year, month - 1, day).valueOf());
        }
        function weekday(date) {
            return (new Date(date)).getDay() + 1;
        }
        function yearserial(date) {
            return (new Date(date)).getFullYear();
        }

        var date = year instanceof Date ? year.valueOf() : typeof year === "string" ? new Date(year).valueOf() : dateserial(year, month, day), date2 = dateserial(yearserial(date - serial(weekday(date - serial(1))) + serial(4)), 1, 3);
        return ~~((date - date2 + serial(weekday(date2) + 5)) / serial(7));
    }

})
// add get week prototype functions 
// weeks always start from monday to sunday 
// january 4th is always in the first week of the year 
Date.prototype.getWeek = function () {
    year = this.getFullYear();
    var currentDotw = this.getWeekDay();
    if (this.getMonth() == 11 && this.getDate() - currentDotw > 28) {
        // if true, the week is part of next year
        return this.getWeekForYear(year + 1);
    }
    if (this.getMonth() == 0 && this.getDate() + 6 - currentDotw < 4) {
        // if true, the week is part of previous year 
        return this.getWeekForYear(year - 1);
    }
    return this.getWeekForYear(year);
}
// returns a zero based day, where monday = 0 
// all weeks start with monday
Date.prototype.getWeekDay = function () {
    return (this.getDay() + 6) % 7;
}
// corrected for summer/winter time 
Date.prototype.getWeekForYear = function (year) {
    var currentDotw = this.getWeekDay();
    var fourjan = new Date(year, 0, 4);
    var firstDotw = fourjan.getWeekDay();
    var dayTotal = this.getDaysDifferenceCorrected(fourjan)
    // the difference in days between the two dates. 
    // correct for the days of the week 
    dayTotal += firstDotw;
    // the difference between the current date and the first monday of the first week, dayTotal -= currentDotw;
    // the difference between the first monday and the current week's monday
    // day total should be a multiple of 7 now 
    var weeknumber = dayTotal / 7 + 1;
    // add one since it gives a zero based week number. 
    return weeknumber;
}
// corrected for timezones and offset 
Date.prototype.getDaysDifferenceCorrected = function (other) {
    var millisecondsDifference = (this - other);
    // correct for offset difference. offsets are in minutes, the difference is in milliseconds
    millisecondsDifference += (other.getTimezoneOffset() - this.getTimezoneOffset()) * 60000;
    // return day total. 1 day is 86400000 milliseconds, floor the value to return only full days 
    return Math.floor(millisecondsDifference / 86400000);
}

