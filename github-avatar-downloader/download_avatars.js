var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

var myArgs = process.argv.slice(2);

//welcome message
console.log('Welcome to the github avatar downloader -Linh');
console.log('Please enter two arguments');


//get contributors
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

//get images with image url from getRepoContributors
function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .pipe(fs.createWriteStream(filePath))
       .on('finish', function(){
        console.log("complete")
       })
}

//pass user input into getRepoContributors
getRepoContributors(myArgs[0], myArgs[1], function(err, result){
  //make sure user inputs two arguments
  if (myArgs.length == 0){
    console.log("please enter two values");
  } else {
  if (err){
    console.log("Errors:", err);
  } else {
    var contributors = JSON.parse(result);
    contributors.forEach(function(contributor) {
      return downloadImageByURL(contributor.avatar_url, "./avatars/" + contributor.login + ".jpg");
      })
    }
  }
});




