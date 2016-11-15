class IntelliDI {
    constructor(dependencies) {
        this.deps = {};
        this.processDeps(dependencies);
    }

    processDeps(dependencies) {
        dependencies.map(dep => {
            this.createDeps(dep);
        });
    }

    /* Filters between CommonJS modules and ES6 modules including default and named classes. */
    distinguishModules(dependencies) {
        return dependencies;
    }

    createDeps(dep) {
        const Dep = eval(`require("./${dep.file}").${dep.name}`);
        const instantiate = new Function('Dep', 'return new Dep();');
        this.deps[`${dep.name.toLowerCase()}`] = instantiate(Dep);
    }
}

class Main extends IntelliDI {
  constructor(dependencies) {
      super(dependencies);
  }

  runMethod() {
      this.deps.test.runTest();
  }
}

const main = new Main([
    {file: '../test/test-classes/test.js', name: 'Test'}
]);
main.runMethod();
