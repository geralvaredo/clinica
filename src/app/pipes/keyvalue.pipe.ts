import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyvalue'
})
export class KeyvaluePipe implements PipeTransform {

  transform(data: {}): unknown {
    return Object.keys(data);
  }

}
