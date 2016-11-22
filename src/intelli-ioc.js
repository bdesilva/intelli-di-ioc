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

    /* Recursively walks through the specified tree and loads modules into memory */
    processDepsRecursive(path) {
        let resolvedPath = Path.resolve(__dirname, path);
        let files = FS.readdirSync(resolvedPath);
        console.dir(files);
        files.forEach(file => {
            let currentPath = Path.join(resolvedPath, file);
            if (FS.statSync(currentPath).isDirectory()) {
                this.processDepsRecursive(currentPath);
            } else {
                const instDep = eval(`require("${currentPath}")`);
                console.dir(instDep);
                //TODO: Walk through individual classes (if existing) and build map of objects to instantiate.                
            }
        });
    }

    processDepsStatic(dependencies) {

    }
}