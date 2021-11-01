class Module {

    /**
     * constructor for Module - abstraction to connect Fork with image and give to this fork ordered list of units
     * UNTOUCHABLE!
     * @param {string} forkName - name of fork to show it in navigation
     * @param {string} svg - svg string to draw icon next to fork name in navigation. Always 24*24 px, monochrome - color-transparent
     * @param {string} yaml - encoded in proprietary format string, containing all data about table
     */
    constructor(forkName, svg, yaml) {
        this.forkName = forkName;
        this.svg = svg
        this.list = [];
        this.YamlToObjects(yaml);
    }

    /**
     * internal util function for parsing yaml for current module
     * @param {string} yaml - encoded in proprietary format string, containing all data about table
     */
    YamlToObjects(yaml){
        const lines = yaml.split('\n');
        let moduleInProgress = false;
        for(const line of lines){
            if(line.startsWith(Table.ModuleInitial)){
                if(line.replace(Table.ModuleInitial, '') == this.forkName){
                    moduleInProgress = true;
                }
                else{
                    if(moduleInProgress){
                        return;
                    }
                }
            }
            else if(line.startsWith(Table.UnitInitial) && moduleInProgress){
                const parts = line.replace(Table.UnitInitial, '').split('|');
                this.list.push({
                    unitName: parts[0],
                    fork_unitId: parts [1]
                });
            }
        }
    }
}
