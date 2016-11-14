var SystemJS = require('systemjs');
// import { Test } from './test';
// var Test = require('./test');

class Base {
    constructor() {
        this.deps = {};
        this.createDeps2();        
    }

    // createDeps() {
    //   const dependencies = {};
    //   const instantiate = new Function('Dep', 'return new Dep();');
    //   dependencies.test = instantiate(Test);
    //   return dependencies;
    // }

    async createDeps2() {      
      // Promise.all(['./test']
      //   .map(dep => System.import(dep)))
      // .then([])
      try {
        console.log('in createDeps2 before try');
        let Test = await SystemJS.import('./test');
        console.log('in createDeps2 after try');        
        this.deps.test = new Test();
        console.log(`Loaded test: ${this.deps.test}`);
      } catch (err) {        
        console.log(`Error: ${err}`);
      }      
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
