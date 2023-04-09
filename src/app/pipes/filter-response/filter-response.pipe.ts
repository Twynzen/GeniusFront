import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterResponse'
})
export class FilterResponsePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    // Encuentra la parte relevante de la respuesta usando una expresión regular
    const responseRegex = /(?:La serpiente piensa:)(.*)/;

    // Encuentra la coincidencia
    const match = value.match(responseRegex);

    let filteredValue = '';

    if (match && match[1]) {
      // Retorna la parte relevante de la respuesta
      filteredValue = match[1].trim();
    } else {
      // Si no se encuentra ninguna coincidencia, retorna el valor original
      filteredValue = value;
    }

    // Encuentra las menciones del modelo usando una expresión regular
    const modelNameRegex = /(\[gpt-3\.\s*5-turbo\])/gi;

    // Reemplaza las menciones del modelo con una cadena vacía
    filteredValue = filteredValue.replace(modelNameRegex, '');

    return filteredValue.trim();
  }

}
