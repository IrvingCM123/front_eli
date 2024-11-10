describe('Componente Visualizar Producto', () => {

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

	const productosMock =
	{
		inventario_ID: 21,
		inventario_Status: "SOBRE_STOCK",
		inventario_Cantidad: 121,
		inventario_ProductoID: {
			producto_ID: 23,
			producto_Nombre: "Cama Individual",
			producto_Categoria: "Muebleria",
			producto_Precio: "400",
			producto_Status: "ACTIVO",
			producto_ImagenURL: "https://firebasestorage.googleapis.com/v0/b/novedades-68953.appspot.com/o/images%2FCama.jpeg?alt=media&token=3ad273b5-1169-44f1-a0c3-320efa41c8ee",
			producto_ProveedorID: {
				proveedor_ID: 11,
				proveedor_Nombre: "Muebles Dico"
			}
		}
	}

	it('Muestra al seleccionar un producto', () => {

		cy.intercept('GET', '**/servidor/inventario').as('getInventario');
		cy.visit('/inventario');

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo Productos...').should('be.visible');
		cy.get('.loading-wrapper').should('not.exist');

		cy.wait('@getInventario', { timeout: 10000 });

		cy.get('.loading-wrapper').should('not.exist');

		cy.contains('Cama Individual').click();

		cy.visit('/visualizarproducto');
		cy.url().should('include', '/visualizarproducto');

		cy.get('#nombreProducto').should('exist')
			.should('be.visible')
			.and('contain', productosMock.inventario_ProductoID.producto_Nombre);

		cy.get('#descripcionProducto').contains('pertenece a la categoría ' + productosMock.inventario_ProductoID.producto_Categoria).should('be.visible');

		cy.get('#descripcionProducto').contains('un precio de $' + productosMock.inventario_ProductoID.producto_Precio).should('be.visible');

		cy.get('#cantidadInventario').should('exist')
			.should('be.visible')
			.and('contain', productosMock.inventario_Cantidad, { force: true });

		if (productosMock.inventario_ProductoID.producto_Status != 'INACTIVO') {
			cy.get('#statusActivo').should('exist')
				.should('be.visible')
				.and('contain', productosMock.inventario_Status, { force: true });
		} else {
			cy.get('#statusInactivo').should('exist')
				.should('be.visible')
				.and('contain', 'Producto Inactivo', { force: true });
		}
	});

	it('Actualiza la información de un producto', () => {

		cy.intercept('GET', '**/servidor/inventario').as('getInventario');
		cy.visit('/inventario');

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo Productos...').should('be.visible');
		cy.get('.loading-wrapper').should('not.exist');

		cy.wait('@getInventario', { timeout: 10000 });

		cy.get('.loading-wrapper').should('not.exist');

		cy.contains('Cama Individual').click();

		cy.visit('/visualizarproducto');
		cy.url().should('include', '/visualizarproducto');

		let nuevoProducto: any = { ...productosMock, producto_Nombre: 'Cama Matrimonial' };

		cy.wait(2000);

		cy.get('input').first().clear().type('Cama Matrimonial')

		cy.intercept('PUT', '**/servidor/productos/23', { body: {status: 201, mensaje: 'Producto actualizado con éxito'}}).as('putProveedor');

		cy.get('#botonActualizar').click();

		cy.wait('@putProveedor');

		cy.contains('Cama Matrimonial').should('be.visible');

		cy.get('#alert-3-msg').contains('Producto actualizado con éxito');

		cy.get('.alert-button-inner').contains('Aceptar').click();
	});

	it('Desactiva la información de un producto', () => {

		cy.intercept('GET', '**/servidor/inventario').as('getInventario');
		cy.visit('/inventario');

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo Productos...').should('be.visible');
		cy.get('.loading-wrapper').should('not.exist');

		cy.wait('@getInventario', { timeout: 10000 });

		cy.get('.loading-wrapper').should('not.exist');

		cy.contains('Cama Individual').click();

		cy.visit('/visualizarproducto');
		cy.url().should('include', '/visualizarproducto');

		cy.wait(2000);

		cy.get('#botonEliminar').click();

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Eliminando producto...').should('be.visible');
		cy.get('.loading-wrapper').should('not.exist');

		cy.get('.loading-wrapper').should('not.exist');

		cy.get('#alert-3-msg').contains('Producto eliminado con éxito');

		cy.get('.alert-button-inner').contains('Aceptar').click();
	});

	it('Activa la información de un producto', () => {

		cy.intercept('GET', '**/servidor/inventario').as('getInventario');
		cy.visit('/inventario');

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Obteniendo Productos...').should('be.visible');
		cy.get('.loading-wrapper').should('not.exist');

		cy.wait('@getInventario', { timeout: 10000 });

		cy.get('.loading-wrapper').should('not.exist');

		cy.contains('Cama Individual').click();

		cy.visit('/visualizarproducto');
		cy.url().should('include', '/visualizarproducto');

		cy.wait(2000);

		cy.get('#botonActivar').click();

		cy.get('.loading-wrapper').should('be.visible');
		cy.contains('.loading-content', 'Activando producto...').should('be.visible');
		cy.get('.loading-wrapper').should('not.exist');

		cy.get('.loading-wrapper').should('not.exist');

		cy.get('#alert-3-msg').contains('Producto activado con éxito');

		cy.get('.alert-button-inner').contains('Aceptar').click();
	});

});