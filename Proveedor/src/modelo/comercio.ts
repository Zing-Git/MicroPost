import { Domicilio } from "./domicilio";
import { Entidad } from "./entidad";
import { Usuario } from "./usuario";

export class Comercio{
    domicilio: Domicilio;
    entidad: Entidad;
    usuarios: Usuario[];
}