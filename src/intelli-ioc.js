import Helpers from './helpers';
import Path from 'path';
import FS from 'fs';

let cachedConfig;

export default class IntelliIoC {
    constructor(config, reset) {
        if (!cachedConfig || reset) {
            cachedConfig = config;
        }

        const {environment, classConfig} = cachedConfig;
        this.deps = {};        
        this.environment = environment;
        this.classConfig = classConfig;
        this.processDeps(cachedConfig);
    }

    processDeps(config) {
        (config.recursive)
            ? this.processDepsRecursive(config.root)
            : this.processDepsStatic(config.dependencies);
    }

    instantiate(dep) {
        // Distinguish dep between object and function.
        if (dep.constructor.name === 'Object') {
            Object.keys(dep).map(prop => {            
                console.dir(dep[prop]);
                this.createDeps(dep[prop], Helpers.isClass(dep[prop]));
            });
        } else if (dep.constructor.name === 'Function') {
            this.createDeps(dep, Helpers.isClass(dep));
        } else {
            throw `${dep} is not of type Object or Function`;
        }
        
    }

    createDeps(dep, es6Class) {
        if (es6Class) {
            //TODO: Iterate over class config and pass dependencies into constructor as needed.            
            // console.log(`ES6 Object: ${dep.name}`);
            // console.dir(this.classConfig.Person[0]);
            const instantiate = new Function('Dep', 'deps_name', 'deps_personality', 'return new Dep(deps_name, deps_personality);');
            const instance = instantiate(dep, this.classConfig.Person[0].name, this.classConfig.Person[0].personality);
            this.deps[`${instance.constructor.name.toLowerCase()}`] = instance;
        } else {
            this.deps[`${dep.name.toLowerCase()}`] = dep;
        }
    }

    /* Recursively walks through the specified tree and loads modules into memory */
    processDepsRecursive(path) {
        let resolvedPath = Path.resolve(__dirname, path);
        let files = FS.readdirSync(resolvedPath);
        // console.dir(files);
        files.forEach(file => {
            let currentPath = Path.join(resolvedPath, file);
            if (FS.statSync(currentPath).isDirectory()) {
                this.processDepsRecursive(currentPath);
            } else {
                const instDep = eval(`require("${currentPath}")`);
                // console.dir(instDep);
                this.instantiate(instDep);                                
            }
        });
    }

    processDepsStatic(dependencies) {

    }
}