import { Persona } from "./persona";

export class Usuario{
    private persona: Persona;
    private nombreUsuario: string;
    private clave: string;
    private rol: string = "5b796082ff8fe82384a92333";

    constructor(persona: Persona, nombreUsuario: string,clave: string){
        this.persona = persona;
        this.nombreUsuario = nombreUsuario;
        this.clave = clave;
    }
}