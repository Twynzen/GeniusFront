import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoBestOneComponent } from './two-best-one.component';

describe('TwoBestOneComponent', () => {
  let component: TwoBestOneComponent;
  let fixture: ComponentFixture<TwoBestOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoBestOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoBestOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
