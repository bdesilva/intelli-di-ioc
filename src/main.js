import { Test } from './test';

class Main {
  constructor(deps) {
    this.test = deps;
  }

  runMethod() {
    this.test.runTest();
  }
}

const main = new Main(new Test());
main.runMethod();