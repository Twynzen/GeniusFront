import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkinLoaderComponent } from './walkin-loader.component';

describe('WalkinLoaderComponent', () => {
  let component: WalkinLoaderComponent;
  let fixture: ComponentFixture<WalkinLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkinLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalkinLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
