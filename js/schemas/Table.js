class Table{

    /**
     * util constants of yaml. UNTOUCHABLE!
     */
    static BucketInitial = '!';
    static ModuleInitial = '    ?';
    static UnitInitial = '        +';
    static TableInitial = '#?';
    static TablePInitial = '#!';
    static LinkInitial = '*';


    /**
     * constructor of Table - abstraction representing whole sute contents in one system. Contains table - navigation structure
     * UNTOUCHABLE!
     * @param {string} tableName - unique table name, not representing in UI!
     */
    constructor(tableName){
        this.tableName = tableName;
        this.links = [
            {text: '', url: ''},
            {text: '', url: ''},
            {text: '', url: ''}
        ];
        this.yaml = '';
        this.modules = [];
    }
    
    /**
     * function for decoding firebase table item @see FireBaseAPI.readAllTables()
     * UNTOUCHABLE!
     * @param {string} tableId - unique address of table for technical targets
     * @param {Object} record - firebase transport json
     * @return {Object} abstract table for manipulating from main file
     */
    static Decode(tableId, record){
        const tableName = tableId.replace(/ø/g, ' ');
        const table = new Table(tableName);
        table.yaml = record.yaml;
        table.tableId = tableId;
        Table.YamlToObjects(record.yaml, table);
        return table;
    }

    /**
     * internal util function for parsing yaml for current module
     * @param {string} yaml - encoded in proprietary format string, containing all data about table
     * @param {Object} table - navigation abstraction
     */
    static YamlToObjects(yaml, table){
        const modules = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        const links = [
            {text: '', url: ''},
            {text: '', url: ''},
            {text: '', url: ''}
        ];
        const lines = yaml.split('\n');
        let row = 0;
        for(let i = 0; i < lines.length; i++){
            if(lines[i].startsWith(Table.TableInitial) || lines[i].startsWith(Table.TablePInitial)){
                const cells = lines[i].replace(Table.TableInitial, '').replace(Table.TablePInitial, '').split('|');
                for(let column = 0; column < cells.length; column++){
                    if(cells[column] != '' && cells[column] != '_'){
                        if(modules[row][column] == null){
                            modules[row][column] = {
                                text: "text",
                                svg: "svg"
                            };
                        }
                        if(lines[i].startsWith(Table.TableInitial)){
                            modules[row][column].text = cells[column];
                        }
                        else if(lines[i].startsWith(Table.TablePInitial)){
                            modules[row][column].svg = cells[column];
                        }
                    }
                }
                row++;
                if(row == modules.length){
                    row = 0;
                }
            }
            else if(lines[i].startsWith(Table.LinkInitial)){
                const obj = lines[i].replace(Table.LinkInitial, '').split('|');
                links[row] = {
                    text: obj[0],
                    url: obj[1]
                }
                row++;
                if(row == links.length){
                    row = 0;
                }
            }
        }
        for(let i = 0 ; i < modules.length; i++){
            for(let j = 0 ; j < modules[i].length; j++){
                const cell = modules[i][j];
                if(cell != null){
                    table.modules.push(new Module(cell.text, cell.svg, yaml));
                }
            }
        }
        table.links = links;
    }
}