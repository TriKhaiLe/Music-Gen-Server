import express from 'express';
import fetch from 'node-fetch';
import { client } from '@gradio/client';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api', async (req, res) => {
  try {
    const appClient = await client("https://facebook-musicgen.hf.space/");
    const result = await appClient.predict(0, [
      "Howdy!", // string in 'Describe your music' Textbox component
      null, // blob in 'File' Audio component
    ]);

    res.json(result?.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
