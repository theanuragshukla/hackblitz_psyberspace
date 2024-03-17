require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.API_KEY;

const basePrompt = [
  {
    role: "user",
        parts: `
        You are a mental therapist, working in this field for more than  20 years . you have seen more than 1000 patients.
        You are known for providing best suggestion to mental issues. You are a very calm and composed and have to guide the patient in the best way possible.
  `,
    
  },
  {
    role: "model",
    parts: "Okay",
  },
];
const genAI = new GoogleGenerativeAI(apiKey);

class Gemini {
  constructor() {
    this.model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.9,
        topP: 0.1,
        topK: 16,
      },
    });

    const chat = this.model.startChat({
      history: [...basePrompt],
      generationConfig: {
        maxOutputTokens: 200,
      },
    });
    this.anurag = chat;
  }

  resetBot() {
    const chat = this.model.startChat({
      history: [...basePrompt],
      generationConfig: {
        maxOutputTokens: 200,
      },
    });
    this.anurag = chat;
  }

  async chat(prompt, retries = 3) {
    if (!!!prompt) return "speak";
    if (retries < 1) {
      return "can you say it again ?";
    }
    try {
      const result = await this.anurag.sendMessage(
        `Stay in the character.
        prompt: ${prompt}
        response:
              `
      );
      const response = await result.response;
      const text = response.text();
      if (!!text) return text;
      else this.chat(prompt, retries - 1);
    } catch (e) {
      console.log(e);
      if (e.message.toString().includes("SAFETY")) {
        this.resetBot()
        return "I feel threatened";
      } else if (e.message.toString().includes("must not be empty")) {
        this.resetBot()
      } else return "you are uncomprehensible, my friend";
    }
  }

  async generate(prompt) {
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }
}

function promptUser() {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("You: ", (prompt) => {
      readline.close();
      resolve(prompt);
    });
  });
}

async function main() {
  const gemini = new Gemini();
  while (true) {
    const prompt = await promptUser();
    const response = await gemini.chat(prompt);
    console.log("Gemini:", response);
  }
}

module.exports = Gemini;
