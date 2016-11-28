module.exports = class Es6TestClass {
  runTest(item) {
    console.log(`Running ${item} from Es6TestClass!`);
  }

  printMe() {
    console.log(`${this.constructor.name} is running.`);
  }
}