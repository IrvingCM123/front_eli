describe('Componente Proveedores', () => {

	beforeEach(() => {
		cy.visit('/iniciarSesion');
		cy.url().should('includes', 'iniciarSesion');
		cy.get('#iniciarSesionTitulo').should('be.visible');
		cy.get('#iniciarSesionTitulo').should('have.text', 'Inicio de Sesión');
		cy.get('#formCorreoUsuario').type('EliGalindo@Gmail.com');
		cy.get('#formContrasenaUsuario').type('EliGalindo123');
		cy.get('#btnIniciarSesion').click();

		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiJpcnZpbmcuY29uZGVtQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsIklEIjo5LCJpYXQiOjE3MzA5MzU0ODR9.PtDw8BsZV2749i49qxyI1qSySrSpnIjKwTob4afqKBI';

		cy.window().then((win) => {
			win.localStorage.setItem('token', token);
		});

		cy.visit('/agregar-proveedor');
	});

	it('Debe mostrar todos los parámetros llenos, incluida la información bancaria', () => {
		const datosProveedor = {
			proveedor_Nombre: 'Muebles Dico',
			proveedor_Direccion: 'Calle Real 123',
			proveedor_Telefono: 2721495728,
			proveedor_Email: 'proveedor@correo.com',
			proveedor_Catalogo: 'http://catalogo.com',
			proveedorBanco_CuentaBancaria: 8923130214,
			proveedorBanco_NombreBanco: 'Banco Azteca',
			proveedorBanco_NombreBeneficiario: 'Juan Pérez',
			proveedorBanco_TipoTransaccion: 'TRANSFERENCIA',
		};

		cy.get('input[name="nombre"]').type(datosProveedor.proveedor_Nombre);
		cy.get('input[name="direccion"]').first().type(datosProveedor.proveedor_Direccion);
		cy.get('input[name="telefono"]').first().type(datosProveedor.proveedor_Telefono.toString());
		cy.get('input[name="email"]').first().type(datosProveedor.proveedor_Email);
		cy.get('input[name="catalogo"]').last().type(datosProveedor.proveedor_Catalogo);
	
		cy.get('.p-button-label').contains('Mostrar').click();
	
		cy.get('input[name="cuentaBancaria"]').first().type(datosProveedor.proveedorBanco_CuentaBancaria.toString());
		cy.get('input[name="nombreBanco"]').first().type(datosProveedor.proveedorBanco_NombreBanco);
		cy.get('input[name="beneficiario"]').first().type(datosProveedor.proveedorBanco_NombreBeneficiario);
		cy.get('#tipoTransaccion').select(datosProveedor.proveedorBanco_TipoTransaccion);
	
		cy.get('#mostrarProveedorNombre').contains(datosProveedor.proveedor_Nombre).should('be.visible');
		cy.get('#mostrarProveedorEmail').contains(datosProveedor.proveedor_Email).should('be.visible');
		cy.get('#mostrarProveedorDireccion').contains('se encuentra en ' + datosProveedor.proveedor_Direccion).should('be.visible');
		cy.get('#mostrarCuentaBancaria').contains(datosProveedor.proveedorBanco_CuentaBancaria).should('be.visible');
		cy.get('#mostrarCuentaBancaria').contains(datosProveedor.proveedorBanco_NombreBanco).should('be.visible');
		cy.get('#mostrarBeneficiario').contains(datosProveedor.proveedorBanco_NombreBeneficiario).should('be.visible');

		cy.get('#AgregarInfo').click();

		cy.get('#alert-3-msg').contains('Proveedor agregado correctamente');

		cy.get('.alert-button-inner').contains('Aceptar').click();

		cy.visit('/proveedores');
	});

	it('Almacenar proveedor sin información bancaria', () => {
		const datosProveedor = {
			proveedor_Nombre: 'Muebles Dico',
			proveedor_Direccion: 'Calle Real 123',
			proveedor_Telefono: 2721495728,
			proveedor_Email: 'proveedor@correo.com',
			proveedor_Catalogo: 'http://catalogo.com',
			proveedorBanco_CuentaBancaria: '' ,
			proveedorBanco_NombreBanco: '' ,
			proveedorBanco_NombreBeneficiario: '',
			proveedorBanco_TipoTransaccion: '',
		};

		cy.get('input[name="nombre"]').type(datosProveedor.proveedor_Nombre);
		cy.get('input[name="direccion"]').first().type(datosProveedor.proveedor_Direccion);
		cy.get('input[name="telefono"]').first().type(datosProveedor.proveedor_Telefono.toString());
		cy.get('input[name="email"]').first().type(datosProveedor.proveedor_Email);
		cy.get('input[name="catalogo"]').last().type(datosProveedor.proveedor_Catalogo);
	
		cy.get('.p-button-label').contains('No Mostrar').click();
	
		cy.get('#mostrarProveedorNombre').contains(datosProveedor.proveedor_Nombre).should('be.visible');
		cy.get('#mostrarProveedorEmail').contains(datosProveedor.proveedor_Email).should('be.visible');
		cy.get('#mostrarProveedorDireccion').contains('se encuentra en ' + datosProveedor.proveedor_Direccion).should('be.visible');

		cy.get('#AgregarInfo').click();

		cy.get('#alert-3-msg').contains('Proveedor agregado correctamente');

		cy.get('.alert-button-inner').contains('Aceptar').click();

		cy.visit('/proveedores');
	});

	it('Enviar información con un campo faltante', () => {
		const datosProveedor = {
			proveedor_Nombre: 'Muebles Dico',
			proveedor_Direccion: 'Calle Real 123',
			proveedor_Telefono: '',
			proveedor_Email: 'proveedor@correo.com',
			proveedor_Catalogo: 'http://catalogo.com',
			proveedorBanco_CuentaBancaria: '' ,
			proveedorBanco_NombreBanco: '' ,
			proveedorBanco_NombreBeneficiario: '',
			proveedorBanco_TipoTransaccion: '',
		};

		cy.get('input[name="nombre"]').type(datosProveedor.proveedor_Nombre);
		cy.get('input[name="direccion"]').first().type(datosProveedor.proveedor_Direccion);
		cy.get('input[name="email"]').first().type(datosProveedor.proveedor_Email);
		cy.get('input[name="catalogo"]').last().type(datosProveedor.proveedor_Catalogo);
	
		cy.get('.p-button-label').contains('No Mostrar').click();
	
		cy.get('#mostrarProveedorNombre').contains(datosProveedor.proveedor_Nombre).should('be.visible');
		cy.get('#mostrarProveedorEmail').contains(datosProveedor.proveedor_Email).should('be.visible');
		cy.get('#mostrarProveedorDireccion').contains('se encuentra en ' + datosProveedor.proveedor_Direccion).should('be.visible');

		cy.get('#AgregarInfo').click();

		cy.get('#alert-3-msg').contains('Error al agregar el proveedor');

		cy.get('.alert-button-inner').contains('Aceptar').click();

	});
	
});
