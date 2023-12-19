## **TO RUN BACKEND LOCALLY:**
- After cloning the app, make sure to install all the packages (refer to the package.json file). Make sure you install the packages **_IN THE BACKEND FOLDER ONLY_**. <br/>
- Create an account on Mongodb and make a new project.<br/>
- Use the Mongodb connection uri in the code that you cloned. Make sure to 
**_note down the username and password_** 
while setting up the project as it will be needed for the uri.<br/>
- run npm start in the backend directory to start the server.<br/>
- open another console and to test the server, run: 
  > Invoke-WebRequest -Uri "http://localhost:port_number/api/v1/password/storepassword" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"password": "test_password"}'
