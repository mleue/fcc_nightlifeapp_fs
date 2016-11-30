import axios from 'axios';
import {getWhoIsGoing, addPersonToVenue, removePersonFromVenue} from './db';

const AUTH_TOKEN = 'lGw551u4p7Cex7Mev_iIjQJqvNLHZ548jfyBtABxNL_XpvPkqcUVKGmgRjcPZ2jeI5XmjaxAGAF9TUFfuLOBc4aC4stWmUVhs-EMXOQKkZV6ON15Uz1DqP0c4Wo-WHYx';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN;

export function requestYelp(location, limit, categories, callback) {
	axios({
		method: 'get',
		url: createQueryString(location, limit, categories),
	}).then(function (response) {
		callback(response.data);
	})
		.catch(function (error) {
			console.log(error);
		});
}

function createQueryString(location, limit, categories) {
	let baseURL = 'https://api.yelp.com/v3/businesses/search?';
	baseURL += 'location=' + location;
	baseURL += '&limit=' + limit;
	baseURL += '&categories=' + categories;
	return baseURL;
}

function yelpRequestAccessToken() {
	axios({
		method: 'post',
		url: 'https://api.yelp.com/oauth2/token',
		params: {
			grant_type: 'client_credentials',
			client_id: '-s4vos5gB61THchNR6Yn-Q',
			client_secret: 'YGnDrqdSb5gobO0TsbbDlhnMJF89lVhuLx2AYqu8ayDRAwBFJV01InoQ4ZZj0NOP'
		}
	}).then(function (response) {
		console.log(response);
	})
		.catch(function (error) {
			console.log(error);
		});
}

export function venuesAndPersons(location, callback) {
	requestYelp('magdeburg', 10, 'bars', (data) => {
		let venueIDs = data.businesses.map( (business) => business.id );
		getWhoIsGoing(venueIDs, (res) => {
			callback(res);
		})
	});
}
