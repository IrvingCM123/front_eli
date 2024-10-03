import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarProveedorComponent } from './visualizar-proveedor.component';

describe('VisualizarProveedorComponent', () => {
  let component: VisualizarProveedorComponent;
  let fixture: ComponentFixture<VisualizarProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
