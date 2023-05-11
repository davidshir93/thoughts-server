const port = process.env.PORT || 8000;
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}
import path from 'path';

const app = express();

app.use(cors());

import { dirname } from 'path';

const __dirname = dirname(new URL(import.meta.url).pathname);

// if (
// 	process.env.NODE_ENV === 'production' ||
// 	process.env.NODE_ENV === 'staging'
// ) {
// 	app.use(express.static(path.join(__dirname, '/dist')));
// 	app.get('*', (req, res) => {
// 		res.sendFile(path.join(__dirname + '/dist/index.html'));
// 	});
// } else {
// 	app.get('/', (req, res) => {
// 		res.json('hi');
// 	});
// }

app.get('/distortions', async (req, res) => {
	console.log(req.query.sentence);
	const response = await axios.post(
		'https://api.openai.com/v1/completions',
		{
			prompt: `create a numbered list of titles of cognitive distortions can be found in this sentence: "${req.query.sentence}"`,
			model: 'text-curie-001',
			max_tokens: 1050,
			n: 1,
			stop: ['{}'],
		},
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.CHAT_GPT_API_KEY}`,
			},
		}
	);

	console.log(response.data.choices);
	res.json(response.data.choices);
});

app.listen(port, () => console.log('Server is listening on port ' + port));
