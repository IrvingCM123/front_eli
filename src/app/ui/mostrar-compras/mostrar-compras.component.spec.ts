import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarComprasComponent } from './mostrar-compras.component';

describe('MostrarComprasComponent', () => {
  let component: MostrarComprasComponent;
  let fixture: ComponentFixture<MostrarComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarComprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
