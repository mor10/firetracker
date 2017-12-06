// URL to Drive doc:
const DATA = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzGNwiFbhVzNzWQBViXBCYtL5NiU11pgcV3R5KNEza89zPvAWwAdEcSmSO9B-B2TToMT80U-s8cKqy/pub?output=csv";

// Parse CSV data into JSON
// Source: https://gist.github.com/iwek/7154578
function csvJSON(csv){    
	var lines=csv.split("\n");
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

	//return result object
	return JSON.stringify(result); 
}

// Send xhr request to DATA:
var xhr = new XMLHttpRequest();
xhr.open('GET', DATA, true);
xhr.responseType = 'text';
xhr.onload = function () {
	if (xhr.readyState === xhr.DONE) {
		if (xhr.status === 200) {
			console.info(csvJSON(xhr.responseText));
		}
	}
};

xhr.send(null);


