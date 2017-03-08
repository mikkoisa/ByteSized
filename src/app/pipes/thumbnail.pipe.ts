import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thumbnail'
})
export class ThumbnailPipe implements PipeTransform {

  transform(filename: any, args?: any): any {

    let file = filename.substring(0, filename.lastIndexOf('.'));

    if (args === null || args === 'small') {
      return file + '-tn160.png';
    } else if (args === 'medium') {
      return file + '-tn320.png';
    } else {
      return file + '-tn640.png';
    }
  }

}