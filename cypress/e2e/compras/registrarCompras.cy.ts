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

	const compraInformacion = {
		orden_compra_ID: 20,
		orden_compra_estado: "PENDIENTE",
		orden_compra_fecha_ordenado: "2024-11-19T14:52:45.551Z",
		orden_compra_fecha_entregado: "2024-11-24 08:09:13.746",
		detalle_orden_compra_ID: {
			detalleOC_ID: 28,
			detalleOC_Cantidad_Producto: 2,
			detalleOC_MontoTotal: null,
			detalleOC_ProductoOC_ID: [
				{
					productoOC_ID: 42,
					productoOC_Cantidad_Producto: 1,
					productoOC_Nombre_Producto: "Cama matrimonial"
				},
				{
					productoOC_ID: 43,
					productoOC_Cantidad_Producto: 1,
					productoOC_Nombre_Producto: "Cama Individual"
				}
			],
			detalleOC_Proveedor_ID: {
				proveedor_ID: 1,
				proveedor_Nombre: "Muebles Dico",
				proveedor_Direccion: "Calle 24 entre Oriente 2 y 4",
				proveedor_Telefono: "2721495728",
				proveedor_Email: "Dico@Gmail.com",
				proveedor_Catalogo: null,
				proveedor_FechaCreacion: "2024-11-17T22:37:26.082Z"
			},
			detalleOC_Cuenta_ID: {
				cuenta_ID: 2,
				cuenta_Nombre: "Elizabeth",
				cuenta_Apellido: "Galindo",
				cuenta_Correo: "eligalindo@gmail.com",
				cuenta_Contrasena: "$2b$10$wa/q07kk7L0Mfjo5MvgB8.gRGKEMNLTkvlkcyYahH5bhCjWHrTP76",
				cuenta_Rol: "ADMIN",
				cuenta_Estado_Cuenta: "Activo",
				cuenta_Fecha_Registro: "2024-11-15T03:50:04.166Z"
			}
		}
	}

	it('Escoge productos de dos proveedores distintos para el carrito de compras', () => {

		cy.intercept('GET', '**/servidor/inventario', (req) => {
			req.headers['cache-control'] = 'no-cache';
		}).as('getInventario');

		cy.visit('/inventario')

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo Productos...').should('be.visible');
		cy.wait(1000)
		cy.get('.loading-wrapper').should('not.exist');
		let resultado: any;
		cy.wait(1000)
		let productosSeleccionados: any | [] = [];

		cy.wait('@getInventario').then((interception: any) => {
			const statusCode = interception.response.statusCode;
			expect([200, 304]).to.include(statusCode);

			if (statusCode === 200) {
				resultado = interception.response.body;
				expect(resultado).to.exist;
			} else {
				console.log("304 Not Modified - Cached Response");
			}

			console.log(resultado)
		});
		cy.wait(1000)

		cy.then(() => {
			cy.window().then((win) => {
				win.localStorage.setItem('productos', JSON.stringify(resultado))
			})
		});

		cy.window().then((win) => {

			const productos = JSON.parse(win.localStorage.getItem('productos') || '{}');

			cy.wrap(productos).as('productosSeleccionados');

			cy.visit('/ordenCompra')

			cy.wait(1000)

			for (let index = 0; index < resultado.length; index++) {

				cy.get('#productoNombre-' + index).should('exist').scrollIntoView({ duration: 500 })
					.should('be.visible')
					.and('contain', resultado[index].inventario_ProductoID.producto_Nombre);

				cy.get('#productoCategoria-' + index).should('exist').scrollIntoView({ duration: 500 })
					.should('be.visible')
					.and('contain', resultado[index].inventario_ProductoID.producto_Categoria);

				cy.get('#inventarioStaus-' + index).should('exist').scrollIntoView({ duration: 500 })
					.should('be.visible')
					.and('contain', resultado[index].inventario_Status);
			}

		});

		cy.then(() => {

			cy.get('#botonOrdenar-' + 0).should('exist').scrollIntoView({ duration: 500 })
				.should('be.visible')
				.and('contain', 'Ordenar')
				.click();

			cy.wait(1000)

			cy.get('#alert-2-msg').contains('Cama matrimonial: 1').should('be.visible');

			cy.get('.alert-button-inner').contains('Aceptar').click();

			cy.get('#botonOrdenar-' + 1).should('exist').scrollIntoView({ duration: 500 })
				.should('be.visible')
				.and('contain', 'Ordenar')
				.click();

			cy.wait(1000)

			cy.get('#alert-5-msg').contains('Closet Armable Ropero: 1').should('be.visible');

			cy.get('.alert-button-inner').contains('Aceptar').click({ force: true });

			cy.visit('/carritoCompras')

			cy.wait(1000)

		});

	});

	it('Escoge productos de dos proveedores distintos para el carrito de compras', () => {

		cy.intercept('GET', '**/servidor/inventario', (req) => {
			req.headers['cache-control'] = 'no-cache';
		}).as('getInventario');

		cy.visit('/inventario')

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo Productos...').should('be.visible');
		cy.wait(1000)
		cy.get('.loading-wrapper').should('not.exist');
		let resultado: any;
		cy.wait(1000)
		let productosSeleccionados: any | [] = [];

		cy.wait('@getInventario').then((interception: any) => {
			const statusCode = interception.response.statusCode;
			expect([200, 304]).to.include(statusCode);

			if (statusCode === 200) {
				resultado = interception.response.body;
				expect(resultado).to.exist;
			} else {
				console.log("304 Not Modified - Cached Response");
			}
		});
		cy.wait(1000)

		cy.then(() => {
			cy.window().then((win) => {
				win.localStorage.setItem('productos', JSON.stringify(resultado))
			})
		});

		cy.window().then((win) => {

			const productos = JSON.parse(win.localStorage.getItem('productos') || '{}');

			cy.wrap(productos).as('productosSeleccionados');

			cy.visit('/ordenCompra')

			cy.wait(1000)

			for (let index = 0; index < resultado.length; index++) {

				cy.get('#productoNombre-' + index).should('exist').scrollIntoView({ duration: 500 })
					.should('be.visible')
					.and('contain', resultado[index].inventario_ProductoID.producto_Nombre);

				cy.get('#productoCategoria-' + index).should('exist').scrollIntoView({ duration: 500 })
					.should('be.visible')
					.and('contain', resultado[index].inventario_ProductoID.producto_Categoria);

				cy.get('#inventarioStaus-' + index).should('exist').scrollIntoView({ duration: 500 })
					.should('be.visible')
					.and('contain', resultado[index].inventario_Status);
			}

		});

		cy.then(() => {

			cy.get('input[name="buscarProducto"]').should('exist').scrollIntoView({ duration: 500 }).type('Cama')

			cy.wait(600)

			cy.get('ul.p-autocomplete-items li.p-autocomplete-item')
				.contains('Cama matrimonial')
				.click()
				.then(() => {
					const productoEncontrado = resultado.find(
						(producto: any) => producto.inventario_ProductoID.producto_Nombre === 'Cama matrimonial'
					);
					if (productoEncontrado) {
						cy.wait(1000)
						cy.get('#botonOrdenar-' + 0).should('exist').scrollIntoView({ duration: 500 })
							.should('be.visible')
							.and('contain', 'Ordenar')
							.click();

						cy.get('#alert-2-msg').contains('Cama matrimonial: 1').should('be.visible');

						cy.wait(1000)
						cy.get('.alert-button-inner').contains('Aceptar').click();
					}
				});

			cy.get('p-autoComplete[name="buscarProducto"]').type('Closet');

			cy.wait(600)

			cy.get('ul.p-autocomplete-items li.p-autocomplete-item')
				.contains('Closet Armable Ropero')
				.click()
				.then(() => {
					const productoEncontrado = resultado.find(
						(producto: any) => producto.inventario_ProductoID.producto_Nombre === 'Closet Armable Ropero'
					);
					if (productoEncontrado) {
						cy.wait(1000)
						cy.get('#botonOrdenar-' + 0).should('exist').scrollIntoView({ duration: 500 })
							.should('be.visible')
							.and('contain', 'Ordenar')
							.click();

						cy.get('#alert-2-msg').contains('Closet Armable Ropero: 1').should('be.visible');

						cy.wait(1000)
						cy.get('.alert-button-inner').contains('Aceptar').click();
					}
				});

				cy.wait(1000)

			cy.visit('/carritoCompras')

			cy.wait(1000)

		});

	});
});