import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarProductoComponent } from './visualizar-producto.component';

describe('VisualizarProductoComponent', () => {
  let component: VisualizarProductoComponent;
  let fixture: ComponentFixture<VisualizarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
