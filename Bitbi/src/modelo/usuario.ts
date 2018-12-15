import { Persona } from "./persona";

export class Usuario{
    persona: Persona;
    nombreUsuario: string;
    clave: string;

    constructor(persona: Persona, nombreUsuario: string,clave: string){
        this.persona = persona;
        this.nombreUsuario = nombreUsuario;
        this.clave = clave;
    }
}