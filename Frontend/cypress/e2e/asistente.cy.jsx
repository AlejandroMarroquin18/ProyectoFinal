describe('Asistente Chatbot', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5175/home'); // Asegúrate de que la URL sea correcta para tu entorno local
    });
  
    // Comprobar escritura del mensaje
    it('permite al usuario enviar un mensaje de texto', () => {
      const mensajeUsuario = "Hola, ¿qué tal?";
  
      cy.get('[style="display: flex; gap: 1rem;"] > input').type(mensajeUsuario);
      cy.get('button').contains('Enviar').click();
      cy.get('div[style*="text-align: right"]').should('contain', mensajeUsuario);
    });
  
    // Respuesta del chatbot
    it('recibe una respuesta del bot después de enviar un mensaje', () => {
      const mensajeUsuario = "Hola, ¿qué tal?";
  
      cy.get('[style="display: flex; gap: 1rem;"] > input').type(mensajeUsuario);
      cy.get('button').contains('Enviar').click();
      cy.wait(1000); 
  
      cy.get('div[style*="text-align: left"]').should('not.be.empty');
    });
  
    // Transcripción de audios
    it('permite al usuario enviar un mensaje de audio', () => {
      cy.get('#micButton').click();
      cy.wait(5000); 
      cy.get('#micButton').click();
      cy.wait(1000);  
      cy.get('[style="display: flex; gap: 1rem;"] > input').should('have.value', '');
      //cy.get('[style="display: flex; gap: 1rem;"] > :nth-child(3)').exist
    });
  });
  