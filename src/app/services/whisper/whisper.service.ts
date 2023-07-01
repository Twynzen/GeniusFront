import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WhisperService {
  async transcribeAudio(audioFile: File): Promise<string> {

    // Crear un objeto FormData para enviar el archivo de audio
    console.log(audioFile,"palaapi");

    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('model', 'whisper-1');

    // Enviar la solicitud a la API de OpenAI
    const response = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      formData,
      {
        headers: {
          Authorization: `Bearer ${environment.GPT_API_KEY}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // Devolver la transcripción
    return response.data.text;
  }
}
