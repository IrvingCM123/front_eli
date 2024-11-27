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

	it('Muestra la información de la compra al ser seleccionada', () => {

		let fechaString = compraInformacion.orden_compra_fecha_ordenado;

		let fechaConvertida = fechaString.replace(/(\d{1,2}:\d{2}) (a\.m\.|p\.m\.)/, (match, time, ampm) => {
			let [hora, minutos] = time.split(':');
			if (ampm === 'p.m.' && hora !== '12') {
				hora = (parseInt(hora) + 12).toString();
			} else if (ampm === 'a.m.' && hora === '12') {
				hora = '00';
			}
			return `${hora}:${minutos}`;
		});

		let fechaCompleta = new Date(fechaConvertida);
		let soloFecha = fechaCompleta.toISOString().split('T')[0];
		compraInformacion.orden_compra_fecha_ordenado = soloFecha;

		fechaString = compraInformacion.orden_compra_fecha_entregado;

		fechaConvertida = fechaString.replace(/(\d{1,2}:\d{2}) (a\.m\.|p\.m\.)/, (match, time, ampm) => {
			let [hora, minutos] = time.split(':');
			if (ampm === 'p.m.' && hora !== '12') {
				hora = (parseInt(hora) + 12).toString();
			} else if (ampm === 'a.m.' && hora === '12') {
				hora = '00';
			}
			return `${hora}:${minutos}`;
		});

		fechaCompleta = new Date(fechaConvertida);
		soloFecha = fechaCompleta.toISOString().split('T')[0];
		compraInformacion.orden_compra_fecha_entregado = soloFecha;
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

		cy.get('#FechaCompraGenerada').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.orden_compra_fecha_ordenado);

		cy.get('#FechaCompraEntregada').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.orden_compra_fecha_entregado);

		cy.get('#NombrePersonal').should('exist')
			.should('be.visible')
			.and('contain', 'Nombre: ' + compraInformacion.detalle_orden_compra_ID.detalleOC_Cuenta_ID.cuenta_Nombre + ' ' + compraInformacion.detalle_orden_compra_ID.detalleOC_Cuenta_ID.cuenta_Apellido);

		cy.get('#EmailPersonal').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.detalle_orden_compra_ID.detalleOC_Cuenta_ID.cuenta_Correo);

		cy.get('#PuestoPersonal').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.detalle_orden_compra_ID.detalleOC_Cuenta_ID.cuenta_Rol);

		cy.get('#EstadoPersonal').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.detalle_orden_compra_ID.detalleOC_Cuenta_ID.cuenta_Estado_Cuenta);

		cy.get('#NombreProveedor').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.detalle_orden_compra_ID.detalleOC_Proveedor_ID.proveedor_Nombre);

		cy.get('#EmailProveedor').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.detalle_orden_compra_ID.detalleOC_Proveedor_ID.proveedor_Email);

		cy.get('th').should('contain', 'Folio de Compra');
		cy.get('th').should('contain', 'Estado');
		cy.get('th').should('contain', 'Cantidad Prod.');

		cy.get('#EstadoCompra').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.orden_compra_estado);

		cy.get('#IdentificadorCompra').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.orden_compra_ID);

		cy.get('#CantidadCompra').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.detalle_orden_compra_ID.detalleOC_Cantidad_Producto);

		cy.get('th').should('contain', '#');
		cy.get('th').should('contain', 'Nombre');
		cy.get('th').should('contain', 'Cantidad');

		compraInformacion.detalle_orden_compra_ID.detalleOC_ProductoOC_ID.forEach((producto: any, index: number) => {
			cy.get(`#venta-id-${index}`).should('contain', index + 1);
			cy.get(`#venta-nombreprod-${index}`).should('contain', `${producto.productoOC_Nombre_Producto}`);
			cy.get(`#venta-cantidadprod-${index}`).should('contain', producto.productoOC_Cantidad_Producto);
		});
		cy.wait(1000);
	});

	it('Modifica el estado de la compra', () => {

		let fechaString = compraInformacion.orden_compra_fecha_ordenado;

		let fechaConvertida = fechaString.replace(/(\d{1,2}:\d{2}) (a\.m\.|p\.m\.)/, (match, time, ampm) => {
			let [hora, minutos] = time.split(':');
			if (ampm === 'p.m.' && hora !== '12') {
				hora = (parseInt(hora) + 12).toString();
			} else if (ampm === 'a.m.' && hora === '12') {
				hora = '00';
			}
			return `${hora}:${minutos}`;
		});

		let fechaCompleta = new Date(fechaConvertida);
		let soloFecha = fechaCompleta.toISOString().split('T')[0];
		compraInformacion.orden_compra_fecha_ordenado = soloFecha;

		fechaString = compraInformacion.orden_compra_fecha_entregado;

		fechaConvertida = fechaString.replace(/(\d{1,2}:\d{2}) (a\.m\.|p\.m\.)/, (match, time, ampm) => {
			let [hora, minutos] = time.split(':');
			if (ampm === 'p.m.' && hora !== '12') {
				hora = (parseInt(hora) + 12).toString();
			} else if (ampm === 'a.m.' && hora === '12') {
				hora = '00';
			}
			return `${hora}:${minutos}`;
		});

		fechaCompleta = new Date(fechaConvertida);
		soloFecha = fechaCompleta.toISOString().split('T')[0];
		compraInformacion.orden_compra_fecha_entregado = soloFecha;

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

		cy.window().then((win) => {
			win.localStorage.setItem('compraSeleccionada', JSON.stringify(resultado[0]));
		});

		cy.then(() => {
			cy.get('#compra-id-0').click()
		});

		cy.url().should('include', '/visualizarCompra');

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

		cy.get('#FechaCompraGenerada').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.orden_compra_fecha_ordenado);

		cy.get('#FechaCompraEntregada').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.orden_compra_fecha_entregado);

		cy.get('#NombrePersonal').should('exist')
			.should('be.visible')
			.and('contain', 'Nombre: ' + compraInformacion.detalle_orden_compra_ID.detalleOC_Cuenta_ID.cuenta_Nombre + ' ' + compraInformacion.detalle_orden_compra_ID.detalleOC_Cuenta_ID.cuenta_Apellido);

		cy.get('#EmailPersonal').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.detalle_orden_compra_ID.detalleOC_Cuenta_ID.cuenta_Correo);

		cy.get('#PuestoPersonal').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.detalle_orden_compra_ID.detalleOC_Cuenta_ID.cuenta_Rol);

		cy.get('#EstadoPersonal').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.detalle_orden_compra_ID.detalleOC_Cuenta_ID.cuenta_Estado_Cuenta);

		cy.get('#NombreProveedor').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.detalle_orden_compra_ID.detalleOC_Proveedor_ID.proveedor_Nombre);

		cy.get('#EmailProveedor').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.detalle_orden_compra_ID.detalleOC_Proveedor_ID.proveedor_Email);

		cy.get('th').should('contain', 'Folio de Compra');
		cy.get('th').should('contain', 'Estado');
		cy.get('th').should('contain', 'Cantidad Prod.');

		cy.get('#EstadoCompra').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.orden_compra_estado);

		cy.get('#IdentificadorCompra').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.orden_compra_ID);

		cy.get('#CantidadCompra').should('exist')
			.should('be.visible')
			.and('contain', compraInformacion.detalle_orden_compra_ID.detalleOC_Cantidad_Producto);

		cy.get('th').should('contain', '#');
		cy.get('th').should('contain', 'Nombre');
		cy.get('th').should('contain', 'Cantidad');

		compraInformacion.detalle_orden_compra_ID.detalleOC_ProductoOC_ID.forEach((producto: any, index: number) => {
			cy.get(`#venta-id-${index}`).should('contain', index + 1);
			cy.get(`#venta-nombreprod-${index}`).should('contain', `${producto.productoOC_Nombre_Producto}`);
			cy.get(`#venta-cantidadprod-${index}`).should('contain', producto.productoOC_Cantidad_Producto);
		});

		cy.wait(1000);

		cy.intercept('PUT', '**/servidor/orden-compra/20', { body: { status: 201, mensaje: "Exito" } }).as('putActualizar');

		cy.window().then((win) => {
			const compra = JSON.parse(win.localStorage.getItem('compraSeleccionada') || '{}');

			cy.wrap(compra).as('compraSeleccionada');
			
			if (compraInformacion.orden_compra_estado != compra.orden_compra_estado) {
				cy.get('select[name="orden_compra_estado"]')
					.scrollIntoView()
					.select('PAGADO', { force: true });
			} else {
				cy.get('select')
					.select('REEMBOLSADO', { force: true });
			}

			cy.get('#alert-4-msg').contains('Se ha actualizado el estado de la compra correctamente');

			cy.wait(1000);

			cy.get('.alert-button-inner').contains('Aceptar').click();

			cy.wait(1000);
		});
	});
});