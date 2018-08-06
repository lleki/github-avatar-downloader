var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

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

getRepoContributors("jquery", "jquery", function(err, result){
  if (err)
    { console.log("Errors:", err);
  } else {
    var contributors = JSON.parse(result);
    contributors.forEach(function(contributor) {
      return downloadImageByURL(contributor.avatar_url, "./avatars" + contributor.login + ".jpg");
    })
  }
});




