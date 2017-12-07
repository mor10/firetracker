// URL to Drive sheet:
const DATA = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzGNwiFbhVzNzWQBViXBCYtL5NiU11pgcV3R5KNEza89zPvAWwAdEcSmSO9B-B2TToMT80U-s8cKqy/pub?output=csv";
const MAIN = document.querySelector(".resource-list ul");

// Output HTML based on Drive sheet:
function buildCards(json) {
	console.log(json);
	for(var i=0; i<json.length;i++) {
		var item = document.createElement( 'li' );
		var string = '<a href="' + json[i]['url'] + '">';
		string += '<h4 class="name">' + json[i]['name'] + '</h4>';
		string += '<div class="description">' + json[i]['description'] + '</div>';
		string += '<div class="fire">Fire: <strong>' + json[i]['fire'] + '</strong></div>';
		string += '<div class="type">Information type: <strong>' + json[i]['type'] + '</div>';
		string += '</a>';
		item.innerHTML = string;
		MAIN.appendChild( item );
	}
	
}


// Parse CSV data into JSON
// Source: https://gist.github.com/iwek/7154578
function csvJSON(csv){    
	var lines=csv.split("\r");
	
	var result = [];
	var headers=lines[0].split(",");
	for(var i=1;i<lines.length;i++){
		var obj = {};
		var currentline=lines[i].split(",");

		for(var j=0;j<headers.length;j++){
			obj[headers[j]] = currentline[j];
		}

		result.push(obj);
	}

	//return result JSON object
	console.log(JSON.stringify(result));
	return JSON.parse(JSON.stringify(result)); 
}

// Send xhr request to DATA:
var xhr = new XMLHttpRequest();
xhr.open('GET', DATA, true);
xhr.responseType = 'text';
xhr.onload = function () {
	if (xhr.readyState === xhr.DONE) {
		if (xhr.status === 200) {
			console.log(xhr.responseText);
			buildCards(csvJSON(xhr.responseText));
		}
	}
};

xhr.send(null);


