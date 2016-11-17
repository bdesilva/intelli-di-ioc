import React from 'react';

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
        console.log(instDep);
        //TODO: Refactor multiple if statement.
        if ((!dep.name || dep.name.toLowerCase() === 'default') && instDep['default']) {
            (this.distinguishReactComponent(instDep['default']))
            ? console.log('React component')
            : this.createDeps(instDep['default']);
        } else if (dep.name) {
            (this.distinguishReactComponent(instDep[dep.name]))
            ? console.log('React component')
            : this.createDeps(instDep[dep.name]);
        } else if (typeof(instDep) === 'function') {
            (this.distinguishReactComponent(instDep))
            ? console.log('React component')
            : this.createDeps(instDep);
        } else {
            throw new Error(`Dependency: ${dep} does not exist!`);
        }
    }

    distinguishReactComponent(dep) {
        const allObjectKeys = obj => {
            const result = [];
            for (const prop in obj) {
                result.push(prop);
            }
            return result;
        }

        const arrIncludes = (arr, value) => {
            return (arr.indexOf(value) > -1);
        }

        const prototypeKeys = allObjectKeys(dep.prototype);
        const keys = allObjectKeys(dep);
        console.log(`prototype keys: ${prototypeKeys}`);
        console.log(`object keys: ${keys}`);

        if (arrIncludes(prototypeKeys, 'isReactComponent')
            || (arrIncludes(prototypeKeys, 'constructor') && arrIncludes(prototypeKeys, 'render'))
            || arrIncludes(keys, 'propTypes')
            || dep.prototype instanceof React.Component) {
            return true;
        }

        return false;
    }

    createDeps(dep, possiblyReact) {
        const instantiate = new Function('Dep', 'return new Dep();');
        const instance = instantiate(dep);
        this.deps[`${instance.constructor.name.toLowerCase()}`] = instance;
    }
}
