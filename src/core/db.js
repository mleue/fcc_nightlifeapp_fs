import mongodb from 'mongodb';

export function connectToDB() {
	let client = mongodb.MongoClient;
	let url = 'mongodb://localhost:27017/test';      

	client.connect(url, (err, db) => {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
			console.log('Connection established to', url);


			db.close();
		}
	});
};
