import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialOrdenCompraComponent } from './historial-orden-compra.component';

describe('HistorialOrdenCompraComponent', () => {
  let component: HistorialOrdenCompraComponent;
  let fixture: ComponentFixture<HistorialOrdenCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialOrdenCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialOrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
