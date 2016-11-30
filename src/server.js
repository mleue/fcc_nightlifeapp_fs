import express from 'express';
import stormpath from 'express-stormpath';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import {connectToDB} from './core/db';

let app = express();

app.set('port', (process.env.PORT || 3000));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/run/')));
}

app.use(stormpath.init(app, {
	web: {
		produces: ['application/json']
	}
}));

app.post('/me', bodyParser.json(), stormpath.loginRequired, function (req, res) {
	function writeError(message) {
		res.status(400);
		res.json({ message: message, status: 400 });
		res.end();
	}

	function saveAccount () {
		req.user.givenName = req.body.givenName;
		req.user.surname = req.body.surname;
		req.user.email = req.body.email;

		req.user.save(function (err) {
			if (err) {
				return writeError(err.userMessage || err.message);
			}
			res.end();
		});
	}

	if (req.body.password) {
		let application = req.app.get('stormpathApplication');

		application.authenticateAccount({
			username: req.user.username,
			password: req.body.existingPassword
		}, function (err) {
			if (err) {
				return writeError('The existing password that you entered was incorrect.');
			}

			req.user.password = req.body.password;

			saveAccount();
		});
	} else {
		saveAccount();
	}
});

app.get('*', function (req, res) {
	  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.on('stormpath.ready', function () {
	app.listen(app.get('port'), function (err) {
		if (err) {
			return console.error(err);
		}
		console.log('Listening at http://localhost:3000');
		connectToDB();
	});
});
