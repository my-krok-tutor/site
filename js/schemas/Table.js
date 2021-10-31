class Table{

    static BucketInitial = '!';
    static ModuleInitial = '    ?';
    static UnitInitial = '        +';
    static TableInitial = '#?';
    static TablePInitial = '#!';
    static LinkInitial = '*';


    constructor(tableName){
        this.tableName = tableName;
        this.tableId = tableName.replace(/ /g, 'ø');
        this.links = [
            {text: '', url: ''},
            {text: '', url: ''},
            {text: '', url: ''}
        ];
        this.yaml = '';
        this.table = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }

    static Decode(tableId, record){
        const tableName = tableId.replace(/ø/g, ' ');
        const table = new Table(tableName);
        table.yaml = record.yaml;
        table.tableId = tableId;
        Table.YamlToObjects(record.yaml, table);
        return table;
    }

    static YamlToObjects(yaml, tableOut){
        const table = [
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
                        if(table[row][column] == null){
                            table[row][column] = {
                                text: "text",
                                svg: "svg"
                            };
                        }
                        if(lines[i].startsWith(Table.TableInitial)){
                            table[row][column].text = cells[column];
                        }
                        else if(lines[i].startsWith(Table.TablePInitial)){
                            table[row][column].svg = cells[column];
                        }
                    }
                }
                row++;
                if(row == table.length){
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
        tableOut.table = table;
        tableOut.links = links;
    }
}