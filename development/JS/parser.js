// URL to Drive sheet:
const DATA = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzGNwiFbhVzNzWQBViXBCYtL5NiU11pgcV3R5KNEza89zPvAWwAdEcSmSO9B-B2TToMT80U-s8cKqy/pub?output=csv";
const MAIN = document.querySelector(".resource-list ul");

// Output HTML based on Drive sheet:
function buildCards(data) {
	console.log(data);
	for(var i=0; i<data.length;i++) {
		var item = document.createElement( 'li' );
		var string = '<a href="' + data[i]['url'] + '">';
		string += '<h4 class="name">' + data[i]['name'] + '</h4>';
		string += '<div class="description">' + data[i]['description'] + '</div>';
		string += '<div class="fire">Fire: <strong>' + data[i]['fire'] + '</strong></div>';
		string += '<div class="type">Information type: <strong>' + data[i]['type'] + '</div>';
		string += '</a>';
		item.innerHTML = string;
		MAIN.appendChild( item );
	}
}

Papa.parse(DATA, {
	download: true,
	header: true,
	complete: function(results) {
		buildCards(results.data);
	}
});

