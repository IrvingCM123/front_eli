import 'cypress-file-upload';

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

		cy.visit('/agregar-producto');

	});

	it('Llenar todos los campos para registrar un producto', () => {
		const datosProducto = {
			producto_Nombre: 'Cama Spring Box',
			producto_Categoria: 'Muebleria',
			producto_ProveedorID: 'Muebles Dico',
			producto_Precio: 400,
			producto_stock: 10,
			producto_ImagenURL: 'Inventario_Front/cypress/downloads/Cama_natural_tejida-1.jpg',
		};

		cy.get('input[name="nombre"]').type(datosProducto.producto_Nombre);
		cy.get('select[name="categoria"]').select(datosProducto.producto_Categoria);
		cy.get('select[name="proveedor"]').select(datosProducto.producto_ProveedorID);
		cy.get('input[name="precio"]').first().clear().type(datosProducto.producto_Precio.toString());
		cy.get('input[name="cantidad"]').first().clear().type(datosProducto.producto_stock.toString());

		const imagenPath = 'Cama_natural_tejida-1.jpg';
		cy.get('input[name="imagen"]').attachFile(imagenPath);

		cy.get('.card-img-holder img')
			.should('have.attr', 'src')

		cy.get('#NombreProductoMostrar').contains(datosProducto.producto_Nombre).should('be.visible');
		cy.get('#ProveedorProductoMostrar').contains(datosProducto.producto_ProveedorID).should('be.visible');
		cy.get('#DescripcionProductoMostrar').contains(datosProducto.producto_Categoria).should('be.visible');
		cy.get('#DescripcionProductoMostrar').contains('$' + datosProducto.producto_Precio).should('be.visible');

		cy.intercept('POST', '**/servidor/productos', { body: { status: 201, mensaje: 'Producto agregado con éxito' } }).as('postInventario');

		cy.get('button').contains('Success').click();

		cy.wait('@postInventario');

		cy.get('#alert-3-msg').contains('El producto ha sido agregado correctamente').should('be.visible');
		cy.get('.alert-button-inner').contains('Aceptar').click();

	});

	it('Dejar vacío un campo en el registro del producto', () => {
		const datosProducto = {
			producto_Nombre: ' ',
			producto_Categoria: 'Muebleria',
			producto_ProveedorID: 'Muebles Dico',
			producto_Precio: 400,
			producto_stock: 10,
			producto_ImagenURL: 'Inventario_Front/cypress/downloads/Cama_natural_tejida-1.jpg',
		};

		cy.get('input[name="nombre"]').type(datosProducto.producto_Nombre);
		cy.get('select[name="categoria"]').select(datosProducto.producto_Categoria);
		cy.get('select[name="proveedor"]').select(datosProducto.producto_ProveedorID);
		cy.get('input[name="precio"]').first().clear().type(datosProducto.producto_Precio.toString());
		cy.get('input[name="cantidad"]').first().clear().type(datosProducto.producto_stock.toString());

		const imagenPath = 'Cama_natural_tejida-1.jpg';
		cy.get('input[name="imagen"]').attachFile(imagenPath);

		cy.get('.card-img-holder img')
			.should('have.attr', 'src')

		if (datosProducto.producto_Nombre != ' ') {
			cy.get('#NombreProductoMostrar')
				.contains(datosProducto.producto_Nombre)
				.should('be.visible');
		} else {
			cy.log('El nombre del producto está vacío, no se verifica la visibilidad.');
		}
		cy.get('#ProveedorProductoMostrar').contains(datosProducto.producto_ProveedorID).should('be.visible');
		cy.get('#DescripcionProductoMostrar').contains(datosProducto.producto_Categoria).should('be.visible');
		cy.get('#DescripcionProductoMostrar').contains('$' + datosProducto.producto_Precio).should('be.visible');

		cy.get('button').contains('Success').click();

		cy.get('#alert-3-msg').contains('El campo producto_Nombre no puede estar vacío').should('be.visible');
		cy.get('.alert-button-inner').contains('Aceptar').click();

	});


});