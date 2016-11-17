export class IntelliDI {
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
        // console.log(instDep);
        //TODO: Refactor multiple if statement.
        if ((!dep.name || dep.name.toLowerCase() === 'default') && instDep['default']) {
            this.createDeps(instDep['default']);
        } else if (dep.name) {
            this.createDeps(instDep[dep.name]);
        } else if (typeof(instDep) === 'function') {
            //Add React logic
            this.createDeps(instDep);
        } else {
            throw new Error(`Dependency: ${dep} does not exist!`);
        }
    }

    createDeps(dep) {
        const instantiate = new Function('Dep', 'return new Dep();');
        const instance = instantiate(dep);
        this.deps[`${instance.constructor.name.toLowerCase()}`] = instance;
    }
}
