var request = require('request');
var secrets = require('secret');

console.log('Welcome to the github avatar downloader');

function getRepoContributors(repoOwner, repoName, callback){
  var options = {
    url : 'http://api.github.com/repos/' + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token 93e45a61126137a1875e87efa7fec945a0f4b08b'
    }
  };
  request(options, function(err, res, body){
    callback(err, body);
  });

}

getRepoContributors("jquery", "jquery", function(err, result){
  console.log("Errors:", err);
  console.log("Result:", result);

});