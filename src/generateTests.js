// import aiTestBot from "./aiTestBot.js";
const aiTestBot = require('./aiTestBot.js');
const prompt = require('prompt-sync')({sigint: true});

const open = new aiTestBot();

  (async () => {
    try {
      let path = prompt('Give full path of code file: ');
      let framework = prompt('Unit test framework: [mocha | junit | nunit] ');
      const code = await open.readFileAsCode(path);
      await open.generateUnitTest(code, framework, path);
      await open.createTestSuitFile();
    } catch (error) {
      console.error(error);
    }
  })();