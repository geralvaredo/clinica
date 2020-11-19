import {Directive, ElementRef,HostListener, Input} from '@angular/core';



@Directive({
  selector: '[appColorBusqueda]'
})
export class ColorBusquedaDirective {

  @Input() colorBase: string;
  @Input('appColorBusqueda') resaltarColor : string;
  @HostListener('mouseenter') onmouseenter(){
    this.resaltar()
  }
  @HostListener('mouseleave') onmouseleave(){
    this.colorBlanco();
  }

  constructor(private el : ElementRef) {

  }

  resaltar(){
    this.el.nativeElement.style.backgroundColor = '#B7DDFF';
  }

  colorBlanco(){
    this.el.nativeElement.style.backgroundColor = 'white';

  }





}
