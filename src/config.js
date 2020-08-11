export default {
  // fill or replace these later
  API_ENDPOINT: 'http://localhost:8000/api',
  // API_ENDPOINT: 'https://myclientele-f5-api.herokuapp.com/api',
  // TOKEN_KEY: 'myclientele-jwt-secret',
  // GOOGLE_API_KEY: 'AIzaSyALTeDJY0y4Ui6Q8wtOE0hZooVKsPTapt0',

  TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY,
  GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
};
