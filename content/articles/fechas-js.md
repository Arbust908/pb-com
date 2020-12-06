---
title: Fechas JS
description: Usamos Date para darle forma a nuestras fechas
img_small: cosa6_small.jpg
img: cosa2.jpg
alt: my second blog post
tags:
  - JS
  - Javascript
---

### En construccion...

<!--
Here's a very common task: how do you format a date with JavaScript?

Given a Date object:

const date = new Date('July 22, 2018 07:22:13')
there are lots of methods that will generate a string representing that date.

There are a few built-in ones. I list them all, along with a comment that shows a sample output:

date.toString()
// "Sun Jul 22 2018 07:22:13 GMT+0200 (Central European Summer Time)"
date.toTimeString() //"07:22:13 GMT+0200 (Central European Summer Time)"
date.toUTCString() //"Sun, 22 Jul 2018 05:22:13 GMT"
date.toDateString() //"Sun Jul 22 2018"
date.toISOString() //"2018-07-22T05:22:13.000Z" (ISO 8601 format)
date.toLocaleString() //"22/07/2018, 07:22:13"
date.toLocaleTimeString() //"07:22:13"
You are not limited to those, of course - you can use more low level methods to get a value out of a date, and construct any kind of result you want:

date.getDate() //22
date.getDay() //0 (0 means sunday, 1 means monday..)
date.getFullYear() //2018
date.getMonth() //6 (starts from 0)
date.getHours() //7
date.getMinutes() //22
date.getSeconds() //13
date.getMilliseconds() //0 (not specified)
date.getTime() //1532236933000
date.getTimezoneOffset() //-120 (will vary depending on where you are and when you check - this is CET during the summer). Returns the timezone difference expressed in minutes
Those all depend on the current timezone of the computer. There are equivalent UTC versions of these methods, that return the UTC value rather than the values adapted to your current timezone:

date.getUTCDate() //22
date.getUTCDay() //0 (0 means sunday, 1 means monday..)
date.getUTCFullYear() //2018
date.getUTCMonth() //6 (starts from 0)
date.getUTCHours() //5 (not 7 like above)
date.getUTCMinutes() //22
date.getUTCSeconds() //13
date.getUTCMilliseconds() //0 (not specified)

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

console.log(event.toLocaleDateString('de-DE', options));
// expected output: Donnerstag, 20. Dezember 2012

console.log(event.toLocaleDateString('ar-EG', options));
// expected output: الخميس، ٢٠ ديسمبر، ٢٠١٢

console.log(event.toLocaleDateString(undefined, options));
// expected output: Thursday, December 20, 2012 (varies according to default locale)


const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

// British English uses day-month-year order and 24-hour time without AM/PM
console.log(event.toLocaleString('en-GB', { timeZone: 'UTC' }));
// expected output: 20/12/2012, 03:00:00

// Korean uses year-month-day order and 12-hour time with AM/PM
console.log(event.toLocaleString('ko-KR', { timeZone: 'UTC' }));
// expected output: 2012. 12. 20. 오전 3:00:00


options Optional
An object with some or all of the following properties:

dateStyle
The date formatting style to use when calling format(). Possible values include:
"full"
"long"
"medium"
"short"
dateStyle can be used with timeStyle, but not with other options (e.g. weekday, hour, month, etc.).

timeStyle
The time formatting style to use when calling format(). Possible values include:
"full"
"long"
"medium"
"short"
timeStyle can be used with dateStyle, but not with other options (e.g. weekday, hour, month, etc.).

calendar
Calendar. Possible values include: "buddhist", "chinese", " coptic", "ethiopia", "ethiopic", "gregory", " hebrew", "indian", "islamic", "iso8601", " japanese", "persian", "roc".
dayPeriod
The way day periods should be expressed. Possible values include: "narrow", "short", " long".
numberingSystem
Numbering System. Possible values include: "arab", "arabext", " bali", "beng", "deva", "fullwide", " gujr", "guru", "hanidec", "khmr", " knda", "laoo", "latn", "limb", "mlym", " mong", "mymr", "orya", "tamldec", " telu", "thai", "tibt".
localeMatcher
The locale matching algorithm to use. Possible values are "lookup" and "best fit"; the default is "best fit". For information about this option, see the Intl page.
timeZone
The time zone to use. The only value implementations must recognize is "UTC"; the default is the runtime's default time zone. Implementations may also recognize the time zone names of the IANA time zone database, such as "Asia/Shanghai", "Asia/Kolkata", "America/New_York".
hour12
Whether to use 12-hour time (as opposed to 24-hour time). Possible values are true and false; the default is locale dependent. This option overrides the hc language tag and/or the hourCycle option in case both are present.
hourCycle
The hour cycle to use. Possible values are "h11", "h12", "h23", or "h24". This option overrides the hc language tag, if both are present, and the hour12 option takes precedence in case both options have been specified.
formatMatcher
The format matching algorithm to use. Possible values are "basic" and "best fit"; the default is "best fit". See the following paragraphs for information about the use of this property.
The following properties describe the date-time components to use in formatted output, and their desired representations. Implementations are required to support at least the following subsets:

weekday, year, month, day, hour, minute, second
weekday, year, month, day
year, month, day
year, month
month, day
hour, minute, second
hour, minute
Implementations may support other subsets, and requests will be negotiated against all available subset-representation combinations to find the best match. Two algorithms are available for this negotiation and selected by the formatMatcher property: A fully specified "basic" algorithm and an implementation-dependent "best fit" algorithm.

weekday
The representation of the weekday. Possible values are:
"long" (e.g., Thursday)
"short" (e.g., Thu)
"narrow" (e.g., T). Two weekdays may have the same narrow style for some locales (e.g. Tuesday's narrow style is also T).
era
The representation of the era. Possible values are:
"long" (e.g., Anno Domini)
"short" (e.g., AD)
"narrow" (e.g., A)
year
The representation of the year. Possible values are:
"numeric" (e.g., 2012)
"2-digit" (e.g., 12)
month
The representation of the month. Possible values are:
"numeric" (e.g., 2)
"2-digit" (e.g., 02)
"long" (e.g., March)
"short" (e.g., Mar)
"narrow" (e.g., M). Two months may have the same narrow style for some locales (e.g. May's narrow style is also M).
day
The representation of the day. Possible values are:
"numeric" (e.g., 1)
"2-digit" (e.g., 01)
hour
The representation of the hour. Possible values are "numeric", "2-digit".
minute
The representation of the minute. Possible values are "numeric", "2-digit".
second
The representation of the second. Possible values are "numeric", "2-digit".
fractionalSecondDigits
Added in Firefox 84, Chrome 84, etc. See compatibility table for more information.

The number of digits used to represent fractions of a second (any additional digits are truncated). Possible values are:
0 (Fractional part dropped.)
1 (Fractional part represented as 1 digit. For example, 736 is formatted as 7.)
2 (Fractional part represented as 2 digits. For example, 736 is formatted as 73.)
3 (Fractional part represented as 3 digits. For example, 736 is formatted as 736.)
timeZoneName
The representation of the time zone name. Possible values are:
"long" (e.g., British Summer Time)
"short" (e.g., GMT+1) -->
