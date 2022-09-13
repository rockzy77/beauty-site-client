var url = document.location.href;


var typeOfRun = url.includes('https://reapofficial.com') ? 'P' : 'D';

var url_head = typeOfRun === 'P' ? process.env.REACT_APP_SERVER_PRODUCTION_API : process.env.REACT_APP_SERVER_DEVELOPMENT_API;

export default url_head;
