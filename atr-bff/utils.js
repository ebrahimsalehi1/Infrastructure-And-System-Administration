const axios = require('axios');

// ------------------------------------------------------------------------------------------------------------

async function postData(url = '', data = {}) {

    // Default options are marked with *
    const response = await axios(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Accept': ["application/json", "application/x-www-form-urlencoded"],
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'sidebar_collapsed=false',
            'Authorization': 'Basic bXktdHJ1c3RlZC1jbGllbnQ6cGFzc3dvcmQ='
        },
        body: data // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

//postData("http://bpmtest.msc.ir/oauth/token", 'scope=&username=90007&password=12345678&grant_type=password')

// ------------------------------------------------------------------------------------------------------------

function getToken(){
    return  axios.post('http://bpmtest.msc.ir/oauth/token', {
        client_id: "my-trusted-bpm-client",
        client_secret: "bpm-password",
        grant_type: "client_credentials"
      });
}

// ------------------------------------------------------------------------------------------------------------

module.exports = {getToken};

// ------------------------------------------------------------------------------------------------------------
