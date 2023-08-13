# Fun Trivia App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## API Fetching
This app dynimcally fetches data from the [Open Trivia Database](https://opentdb.com/api_config.php). On mount, the app fetches the categories so that the user can choose questions of their liking. Once the user chooses their criteria, the app dynimically fetches the questions and displays them.

## Components
The initial component displays three different criteria for the user to choose the kind of questions they want. Once the generate questions button is clicked, a new component is rendered under the header and the first question is displayed. The questions are iterated through as the user answers, and the app keeps track of results and the answers that the user has inputted. Based on this tracking, a results component is rendered and details correctly and incorrectly answered questions. A **Play Again**
button is displayed at the bottom which resets all the necessary variables to their defaults and the initial prompt menu is rendered again.
