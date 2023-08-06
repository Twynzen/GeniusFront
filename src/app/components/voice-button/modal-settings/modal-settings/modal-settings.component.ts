import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CINEMA_PROMPT } from 'src/app/constants/cinema_prompt';
import { SECRET_PROMPT } from 'src/app/constants/secret-prompt';
import { CustomFormService } from 'src/app/services/customFormService/custom-form.service';

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
  isCustomPersonalitySelected = false;

  constructor(private fb: FormBuilder,
        private formService: CustomFormService) {
    this.formGeniusSettings = this.fb.group({
      selectedPrompt: [''],
      // Aquí puedes agregar los campos para las preguntas de personalización
      aiName: [''],
      aiPurpose: [''],
      aiRelationship: [''],
      personalityType: [''],
      musicStyle: [''],
      drivingStyle: [''],
      animalType: [''],
      reactionWhenSad: [''],
      superpower: [''],
      humorImportance: [''],
      celebrationStyle: [''],
    });
    this.secretPrompts = this.filterSecretPrompts();
  }

  filterSecretPrompts(): string[] {
    const promptsToExclude = ['EMOTION_FILTER'];
    return [
      ...Object.keys(SECRET_PROMPT).filter(
        (prompt) => !promptsToExclude.includes(prompt)
      ),
      'Crea tu personalidad',
    ];
  }

  onPromptChange() {
    if (
      this.formGeniusSettings.value.selectedPrompt === 'Crea tu personalidad'
    ) {
      this.isCustomPersonalitySelected = true;
    } else {
      this.isCustomPersonalitySelected = false;
    }
  }

  onSave() {
    this.formService.changeForm(this.formGeniusSettings)
    console.log(this.formGeniusSettings.value,"DATA PARA LA IA");
    this.save.emit(this.formGeniusSettings.value);
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
