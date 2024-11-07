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

		cy.visit('/visualizarproveedor');
	});

	const proveedorCompleto = {
		proveedor_ID: 12,
		proveedor_Nombre: 'Redragon',
		proveedor_Direccion: 'Calle Real, entre norte 2 y 4',
		proveedor_Telefono: '2722594250',
		proveedor_Email: 'Redragon@Mail.com',
		proveedor_Catalogo: null,
		proveedorBanco_ID: {
			proveedorBanco_ID: 9,
			proveedorBanco_CuentaBancaria: 1235231231233123,
			proveedorBanco_NombreBanco: 'Banco Azteca',
			proveedorBanco_NombreBeneficiario: 'Redragon S.A.',
			proveedorBanco_TipoTransaccion: 'RETIRO'
		},
		proveedor_FechaCreacion: '2024-10-20T22:58:42.254Z'
	};

	const proveedorSinBanco = {
		proveedor_ID: '124',
		proveedor_Nombre: 'Logitech',
		proveedor_Direccion: 'Avenida Ficticia 456',
		proveedor_Telefono: '2722594251',
		proveedor_Email: 'Logitech@Mail.com',
		proveedorBanco_ID: null,
		proveedor_FechaCreacion: '2024-01-02'
	};

	it('Muestra información completa del proveedor', () => {
		cy.window().then((window) => {
			window.localStorage.setItem('proveedorSeleccionado', JSON.stringify(proveedorCompleto));
		});

		cy.visit('/visualizarproveedor/');

		cy.get('a[aria-controls="p-fieldset-0-content"]').click({ force: true });

		cy.contains('Proveedor ID: 12').should('be.visible');
		cy.contains('Redragon').should('be.visible');
		cy.contains('Redragon@Mail.com').should('be.visible');
		cy.contains('2722594250').should('be.visible');
		cy.contains('Calle Real, entre norte 2 y 4').should('be.visible');

		cy.contains('Cuenta Bancaria: 1235231231233123').should('be.visible');
		cy.contains('Nombre Banco: Banco Azteca').should('be.visible');
		cy.contains('Beneficiario: Redragon S.A.').should('be.visible');
		cy.contains('Forma de pago: RETIRO').should('be.visible');
	});



	it('Muestra información de proveedor sin información bancaria', () => {
		cy.window().then((window) => {
			window.localStorage.setItem('proveedorSeleccionado', JSON.stringify(proveedorSinBanco));
		});

		cy.visit('/visualizarproveedor');

		cy.get('a[aria-controls="p-fieldset-0-content"]').click({ force: true });

		cy.contains('Proveedor ID: 124').should('be.visible');
		cy.contains('Logitech').should('be.visible');
		cy.contains('Logitech@Mail.com').should('be.visible');
		cy.contains('2722594251').should('be.visible');
		cy.contains('Avenida Ficticia 456').should('be.visible');

		cy.contains('Cuenta Bancaria: Sin Información').should('be.visible');
		cy.contains('Nombre Banco: Sin Información').should('be.visible');
		cy.contains('Beneficiario: Sin Información').should('be.visible');
		cy.contains('Forma de pago: Sin Información').should('be.visible');
	});

	it('Actualiza la información del proveedor', () => {
		
		cy.window().then((window) => {
			window.localStorage.setItem('proveedorSeleccionado', JSON.stringify(proveedorCompleto));
		});

		let nuevoProveedor: any = { ...proveedorCompleto, proveedor_Nombre: 'NuevoRedragon' };
		delete nuevoProveedor.proveedor_ID;
		delete nuevoProveedor.proveedor_FechaCreacion;

		cy.visit('/visualizarproveedor/');

		cy.get('button').contains('Editar').click();

		cy.intercept('PUT', '**/servidor/proveedores/12', { body: {status: 201, mensaje: 'Proveedor actualizado con éxito'}}).as('putProveedor');

		cy.get('input').first().clear().type('NuevoRedragon');
		
		cy.get('#actualizarInfo').click();

		cy.wait('@putProveedor');

		cy.contains('NuevoRedragon').should('be.visible');

		cy.get('#alert-3-msg').contains('Proveedor actualizado con éxito');

		cy.get('.alert-button-inner').contains('Aceptar').click();

		cy.visit('/proveedores');
	});

	it('Elimina la información del proveedor', () => {
		
		cy.window().then((window) => {
			window.localStorage.setItem('proveedorSeleccionado', JSON.stringify(proveedorCompleto));
		});

		cy.visit('/visualizarproveedor/');

		cy.get('button').contains('Editar').click();

		cy.intercept('DELETE', '**/servidor/proveedores/12', { body: {status: 201, mensaje: 'Proveedor eliminado con éxito'}}).as('dropProveedor');

		cy.get('#eliminarInfo').click();

		cy.wait('@dropProveedor');

		cy.get('#alert-3-msg').contains('Proveedor eliminado con éxito');

		cy.get('.alert-button-inner').contains('Aceptar').click();

		cy.visit('/proveedores');
	});

});
