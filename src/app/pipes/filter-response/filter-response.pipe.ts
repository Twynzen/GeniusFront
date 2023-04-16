import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterResponse',
})
export class FilterResponsePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    // Encuentra la parte relevante de la respuesta usando una expresión regular
    const responseRegex =
      /(?:La serpiente piensa:)(?:(?!La serpiente piensa:)[\s\S])*$/;

    // Encuentra la coincidencia
    const match = value.match(responseRegex);

    let filteredValue = '';

    if (match && match[0]) {
      // Retorna la parte relevante de la respuesta
      filteredValue = match[0].replace('La serpiente piensa:', '').trim();
    } else {
      // Si no se encuentra ninguna coincidencia, retorna el valor original
      filteredValue = value;
    }

    // Encuentra las menciones del modelo usando una expresión regular
    const modelNameRegex = /(\[gpt-3\.\s*5-turbo\])/gi;

    // Reemplaza las menciones del modelo con una cadena vacía
    filteredValue = filteredValue.replace(modelNameRegex, '');

    // Elimina la parte de "Las manzanas que ha comido son X."
    const appleCountRegex = /Las manzanas que ha comido son \d+\.\s+/;
    filteredValue = filteredValue.replace(appleCountRegex, '');

    return filteredValue.trim();
  }
}
