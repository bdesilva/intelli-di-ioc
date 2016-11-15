class IntelliDI {
    constructor(dependencies) {
        this.deps = {};
        this.createDeps(dependencies);
    }

    createDeps(dep) {
        const Dep = eval(`require("./${dep}").Test`);
        const instantiate = new Function('Dep', 'return new Dep();');
        this.deps.test = instantiate(Dep);
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

const main = new Main('test');
main.runMethod();
