var typeOfRun = 'D';

var url_head = typeOfRun == 'P' ? process.env.REACT_APP_SERVER_PRODUCTION_API : process.env.REACT_APP_SERVER_DEVELOPMENT_API;

export default url_head;