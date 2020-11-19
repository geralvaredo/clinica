import {query, trigger, transition, style, animateChild, group, animate, state} from '@angular/animations';


export const slideInAnimation =
  trigger('routeAnimations', [

    transition('login => *', slideTo('right')),
    transition('* => login', slideTo('left')),

    transition('* => registro', slideTo('left')),
    transition('registro => *', slideTo('right')),


    /*transition('actores => actores-peliculas', slideTo('right')),
    transition('actores => nacionalidades', slideTo('right')),
    transition('actores => buscar', slideTo('right')),
    transition('actores-peliculas => actores', slideTo('left')),
    transition('nacionalidades => actores', slideTo('left')),

    transition('actores-peliculas => nacionalidades', slideTo('right')),
    transition('nacionalidades => actores-peliculas', slideTo('left')),

    transition('* => buscar', slideTo('right')),
    transition('buscar => *', slideTo('left')),*/
  ]);



function slideTo(direction): any {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({ [direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ [direction]: '0%'}))
      ])
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}
