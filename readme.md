# Gym Reservation Automation Script

## Background
Due to Covid-19 building management severely restricted access to my in-house gym. Bookings needed to be made two days in advance with the booking platform opening up at exactly midnight. The restriction was so severe that all available slots would fill up within 5 seconds of the booking system opening up at midnight. Getting an allocated slot was a lottery.

## My Solution:
I decided to automate the booking process by writing an automation script with Selenium Webdriver. I achieved this by:
+ storing my personal booking platform credentials in an .env file (not included in this public repo)
+ changing .env file access rights to read/write for user only, with groups and others not having any access rights `chmod 600 .env`
+ Reading out the .env file with the [envy library](https://www.npmjs.com/package/envy) which follows the [Twelve Factor App](https://12factor.net/) methodology and is a secure, light-weight, and easy-to-use alternative to [dotenv](https://www.npmjs.com/package/dotenv)
+ my webdriver script uses a Chrome driver to load the booking platform into my browser
+ the script then enters my credentials and signs-in
+ the script uses asynchronous async/await methods to ensure navigation commands are run in order (e.g. click in book button only after sign-up was successful)
+ I use crontab to schedule the execution of my script every night at 23:59 `crontab -e`
+ the script's asynchronous nature will have it "hang" on the last step before entering date/time of the desired slot
+ Once the booking form field has become available, the script selects the date/time and submits the form

All I have to do in the morning is move the booking confirmation email into my trail. ;-)
