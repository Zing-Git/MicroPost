import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProveedorProvider } from '../../providers/proveedor/proveedor';
import Swal from 'sweetalert2';

@Component({
  selector: 'page-lista-productos-modal',
  templateUrl: 'lista-productos-modal.html',
})
export class ListaProductosModalPage {


  productosViewModel: any[];
  proveedorId: string;
  proveedorNombre: string;
  productoCategorias: any[] = new Array();
  categoria:string;
  subcategoria:string;
  productoSubCategorias: any[] = new Array();
  arrayCategorias:any[] = new Array();
  arraySubcategorias :any[] = new Array();
  showListProducto: boolean= false;
  arrayProductos: any[] = new Array();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private proveedorService: ProveedorProvider) {
    this.proveedorId = navParams.get('data');
    this.cargarListaProductos();
  }

  ionViewDidLoad() {
    
  }

  cargarListaProductos(){
    this.proveedorService.postGetProductosPorIdProveedor(this.proveedorId).subscribe(result=>{      
      this.productosViewModel = result['productos'];
      if(typeof this.productosViewModel === 'undefined'){
        Swal(
          'Advertencia',
          'El proveedor no tiene productos)',
          'error'
        )
      }else{
        this.productosViewModel.forEach(x=>{
          this.productoCategorias.push(x.categoria);
        });
        this.arrayCategorias= this.crearArray(this.productoCategorias);
      } 
    });
  }

  pedirProducto(producto: any){

  }

  crearArray(arreglo: string[]): any[]{

    let clon:any[] = JSON.parse(JSON.stringify(arreglo));
    let nuevoArreglo = Array.from(new Set(clon.map((item: any) => item)))
   
    return nuevoArreglo;    
  }

  volver(){
    this.navCtrl.pop();
  }

  onCategoriasChange(ctxt: string): void {
    this.categoria='';
    this.categoria=ctxt;
    this.productosViewModel.forEach(x=>{
      if(x.categoria === ctxt){
        this.productoSubCategorias.push(x.subcategoria);
      }
    });
    this.arraySubcategorias = this.crearArray(this.productoSubCategorias);
  }

  onSubCategoriasChange(ctxt: string): void{
    this.productosViewModel.forEach(x=>{
      if(x.subcategoria === ctxt && x.categoria === this.categoria ){
        this.arrayProductos.push(x);
      }
    });
    this.showListProducto = true;
  }

  seleccionarProducto(producto: any){
    Swal(
      'EN hora buena!',
      'Se agrego el producto:  ' + producto.nombreProducto,
      'success'
    )
  }
}
