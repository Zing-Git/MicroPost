import { Domicilio } from "./domicilio";
import { Entidad } from "./entidad";
import { Usuario } from "./usuario";

export class Proveedor{
    domicilio: Domicilio;
    entidad: Entidad;
    usuarios: Usuario[];
}