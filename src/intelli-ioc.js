import Helpers from './helpers';
import Path from 'path';
import FS from 'fs';

export default class IntelliIoC {
    constructor(config) {
        this.deps = {};
        this.environment = config.environment;
        this.processDeps(config);
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
                // console.dir(dep[prop]);
                // this.createDeps(dep[prop]);
            });
        } else if (dep.constructor.name === 'Function') {
            this.createDeps(dep, Helpers.isClass(dep));
        } else {
            throw `${dep} is not of type Object or Function`;
        }
        
    }

    createDeps(dep, es6Class) {
        if (es6Class) {
            const instantiate = new Function('Dep', 'return new Dep();');
            const instance = instantiate(dep);
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
                //TODO: Walk through individual classes (if existing) and build map of objects to instantiate.                
            }
        });
    }

    processDepsStatic(dependencies) {

    }
}