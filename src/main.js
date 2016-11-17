import { IntelliDI } from './intelli-di-ioc';

class Main extends IntelliDI {
  runMethod() {
      console.log(this.deps);
      this.deps.test.runTest();
      this.deps.test2.runTest();
      this.deps.test3.runTest();
      this.deps.test3.printMe();
      this.deps.anotherclass.runAnotherClass();
  }
}

const main = new Main([
    {file: '../test/test-classes/test-es6.js', name: 'Test'},    
    {file: '../test/test-classes/test-es6.js'},
    {file: '../test/test-classes/test-es5.js'},
    {file: '../test/test-classes/test-es6.js', name: 'AnotherClass'}
]);
main.runMethod();
