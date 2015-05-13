import _ from 'lodash';

// native function for listening to
// server send events as dom events
var server = new EventSource("/sse");

let emailFactory = function($http, $rootScope){
  // create the API to interact with emails
  // emails are randomly created on the server
  // look at server/ to see more
  // emails will also be sent from the server
  // randomly using something similar to WebSockets
  // called Server Sent Events (SSE)
  const emails = [];

  let getEmails = ()=>{
    // the url to get emails is /api/emails
    // define that method here with $http
    // remember $http returns a promise
  };

  let sendEmail = (email)=>{
    // url to send email is /api/emails
    // crate a POST request here to send emails
    // it won't actually send, the server will just
    // emulate it the sending
  };

  let deleteEmail = (email)=>{
    return $http({
      method: 'DELETE',
      url: '/api/emails/' + email.id
    })
    .then(email =>{
      // be sure to clean up your local emails after
      // you delete from the server
    })
  };

  let getState = ()=>{
    return emails;
  };

  server.onmessage = (event) =>{
    emails.unshift(JSON.parse(event.data));
    $rootScope.$digest();
  };

  return { getEmails, sendEmail, deleteEmail, getState };
};

emailFactory.$inject = ['$http', '$rootScope'];

export default emailFactory;
