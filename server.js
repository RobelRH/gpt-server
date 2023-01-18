import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'
import axios from 'axios'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    console.log(prompt)

    const DATA = {
      prompt: prompt
    }
    const HEADER = {
      headers: {
        'Origin': 'https://gpt3.ethio-tech.com',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:108.0) Gecko/20100101 Firefox/108.0'
      },
    }

    axios
      .post('https://e1-server.ml:10333', DATA, HEADER)
      .then((response) => {
        if (response.status === 200) {
          res.status(200).send({
            bot: response.data.bot
          });
        }
      })
      .catch((e) => {
        console.error(e)
      })

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))