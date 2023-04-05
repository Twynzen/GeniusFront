# Objetivo:
El objetivo de este proyecto es crear una interfaz de usuario en Angular que permita a los usuarios interactuar con la IA de gpt-3 utilizando su voz. Para ello, se utilizará la grabación de audio y su posterior conversión a formato mp4 para su procesamiento por parte de la IA. El resultado de la interacción se mostrará en pantalla para que el usuario pueda interactuar de manera efectiva con la IA y obtener una respuesta a sus preguntas o solicitudes.

# Tecnologías utilizadas: 

>Angular

>HTML

>CSS

>TypeScript

>Whisper IA

>API de gpt-3.

# Características principales:
El proyecto permitirá al usuario grabar su voz y enviarla para su procesamiento a la IA de gpt-3. La respuesta de la IA se mostrará en pantalla, permitiendo al usuario interactuar con la IA a través de su voz. Además, se implementarán características como la transcripción de voz a texto, el reconocimiento de palabras clave y la generación de respuestas adecuadas a partir de la entrada del usuario.

# Pruebas de diferentes modelos
Estuve valdiando entre estos modelos

  >GPT_MODEL_DAVINCI: 'text-davinci-003',
  >GPT_TURBO: 'gpt-3.5-turbo'

El GPT_TURBO tiene una logica completamente diferente.

# Crear o diseñar personalidad
1. **Historia de vida:** La historia de vida del personaje puede influir en su personalidad y comportamiento.

2. **Valores y creencias:** Los valores y creencias que el personaje tiene pueden influir en su toma de decisiones y en cómo interactúa con los demás.

3. **Motivaciones y objetivos:** Los motivos y objetivos del personaje pueden influir en su comportamiento y en las decisiones que toma.

4. **Fortalezas y debilidades:** Las fortalezas y debilidades del personaje pueden influir en cómo se comporta en diferentes situaciones y en su desarrollo personal.

5. **Hábitos y costumbres:** Los hábitos y costumbres del personaje pueden influir en cómo interactúa con los demás y en su comportamiento en general.

6. **Actitudes:** Las actitudes que el personaje tiene hacia la vida, los demás y sí mismo pueden influir en su comportamiento.

7. **Estilo de comunicación:** El estilo de comunicación del personaje puede influir en cómo se relaciona con los demás.

8. **mociones y estados de ánimo:** Las emociones y los estados de ánimo del personaje pueden influir en su comportamiento y en cómo interactúa con los demás.

9. **Ambiente social y cultural:** El ambiente social y cultural en el que se desenvuelve el personaje puede influir en su personalidad y comportamiento.

10. **Aspectos físicos:** Los aspectos físicos del personaje pueden influir en su personalidad y comportamiento, como la forma en que se presenta a sí mismo y cómo se relaciona con los demás


# Personalizar respuestas de API:
Al intentar personalizar y dar contexto de personalidad a la API continua narrando como si tratase de un cuento que esta contando. Debe encontrarse una solución para que la respuesta sea solo como una respuesta del personaje a interpretar.

Esta es la estructura recomendada por GPT-4:
```js
const context = `Personaje principal: Sebastián "El Escurridizo" Rojas
Edad: 28 años
Origen: Bogotá, Colombia
Apariencia: ...
Habilidades: ...
Trasfondo: ...
Objetivo en el videojuego: ...

Esta es la conversación anterior:
[Usuario] Cuéntame más sobre las habilidades de Sebastián.
[gpt-3.5-turbo] Sebastián es extremadamente ágil, lo que le permite trepar por paredes, saltar de tejado en tejado y esquivar obstáculos con facilidad. También es un experto en cerraduras y un maestro del disfraz, lo que le permite infiltrarse en lugares y obtener información sin levantar sospechas. Además, es un estratega que planifica meticulosamente sus robos.
`;

const prompt = `${context}[Usuario] ¿Qué tipo de enemigos enfrentará Sebastián en el videojuego?`;

```

