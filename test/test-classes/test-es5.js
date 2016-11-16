module.exports = class Test3 {
  runTest() {
    console.log('Running from test-es5.js - Test3!');
  }

  printMe() {
    console.log(`${this.constructor.name} is running.`);
  }
}