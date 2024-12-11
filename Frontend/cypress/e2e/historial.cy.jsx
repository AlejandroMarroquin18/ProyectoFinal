describe('interacción con el asistente y revisión del historial de chats', () => {
    it('permite al usuario crear un chat, ver el historial y seleccionar un chat específico', () => {
      cy.visit('http://localhost:5175/home'); 
  
      const mensajeUsuario = 'Hola, este es un mensaje de prueba';
      cy.get('[style="display: flex; gap: 1rem;"] > input').type(mensajeUsuario);
      cy.get('button').contains('Enviar').click(); 
      cy.wait(4000);
  
      cy.get('#historialButton').click();
  
      cy.get('ul > li').last().click(); 
  
      cy.get('div').contains(mensajeUsuario).should('be.visible'); 
    });

    it('permite al usuario crear un chat, ver el historial y eliminar el último chat', () => {
        cy.visit('http://localhost:5175/home'); 
    
        // Paso 1: Crear un chat
        const mensajeUsuario = 'Hola, este es un mensaje de prueba';
        cy.get('[style="display: flex; gap: 1rem;"] > input').type(mensajeUsuario);
        cy.get('button').contains('Enviar').click(); 
        cy.wait(4000)
    
        cy.get('#historialButton').click();
    
        cy.get('ul > li').last().within(() => {
          cy.get('button').contains('Eliminar').click();
        });
    
        // Paso 4: Verificar que el chat ha sido eliminado
        // Asegúrate de que la aplicación muestra un mensaje de confirmación o de que el chat ya no aparece en la lista
        cy.get('ul').should('not.contain', mensajeUsuario);
      });

  });  

  