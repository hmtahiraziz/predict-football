Football Match Prediction System

A Node.js application that predicts football match outcomes based on team statistics including goals scored/conceded, expected goals (xG), expected goals against (xGA), and possession percentage.

Features

- **Match Prediction**: Predicts match scores and win probabilities based on team statistics
- **Comprehensive Analysis**: Provides key factors influencing the prediction
- **Confidence Scoring**: Calculates confidence level for predictions
- **Error Handling**: Robust input validation and error logging
- **Result Export**: Automatically saves predictions to JSON files in the `results/` folder
- **Home Advantage**: Accounts for home/away/neutral venue advantages

## Installation

1. Clone the repository:
git clone <repository-url>
cd Football-Prediction2. Install dependencies (if any):
npm install

Running the Demo

npm start
# or
node demo.js The script will:
- Process the match prediction
- Save the result to a timestamped JSON file in the `results/` folder
- Handle errors gracefully with detailed error logging

Input Format

The prediction function expects an input object with the following structure:

{
  homeTeam: {
    goalsScored: 22,     
    goalsConceded: 10,  
    xG: 1.8,             
    xGA: 1.2,            
    possession: 60       
  },
  awayTeam: {
    goalsScored: 15,
    goalsConceded: 18,
    xG: 1.1,
    xGA: 1.7,
    possession: 48
  },
  venue: 'home'         
}
### Output Format

The prediction returns a JSON object with:

{
  "predictedScore": {
    "home": 3,
    "away": 0
  },
  "probabilities": {
    "homeWin": 0.576,
    "draw": 0.18,
    "awayWin": 0.244
  },
  "confidence": 74,
  "keyFactors": [
    "Home team scores more goals on average (+7).",
    "Home defence concedes fewer goals (8 fewer).",
    "..."
  ],
  "timestamp": "2025-12-03T16:27:32.089Z"
}
### Using the Prediction Function
t
const { predictMatch } = require('./matchPrediction');

const input = {
  homeTeam: {
    goalsScored: 22,
    goalsConceded: 10,
    xG: 1.8,
    xGA: 1.2,
    possession: 60,
  },
  awayTeam: {
    goalsScored: 15,
    goalsConceded: 18,
    xG: 1.1,
    xGA: 1.7,
    possession: 48,
  },
  venue: 'home',
};

const result = predictMatch(input);
console.log(result);## Project Structure
