class IntelliDI {
    constructor(dependencies) {
        this.deps = {};
        this.processDeps(dependencies);
    }

    processDeps(dependencies) {
        dependencies.map(dep => {
            this.distinguishModules(dep);
        });
    }

    /* Filters between CommonJS modules and ES6 modules including default and named classes. */
    distinguishModules(dep) {
        const instDep = eval(`require("./${dep.file}")`);
        if ((!dep.name || dep.name.toLowerCase() === 'default') && instDep['default']) {
          this.createDeps(instDep['default']);
        } else if (dep.name) {
          this.createDeps(instDep[dep.name]);
        } else {
          throw new Error(`Dependency: ${dep} does not exist!`);
        }
    }

    createDeps(dep) {        
        // const Dep = eval(`require("./${dep.file}").${dep.name}`);
        const instantiate = new Function('Dep', 'return new Dep();');
        const instance = instantiate(dep);
        this.deps[`${instance.constructor.name.toLowerCase()}`] = instance;
    }
}

class Main extends IntelliDI {
  constructor(dependencies) {
      super(dependencies);
  }

  runMethod() {
      console.log(this.deps);
      this.deps.test.runTest();
      this.deps.test2.runTest();      
  }
}

const main = new Main([
    {file: '../test/test-classes/test.js', name: 'Test'},
    {file: '../test/test-classes/test.js'}
]);
main.runMethod();
