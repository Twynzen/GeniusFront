import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomFormService } from 'src/app/services/customFormService/custom-form.service';

@Component({
  selector: 'app-custom-personality',
  templateUrl: './custom-personality.component.html',
  styleUrls: ['./custom-personality.component.scss'],
})
export class CustomPersonalityComponent {
  formGeniusSettings: FormGroup = {} as FormGroup;

  constructor(private formService: CustomFormService, private fb: FormBuilder) {
    this.formGeniusSettings = this.fb.group({
      aiName: [''],
      aiPurpose: [''],
      aiPurposeOther: [''],
      aiRelationship: [''],
      aiRelationshipOther: [''],
      personalityType: [''],
      personalityTypeOther: [''],
      musicStyle: [''],
      musicStyleOther: [''],
      drivingStyle: [''],
      drivingStyleOther: [''],
      animalType: [''],
      reactionWhenSad: [''],
      reactionWhenSadOther: [''],
      superpower: [''],
      superpowerOther: [''],
      humorImportance: [''],
      celebrationStyle: [''],
      celebrationStyleOther: [''],
    });
  }

  ngOnInit() {
    this.getForm();
  }

  getForm() {
    this.formService.currentForm.subscribe((form) => {
      if (form instanceof FormGroup) {
        Object.keys(form.controls).forEach((key) => {
          if (this.formGeniusSettings.contains(key)) {
            this.formGeniusSettings.get(key)?.setValue(form.get(key)?.value);
          }
        });
      }
    });
  }

  isOtherSelected(controlName: string): boolean {
    let other = this.formGeniusSettings.get(controlName)?.value === 'other';

    return other;
  }
}
