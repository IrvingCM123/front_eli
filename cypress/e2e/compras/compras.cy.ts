describe('Componente Productos', () => {

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

	it('No muestra nada si el array de compras está vacío', () => {

		cy.intercept('GET', '**/servidor/orden-compra', []).as('getComprasVacio');

		cy.visit('/mostrarCompras');
		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo compras...').should('be.visible');

		cy.wait(1000);
		cy.get('.loading-wrapper').should('not.exist');
		cy.wait('@getComprasVacio');

		cy.wait(1000);
		cy.get('.loading-wrapper').should('not.exist');
	});

	it('Muestra encabezados y filas de datos si el array de compras contiene datos', () => {

		cy.intercept('GET', '**/servidor/orden-compra').as('getCompras');
		cy.visit('/mostrarCompras');

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo compras...').should('be.visible');
		cy.wait(1000);
		let resultado: any;

		cy.wait('@getCompras').then((interception: any) => {
			resultado = interception.response.body;
			expect(resultado).to.exist;
		});

		cy.wait(1000);
		cy.then(() => {
			cy.get('th').should('contain', '#');
			cy.get('th').should('contain', 'Fecha de Compra');
			cy.get('th').should('contain', 'Total Productos');
			cy.get('th').should('contain', 'Estado Compra');
			cy.get('th').should('contain', 'Encargado Compra');

			expect(resultado.length).to.be.gte(2);

			cy.get('tbody tr').should('have.length', resultado.length);

			resultado = resultado.slice(0, 2)

			resultado.slice(0, 2).forEach((registro: any, index: number) => {
				
				registro.detalle_orden_compra_ID.detalleOC_Cantidad_Producto = registro.detalle_orden_compra_ID.detalleOC_ProductoOC_ID.reduce(
					(acc: number, producto: any) => acc + producto.productoOC_Cantidad_Producto,
					0
				);
				cy.get(`#compra-fecha-${index}`).should('contain', registro.orden_compra_fecha_ordenado);
				cy.get(`#compra-productos-${index}`).should('contain', `${registro.detalle_orden_compra_ID.detalleOC_Cantidad_Producto} Producto(s)`);
				cy.get(`#compra-estado-${index}`).should('contain', registro.orden_compra_estado);
				cy.get(`#compra-correo-${index}`).should('contain', registro.detalle_orden_compra_ID.detalleOC_Cuenta_ID.cuenta_Correo);
			});

		});

	});

	it('Redirige a la ruta "/visualizarproducto" al seleccionar un proveedor', () => {

		cy.intercept('GET', '**/servidor/orden-compra').as('getCompras');
		cy.visit('/mostrarCompras');

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo compras...').should('be.visible');

		cy.wait(1000);
		let resultado: any;

		cy.wait('@getCompras').then((interception: any) => {
			resultado = interception.response.body;
			expect(resultado).to.exist;
		});
		cy.wait(1000);

		cy.then(() => {
			cy.get('#compra-id-0').click()
		});

		cy.url().should('include', '/visualizarCompra');
		cy.wait(1000);
	});

});