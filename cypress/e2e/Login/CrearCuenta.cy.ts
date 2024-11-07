describe('Pruebas de Crear Cuenta', () => {

	it('Mostrar titulo de crear Cuenta', () => {
		cy.visit('/crearCuenta');
		cy.url().should('includes', 'crearCuenta');
		cy.get('#crearCuentaTitulo').should('be.visible');
		cy.get('#crearCuentaTitulo').should('have.text', 'Crear Cuenta');
	});

	it('El usuario llenará los input solicitados por el sistema', () => {
		cy.visit('/crearCuenta');
		cy.url().should('include', 'crearCuenta');
		cy.get('#crearCuentaTitulo').should('be.visible');
		cy.get('#crearCuentaTitulo').should('have.text', 'Crear Cuenta');
		cy.get('#formNombreUsuario').type('Eli');
		cy.get('#formApellidoUsuario').type('Galindo');
		cy.get('#formCorreoUsuario').type('EliGalindo@Gmail.com');
		cy.get('#formContrasenaUsuario').type('EliGalindo123');
		cy.get('#formRolCuenta').select('ADMIN');
		cy.get('#btnIniciarSesion').click();
		cy.get('.alert-input').type('05082002');
		cy.get('.alert-button-inner').contains('Aceptar').click();
		cy.intercept('POST', '/servidor/auth/register', {statusCode: 201, body: { status: 201, message: 'La cuenta ha sido creada con éxito' }	}).as('crearCuenta');
		cy.visit('/iniciarSesion');
	});

	it('El sistema le solicitará al usuario ingresar el código de validación para crear la cuenta, pero ingresará el código correcto', () => {
		cy.visit('/crearCuenta');
		cy.url().should('include', 'crearCuenta');
		cy.get('#crearCuentaTitulo').should('be.visible');
		cy.get('#crearCuentaTitulo').should('have.text', 'Crear Cuenta');
		cy.get('#formNombreUsuario').type('Eli');
		cy.get('#formApellidoUsuario').type('Galindo');
		cy.get('#formCorreoUsuario').type('EliGalindo@Gmail.com');
		cy.get('#formContrasenaUsuario').type('EliGalindo123');
		cy.get('#formRolCuenta').select('ADMIN');
		cy.get('#btnIniciarSesion').click();
		cy.get('.alert-input').type('05082002');
		cy.get('.alert-button-inner').contains('Aceptar').click();
		cy.intercept('POST', '/servidor/auth/register', {statusCode: 201, body: { status: 201, message: 'La cuenta ha sido creada con éxito' }	}).as('crearCuenta');
	});

	it('El usuario solo llenará el input de "Nombre Usuario" solicitado por el sistema', () => {
		cy.visit('/crearCuenta');
		cy.url().should('include', 'crearCuenta');
		cy.get('#crearCuentaTitulo').should('be.visible');
		cy.get('#crearCuentaTitulo').should('have.text', 'Crear Cuenta');
		cy.get('#formNombreUsuario').type('Eli');
		cy.get('#btnIniciarSesion').click();
		cy.get('.alert-input').type('05082002');
		cy.get('.alert-button-inner').contains('Aceptar').click();
		cy.get('#alert-4-msg').contains('El identificador debe ser un correo electrónico válidoCorreo_electronico should not be emptyContraseña must be longer than or equal to 8 characters');
	});

	it('El usuario solo llenará el input de "Apellido Usuario" solicitado por el sistema', () => {
		cy.visit('/crearCuenta');
		cy.url().should('include', 'crearCuenta');
		cy.get('#crearCuentaTitulo').should('be.visible');
		cy.get('#crearCuentaTitulo').should('have.text', 'Crear Cuenta');
		cy.get('#formApellidoUsuario').type('Galindo');
		cy.get('#btnIniciarSesion').click();
		cy.get('.alert-input').type('05082002');
		cy.get('.alert-button-inner').contains('Aceptar').click();
		cy.get('#alert-4-msg').contains('El identificador debe ser un correo electrónico válidoCorreo_electronico should not be emptyContraseña must be longer than or equal to 8 characters');
	});

	it('El usuario solo llenará el input de "Correo Usuario" solicitado por el sistema', () => {
		cy.visit('/crearCuenta');
		cy.url().should('include', 'crearCuenta');
		cy.get('#crearCuentaTitulo').should('be.visible');
		cy.get('#crearCuentaTitulo').should('have.text', 'Crear Cuenta');
		cy.get('#formCorreoUsuario').type('EliGalindo@Gmail.com');
		cy.get('#btnIniciarSesion').click();
		cy.get('.alert-input').type('05082002');
		cy.get('.alert-button-inner').contains('Aceptar').click();
		cy.get('#alert-4-msg').contains('Contraseña must be longer than or equal to 8 characters');
	});

	it('El usuario solo llenará el input de "Contraseña Usuario" solicitado por el sistema', () => {
		cy.visit('/crearCuenta');
		cy.url().should('include', 'crearCuenta');
		cy.get('#crearCuentaTitulo').should('be.visible');
		cy.get('#crearCuentaTitulo').should('have.text', 'Crear Cuenta');
		cy.get('#formContrasenaUsuario').type('EliGalindo123');
		cy.get('#btnIniciarSesion').click();
		cy.get('.alert-input').type('05082002');
		cy.get('.alert-button-inner').contains('Aceptar').click();
		cy.get('#alert-4-msg').contains('El identificador debe ser un correo electrónico válidoCorreo_electronico should not be empty');
	});

	it('El usuario solo llenará el input de "Rol Usuario" solicitado por el sistema', () => {
		cy.visit('/crearCuenta');
		cy.url().should('include', 'crearCuenta');
		cy.get('#crearCuentaTitulo').should('be.visible');
		cy.get('#crearCuentaTitulo').should('have.text', 'Crear Cuenta');
		cy.get('#formRolCuenta').select('ADMIN');
		cy.get('#btnIniciarSesion').click();
		cy.get('.alert-input').type('05082002');
		cy.get('.alert-button-inner').contains('Aceptar').click();
		cy.get('#alert-4-msg').contains('El identificador debe ser un correo electrónico válidoCorreo_electronico should not be emptyContraseña must be longer than or equal to 8 characters');
	});

	it('El usuario llenará los datos solicitados por el sistema, pero con una cuenta existente en el sistema ', () => {
		cy.visit('/crearCuenta');
		cy.url().should('include', 'crearCuenta');
		cy.get('#crearCuentaTitulo').should('be.visible');
		cy.get('#crearCuentaTitulo').should('have.text', 'Crear Cuenta');
		cy.get('#formNombreUsuario').type('Eli');
		cy.get('#formApellidoUsuario').type('Galindo');
		cy.get('#formCorreoUsuario').type('EliGalindo2@Gmail.com');
		cy.get('#formContrasenaUsuario').type('EliGalindo123');
		cy.get('#formRolCuenta').select('ADMIN');
		cy.get('#btnIniciarSesion').click();
		cy.get('.alert-input').type('05082002');
		cy.get('.alert-button-inner').contains('Aceptar').click();
		cy.intercept('POST', '/servidor/auth/register', {statusCode: 201, body: { status: 201, message: 'La cuenta ha sido creada con éxito' }	}).as('crearCuenta');
	});

	it('El sistema le solicitará al usuario ingresar el código de validación para crear la cuenta, pero ingresará el código incorrecto', () => {
		cy.visit('/crearCuenta');
		cy.url().should('include', 'crearCuenta');
		cy.get('#crearCuentaTitulo').should('be.visible');
		cy.get('#crearCuentaTitulo').should('have.text', 'Crear Cuenta');
		cy.get('#formNombreUsuario').type('Eli');
		cy.get('#formApellidoUsuario').type('Galindo');
		cy.get('#formCorreoUsuario').type('EliGalindo@Gmail.com');
		cy.get('#formContrasenaUsuario').type('EliGalindo123');
		cy.get('#formRolCuenta').select('ADMIN');
		cy.get('#btnIniciarSesion').click();
		cy.get('.alert-input').type('05082004');
		cy.get('.alert-button-inner').contains('Aceptar').click();
		cy.get('.alert-message').contains('Código de validación incorrecto');
	});

	it('El usuario realizar click en el botón de Login permitiendo Iniciar Sesión', () => {
		cy.visit('/crearCuenta');
		cy.url().should('include', 'crearCuenta');
		cy.get('#crearCuentaTitulo').should('be.visible');
		cy.get('#crearCuentaTitulo').should('have.text', 'Crear Cuenta');
		cy.get('#iniciarSesion').click();
	});

});