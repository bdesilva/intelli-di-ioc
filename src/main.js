import { IntelliDI } from './intelli-di-ioc';

class Main extends IntelliDI {
  runMethod() {
      console.log(this.deps);
      // this.deps.test.runTest();
      // this.deps.test2.runTest();
      // this.deps.test3.runTest();
      // this.deps.test3.printMe();
      // this.deps.anotherclass.runAnotherClass();
      console.log(this.deps.testreact);
      console.log(this.deps.testreactdefault);
      console.log(this.deps.testreactes6);
  }
}

const main = new Main([
    // {file: '../test/test-classes/test-es6.js', name: 'Test'},
    // {file: '../test/test-classes/test-es6.js'},
    // {file: '../test/test-classes/test-es5.js'},
    // {file: '../test/test-classes/test-es6.js', name: 'AnotherClass'},
    {file: '../test/test-classes/test-react-es6.js', name: 'TestReact'},
    {file: '../test/test-classes/test-react-es6.js'},
    {file: '../test/test-classes/test-react-es6-module.js'},
    {file: '../test/test-classes/test-react-es5.js'}
]);
main.runMethod();
