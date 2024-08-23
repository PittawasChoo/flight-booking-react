# Flight booking application frontend with React
Secure flight search and booking system project for applying to full stack developer at 30 Secondstofly.

## Pre-requisites
- Install [Node.js](https://nodejs.org/en/)

# Getting started
- Clone the repository
```
git clone https://github.com/PittawasChoo/flight-booking-react.git
```
- Create **.env** file in the same level as README.md, package.json, and other. After create .env file, add code below into it and replace the {...} with real data. In production or in other environment, .env can be set with other secret keys but we will use these generated keys for now.
```
# Environment variables.
REACT_APP_FLIGHT_BOOKING_API_URL=http://localhost:3001
```
- Install dependencies
```
cd flight-booking-react
npm install
```
- Run the project
```
npm start
```

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules** | Contains all npm dependencies. |
| **public** | Contains images and other static files |
| **src** | Contains source code that will be compiled. |
| **src/components** | Contains component which used across the application |
| **src/constant**| Contains constant value e.g. method type string. |
| **src/context**| Contains context and provider to share state across its children. |
| **src/hooks** | Contains hooks which used across application |
| **src/modules** | Common functions to be used across the app. |
| **src/pages** | Contain all pages in application |
| **src**/App.js | Contain top level enviroment for application |
| **src**/index.js | Entry point to express app |
| .env | Contains all secret configurations |
| jsconfig.json | Contains compile options (baseUrl to shorten import path) |
| package.json | Contains npm dependencies |

## Pages
All pages in this project
```
/        : Main page; Contains search logic and show flight options to proceed to booking page
/booking : Booking page; Contains booking form with selected flight summary
/admin   : Admin page; The page created only for show simple role-access control from requirements. There is no item to navigate to this page. This page can access only by changing url to /admin. 
           To check role-access control behavior, you can go to main page first then login with account with user or admin role then change url to /admin to check the page display.
           There are 3 display styles for this page; for admin, for non-admin account, and for user that haven't logged in. The username and password are already created in backup data. For username and password, please check the instruction step 2.6 .
```

## Requirements and solutions
- 	Implement a search form for users to input origin, destination, and travel dates.
    - In main page user can search flight by put origin, destination, and departure date then click search
- 	Display search results with flight options.
    - After search, possible flight route will be displayed in main page.
- 	Create a simple booking form to capture passenger details and payment information.
    - On flight options, if click select, app will navigate to booking page but user need to log in first.
-   Implement secure user authentication and authorization.
    - Get permission before access to booking and admin page. The permission will be decided from backend. No sensitive data store in token.
-   Implement proper input validation and sanitization to prevent SQL injection and XSS attacks.
    - Use **validator** lib to sanitize input before sending to backend. The sanitizor is stored in modules/text.
-   Implement basic role-based access control.
    - There are 2 role for users; admin and user. This will be checked by backend when user access to admin page.
-   Consider scalability in your design.
    - Structure of this repo is designed for future scalability.

## Note
- You will see some blink in some page or button. Those behavior came from loading handling. To see the loading handling component (and spinner button), I recommend to set network to fast 4G (F12 > Network > In top right corner, change from "No throttling" to "Fast 4G" or other slower network to make it load more longer)
- Many designs are inspired by Google Flights and other flight booking website.
