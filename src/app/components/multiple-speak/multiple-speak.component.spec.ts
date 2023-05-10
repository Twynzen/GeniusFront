import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSpeakComponent } from './multiple-speak.component';

describe('MultipleSpeakComponent', () => {
  let component: MultipleSpeakComponent;
  let fixture: ComponentFixture<MultipleSpeakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleSpeakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleSpeakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
