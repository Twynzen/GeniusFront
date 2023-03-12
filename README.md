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


# Errores a revisar:
1. Animación de exritura de texto
2. Revisar librerias de encriptación
3. Quiero controlar los tiempos en los que se realiza la petición o envío y llegada de datos.
4. Gestionar data que lelga de el engine gpt-3turbo por que creo que necesita recordar la conversación.
5. Explorar posibles riesgos al ser atacado con muchos ataques o que se realice una petición ciclica que cause una perdida de dinero grande.
6. Sensor de emociones a tra vez de texto, analaizar emoción que expresa la persona que escribe 
