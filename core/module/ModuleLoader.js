const fs = require('fs');

module.exports = class ModuleLoader {

    constructor(modulePath = 'modules/') {
        this.modules = {};
        this.module_path = modulePath;
    }

    loadAll() {
        fs.readdirSync(this.module_path).forEach(folder => {
            console.log(`Loading module ${folder}`);

            if(fs.lstatSync(this.module_path + folder).isDirectory()) {
                if (fs.existsSync(this.module_path + folder + "/manifest.json")) {
                    let manifest = JSON.parse(fs.readFileSync(this.module_path + folder + "/manifest.json"));
                    let main = require(process.cwd() + "/" + this.module_path + folder + "/" + manifest.main);
                    this.modules[manifest.name] = { manifest, main };
                }
            }
        });
    }

    getModule(name) {
        return this.modules[name];
    }
    
}