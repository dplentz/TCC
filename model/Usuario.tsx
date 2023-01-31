
export class Usuario {
    public id : string;
    public email : string;
    public urlfoto : string;
    public nome: string;
    public genero: string;
    public dataNasc: Date;
    public dataString: string;

    constructor(obj?: Partial<Usuario>) {
        if (obj) {
            this.id = obj.id
            this.email = obj.email
            this.urlfoto = obj.urlfoto
            this.nome = obj.nome
            this.genero = obj.genero
            this.dataNasc = obj.dataNasc
            this.dataString = obj.dataString
        }
    }

    toString() {
        const Objeto = `{
            "id": "${this.id}",
            "nome": "${this.nome}",
            "email": "${this.email}",
            "urlfoto": "${this.urlfoto}"
            "Genero" : "${this.genero}"
            "dataNasc": "${this.dataNasc}"
            "dataString": "${this.dataString}"
        }`

        //const fields = Object.values(this).join(', ')
        // const campos = Object.keys(this).join(': ')
        // const valor=Object.values(this).join(', ')
        // return `Usuario {${campos+valor}}`
        
        //let userStr = '{"name":"Sammy","email":"sammy@example.com","plan":"Pro"}';
        // let userObj = JSON.parse(Objeto);
        // console.log(userObj);

        return Objeto
    }

};