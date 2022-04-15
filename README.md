# Summarizer Application
An application that will take text under 700 words and attemp to summarize it using Facebook's Bart Large MNLI model
You'll have to signup to get an access token here: https://nlpcloud.io/home/token and update the `ACCESS_TOKEN` variable in app.js

In the project directory, you should run both the below commands:
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run server` 

Runs the server that will process our text and summarize it based the api.nlpcloud endpoint