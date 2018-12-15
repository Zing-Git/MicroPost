export class Pedido{
    token: string;
    proveedor: string;
    comercio: string;
    tipoEntrega: string;
    fechaEntrega: string = new  Date().toISOString();   //<ion-datetime displayFormat="MMM DD, h:mm A" [(ngModel)]="myDate"></ion-datetime>
    comentario: string;

    productos: any[];   //_id, unidadMedida, cantidad, el viewModel tiene 

}