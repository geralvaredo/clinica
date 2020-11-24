import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appImagen]'
})
export class ImagenDirective {

  @Input('appImagen') mostrarImagen : string;
  @HostListener('mouseenter') onmouseenter(){
    this.mostrar()
  }
  @HostListener('mouseleave') onmouseleave(){
    this.ocultar();
  }

  constructor(private el : ElementRef) {

  }

  mostrar(){
    this.el.nativeElement.src = this.mostrarImagen;
    //this.el.nativeElement.style.show = this.mostrarImagen;
  }

  ocultar(){
    this.el.nativeElement.src = 'https://firebasestorage.googleapis.com/v0/b/clinicaonline-b9e2c.appspot.com/o/imagenes%2Fperfil.png?alt=media&token=8d3dd391-f861-47cf-a120-8c1395082e17';
  }




}
