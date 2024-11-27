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

	it('No muestra nada si el array de productos está vacío', () => {

		cy.intercept('GET', '**/servidor/venta/obtenerVentas', []).as('getVentasVacio');

		cy.visit('/mostrarVentas');

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo ventas...').should('be.visible');
		cy.wait(1000);
		cy.get('.loading-wrapper').should('not.exist');
		cy.wait('@getVentasVacio');
		cy.wait(1000);
		cy.get('.loading-wrapper').should('not.exist');
	});

	it('Muestra encabezados y filas de datos si el array de ventas contiene datos', () => {

		cy.intercept('GET', '**/servidor/venta/obtenerVentas').as('getVentas');
		cy.visit('/mostrarVentas');
		cy.wait(1000);
		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo ventas...').should('be.visible');
		cy.wait(1000);
		let resultado: any;
		cy.wait('@getVentas').then((interception: any) => {
			resultado = interception.response.body;
			expect(resultado).to.exist;
		});

		cy.wait(1000);

		cy.then(() => {
			cy.get('th').should('contain', '#');
			cy.get('th').should('contain', 'Fecha de Venta');
			cy.get('th').should('contain', 'Total Productos');
			cy.get('th').should('contain', 'Total Venta');
			cy.get('th').should('contain', 'Estado Venta');
			cy.get('th').should('contain', 'Encargado Venta');

			expect(resultado.length).to.be.gte(1);

			cy.get('tbody tr').should('have.length', resultado.length);

			resultado = resultado.slice(0, 2)

			resultado.slice(0, 2).forEach((registro: any, index: number) => {
				registro.venta_DetalleVenta_ID.detalleVenta_TotalProductosVendidos = registro.venta_DetalleVenta_ID.detalleVenta_ProductoVenta_ID.reduce(
					(acc: number, producto: any) => acc + producto.productoVenta_CantidadProducto,
					0
				);
				cy.get(`#venta-fecha-${index}`).should('contain', registro.venta_FechaRegistro);
				cy.get(`#venta-productos-${index}`).should('contain', `${registro.venta_DetalleVenta_ID.detalleVenta_TotalProductosVendidos} Producto(s)`);
				cy.get(`#venta-monto-${index}`).should('contain', `$ ${registro.venta_DetalleVenta_ID.detalleVenta_MontoTotal}`);
				cy.get(`#venta-estado-${index}`).should('contain', registro.venta_EstadoVenta);
				cy.get(`#venta-correo-${index}`).should('contain', registro.venta_DetalleVenta_ID.cuenta_ID[0].cuenta_Correo);
			});

		});

	});

	it('Redirige a la ruta "/visualizarproducto" al seleccionar un proveedor', () => {

		cy.intercept('GET', '**/servidor/venta/obtenerVentas').as('getVentas');
		cy.visit('/mostrarVentas');
		
		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo ventas...').should('be.visible');
		cy.wait(1000);
		let resultado: any;
		cy.wait('@getVentas').then((interception: any) => {
			resultado = interception.response.body;
			expect(resultado).to.exist;
		});
		cy.wait(1000);
		cy.then(() => {
			cy.get('#venta-id-0').click()
		});
		cy.wait(1000);
		cy.url().should('include', '/visualizarventa');

	});

});