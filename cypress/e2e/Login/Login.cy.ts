describe('Pruebas de Iniciar Sesion', () => {

	it('Mostrar titulo de iniciar sesion', () => {
		cy.visit('/iniciarSesion');
		cy.url().should('includes', 'iniciarSesion');
		cy.get('#iniciarSesionTitulo').should('be.visible');
		cy.get('#iniciarSesionTitulo').should('have.text', 'Inicio de Sesión');
	});

	it('El usuario llenará los input de "Correo Usuario" y "Contraseña" solicitados por el sistema con las credenciales correctas', () => {
		cy.visit('/iniciarSesion');
		cy.url().should('includes', 'iniciarSesion');
		cy.get('#iniciarSesionTitulo').should('be.visible');
		cy.get('#iniciarSesionTitulo').should('have.text', 'Inicio de Sesión');
		cy.get('#formCorreoUsuario').type('EliGalindo@Gmail.com');
		cy.get('#formContrasenaUsuario').type('ElizabethGalindo123');
		cy.get('#btnIniciarSesion').click();
		cy.get('#alert-3-msg').contains('Inicio de sesión exitoso');
	});

	it('Llenado de campo Correo	', () => {
		cy.visit('/iniciarSesion');
		cy.url().should('includes', 'iniciarSesion');
		cy.get('#iniciarSesionTitulo').should('be.visible');
		cy.get('#iniciarSesionTitulo').should('have.text', 'Inicio de Sesión');
		cy.get('#formCorreoUsuario').type('EliGalindo@Gmail.com');
		cy.get('#btnIniciarSesion').click();
		cy.get('#alert-3-msg').contains('Ha ocurrido un error al iniciar sesión');
	});

	it('Llenado de campo Contraseña', () => {
		cy.visit('/iniciarSesion');
		cy.url().should('includes', 'iniciarSesion');
		cy.get('#iniciarSesionTitulo').should('be.visible');
		cy.get('#iniciarSesionTitulo').should('have.text', 'Inicio de Sesión');
		cy.get('#formContrasenaUsuario').type('EliGalindo123');
		cy.get('#btnIniciarSesion').click();
		cy.get('#alert-3-msg').contains('Ha ocurrido un error al iniciar sesión');
	});

	it('El usuario llenará los input de "Correo Usuario" y "Contraseña" solicitados por el sistema con el correo incorrecto', () => {
		cy.visit('/iniciarSesion');
		cy.url().should('includes', 'iniciarSesion');
		cy.get('#iniciarSesionTitulo').should('be.visible');
		cy.get('#iniciarSesionTitulo').should('have.text', 'Inicio de Sesión');
		cy.get('#formCorreoUsuario').type('EliGalindo1@Gmail.com');
		cy.get('#formContrasenaUsuario').type('EliGalindo123');
		cy.get('#btnIniciarSesion').click();
		cy.get('#alert-3-msg').contains('La cuenta no existe');
	});

	it('El usuario llenará los input de "Correo Usuario" y "Contraseña" solicitados por el sistema con la contraseña incorrecta', () => {
		cy.visit('/iniciarSesion');
		cy.url().should('includes', 'iniciarSesion');
		cy.get('#iniciarSesionTitulo').should('be.visible');
		cy.get('#iniciarSesionTitulo').should('have.text', 'Inicio de Sesión');
		cy.get('#formCorreoUsuario').type('EliGalindo@Gmail.com');
		cy.get('#formContrasenaUsuario').type('EliGalindo12');
		cy.get('#btnIniciarSesion').click();
		cy.get('#alert-3-msg').contains('La contraseña no es valida');
	});

	it('El usuario realizar click en el botón de Registrar, permitiendo crear una cuenta', () => {
		cy.visit('/iniciarSesion');
		cy.url().should('includes', 'iniciarSesion');
		cy.get('#iniciarSesionTitulo').should('be.visible');
		cy.get('#iniciarSesionTitulo').should('have.text', 'Inicio de Sesión');
		cy.get('#crearCuenta').click();
	});

});