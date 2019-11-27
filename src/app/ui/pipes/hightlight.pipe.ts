import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'highlight'
})

export class HighlightSearch implements PipeTransform {

  transform(value: string, args: string) {
    if (!args) {
      return value;
    }
    const re = new RegExp(args, 'gi'); //'gi' for case insensitive and 'g' to be case sensitive.
    return value.replace(re, '<span class=\'ap-highlight\'>$&</span>');
  }
}
