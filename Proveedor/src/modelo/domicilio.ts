import { ThrowStmt } from "@angular/compiler";

export class Domicilio {
    pais: string = "Argentina";
    provincia: string;
    localidad: string;
    barrio: string;
    calle: string;
    numeroCasa: string;
    codigoPostal: string;

    constructor(provincia: string,
        localidad: string,
        barrio: string,
        calle: string,
        numeroCasa: string,
        codigoPostal: string) {
                this.provincia = provincia;
                this.localidad = localidad;
                this.barrio = barrio;
                this.calle = calle;
                this.numeroCasa = numeroCasa;
                this.codigoPostal = codigoPostal;
    }
    
}