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
	});

	it('No muestra nada si el array de proveedores está vacío', () => {

		cy.intercept('GET', '**/servidor/proveedores', []).as('getProveedoresVacio');

		cy.visit('/proveedores');

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo proveedores...').should('be.visible');
		cy.get('.loading-wrapper').should('not.exist');

		cy.wait('@getProveedoresVacio');

		cy.get('.loading-wrapper').should('not.exist');
		cy.get('p-virtualScroller').should('be.visible');
		cy.get('p-virtualScroller').find('.product-item').should('not.exist');
	});

	it('Muestra información de proveedores si el array no está vacío', () => {

		cy.intercept('GET', '**/servidor/proveedores').as('getProveedores');

		cy.visit('/proveedores');
		
		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo proveedores...').should('be.visible');
		cy.get('.loading-wrapper').should('not.exist');

		cy.wait('@getProveedores', { timeout: 10000 });

		const proveedoresMock = [
			{ proveedor_Nombre: 'Redragon', proveedor_Email: 'Redragon@Mail.com', proveedor_Telefono: '2722594250' },
			{ proveedor_Nombre: 'Muebles Dico', proveedor_Email: 'Dico@Gmail.com', proveedor_Telefono: '2721495728' }
		];

		proveedoresMock.forEach(proveedor => {
			cy.contains(proveedor.proveedor_Nombre).should('be.visible');
			cy.contains(proveedor.proveedor_Email).should('be.visible');
			cy.contains(proveedor.proveedor_Telefono).should('be.visible');
		});
	});

	it('Redirige a la ruta "/visualizarproveedor" al seleccionar un proveedor', () => {

		cy.intercept('GET', '**/servidor/proveedores').as('getProveedores');

		cy.visit('/proveedores');
		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo proveedores...').should('be.visible');
		cy.get('.loading-wrapper').should('not.exist');

		cy.wait('@getProveedores', { timeout: 10000 });

		const proveedoresMock = [
			{ proveedor_Nombre: 'Redragon', proveedor_Email: 'Redragon@Mail.com', proveedor_Telefono: '2722594250' },
		];

		cy.contains(proveedoresMock[0].proveedor_Nombre).click();
		cy.url().should('include', '/visualizarproveedor');
	});
});
