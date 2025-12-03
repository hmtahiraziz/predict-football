const { predictMatch } = require('./matchPrediction');
const fs = require('fs');
const path = require('path');

const resultsDir = path.join(__dirname, 'results');
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

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

try {
  if (!input.homeTeam || !input.awayTeam) {
    throw new Error('Invalid input: homeTeam and awayTeam are required');
  }

  if (!input.venue || (input.venue !== 'home' && input.venue !== 'away' && input.venue !== 'neutral')) {
    throw new Error('Invalid venue: must be "home", "away", or "neutral"');
  }


  const result = predictMatch(input);

  if (!result) {
    throw new Error('Prediction function returned null or undefined');
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `prediction-${timestamp}.json`;
  const filepath = path.join(resultsDir, filename);

  fs.writeFileSync(filepath, JSON.stringify(result, null, 2), 'utf8');

} catch (error) {
  console.error('Error occurred during prediction:');
  console.error('Error message:', error.message);
  console.error('Stack trace:', error.stack);
  
  const errorTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const errorFilename = `error-${errorTimestamp}.json`;
  const errorFilepath = path.join(resultsDir, errorFilename);
  
  const errorLog = {
    timestamp: new Date().toISOString(),
    error: {
      message: error.message,
      stack: error.stack,
      input: input
    }
  };
  
  fs.writeFileSync(errorFilepath, JSON.stringify(errorLog, null, 2), 'utf8');
  console.error(`Error details saved to: ${errorFilepath}`);
  
  process.exit(1);
}
