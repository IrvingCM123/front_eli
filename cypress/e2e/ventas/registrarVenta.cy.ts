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

	const ventaInformacion = {
		venta_ID: 5,
		venta_EstadoVenta: "PAGADO",
		venta_FechaRegistro: "2024-10-28 09:37 a.m.",
		venta_DetalleVenta_ID: {
			detalleVenta_ID: 5,
			detalleVenta_TotalProductosVendidos: 2,
			detalleVenta_MontoTotal: 2300.2,
			detalleVentaCorreoCliente: "eli456pg@gmail.com",
			detalleVentaNombreCliente: "Elizabeth Galindo",
			detalleVenta_ProductoVenta_ID: [
				{
					productoVenta_CantidadProducto: 4,
					productoVenta_PrecioProducto: 400,
					productoVenta_SubtotalVenta: 1600,
					productoVenta_NombreProducto: "Cama Individual"
				},
				{
					productoVenta_CantidadProducto: 1,
					productoVenta_PrecioProducto: 700.2,
					productoVenta_SubtotalVenta: 700.2,
					productoVenta_NombreProducto: "Closet Armable Ropero"
				}
			],
			cuenta_ID: [
				{
					cuenta_Nombre: "Elizabeth",
					cuenta_Apellido: "Galindo",
					cuenta_Correo: "eli456pg@gmail.com",
					cuenta_Rol: "ADMIN",
					cuenta_Estado_Cuenta: "Activo"
				}
			]
		},
		totalProductosVendidos: 5,
		totalMontoVenta: 2300.2
	};

	it('Realizar una venta con datos de contacto sobre el cliente', () => {

		cy.intercept('GET', '**/servidor/inventario', (req) => {
			req.headers['cache-control'] = 'no-cache';
		}).as('getInventario');

		cy.visit('/inventario')

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo Productos...').should('be.visible');
		cy.get('.loading-wrapper').should('not.exist');
		let resultado: any;
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


		cy.then(() => {
			cy.window().then((win) => {
				win.localStorage.setItem('productos', JSON.stringify(resultado))
			})
		});

		cy.window().then((win) => {

			const productos = JSON.parse(win.localStorage.getItem('productos') || '{}');

			cy.wrap(productos).as('ventaSeleccionada');

			cy.visit('/venderproductos')

			cy.wait(400)

			cy.get('p-autoComplete[name="buscarProducto"]').type('Cama');

			cy.wait(400)

			cy.get('ul.p-autocomplete-items li.p-autocomplete-item')
				.contains('Cama Individual')
				.click()
				.then(() => {
					const productoEncontrado = productos.find(
						(producto: any) => producto.inventario_ProductoID.producto_Nombre === 'Cama Individual'
					);
					if (productoEncontrado) {
						productosSeleccionados.push(productoEncontrado);
					}
				});

			cy.wait(400)

			cy.get('p-autoComplete[name="buscarProducto"]').type('Closet');

			cy.wait(400)

			cy.get('ul.p-autocomplete-items li.p-autocomplete-item')
				.contains('Closet Armable Ropero')
				.click()
				.then(() => {
					const productoEncontrado = productos.find(
						(producto: any) => producto.inventario_ProductoID.producto_Nombre === 'Closet Armable Ropero'
					);
					if (productoEncontrado) {
						productosSeleccionados.push(productoEncontrado);
					}
				});

			cy.wait(400)

			cy.get('p-autoComplete[name="buscarProducto"]').type('Microondas');

			cy.wait(400)

			cy.get('ul.p-autocomplete-items li.p-autocomplete-item')
				.contains('Microondas')
				.click()
				.then(() => {
					const productoEncontrado = productos.find(
						(producto: any) => producto.inventario_ProductoID.producto_Nombre === 'Microondas'
					);
					if (productoEncontrado) {
						productosSeleccionados.push(productoEncontrado);
					}
				});

			cy.wait(400)

			cy.get('p-autoComplete[name="buscarProducto"]').type('Radio');

			cy.wait(400)

			cy.get('ul.p-autocomplete-items li.p-autocomplete-item')
				.contains('Radio')
				.click()
				.then(() => {
					const productoEncontrado = productos.find(
						(producto: any) => producto.inventario_ProductoID.producto_Nombre === 'Radio'
					);
					if (productoEncontrado) {
						productosSeleccionados.push(productoEncontrado);
					}
				});
		});

		cy.then(() => {
			cy.get('th').should('contain', '#');
			cy.get('th').should('contain', 'Nombre Producto');
			cy.get('th').should('contain', 'Precio');
			cy.get('th').should('contain', 'Cantidad');
			cy.get('th').should('contain', 'Subtotal');
			cy.get('th').should('contain', 'Eliminar');

			let totalVenta: number = 0;

			productosSeleccionados.forEach((producto: any, index: number) => {
				const subtotal = 1 * producto.inventario_ProductoID.producto_Precio;
				cy.get(`#venta-id-${index}`).should('contain', index + 1);
				cy.get(`#venta-nombre-${index}`).should('contain', `${producto.inventario_ProductoID.producto_Nombre}`);
				cy.get(`#venta-precio-${index}`).should('contain', `$ ${producto.inventario_ProductoID.producto_Precio}`);
				cy.get(`#venta-cantidadprod-${index} input[name="cantidadProducto"]`).should('have.value', '1');
				cy.get(`#venta-subtotal-${index}`).should('contain', `$ ${subtotal}`);
				totalVenta = totalVenta + subtotal;
			});

			cy.get('#TotalVenta').should('exist').contains('$ ' + totalVenta)

			cy.intercept('POST', '**/servidor/venta', { body: { 'status': 201, 'mensaje': 'La venta se realizó con éxito' } }).as('postVenta');

			cy.get('#botonRealizarVenta').click();

			cy.wait(400)

			cy.get('.alert-wrapper').should('be.visible');
			cy.get('.alert-title').should('contain', 'Datos de la venta');

			cy.get('#alert-input-2-0').type('Eli Galindo');

			cy.get('#alert-input-2-1').type('Novhogar76@gmail.com');

			cy.wait(400)

			cy.get('.alert-button').contains('Aceptar').click();

			cy.wait('@postVenta').its('response.body.status').should('eq', 201);
			cy.get('@postVenta').its('response.body.mensaje').should('eq', 'La venta se realizó con éxito');


			cy.get('#alert-4-msg').contains('La venta ha sido realizada con éxito').should('be.visible');

			cy.wait(500);

			cy.get('.alert-button-inner').contains('Aceptar').click();
		});

	});

	it('Realizar una venta sin datos de contacto sobre el cliente', () => {

		cy.intercept('GET', '**/servidor/inventario', (req) => {
			req.headers['cache-control'] = 'no-cache';
		}).as('getInventario');

		cy.visit('/inventario')

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo Productos...').should('be.visible');
		cy.get('.loading-wrapper').should('not.exist');
		let resultado: any;
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


		cy.then(() => {
			cy.window().then((win) => {
				win.localStorage.setItem('productos', JSON.stringify(resultado))
			})
		});

		cy.window().then((win) => {

			const productos = JSON.parse(win.localStorage.getItem('productos') || '{}');

			cy.wrap(productos).as('ventaSeleccionada');

			cy.visit('/venderproductos')

			cy.wait(400)

			cy.get('p-autoComplete[name="buscarProducto"]').type('Cama');

			cy.wait(400)

			cy.get('ul.p-autocomplete-items li.p-autocomplete-item')
				.contains('Cama Individual')
				.click()
				.then(() => {
					const productoEncontrado = productos.find(
						(producto: any) => producto.inventario_ProductoID.producto_Nombre === 'Cama Individual'
					);
					if (productoEncontrado) {
						productosSeleccionados.push(productoEncontrado);
					}
				});

			cy.wait(400)

			cy.get('p-autoComplete[name="buscarProducto"]').type('Closet');

			cy.wait(400)

			cy.get('ul.p-autocomplete-items li.p-autocomplete-item')
				.contains('Closet Armable Ropero')
				.click()
				.then(() => {
					const productoEncontrado = productos.find(
						(producto: any) => producto.inventario_ProductoID.producto_Nombre === 'Closet Armable Ropero'
					);
					if (productoEncontrado) {
						productosSeleccionados.push(productoEncontrado);
					}
				});

			cy.wait(400)

			cy.get('p-autoComplete[name="buscarProducto"]').type('Microondas');

			cy.wait(400)

			cy.get('ul.p-autocomplete-items li.p-autocomplete-item')
				.contains('Microondas')
				.click()
				.then(() => {
					const productoEncontrado = productos.find(
						(producto: any) => producto.inventario_ProductoID.producto_Nombre === 'Microondas'
					);
					if (productoEncontrado) {
						productosSeleccionados.push(productoEncontrado);
					}
				});

			cy.wait(400)

			cy.get('p-autoComplete[name="buscarProducto"]').type('Radio');

			cy.wait(400)

			cy.get('ul.p-autocomplete-items li.p-autocomplete-item')
				.contains('Radio')
				.click()
				.then(() => {
					const productoEncontrado = productos.find(
						(producto: any) => producto.inventario_ProductoID.producto_Nombre === 'Radio'
					);
					if (productoEncontrado) {
						productosSeleccionados.push(productoEncontrado);
					}
				});
		});

		cy.then(() => {
			cy.get('th').should('contain', '#');
			cy.get('th').should('contain', 'Nombre Producto');
			cy.get('th').should('contain', 'Precio');
			cy.get('th').should('contain', 'Cantidad');
			cy.get('th').should('contain', 'Subtotal');
			cy.get('th').should('contain', 'Eliminar');

			let totalVenta: number = 0;

			productosSeleccionados.forEach((producto: any, index: number) => {
				const subtotal = 1 * producto.inventario_ProductoID.producto_Precio;
				cy.get(`#venta-id-${index}`).should('contain', index + 1);
				cy.get(`#venta-nombre-${index}`).should('contain', `${producto.inventario_ProductoID.producto_Nombre}`);
				cy.get(`#venta-precio-${index}`).should('contain', `$ ${producto.inventario_ProductoID.producto_Precio}`);
				cy.get(`#venta-cantidadprod-${index} input[name="cantidadProducto"]`).should('have.value', '1');
				cy.get(`#venta-subtotal-${index}`).should('contain', `$ ${subtotal}`);
				totalVenta = totalVenta + subtotal;
			});

			cy.get('#TotalVenta').should('exist').contains('$ ' + totalVenta)

			cy.intercept('POST', '**/servidor/venta', { body: { 'status': 201, 'mensaje': 'La venta se realizó con éxito' } }).as('postVenta');

			cy.get('#botonRealizarVenta').click();

			cy.get('.alert-wrapper').should('be.visible');
			cy.get('.alert-title').should('contain', 'Datos de la venta');

			cy.get('.alert-button').contains('Sin Datos').click();

			cy.wait('@postVenta').its('response.body.status').should('eq', 201);
			cy.get('@postVenta').its('response.body.mensaje').should('eq', 'La venta se realizó con éxito');


			cy.get('#alert-4-msg').contains('La venta ha sido realizada con éxito').should('be.visible');

			cy.wait(500);

			cy.get('.alert-button-inner').contains('Aceptar').click();
		});

	});

	it('Realizar una venta sin productos seleccionados', () => {

		cy.intercept('GET', '**/servidor/inventario', (req) => {
			req.headers['cache-control'] = 'no-cache';
		}).as('getInventario');

		cy.visit('/inventario')

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo Productos...').should('be.visible');
		cy.get('.loading-wrapper').should('not.exist');
		let resultado: any;

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


		cy.then(() => {
			cy.window().then((win) => {
				win.localStorage.setItem('productos', JSON.stringify(resultado))
			})
		});

		cy.window().then((win) => {

			const productos = JSON.parse(win.localStorage.getItem('productos') || '{}');

			cy.wrap(productos).as('ventaSeleccionada');

			cy.visit('/venderproductos')

			cy.wait(400)

		});

		cy.then(() => {

			cy.get('#botonRealizarVenta').click();

			cy.get('.alert-wrapper').should('be.visible');
			cy.get('.alert-title').should('contain', 'Datos de la venta');

			cy.get('.alert-button').contains('Sin Datos').click();

			cy.get('#alert-4-msg').contains('No hay productos que vender').should('be.visible');

			cy.wait(500);

			cy.get('.alert-button-inner').contains('Aceptar').click();
		});

	});

	it('Seleccionar productos y modificar su cantidad de venta', () => {

		cy.intercept('GET', '**/servidor/inventario', (req) => {
			req.headers['cache-control'] = 'no-cache';
		}).as('getInventario');

		cy.visit('/inventario')

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo Productos...').should('be.visible');
		cy.get('.loading-wrapper').should('not.exist');
		let resultado: any;
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


		cy.then(() => {
			cy.window().then((win) => {
				win.localStorage.setItem('productos', JSON.stringify(resultado))
			})
		});

		cy.window().then((win) => {

			const productos = JSON.parse(win.localStorage.getItem('productos') || '{}');

			cy.wrap(productos).as('ventaSeleccionada');

			cy.visit('/venderproductos')

			cy.wait(400)

			cy.get('p-autoComplete[name="buscarProducto"]').type('Cama');

			cy.wait(400)

			cy.get('ul.p-autocomplete-items li.p-autocomplete-item')
				.contains('Cama Individual')
				.click()
				.then(() => {
					const productoEncontrado = productos.find(
						(producto: any) => producto.inventario_ProductoID.producto_Nombre === 'Cama Individual'
					);
					if (productoEncontrado) {
						productosSeleccionados.push(productoEncontrado);
					}
				});

			cy.wait(400)

			cy.get('p-autoComplete[name="buscarProducto"]').type('Closet');

			cy.wait(400)

			cy.get('ul.p-autocomplete-items li.p-autocomplete-item')
				.contains('Closet Armable Ropero')
				.click()
				.then(() => {
					const productoEncontrado = productos.find(
						(producto: any) => producto.inventario_ProductoID.producto_Nombre === 'Closet Armable Ropero'
					);
					if (productoEncontrado) {
						productosSeleccionados.push(productoEncontrado);
					}
				});

			cy.wait(400)

			cy.get('p-autoComplete[name="buscarProducto"]').type('Microondas');

			cy.wait(400)

			cy.get('ul.p-autocomplete-items li.p-autocomplete-item')
				.contains('Microondas')
				.click()
				.then(() => {
					const productoEncontrado = productos.find(
						(producto: any) => producto.inventario_ProductoID.producto_Nombre === 'Microondas'
					);
					if (productoEncontrado) {
						productosSeleccionados.push(productoEncontrado);
					}
				});

			cy.wait(400)

			cy.get('p-autoComplete[name="buscarProducto"]').type('Radio');

			cy.wait(400)

			cy.get('ul.p-autocomplete-items li.p-autocomplete-item')
				.contains('Radio')
				.click()
				.then(() => {
					const productoEncontrado = productos.find(
						(producto: any) => producto.inventario_ProductoID.producto_Nombre === 'Radio'
					);
					if (productoEncontrado) {
						productosSeleccionados.push(productoEncontrado);
					}
				});
		});

		cy.then(() => {
			cy.get('th').should('contain', '#');
			cy.get('th').should('contain', 'Nombre Producto');
			cy.get('th').should('contain', 'Precio');
			cy.get('th').should('contain', 'Cantidad');
			cy.get('th').should('contain', 'Subtotal');
			cy.get('th').should('contain', 'Eliminar');

			let totalVenta: number = 0;

			productosSeleccionados.forEach((producto: any, index: number) => {
				const subtotal = 1 * producto.inventario_ProductoID.producto_Precio;
				cy.get(`#venta-id-${index}`).should('contain', index + 1);
				cy.get(`#venta-nombre-${index}`).should('contain', `${producto.inventario_ProductoID.producto_Nombre}`);
				cy.get(`#venta-precio-${index}`).should('contain', `$ ${producto.inventario_ProductoID.producto_Precio}`);
				cy.get(`#venta-cantidadprod-${index} input[name="cantidadProducto"]`).should('have.value', '1');
				cy.get(`#venta-subtotal-${index}`).should('contain', `$ ${subtotal}`);
				totalVenta = totalVenta + subtotal;
			});

			cy.get('#TotalVenta').should('exist').contains('$ ' + totalVenta)

			cy.get(`#venta-cantidadprod-1 input[name="cantidadProducto"]`).first().clear().type('5');

			cy.wait(500);

			cy.get(`#venta-cantidadprod-0 input[name="cantidadProducto"]`).first().clear().type('2');

			cy.wait(500);

			cy.get(`#venta-cantidadprod-2 input[name="cantidadProducto"]`).first().clear().type('7');

			cy.wait(500);

			cy.get(`#venta-cantidadprod-3 input[name="cantidadProducto"]`).first().clear().type('10');

		});

	});

	it('Seleccionar productos y eliminar uno', () => {

		cy.intercept('GET', '**/servidor/inventario', (req) => {
			req.headers['cache-control'] = 'no-cache';
		}).as('getInventario');

		cy.visit('/inventario')

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo Productos...').should('be.visible');
		cy.get('.loading-wrapper').should('not.exist');
		let resultado: any;
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


		cy.then(() => {
			cy.window().then((win) => {
				win.localStorage.setItem('productos', JSON.stringify(resultado))
			})
		});

		cy.window().then((win) => {

			const productos = JSON.parse(win.localStorage.getItem('productos') || '{}');

			cy.wrap(productos).as('ventaSeleccionada');

			cy.visit('/venderproductos')

			cy.wait(400)

			cy.get('p-autoComplete[name="buscarProducto"]').type('Cama');

			cy.wait(400)

			cy.get('ul.p-autocomplete-items li.p-autocomplete-item')
				.contains('Cama Individual')
				.click()
				.then(() => {
					const productoEncontrado = productos.find(
						(producto: any) => producto.inventario_ProductoID.producto_Nombre === 'Cama Individual'
					);
					if (productoEncontrado) {
						productosSeleccionados.push(productoEncontrado);
					}
				});

			cy.wait(400)

			cy.get('p-autoComplete[name="buscarProducto"]').type('Microondas');

			cy.wait(400)

			cy.get('ul.p-autocomplete-items li.p-autocomplete-item')
				.contains('Microondas')
				.click()
				.then(() => {
					const productoEncontrado = productos.find(
						(producto: any) => producto.inventario_ProductoID.producto_Nombre === 'Microondas'
					);
					if (productoEncontrado) {
						productosSeleccionados.push(productoEncontrado);
					}
				});
		});

		cy.then(() => {
			cy.get('th').should('contain', '#');
			cy.get('th').should('contain', 'Nombre Producto');
			cy.get('th').should('contain', 'Precio');
			cy.get('th').should('contain', 'Cantidad');
			cy.get('th').should('contain', 'Subtotal');
			cy.get('th').should('contain', 'Eliminar');

			let totalVenta: number = 0;

			productosSeleccionados.forEach((producto: any, index: number) => {
				const subtotal = 1 * producto.inventario_ProductoID.producto_Precio;
				cy.get(`#venta-id-${index}`).should('contain', index + 1);
				cy.get(`#venta-nombre-${index}`).should('contain', `${producto.inventario_ProductoID.producto_Nombre}`);
				cy.get(`#venta-precio-${index}`).should('contain', `$ ${producto.inventario_ProductoID.producto_Precio}`);
				cy.get(`#venta-cantidadprod-${index} input[name="cantidadProducto"]`).should('have.value', '1');
				cy.get(`#venta-subtotal-${index}`).should('contain', `$ ${subtotal}`);
				totalVenta = totalVenta + subtotal;
			});

			cy.get('#TotalVenta').should('exist').contains('$ ' + totalVenta)

			cy.wait(500);

			cy.get(`#EliminarProducto-1`).click();

		});
	});
});