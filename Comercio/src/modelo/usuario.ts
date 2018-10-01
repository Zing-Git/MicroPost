import { Persona } from "./persona";

export class Usuario{
    private persona: Persona;
    private nombreUsuario: string;
    private clave: string;

    constructor(persona: Persona, nombreUsuario: string,clave: string){
        this.persona = persona;
        this.nombreUsuario = nombreUsuario;
        this.clave = clave;
    }
}