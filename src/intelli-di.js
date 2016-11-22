import React from 'react';
import Helpers from './helpers';

export default class IntelliDI {
    constructor(dependencies) {
        this.deps = {};
        this.processDeps(dependencies);
    }

    processDeps(dependencies) {
        dependencies.forEach(dep => {
            this.distinguishModules(dep);
        });
    }

    /* Filters between CommonJS modules and ES6 modules including default and named classes. */
    distinguishModules(dep) {
        const instDep = eval(`require("./${dep.file}")`);
        // console.log(instDep);
        //TODO: Refactor multiple if statement.
        if ((!dep.name || dep.name.toLowerCase() === 'default') && instDep['default']) {
            this.createDeps(instDep['default'],
                this.distinguishReactComponent(instDep['default']));
        } else if (dep.name) {
            this.createDeps(instDep[dep.name],
                this.distinguishReactComponent(instDep[dep.name]));
        } else if (typeof(instDep) === 'function') {
            this.createDeps(instDep,
                this.distinguishReactComponent(instDep));
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

        if (arrIncludes(prototypeKeys, 'isReactComponent')
            || (arrIncludes(prototypeKeys, 'constructor') && arrIncludes(prototypeKeys, 'render'))
            || arrIncludes(keys, 'propTypes')
            || dep.prototype instanceof React.Component) {
            return true;
        }

        return false;
    }

    createDeps(dep, possiblyReact) {
        if (!possiblyReact) {
            const instantiate = new Function('Dep', 'return new Dep();');
            const instance = instantiate(dep);
            this.deps[`${instance.constructor.name.toLowerCase()}`] = instance;
        } else {            
            (dep.name)
                ? this.deps[`${Helpers.toCamelCase(dep.name)}`] = dep
                : this.deps[`${Helpers.toCamelCase(dep.displayName)}`] = dep;
        }
    }
}
