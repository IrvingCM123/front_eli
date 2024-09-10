import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaPantallaComponent } from './alerta-pantalla.component';

describe('AlertaPantallaComponent', () => {
  let component: AlertaPantallaComponent;
  let fixture: ComponentFixture<AlertaPantallaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertaPantallaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertaPantallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
