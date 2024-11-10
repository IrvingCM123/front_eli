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

		cy.intercept('GET', '**/servidor/inventario', []).as('getInventarioVacio');

		cy.visit('/inventario');

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo Productos...').should('be.visible');
		cy.get('.loading-wrapper').should('not.exist');
		cy.wait('@getInventarioVacio');
		cy.get('.loading-wrapper').should('not.exist');
		cy.get('.p-dataview-emptymessage').should('exist').and('be.visible').contains(' No results found ');

	});

	it('Muestra información de productos si el array no está vacío', () => {

		const productosMock = [
			{
				inventario_ProductoID: {
					producto_Nombre: 'Silla Gamer',
					producto_ImagenURL: 'https://th.bing.com/th/id/OIP.6HXYftwOvJ2HOpumn3U5EgHaHa?rs=1&pid=ImgDetMain',
					producto_Categoria: 'Mueblería',
					producto_Precio: 129.99,
					producto_Status: 'INACTIVO'
				},
				inventario_Status: 'POCO_STOCK'
			},
			{
				inventario_ProductoID: {
					producto_Nombre: 'Cama Spring Box',
					producto_ImagenURL: 'https://th.bing.com/th/id/R.81aa321e7f1db0b60b146292028333c7?rik=T282XBo0zM%2brkw&pid=ImgRaw&r=0',
					producto_Categoria: 'Mueblería',
					producto_Precio: 59.99,
					producto_Status: 'ACTIVO'
				},
				inventario_Status: 'EN_STOCK'
			}

		];

		cy.intercept('GET', '**/servidor/inventario', productosMock).as('getInventario');

		cy.visit('/inventario');

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo Productos...').should('be.visible');
		cy.get('.loading-wrapper').should('not.exist');

		cy.wait('@getInventario', { timeout: 10000 });

		cy.get('.loading-wrapper').should('not.exist');

		Cypress.config('defaultCommandTimeout', 10000);


		for (let index = 0; index < productosMock.length; index++) {

			cy.get('#productoNombre-' + index).should('exist').scrollIntoView({ duration: 500 })
				.should('be.visible')
				.and('contain', productosMock[index].inventario_ProductoID.producto_Nombre);

			cy.get('#productoStatus-' + index).should('exist').scrollIntoView({ duration: 500 })
				.should('be.visible')
				.and('contain', productosMock[index].inventario_ProductoID.producto_Status, { force: true });

			cy.get('#productoImagen-' + index).should('exist').scrollIntoView({ duration: 500 })
				.should('have.attr', 'src', productosMock[index].inventario_ProductoID.producto_ImagenURL);

			cy.get('#productoCategoria-' + index).should('exist').scrollIntoView({ duration: 500 })
				.should('be.visible')
				.and('contain', productosMock[index].inventario_ProductoID.producto_Categoria, { force: true });

			cy.get('#productoPrecio-' + index).should('exist').scrollIntoView({ duration: 500 })
				.should('be.visible')
				.and('contain', `$${productosMock[index].inventario_ProductoID.producto_Precio}`, { force: true });

			if (productosMock[index].inventario_ProductoID.producto_Status != 'INACTIVO') {
				cy.get('#inventarioStatus-' + index).should('exist').scrollIntoView({ duration: 500 })
					.should('be.visible')
					.and('contain', productosMock[index].inventario_Status, { force: true });
			}
		}
	});


	it('Redirige a la ruta "/visualizarproducto" al seleccionar un proveedor', () => {

		const productosMock = [
			{
				inventario_ID: 21,
				inventario_Status: "SOBRE_STOCK",
				inventario_Cantidad: 121,
				inventario_ProductoID: {
					producto_ID: 23,
					producto_Nombre: "Cama Spring Box",
					producto_Categoria: "Muebleria",
					producto_Precio: "400",
					producto_Status: "ACTIVO",
					producto_ImagenURL: "https://th.bing.com/th/id/R.81aa321e7f1db0b60b146292028333c7?rik=T282XBo0zM%2brkw&pid=ImgRaw&r=0",
					producto_ProveedorID: {
						proveedor_ID: 11,
						proveedor_Nombre: "Muebles Dico"
					}
				}
			}
		];

		cy.window().then((win) => {
			win.localStorage.setItem('productoSeleccionado', JSON.stringify(productosMock));
		});

		cy.intercept('GET', '**/servidor/inventario', productosMock).as('getInventario');

		cy.visit('/inventario');

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo Productos...').should('be.visible');
		cy.get('.loading-wrapper').should('not.exist');

		cy.wait('@getInventario', { timeout: 10000 });

		cy.get('.loading-wrapper').should('not.exist');

		cy.contains(productosMock[0].inventario_ProductoID.producto_Nombre).click();

		cy.url().should('include', '/visualizarproducto');

	});

});