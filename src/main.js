import IntelliDI from './intelli-di';
import IntelliIoC from './intelli-ioc';

class ExampleDI extends IntelliDI {
    runMethod() {
        console.log(this.deps);
        this.deps.test.runTest();
        this.deps.test2.runTest();
        this.deps.test3.runTest();
        this.deps.test3.printMe();
        this.deps.anotherclass.runAnotherClass();
        console.log(this.deps.testReact);
        console.log(this.deps.testReactDefault);
        console.log(this.deps.testReactES6);
        console.log(this.deps.greeting);
    }
}

const exampleDI = new ExampleDI([
    { file: '../test/test-di-classes/test-es6.js', name: 'Test' },
    { file: '../test/test-di-classes/test-es6.js' },
    { file: '../test/test-di-classes/test-es5.js' },
    { file: '../test/test-di-classes/test-es6.js', name: 'AnotherClass' },
    { file: '../test/test-di-classes/test-react-es6.js', name: 'TestReact' },
    { file: '../test/test-di-classes/test-react-es6.js' },
    { file: '../test/test-di-classes/test-react-es6-module.js' },
    { file: '../test/test-di-classes/test-react-es5.js' }
]);
// exampleDI.runMethod();

class ExampleIoC extends IntelliIoC {
    runMethod() {
        console.log('EXAMPLE IOC');
        console.dir(this.deps);
        console.log(this.deps.es5testfunc1('Ben'));
        this.deps.es6testclass.runTest('hi');
        this.deps.es6testclass.printMe();
    }
}

class ExtendedExampleIoC extends ExampleIoC {
    runMethod() {
        console.log('\n\nExtendedExample IOC');
        console.dir(this.deps);
        console.log(this.deps.es5testfunc1('Ben'));
        this.deps.es6testclass.runTest('hi');
        this.deps.es6testclass.printMe();
    }
}

const config = {
    environment: 'prod',
    recursive: true,
    root: '../test/test-ioc-classes',
    classConfig: {
        Person: [
            {
                name: 'Ben', personality: {
                    type: 'family',
                    carOpts: {
                        doors: 4,
                        make: 'Subaru',
                        model: 'WRX STi',
                        bodyStyle: 'sedan'
                    }
                }
            },
            {
                name: 'Olivia', personality: {
                    type: 'sports',
                    carOpts: {
                        doors: 2,
                        make: 'Chevrolet',
                        model: 'Corvette',
                        bodyStyle: 'coupe'
                    }
                }
            }
        ]
    }
};

const config2 = {
    environment: 'prod',
    recursive: true,
    root: '../test/test-ioc-classes',
    classConfig: {
        Person: [
            {
                name: 'Ann', personality: {
                    type: 'family',
                    carOpts: {
                        doors: 4,
                        make: 'Subaru',
                        model: 'WRX STi',
                        bodyStyle: 'sedan'
                    }
                }
            },
            {
                name: 'Olivia', personality: {
                    type: 'sports',
                    carOpts: {
                        doors: 2,
                        make: 'Chevrolet',
                        model: 'Corvette',
                        bodyStyle: 'coupe'
                    }
                }
            }
        ]
    }
};

const exampleIoC = new ExampleIoC(config);
exampleIoC.runMethod();
const exampleIoC2 = new ExtendedExampleIoC(config2, true);
exampleIoC2.runMethod();