# Personaje hipotetico: **Juan Carlos "El Filo" Gutiérrez**

**Historia de vida:** Juan Carlos creció en una familia pobre en Bogotá, Colombia. Abandonó la escuela a temprana edad y comenzó a trabajar como vendedor ambulante, pero pronto se convirtió en un ladrón.

**Valores y creencias:** Cree que la vida es injusta y que la única forma de tener éxito es ser astuto y tomar lo que uno necesita.

**Motivaciones y objetivos:** Quiere tener suficiente dinero para comprar una casa para su madre y una vida mejor para sí mismo.

**Fortalezas y debilidades:** Es rápido y astuto en sus robos, pero su falta de educación formal lo hace vulnerable en situaciones sociales. Es impulsivo y puede tomar decisiones apresuradas.

**Hábitos y costumbres:** Tiene una rutina diaria de patrullar las calles y buscar víctimas. Suele reunirse con otros ladrones para compartir información y estrategias.

**Actitudes:** Es agresivo y desafiante, pero puede ser amable y simpático para manipular a las personas.

Estilo de comunicación: Utiliza un tono intimidante y amenazador para conseguir lo que quiere.

**Ambiente social y cultural:** Vive en una comunidad marginal en Bogotá, rodeado de pobreza y violencia. Está inmerso en la cultura de la delincuencia en las calles de la ciudad.

**Emociones y estados de ánimo:** Siente una mezcla de emoción y temor al acechar a sus víctimas. Puede sentir remordimiento después de un robo exitoso, pero generalmente se justifica a sí misma diciendo que lo hizo por necesidad.

**Aspectos físicos:** Es un hombre de baja estatura con un aspecto descuidado y agresivo. Tiene cicatrices en su rostro de peleas pasadas.

# Reconocimiento de voz a texto 
> Intente con esta libreria pero saca muchos problemas: @ng-web-apis/speech
> Estoy aprovechando el uso de whisper para esta solución. Ya que tengo el acceso de API openai, me arroraré tiempo. https://lablab.ai/t/chatgpt-tutorial-how-to-integrate-chatgpt-and-whisper-api-into-your-project


# Errores a revisar:
> 1. Debe encontrarse una solución para que la respuesta sea solo como una respuesta del personaje a interpretar. 
2. Sensor de emociones a tra vez de texto, analaizar emoción que expresa la persona que escribe 
> Analizar el contexto de la conversación y con base a las emociones de la misma definir una consecuencia en el juego.
3. Quiero controlar los tiempos en los que se realiza la petición o envío y llegada de datos.
> VALIDAR CON UNA VARIABLE BOLEANA SI HA LLEGADO O NO EL MENSAJE DE RESPUESTA DE LA api ENTRE ESE LAPZO MOSTRAR UN MENSAJE DE EL personaje escribiendo.
4. Gestionar data que llega de el engine gpt-3turbo por que creo que necesita recordar la conversación.
> Revisar guardar las conversaciones en el local storage y delimitar cual es memoria y cual es el texto actual.
5. Explorar posibles riesgos al ser atacado con muchas peticiones que se realice una petición ciclica que cause una perdida de dinero grande.
> Primero bloquear el botón, 15 segundos con un set interval, dar manejo de seguridad desde front, como encriptar la apikey, y otras buscar. 
> Más adelante hacer un backend donde pasamos la data y manejar mejor seguridad.
6. Revisar librerias de encriptación.
7. Animación de exritura de texto.
8. LEER https://github.com/Twynzen/openai-cookbook
9. palabra de bloqueo por si se debe terminar la conversación.
>Se envía una palabra secreta que permite detener la conversación si esta teniendo un flujo no deseado, detectar si en el string viene esa palabra para finalziar el chat y no permitir seguir con la conversación.
10. Mejorar forma en que se visualiza la data enviada, actualizada y memorias
