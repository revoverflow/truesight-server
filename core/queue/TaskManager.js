module.exports = class TaskManager {

    constructor(moduleLoader) {
        this.tasks = [];
        this.moduleLoader = moduleLoader;
    }

    async processTask(id, modules) {
        this.tasks[id] = {
            id,
            modules,
            results: [],
            status: 'pending'
        };

        for (let module of modules) {
            let mod = this.moduleLoader.getModule(module.name);

            if (mod) {
                let task = await mod.main.process(module.type, module.parameters);

                this.tasks[id].results.push({
                    name: mod.manifest.name,
                    type: module.type,
                    parameters: module.parameters,
                    results: task
                });
            }
        }

        this.tasks[id].status = 'done';
    }

    getTask(id) {
        return this.tasks[id];
    }

}