const express = require("express");
const app = express();

const fs = require("fs");
const urlencodedParser = express.urlencoded();
app.get("/", function(request, response){
     
    response.sendFile(__dirname + "/main.html");
});

app.post("/", urlencodedParser, function(request, response){
	let str;
	let arr = new Array();
	fs.readFile("file.txt", "utf8", function(error, data){
		if (error) throw error;
		console.log(data);
		arr = data.split('\r');
		for(let i = 0; i < arr.length; i++){
			arr[i] = arr[i].trim();
		}
		if (!request.body) return response.sendStatus(404);
	console.log(request.body.username);
	let a = 0;
	for(let i = 0; i < arr.length; i+=1){
		console.log(arr[i]);
		if (arr[i] == request.body.username) {
			a+=1;
		}
	}

	if (a != 0) {
		response.sendFile(__dirname + "/true.html");
	} else {
		response.sendFile(__dirname + "/false.html");
	}
	});
});
app.get("/about", function(request, response){
     
    response.send("<h1>О сайте</h1>");
});
// начинаем прослушивать подключения на 3000 порту
app.listen(3000);
