import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CINEMA_PROMPT } from 'src/app/constants/cinema_prompt';
import { SECRET_PROMPT } from 'src/app/constants/secret-prompt';

@Component({
  selector: 'app-modal-settings',
  templateUrl: './modal-settings.component.html',
  styleUrls: ['./modal-settings.component.scss'],
})
export class ModalSettingsComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  secretPrompts: string[];
  formGeniusSettings: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGeniusSettings = this.fb.group({
      selectedPrompt: [''],
    });
    this.secretPrompts = this.filterSecretPrompts();
  }

  filterSecretPrompts(): string[] {
    const promptsToExclude = ['EMOTION_FILTER']; // Agrega aquí los prompts que no quieres que sean opciones válidas
    return Object.keys(SECRET_PROMPT).filter(
      (prompt) => !promptsToExclude.includes(prompt)
    );
  }

  onSave() {
    this.save.emit(this.formGeniusSettings.value); // Emite todos los valores del formulario
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
