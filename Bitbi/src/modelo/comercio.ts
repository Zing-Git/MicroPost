import { Domicilio } from "./domicilio";
import { Entidad } from "./entidad";
import { Usuario } from "./usuario";
import { Contactos } from "./contactos";

export class Comercio{
    domicilio: Domicilio;
    entidad: Entidad;
    usuarios: Usuario[];
    contactos: Contactos[];
}