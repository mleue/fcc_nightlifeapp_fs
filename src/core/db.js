import mongodb from 'mongodb';

export function connectToDB(callback) {
	let client = mongodb.MongoClient;
	let url = 'mongodb://localhost:27017/test';      

	client.connect(url, (err, db) => {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
			callback(db);
			db.close();
		}
	});
};

export function getWhoIsGoing(venueIDs, callback) {
	connectToDB( (db) => {
		let venueEntries = [];
		let count = venueIDs.length;
		venueIDs.forEach( (id) => {
			db.collection('nightlife').findOneAndUpdate(
				{ id: id },
				{ $setOnInsert: { people: [], id: id } },
				{ new: true, upsert: true } // return new doc if one is upserted, insert the document if it does not exist
			).then( (doc) => {
				if (doc === null)
					venueEntries.push({id: id, people: []});
				else
					venueEntries.push({id: id, people: doc.value.people});
				count -= 1;
				if (count === 0)
					callback(venueEntries);
			}).catch( (err) => {
				count -= 1;
				console.log(err);
			});
		})
	})
}

export function addPersonToVenue(venueID, person, callback) {
	connectToDB( (db) => {
		db.collection('nightlife').update(
			{ id: venueID },
			{ $addToSet : { people: person } } 
		);
		callback();
	});
}

export function removePersonFromVenue(venueID, person, callback) {
	connectToDB( (db) => {
		db.collection('nightlife').update(
			{ id: venueID },
			{ $pull : { people: person } } 
		);
		callback();
	});
}
