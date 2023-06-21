import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatResponse',
})
export class FormatResponsePipe implements PipeTransform {
  transform(value: string): string {
    const sentences = value.split('. ');
    return sentences.join('.\n\n');
  }
}
