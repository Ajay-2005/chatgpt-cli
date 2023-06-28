import { Configuration, OpenAIApi } from "openai";
import readline from "readline";
import dotenv from 'dotenv'
import { stdin } from "process";
dotenv.config()
const configuration = new Configuration({
    organization: process.env.organization,
    apiKey: process.env.api,
  });
  const openai = new OpenAIApi(configuration);
  const ui=readline.createInterface({
    input:process.stdin,
    output:process.stdout
  })
  ui.on("line",async(input)=>{
    await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    })
    .then((res) => {
      console.log(res.data.choices[0].message.content);
      ui.prompt();
    })
    .catch((e) => {
      console.log(e);
    });
  })