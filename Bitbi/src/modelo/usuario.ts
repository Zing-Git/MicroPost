import { Persona } from "./persona";

export class Usuario{
    persona: Persona;
    nombreUsuario: string;
    clave: string;
    rol: string;

    constructor(persona: Persona, nombreUsuario: string,clave: string){
        this.persona = persona;
        this.nombreUsuario = nombreUsuario;
        this.clave = clave;
        this.rol = '5b796082ff8fe82384a92333';
    }
}