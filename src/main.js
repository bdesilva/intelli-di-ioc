// import Test from './test';
const Test = require('./test').Test;

class IntelliDI {
    constructor() {
        this.deps = {};
        this.createDeps();
    }

    createDeps() {
        const dep = 'test';
        const Dep = eval(`require("./${dep}").Test`);
        console.log(Dep);
        const instantiate = new Function('Dep', 'return new Dep();');
        this.deps.test = instantiate(Dep);
    }
}

class Main extends IntelliDI {
  constructor(deps) {
      super();
      this.test = deps.test;
  }

  runMethod() {
      console.log(this.test);
      // this.deps.test.runTest();
      // const test = new Test();
      // test.runTest();
  }
}

const main = new Main();
main.runMethod();
