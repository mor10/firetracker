// URL to Drive sheet:
const DATA = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzGNwiFbhVzNzWQBViXBCYtL5NiU11pgcV3R5KNEza89zPvAWwAdEcSmSO9B-B2TToMT80U-s8cKqy/pub?output=csv";
const MAIN = document.querySelector(".resource-list ul");

// Location switch.
// Outputs location class for filter:
function parseLocation(data) {
	switch(data) {
		case 'All Fires':
			return 'all ';
			break;
		case '#ThomasFire - Ventura, CA 201712':
			return 'thomas ';
			break;
		case '#CreekFire - Los Angeles, CA 201712':
			return 'creek ';
			break;
		case '#RyeFire - Los Angeles, CA 201712':
			return 'rye ';
			break;
		case '#LittleMountainFire - San Bernadino, CA 201712':
			return 'littlemountain ';
			break;
		case '#SkirballFire - Los Angeles, CA 201712':
			return 'skirball ';
			break;
		default:
			return 'other ';
	}
}

// Resource type switch.
// Outputs type class for filter:
function parseType(data) {
	switch(data) {
		case 'Map':
			return 'map';
			break;
		case 'News Stories and Unofficial Information':
			return 'news';
			break;
		case 'Wind and Weather':
			return 'weather';
			break;
		case 'Official Government Site':
			return 'government';
			break;
		case 'Traffic and Transportation':
			return 'traffic';
			break;
		case 'WebCams':
			return 'webcams';
			break;
		case 'Twitter Feeds':
			return 'twitter';
			break;
		case 'Mobile App':
			return 'mobile';
			break;
		case 'Volunteer Resources':
			return 'volunteer';
			break;
		default:
			return 'other-type';
	}
}

// Output HTML based on Drive sheet:
function buildCards(data) {
	console.log(data);
	for(var i=0; i<data.length;i++) {
		var item = document.createElement( 'li' );
		var string = '<a href="' + data[i]['url'] + '" class="' + parseLocation(data[i]['fire']) + parseType(data[i]['type']) +'">';
		string += '<h4 class="name">' + data[i]['name'] + '</h4>';
		string += '<div class="description">' + data[i]['description'] + '</div>';
		string += '<div class="fire">Fire: <strong>' + data[i]['fire'] + '</strong></div>';
		string += '<div class="type">Information type: <strong>' + data[i]['type'] + '</div>';
		string += '</a>';
		item.innerHTML = string;
		MAIN.appendChild( item );
	}
}

// Parse CSV to JSON.
// Uses PapaParse http://papaparse.com/
Papa.parse(DATA, {
	download: true,
	header: true,
	complete: function(results) {
		buildCards(results.data);
	}
});

