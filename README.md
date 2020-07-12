# Vacation Planner

A React app that helps plan vacation.

Tests using Jest, mostly unit tests on date related modules.

## Setup:

1. Set holidays in `/assets/holidays.csv` ([Google doc template](https://docs.google.com/spreadsheets/d/1lbBE_TZyBdGtNq51_Vd4nriylwY7N9L-TN-jJiSilSw/edit?usp=sharing))
2. Set Calendar start and end dates, and special periods in `/app/helpers/importantDates.js`.
3. Set default number of days, and days carried over into next yaer in `/app/helpers/importantNumbers.js`
4. Set cookieName in `/app/components/Cal.jsx` if changing date range.
