import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CrearCuentaComponent } from './crear-cuenta.component';
import { claseMostrarAlerta } from 'src/app/common/services/alerta.service';
import { claseCrearCuenta } from './methods/crear-cuenta.class';
import { crearCuentaPuerto } from 'src/app/config/puertos/crearCuenta.puerto';
import { of } from 'rxjs';

describe('CrearCuentaComponent', () => {
  let component: CrearCuentaComponent;
  let fixture: ComponentFixture<CrearCuentaComponent>;
  let mostrarAlertaService: jasmine.SpyObj<claseMostrarAlerta>;
  let crearCuentaService: jasmine.SpyObj<claseCrearCuenta>;

  beforeEach(async () => {
    const alertaSpy = jasmine.createSpyObj('claseMostrarAlerta', ['mostrarAlerta', 'mostrarAlertaValidacion', 'mostrarAlertaRuta']);
    const crearCuentaSpy = jasmine.createSpyObj('claseCrearCuenta', ['crearCuenta']);
    console.log(crearCuentaSpy.crearCuenta, "crearCuentaSpy.crearCuenta");
    crearCuentaSpy.crearCuenta.and.returnValue(of({ status: 500, message: 'Error' }));

    const crearCuentaPuertoSpy = jasmine.createSpyObj('crearCuentaPuerto', [ 'obtenerCodigoValidacion']);
  
    await TestBed.configureTestingModule({
      declarations: [CrearCuentaComponent],
      imports: [FormsModule],
      providers: [
        { provide: claseMostrarAlerta, useValue: alertaSpy },
        { provide: claseCrearCuenta, useValue: crearCuentaSpy },
        { provide: crearCuentaPuerto, useValue: crearCuentaPuertoSpy },
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(CrearCuentaComponent);
    component = fixture.componentInstance;
    mostrarAlertaService = TestBed.inject(claseMostrarAlerta) as jasmine.SpyObj<claseMostrarAlerta>;
    crearCuentaService = TestBed.inject(claseCrearCuenta) as jasmine.SpyObj<claseCrearCuenta>;
  
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llenar todos los campos y crear la cuenta', async () => {
    // Asignar valores a todos los inputs
    component.objeto_Cuenta = {
      Nombre: 'John',
      Apellidos: 'Doe',
      Correo_electronico: 'john.doe@example.com',
      Contrasena: 'Password123',
      cuenta_rol: 'Usuario'
    };

    mostrarAlertaService.mostrarAlertaValidacion.and.returnValue(Promise.resolve(true));
    crearCuentaService = TestBed.inject(claseCrearCuenta) as jasmine.SpyObj<claseCrearCuenta>;

    // Ejecutar la función de crear cuenta
    await component.crearCuenta();

    expect(crearCuentaService.crearCuenta).toHaveBeenCalled();
    expect(mostrarAlertaService.mostrarAlertaRuta).toHaveBeenCalledWith('Cuenta creada', 'La cuenta ha sido creada con éxito', 'iniciarSesion');
  });

  it('debería intentar crear una cuenta pero sin llenar todos los campos', async () => {
    // Solo llenar el correo
    component.objeto_Cuenta = {
      Nombre: '',
      Apellidos: '',
      Correo_electronico: 'john.doe@example.com',
      Contrasena: '',
      cuenta_rol: ''
    };

    await component.crearCuenta();

    expect(crearCuentaService.crearCuenta).not.toHaveBeenCalled();
    expect(mostrarAlertaService.mostrarAlerta).toHaveBeenCalledWith('Error', jasmine.any(String));
  });

  it('debería mostrar error al ingresar código de validación incorrecto', async () => {
    mostrarAlertaService.mostrarAlertaValidacion.and.returnValue(Promise.resolve(false));

    await component.crearCuenta();

    expect(mostrarAlertaService.mostrarAlerta).toHaveBeenCalledWith('Error', 'Código de validación incorrecto');
  });

  it('debería mostrar error al intentar crear una cuenta existente', async () => {
    component.objeto_Cuenta = {
      Nombre: 'John',
      Apellidos: 'Doe',
      Correo_electronico: 'john.doe@example.com',
      Contrasena: 'Password123',
      cuenta_rol: 'Usuario'
    };

    mostrarAlertaService.mostrarAlertaValidacion.and.returnValue(Promise.resolve(true));
    crearCuentaService.crearCuenta.and.returnValue(Promise.resolve({ status: 400, message: 'Cuenta ya existe' }));
    console.log(crearCuentaService.crearCuenta, "crearCuentaService.crearCuenta");
    await component.crearCuenta();

    expect(crearCuentaService.crearCuenta).toHaveBeenCalled();
    expect(mostrarAlertaService.mostrarAlerta).toHaveBeenCalledWith('Error', 'Cuenta ya existe');
  });

  it('debería iniciar sesión correctamente al hacer clic en el botón de login', () => {
    const iniciarSesionLink = fixture.debugElement.query(By.css('.signup-link a')).nativeElement;
    iniciarSesionLink.click();

    expect(iniciarSesionLink.getAttribute('href')).toEqual('iniciarSesion');
  });
});
