# My Clientele - client

This REACT app allows you to access your daily schedule, clients, previous reports, and even take reports on the go, maximizing your daily productivity.  

With My Clientele, you can keep all your client information in one place. This includes names, locations, hours of operations, if they are currently closed, and the current general manager.  You can even update the clients as this information changes.

Also included is your daily schedule of clients, and the ability to see all of your reports. These reports can be filtered, and feature the date of your report, your notes, and pictures you have taken.

The Take Report feature allows you to seamlessly and effortlessly take notes for each client visit, along with any photos you may need.

My Clientele is ideal for the fast paced and busy lifestyle you lead, and allows you to keep up-to-date with what places are closed due to things like Covid-19 or rennovations with the currently closed feature. With a click of a button, you can keep up to date with your clients and their needs, all from one easy to use app!

### Live Link and Demo Account

The live site can be accessed at [https://myclientele-f5.vercel.app/](https://myclientele-f5.vercel.app/)

To try the service, please use the credentials below to log in

Username: User<br />
Password: Password12#

## Team Members
Jacob Poteat<br />
Jonathan Clark<br />
Mandela Jones<br />
Taeil Kwak<br />
Sherry McCarty

### Screenshots

![Image of Mobile View] (docs/MyClienteleMobileView.png)

![Image of Home Page](docs/MyClienteleHomePage.png)

![Image of My Schedule](docs/MyClienteleMySchedule.png)

![Image of Client Search](docs/MyClienteleClientSearch.png)

![Image of Add Client](docs/MyClineteleAddClient.png)

![Image of Reports](docs/MyClienteleReports.png)

## Tech Stack

REACT, JavaScript, CSS3, HTML5, SCSS, NodeJS, ExpressJS, PostgreSQL

## To Run A Clean Start 

1. Clone this repository to your local machine
2. cd into the cloned repository
3. Remove the git history with rm -rf .get && git init
4. Install dependencies with npm install
5. Move the example Environment file to .env that will be ignored by git and read by React with mv example.env .env
6. Change project name in package.json to use whatever name you've given this project instead of "name": "myclientele-client"

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
Results of the test will be available in the terminal it was initiated in.
Testing smoke and screen testing.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm deploy`

Deploys app to vercel.

Before this, predeploy runs the build, which gets tested before it is built.

Running deploy will test, build, and deploy the app to vercel.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Server

This app is meant to run with [https://github.com/thinkful-ei-orka/myclientele-f5-api.git] (MyClientele API) server.

Please look at the README.md for more information on utilizing the server.

### To Use With Server

Please update the API_ENDPOINT in the config.js to point to where your server is running.

You will need a TOKEN_KEY to access the MyClietele API server, which should be kept secret.

## Server Documentation

### Usage
Base Url: _to update__/api
| Endpoint    | Method | Description                                                                                           |
| ----------- | ------- | ----------------------------------------------------------------------------------------------------- |
| /auth/login       | post     | Takes user name and password, checks for account,returns auth token                    |
| /auth/refresh       | put     | Takes user nam, returns new auth token                    |
| /users/       | post     | Takes registration info , then creates both a company and user for a new account|
| /clients/       | post     | Takes client information, inserts in to database and returns the client information in an object                    |
| /clients/       | get     | Gets all clients for associated with user, returns an object                    |
| /clients/:id       | get     | Takes client id as a path parameter, returns client information as an object                    |
| /clients/:id       | patch     | Takes client id as a path parameter and updated client information, alters client info in databse                    |
| /clients/:id       | delete     | Takes client id as a path parameter, removes client from database                    |
| /companies/:id | get  | Takes company id as a path parameter, returns company information as an object |
| /reports/ | get | Gets all reports associated with user, returns an object |
| /reports?clientid={id} | get | Gets all reports associated with a particular client by client id |
| /reports/ | post | Takes report information, inserts in to database and returns the report as an object |
| /reports/:report_id | get | Takes report id as a path paramater, returns report information as an object |
| /reports/:report_id | patch | Takes report id as a path paramater, and updated report information, and updates the report in the database |
| /reports/:report_id | delete | Takes report id as a path paramater, and deletes the report from the database |
### POST `/auth/login`
Parameters:  
{  
&nbsp;&nbsp;&nbsp;&nbsp;"user_name":"Irma-JuniorSale",  
&nbsp;&nbsp;&nbsp;&nbsp;"password":"P947fheh(*"  
}  
**user_name** *string*  
**password** *string*   

Returns:   
{  
&nbsp;&nbsp;&nbsp;&nbsp;"authToken":   
}  

### PUT `/auth/refresh`
Parameters:  
none  

Returns:   
{  
&nbsp;&nbsp;&nbsp;&nbsp;"authToken": ___  
}  

### POST `/users`
Parameters:  
{  
&nbsp;&nbsp;&nbsp;&nbsp;"name":"Irma",  
&nbsp;&nbsp;&nbsp;&nbsp;"user_name":"Irma-JuniorSale",  
&nbsp;&nbsp;&nbsp;&nbsp;"password":"P947fheh(*",  
&nbsp;&nbsp;&nbsp;&nbsp;"company_name":"F5 Energy",  
&nbsp;&nbsp;&nbsp;&nbsp;"company_location":"5 Fiskburg Lane, Carlsbad, DE 12345",  
&nbsp;&nbsp;&nbsp;&nbsp;"admin":"True",  
&nbsp;&nbsp;&nbsp;&nbsp;"email":"IrmaJS@f5ftw.com",  
&nbsp;&nbsp;&nbsp;&nbsp;"phone_number":"2045987890"  
}  
**name** *string*  
**username** *string*  
**password** *string* Must be between 8 and 72 characters, must include one upper case, one lower case, one number and one special character  
**company_name** *string*  
**company_location** *string*  
**admin** *boolean*  
**email** *string*  
**phone_number** *string* Format: 10 digit number  
  
Returns:   
{  
&nbsp;&nbsp;&nbsp;&nbsp;"User created"   
}  

### GET `/clients`
Parameters:  
None  
  
Returns:   
{     
&nbsp;&nbsp;&nbsp;&nbsp;"clients":[  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "54"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "The SVC Pharmacy",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"location": "678 Ivy Ave., Crisot, DE, 12345",    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"sales_rep_id": "7",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"company_id": "1",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"day_of_week": "3",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hours_of_operation": "Monday Tuesday Wednesday Saturday : 8AM-10PM",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"currently_closed": "True",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"notes": "General manager likes to relocate display. Check when arriving",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"general_manager": "Carl Dougins"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "57"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "The ABC Gas Station",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"location": "980 Leaf Ave., Crumbiy, DE, 12345",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"sales_rep_id": "7",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"company_id": "1",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"day_of_week": "6",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hours_of_operation": "Monday Tuesday Wednesday Saturday : 8AM-10PM",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"currently_closed": "True",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"notes": "",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"general_manager": "Doug Carlin"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}  
&nbsp;&nbsp;&nbsp;&nbsp;]  
}  
  
### POST `/clients`
Request Body Parameters:  
{  
&nbsp;&nbsp;&nbsp;&nbsp;"name":"The SVC Pharmacy",  
&nbsp;&nbsp;&nbsp;&nbsp;"locaiton":"678 Ivy Ave., Crisot, DE, 12345",  
&nbsp;&nbsp;&nbsp;&nbsp;"company_id":"1",  
&nbsp;&nbsp;&nbsp;&nbsp;"day_of_week":"3",  
&nbsp;&nbsp;&nbsp;&nbsp;"hours_of_operaiton":"Monday Tuesday Wednesday Saturday : 8AM-10PM",  
&nbsp;&nbsp;&nbsp;&nbsp;"currently_closed":"True",  
&nbsp;&nbsp;&nbsp;&nbsp;"notes":"General manager likes to relocate display. Check when arriving",  
&nbsp;&nbsp;&nbsp;&nbsp;"general_manager":"Carl Dougins"  
}  
  
**name** *string*  
**locaiton***string*  
**company_id** *integer*  
**day_of_week***integer* Format: 0-6 with Starting with Sunday  
**hours_of_operaiton** *string*  
**currently_closed** *boolean*  
**notes** *string*  
**general_manager** *string*  
  
Returns:   
{  
&nbsp;&nbsp;&nbsp;&nbsp;"id": "54"  
&nbsp;&nbsp;&nbsp;&nbsp;"name": "The SVC Pharmacy",  
&nbsp;&nbsp;&nbsp;&nbsp;"location": "678 Ivy Ave., Crisot, DE, 12345",  
&nbsp;&nbsp;&nbsp;&nbsp;"sales_rep_id": "7",  
&nbsp;&nbsp;&nbsp;&nbsp;"company_id": "1",  
&nbsp;&nbsp;&nbsp;&nbsp;"day_of_week": "3",  
&nbsp;&nbsp;&nbsp;&nbsp;"hours_of_operation": "Monday Tuesday Wednesday Saturday : 8AM-10PM",  
&nbsp;&nbsp;&nbsp;&nbsp;"currently_closed": "True",  
&nbsp;&nbsp;&nbsp;&nbsp;"notes": "General manager likes to relocate display. Check when arriving",  
&nbsp;&nbsp;&nbsp;&nbsp;"general_manager": "Carl Dougins"  
}  


### GET `/clients/:id`
Parameters:  
None  
  
Returns:   
{  
&nbsp;&nbsp;&nbsp;&nbsp;"id": "54"  
&nbsp;&nbsp;&nbsp;&nbsp;"name": "The SVC Pharmacy",  
&nbsp;&nbsp;&nbsp;&nbsp;"location": "678 Ivy Ave., Crisot, DE, 12345",  
&nbsp;&nbsp;&nbsp;&nbsp;"sales_rep_id": "7",  
&nbsp;&nbsp;&nbsp;&nbsp;"company_id": "1",  
&nbsp;&nbsp;&nbsp;&nbsp;"day_of_week": "3",  
&nbsp;&nbsp;&nbsp;&nbsp;"hours_of_operation": "Monday Tuesday Wednesday Saturday : 8AM-10PM",  
&nbsp;&nbsp;&nbsp;&nbsp;"currently_closed": "True",  
&nbsp;&nbsp;&nbsp;&nbsp;"notes": "General manager likes to relocate display. Check when arriving",  
&nbsp;&nbsp;&nbsp;&nbsp;"general_manager": "Carl Dougins"  
}  
### PATCH `/clients/:id`
Parameters:  
{  
&nbsp;&nbsp;&nbsp;&nbsp;"name":"The SVC Pharmacy",  
&nbsp;&nbsp;&nbsp;&nbsp;"location":"876 Branch Ave., Crisot, DE, 12345",  
&nbsp;&nbsp;&nbsp;&nbsp;"day_of_week":"3",  
&nbsp;&nbsp;&nbsp;&nbsp;"hours_of_operation":"Monday Tuesday Thursday Saturday : 8AM-10PM",  
&nbsp;&nbsp;&nbsp;&nbsp;"currently_closed":"False",  
&nbsp;&nbsp;&nbsp;&nbsp;"notes":"Store owner likes to relocate display. Check when arriving",  
&nbsp;&nbsp;&nbsp;&nbsp;"general_manager":"Carl Sagan"  
}  

**All request body parameters are optional**
**name** *string*  
**locaiton***string*  
**day_of_week***integer* Format: 0-6 with Starting with Sunday  
**hours_of_operaiton** *string*  
**currently_closed** *boolean*  
**notes** *string*  
**general_manager** *string*  
  
Response:   

### DELETE `/clients/:id`
Parameters:  
None  
  
Response:   
None

### GET `/companies/:id`
Parameters:  
None  

Response:  
{  
&nbsp;&nbsp;&nbsp;&nbsp;"company_name":"F5 Energy",  
&nbsp;&nbsp;&nbsp;&nbsp;"company_location":"5 Fiskburg Lane, Carlsbad, DE 12345",  
}

### GET `/reports/`
Paramaters: 
None

Response:
Returns:   
{     
&nbsp;&nbsp;&nbsp;&nbsp;"reports":[  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "14"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"client_id": "345",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"sales_rep_id": "6",    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"date": "2016-06-23T02:10:25.000Z",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"company_id": "1",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"notes": "Need more stock of product 4. Display was not showing the newest planogram",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"photo_url": "exampleurl.com",
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "99"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"client_id": "64",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"sales_rep_id": "6",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"date": "2017-07-04T09:15:22.000Z",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"notes": "",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"photo_url": ""
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}  
&nbsp;&nbsp;&nbsp;&nbsp;]  
}

### POST `/reports`
Request Body Parameters:  
{    
&nbsp;&nbsp;&nbsp;&nbsp;"client_id":"1",  
&nbsp;&nbsp;&nbsp;&nbsp;"notes":"General manager does not follow planogram.  Need to speak with my manager about this problem.",  
&nbsp;&nbsp;&nbsp;&nbsp;"photo_url":""
}
  
**client_id** *integer*  
**notes***string*  
**photo_url** *string*  
  
Returns:   
{  
&nbsp;&nbsp;&nbsp;&nbsp;"id": "54"  
&nbsp;&nbsp;&nbsp;&nbsp;"client_id": "1",  
&nbsp;&nbsp;&nbsp;&nbsp;"sales_rep_id": "5", (Sales rep id is found through JWT authentication and attached to the report in the database)  
&nbsp;&nbsp;&nbsp;&nbsp;"date": "2016-06-23T02:10:25.000Z",  
&nbsp;&nbsp;&nbsp;&nbsp;"notes": "General manager does not follow planogram.  Need to speak with my manager about this problem.",  
&nbsp;&nbsp;&nbsp;&nbsp;"photo_url": ""  
}

### GET `/reports/:id`
Parameters:  
None  
  
Returns:   
{  
&nbsp;&nbsp;&nbsp;&nbsp;"id": "54"  
&nbsp;&nbsp;&nbsp;&nbsp;"client_id": "6",  
&nbsp;&nbsp;&nbsp;&nbsp;"sales_rep_id": "7",  
&nbsp;&nbsp;&nbsp;&nbsp;"date": "2016-06-23T02:10:25.000Z",  
&nbsp;&nbsp;&nbsp;&nbsp;"notes": "General manager likes to relocate display. Check when arriving",  
&nbsp;&nbsp;&nbsp;&nbsp;"photo_url": "example.url"  
}

### PATCH `/reports/:id`
Parameters:  
{  
&nbsp;&nbsp;&nbsp;&nbsp;"notes":"Sales representative likes to relocate display. Check when arriving",  
&nbsp;&nbsp;&nbsp;&nbsp;"photo_url":"updatedpicture.url"  
}

**Request body must contain either notes or photo_url different from information stored in the database**

**notes** *string*  
**photo_url** *string*  
  
Response:
None

### DELETE `/reports/:id`
Parameters:  
None  
  
Response:   
None

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests in watch mode `npm test`

Run the migraitons up: `npm run migrate` , down: `npm run migrate --0`

## Deploying

When your new project is ready for deployment, add a new heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
