var sendRequest = require('./sendRequest');


const payload = {
  action: 'set',
  data: 'a'
}

sendRequest(payload);
