import { Test } from './test';
// var Test = require('./test');

class Base {
    constructor() {
        this.deps = this.createDeps();
    }

    createDeps() {
      const dependencies = {};
      const instantiate = new Function('Dep', 'return new Dep();');
      dependencies.test = instantiate(Test);
      return dependencies;
    }
}

class Main extends Base {
  // constructor(deps) {
  //     super();
  //     this.test = deps;
  // }

  runMethod() {
      console.dir(this.deps.test);
      this.deps.test.runTest();
  }
}

const main = new Main();
main.runMethod();