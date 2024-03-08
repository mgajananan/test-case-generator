const OpenAI = require("openai");
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const promises = require('fs').promises;
const readFileAsync = promisify(fs.readFile);

let output = '', extension = '';

class aiTestBot {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY 
    });
}

  //UNIT_TEST_REQUEST = (framework, path, code) => `Generate a unit test with the ${framework} syntax, containing relevant assertions and required packages in a single 'describe' block. Import the functions from ${path} and use them to test the following code snippet: ${code}.`;

  UNIT_TEST_REQUEST = (framework, path, code) => `Generate a unit test with the ${framework} syntax, containing relevant assertions and required packages in a single block. Import the functions from ${path} and use them to test the following code snippet: ${code}.`;

  async readFileAsCode(filePath) {
    try {
      const data = await readFileAsync(filePath, 'utf8');
      var ext = path.extname(filePath||'').split('.');
      extension =  ext[ext.length - 1];
      return data;
    } catch (error) {
      throw new Error(`Error reading file: ${error}`);
    }
  }

  async generateUnitTest(framework, path, code) {
    const spinner = (await import('ora')).default('Please Wait Generating unit test...').start();

    try {

      const stream = await this.openai.chat.completions.create({
        model:  "gpt-3.5-turbo",
        messages: [{
              "role": "user",
              "content": this.UNIT_TEST_REQUEST(framework, path, code)
            }],
            max_tokens: 1000,
            stream: true,
            temperature: 0
      });
      for await (const part of stream) {
        const content = part.choices[0].delta.content;
        if (content) {
          output += content;
        }
      }
      console.log (output);
      spinner.succeed('Unit test generated');
    } catch (error) {
      spinner.fail(`Error generating unit test:: ${error}`);
    }
  }

  async createTestSuitFile() {
    const fileName = `./src/unitTests/unitTestSuite.${extension}`;
    try {
      await promises.writeFile(fileName, output);
      console.log(`Message written to file: ${fileName}`);
    } catch (error) {
      console.error(`Error writing to file: ${error}`);
    }
  }
}

module.exports = aiTestBot;