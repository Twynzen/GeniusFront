import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomFormService {
  private formSource = new BehaviorSubject<FormGroup | null>(null);
  currentForm = this.formSource.asObservable();

  constructor() {}

  changeForm(form: FormGroup) {
    console.log(form,"elformulario?");

    this.formSource.next(form);
  }

}
