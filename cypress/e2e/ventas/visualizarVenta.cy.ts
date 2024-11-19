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

	it('Muestra al seleccionar una venta', () => {

		const fechaString = ventaInformacion.venta_FechaRegistro;

		const fechaConvertida = fechaString.replace(/(\d{1,2}:\d{2}) (a\.m\.|p\.m\.)/, (match, time, ampm) => {
			let [hora, minutos] = time.split(':');
			if (ampm === 'p.m.' && hora !== '12') {
				hora = (parseInt(hora) + 12).toString();
			} else if (ampm === 'a.m.' && hora === '12') {
				hora = '00';
			}
			return `${hora}:${minutos}`;
		});

		const fechaCompleta = new Date(fechaConvertida);
		const soloFecha = fechaCompleta.toISOString().split('T')[0];
		ventaInformacion.venta_FechaRegistro = soloFecha;

		cy.intercept('GET', '**/servidor/venta/obtenerVentas').as('getVentas');
		cy.visit('/mostrarVentas');

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo ventas...').should('be.visible');
		let resultado: any;
		cy.wait('@getVentas').then((interception: any) => {
			resultado = interception.response.body;
			expect(resultado).to.exist;
		});

		cy.then(() => {
			cy.get('#venta-id-0').click()
		});

		cy.url().should('include', '/visualizarventa');

		cy.get('#NombreNegocio').should('exist')
			.should('be.visible')
			.and('contain', 'Novedades y Hogar');

		cy.get('#DireccionNegocio').should('exist')
			.should('be.visible')
			.and('contain', 'Fraccionamiento Reserva Territorial calle 10');

		cy.get('#LocalidadNegocio').should('exist')
			.should('be.visible')
			.and('contain', 'Huatusco, Veracruz');

		cy.get('#EmailNegocio').should('exist')
			.should('be.visible')
			.and('contain', 'Email: Novhogar76@gmail.com');

		cy.get('#TelefonoNegocio').should('exist')
			.should('be.visible')
			.and('contain', 'Telefono: 273-688-4086');

		cy.get('#FechaVenta').should('exist')
			.should('be.visible')
			.and('contain', ventaInformacion.venta_FechaRegistro);

		cy.get('#NombrePersonal').should('exist')
			.should('be.visible')
			.and('contain', 'Nombre: ' + ventaInformacion.venta_DetalleVenta_ID.cuenta_ID[0].cuenta_Nombre + ' ' + ventaInformacion.venta_DetalleVenta_ID.cuenta_ID[0].cuenta_Apellido);

		cy.get('#EmailPersonal').should('exist')
			.should('be.visible')
			.and('contain', ventaInformacion.venta_DetalleVenta_ID.cuenta_ID[0].cuenta_Correo);

		cy.get('#PuestoPersonal').should('exist')
			.should('be.visible')
			.and('contain', ventaInformacion.venta_DetalleVenta_ID.cuenta_ID[0].cuenta_Rol);

		cy.get('#EstadoPersonal').should('exist')
			.should('be.visible')
			.and('contain', ventaInformacion.venta_DetalleVenta_ID.cuenta_ID[0].cuenta_Estado_Cuenta);

		if (ventaInformacion.venta_DetalleVenta_ID.detalleVentaNombreCliente != null) {
			cy.get('#NombreCliente').should('exist')
				.should('be.visible')
				.and('contain', ventaInformacion.venta_DetalleVenta_ID.detalleVentaNombreCliente);
		} else {
			cy.get('#NombreCliente').should('exist')
				.should('be.visible')
				.and('contain', 'No se ha registrado el nombre del cliente');
		}

		if (ventaInformacion.venta_DetalleVenta_ID.detalleVentaCorreoCliente != null) {
			cy.get('#EmailCliente').should('exist')
				.should('be.visible')
				.and('contain', ventaInformacion.venta_DetalleVenta_ID.detalleVentaCorreoCliente);
		} else {
			cy.get('#EmailCliente').should('exist')
				.should('be.visible')
				.and('contain', 'No se ha registrado el email del cliente');
		}

		cy.get('th').should('contain', 'Folio de Venta');
		cy.get('th').should('contain', 'Estado');
		cy.get('th').should('contain', 'Total');
		cy.get('th').should('contain', 'Términos de pago');

		cy.get('#EstadoVenta').should('exist')
			.should('be.visible')
			.and('contain', ventaInformacion.venta_EstadoVenta);

		cy.get('#TotalVenta').should('exist')
			.should('be.visible')
			.and('contain', ventaInformacion.totalMontoVenta);

		cy.get('th').should('contain', '#');
		cy.get('th').should('contain', 'Nombre');
		cy.get('th').should('contain', 'Precio');
		cy.get('th').should('contain', 'Cantidad');
		cy.get('th').should('contain', 'Subtotal');

		ventaInformacion.venta_DetalleVenta_ID.detalleVenta_ProductoVenta_ID.forEach((producto: any, index: number) => {
			cy.get(`#venta-id-${index}`).should('contain', index + 1);
			cy.get(`#venta-nombreprod-${index}`).should('contain', `${producto.productoVenta_NombreProducto}`);
			cy.get(`#venta-precioprod-${index}`).should('contain', `$${producto.productoVenta_PrecioProducto}`);
			cy.get(`#venta-cantidadprod-${index}`).should('contain', producto.productoVenta_CantidadProducto);
			cy.get(`#venta-subtotalprod-${index}`).should('contain', `$${producto.productoVenta_SubtotalVenta}`);
		});

	});

	it('Modifica una venta en su estado de venta', () => {

		const fechaString = ventaInformacion.venta_FechaRegistro;

		const fechaConvertida = fechaString.replace(/(\d{1,2}:\d{2}) (a\.m\.|p\.m\.)/, (match, time, ampm) => {
			let [hora, minutos] = time.split(':');
			if (ampm === 'p.m.' && hora !== '12') {
				hora = (parseInt(hora) + 12).toString();
			} else if (ampm === 'a.m.' && hora === '12') {
				hora = '00';
			}
			return `${hora}:${minutos}`;
		});

		const fechaCompleta = new Date(fechaConvertida);
		const soloFecha = fechaCompleta.toISOString().split('T')[0];
		ventaInformacion.venta_FechaRegistro = soloFecha;

		cy.intercept('GET', '**/servidor/venta/obtenerVentas').as('getVentas');
		cy.visit('/mostrarVentas');

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo ventas...').should('be.visible');
		let resultado: any;
		cy.wait('@getVentas').then((interception: any) => {
			resultado = interception.response.body;
			expect(resultado).to.exist;
		});

		cy.window().then((win) => {
			win.localStorage.setItem('ventaSeleccionada', JSON.stringify(resultado[0]));
		});

		cy.then(() => {
			cy.get('#venta-id-0').click()
		});

		cy.url().should('include', '/visualizarventa');

		cy.get('#NombreNegocio').should('exist')
			.should('be.visible')
			.and('contain', 'Novedades y Hogar');

		cy.get('#DireccionNegocio').should('exist')
			.should('be.visible')
			.and('contain', 'Fraccionamiento Reserva Territorial calle 10');

		cy.get('#LocalidadNegocio').should('exist')
			.should('be.visible')
			.and('contain', 'Huatusco, Veracruz');

		cy.get('#EmailNegocio').should('exist')
			.should('be.visible')
			.and('contain', 'Email: Novhogar76@gmail.com');

		cy.get('#TelefonoNegocio').should('exist')
			.should('be.visible')
			.and('contain', 'Telefono: 273-688-4086');

		cy.get('#FechaVenta').should('exist')
			.should('be.visible')
			.and('contain', ventaInformacion.venta_FechaRegistro);

		cy.get('#NombrePersonal').should('exist')
			.should('be.visible')
			.and('contain', 'Nombre: ' + ventaInformacion.venta_DetalleVenta_ID.cuenta_ID[0].cuenta_Nombre + ' ' + ventaInformacion.venta_DetalleVenta_ID.cuenta_ID[0].cuenta_Apellido);

		cy.get('#EmailPersonal').should('exist')
			.should('be.visible')
			.and('contain', ventaInformacion.venta_DetalleVenta_ID.cuenta_ID[0].cuenta_Correo);

		cy.get('#PuestoPersonal').should('exist')
			.should('be.visible')
			.and('contain', ventaInformacion.venta_DetalleVenta_ID.cuenta_ID[0].cuenta_Rol);

		cy.get('#EstadoPersonal').should('exist')
			.should('be.visible')
			.and('contain', ventaInformacion.venta_DetalleVenta_ID.cuenta_ID[0].cuenta_Estado_Cuenta);

		if (ventaInformacion.venta_DetalleVenta_ID.detalleVentaNombreCliente != null) {
			cy.get('#NombreCliente').should('exist')
				.should('be.visible')
				.and('contain', ventaInformacion.venta_DetalleVenta_ID.detalleVentaNombreCliente);
		} else {
			cy.get('#NombreCliente').should('exist')
				.should('be.visible')
				.and('contain', 'No se ha registrado el nombre del cliente');
		}

		if (ventaInformacion.venta_DetalleVenta_ID.detalleVentaCorreoCliente != null) {
			cy.get('#EmailCliente').should('exist')
				.should('be.visible')
				.and('contain', ventaInformacion.venta_DetalleVenta_ID.detalleVentaCorreoCliente);
		} else {
			cy.get('#EmailCliente').should('exist')
				.should('be.visible')
				.and('contain', 'No se ha registrado el email del cliente');
		}

		cy.get('th').should('contain', 'Folio de Venta');
		cy.get('th').should('contain', 'Estado');
		cy.get('th').should('contain', 'Total');
		cy.get('th').should('contain', 'Términos de pago');

		cy.get('#EstadoVenta').should('exist')
			.should('be.visible')
			.and('contain', ventaInformacion.venta_EstadoVenta);

		cy.get('#TotalVenta').should('exist')
			.should('be.visible')
			.and('contain', ventaInformacion.totalMontoVenta);

		cy.get('th').should('contain', '#');
		cy.get('th').should('contain', 'Nombre');
		cy.get('th').should('contain', 'Precio');
		cy.get('th').should('contain', 'Cantidad');
		cy.get('th').should('contain', 'Subtotal');

		ventaInformacion.venta_DetalleVenta_ID.detalleVenta_ProductoVenta_ID.forEach((producto: any, index: number) => {
			cy.get(`#venta-id-${index}`).should('contain', index + 1);
			cy.get(`#venta-nombreprod-${index}`).should('contain', `${producto.productoVenta_NombreProducto}`);
			cy.get(`#venta-precioprod-${index}`).should('contain', `$${producto.productoVenta_PrecioProducto}`);
			cy.get(`#venta-cantidadprod-${index}`).should('contain', producto.productoVenta_CantidadProducto);
			cy.get(`#venta-subtotalprod-${index}`).should('contain', `$${producto.productoVenta_SubtotalVenta}`);
		});

		cy.intercept('PUT', '**/servidor/venta/5', { body: { status: 201, mensaje: "Exito" } }).as('putActualizar');

		cy.window().then((win) => {
			const venta = JSON.parse(win.localStorage.getItem('ventaSeleccionada') || '{}');

			cy.wrap(venta).as('ventaSeleccionada');

			if (ventaInformacion.venta_EstadoVenta != venta.venta_EstadoVenta) {
				cy.get('select[name="EstadoVenta"]')
					.scrollIntoView()
					.select('PAGADO', { force: true });
			} else {
				cy.get('select')
					.select('REEMBOLSADO', { force: true });
			}

			cy.get('#alert-4-msg').contains('Se ha actualizado el estado de la venta correctamente');

			cy.get('.alert-button-inner').contains('Aceptar').click();
		});

	});

});