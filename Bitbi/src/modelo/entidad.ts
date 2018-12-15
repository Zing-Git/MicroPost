
export class Entidad{
    public activo: true;
    public _id: string;
    public cuit: string;
    public razonSocial: string;
    public domicilio: string;
    public actividadPrincipal: string;
    public tipoPersoneria:string;
    public fechaAlta: string;
    public __v: number;

    constructor(cuit: string, razonSocial: string,
                actividadPrincipal: string, tipoPersonaeria: string){
                    this.cuit = cuit;
                    this.razonSocial = razonSocial;
                    this.actividadPrincipal = actividadPrincipal;
                    this.tipoPersoneria = tipoPersonaeria;
                    this.fechaAlta = new Date().toLocaleDateString();
    }

}