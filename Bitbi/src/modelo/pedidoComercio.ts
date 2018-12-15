export class PedidoComercio {
    activo: boolean;
    _id: string;
    proveedor: {
        _id: string,
        entidad: string,
    };
    comercio: string;
    tipoEntrega: string;
    fechaEntrega: string;
    estadoPedido: string;
    estadoTerminal: boolean;
    comentario: string;
    fechaAlta: string;
    __v: number;

    detallePedido: [
        {
            activo: boolean,
            _id: string,
            producto: string,
            unidadMedida: string,
            cantidadPedido: number,
            fechaAlta: string,
            __v:number
        }
    ]
}