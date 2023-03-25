import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThinkingFigureComponent } from './thinking-figure.component';

describe('ThinkingFigureComponent', () => {
  let component: ThinkingFigureComponent;
  let fixture: ComponentFixture<ThinkingFigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThinkingFigureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThinkingFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
