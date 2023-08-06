import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPersonalityComponent } from './custom-personality.component';

describe('CustomPersonalityComponent', () => {
  let component: CustomPersonalityComponent;
  let fixture: ComponentFixture<CustomPersonalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPersonalityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomPersonalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
