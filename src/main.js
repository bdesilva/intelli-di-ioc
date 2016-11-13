import { Test } from './test';

class Base {
    constructor() {
        this.deps = dependencies
    }
}

class Main extends Base {
  // constructor(deps) {
  //     super();
  //     this.test = deps;
  // }

  runMethod() {
      // console.dir(this.deps.test);
      this.deps.test.runTest();
  }
}

const dependencies = {
    test: new Test()
};

const main = new Main();
main.runMethod();