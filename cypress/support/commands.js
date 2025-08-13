// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



Cypress.Commands.add('criarLista',(Lista) => {
   let initialCount; // 1. Declarar variável

    cy.get('.drop-list > :nth-child(n)') //2. Acessar elementos da lista
       .its('length') // 3. Verificar o tamanho da lista
       .then(count => { 
         initialCount = count; // 4. Definir a contagem de elementos

        cy.get('.sc-jqUVSM').click(); // 5. Clicar no botão para adicionar a lista
        cy.get('.sc-gsnTZi').type(Lista) // 6. Receber paramêtro - Nome da nova lista criada
        cy.get('.btn').click(); // 7. Salvar lista

        cy.get('.drop-list > :nth-child(n)') // 8. Acessar elementos da lista
          .its('length') // 9.  Verificar o tamanho da lista após nova inserção
          .should('equal', initialCount + 1); // 10. Comparar tamanho do lista com quantidade inicial
    });
 
});

Cypress.Commands.add('excluirLista', (Lista) => {
    cy.contains('h1.board-header-title', `${Lista}`) // 1. Acessar os títulos dos elementos da lista que contém o valor informado.
      .parent() // 2. sobe para o contêiner
      .find('.trash') //3. encontra o símbolo da lixeira dentro
      .click();   // 4. Exclui a lista   
 
});

Cypress.Commands.add('verificarListaExcluida', (Lista) => {
    cy.contains('h1.board-header-title', `${Lista}`) // 1. Acessar os títulos dos elementos da lista que contém o valor informado.
      .should('not.exist');// 2. Verificar que a lista não existe mais.
 
});


Cypress.Commands.add('verificarListaNova', (Lista) =>{
    cy.get(':nth-child(n)  > .header > .board-header-title')// 1. Acessar todos os títulos dos elmentos da lista 
      .filter(`:contains("${Lista}")`) // 2. Filtrar pelo nome da lista nova
      .should('have.text', `${Lista}`)// 3. Validar se tem o nome da lista nova    
 
});


Cypress.Commands.add('criarTarefa', (Tarefa) => {
   let initialCount; // 1. Declarar variável

    cy.get('.board-cards.custom-scroll .sc-gKXOVf') // 2. Acessar todas as tarefas
       .its('length') // 3. Verificar a quantidade das tarefas
        .then(count => { 
         initialCount = count; // 4. Definir a contagem de elementos

        cy.get('[id="🚀  DoneCreateTask"] > .custom-input > p').click(); // 5. Acessar botão para criar nova tarefa
        cy.get('.sc-gsnTZi').type(Tarefa) // 6. Digitar o nome da nova tarefa
        cy.get('.btn').click(); // 7. Criar tarefa

        cy.get('.board-cards.custom-scroll .sc-gKXOVf')
         .its('length') // 9.  Verificar o tamanho da lista após nova inserção
         .should('equal', initialCount + 1); // 10. Comparar tamanho do lista com quantidade inicial
    });
 
});

Cypress.Commands.add('verificarTarefaNova', (Tarefa) => {
    cy.get(':nth-child(n)> .board-cards > :nth-child(n) > .content > header > p') // 1. Acessar todas os títulos das tarefas
      .filter(`:contains("${Tarefa}")`)  // 2. Filtrar pelo nome da tarefa nova
      .should('have.text', `${Tarefa}`) //  3. Validar se tem o nome da tarefa nova
   });
 Cypress.Commands.add('editarTarefa', (tarefaAntiga, novaTarefa) => {
    const id = `${tarefaAntiga}ModalTitle`; // 1. Concatenar  nome anterior da tarefa com "ModalTitle"

    cy.contains('p', tarefaAntiga).click(); // 2. Clicar na tarefa
    cy.get(`header[id="${id}"]`) // 3. Verificar o nome anterior da tarefa
      .find('.custom-input > p') // 4. Selecionar o parágrafo que simula o input
      .click(); //5. Clicar para abrir a modal
    cy.get('.sc-gsnTZi').type(novaTarefa); //5. Renomear a tarefa
    cy.get('.btn').click(); // 6. Salvar edição

    cy.get('body').click(100, 200); // 7. Fechar Modal
});    

Cypress.Commands.add('excluirTarefa', (Tarefa) => {
    cy.contains('p', `${Tarefa}`) // 1. Localizar a tarefa
      .parents('.content') // 2. Verificar o content
      .find('.trash') // 3. encontra o símbolo da lixeira dentro
      .click({ force: true }); // 4. Força o clique /Pois o objeto está oculto

});

Cypress.Commands.add('verificarTarefaExcluida',(Tarefa) => {
    cy.contains('p', `${Tarefa}`) // 1. Acessar o nome da tarefa
      .should('not.exist'); // 2. Verificar que a tarefa não existe mais.
 
});

Cypress.Commands.add('adicionarTag', (Tarefa, corId, Tag) => {
    cy.contains('p', Tarefa).click();// 1. Clicar sobre a tag
    cy.get(`#${corId}`).click();  // 2. Selecionar cor
    cy.get('section > .custom-input > p').click(); // 3. Clicar sobre o texto
    cy.get('.sc-gsnTZi').type(Tag);// 4. Digitar Tag
    cy.get('.btn').click(); // 5. Salvar Tag
    cy.get('body').click(100, 200); // 6. Fechar Modal
});

Cypress.Commands.add('verificarTag', (Tarefa, Tag) => {
    cy.contains('p', Tarefa) // 1. Localiza a tarefa
     .parents('.content') // 2. Verificar o content
     .find('footer label') // 3. pega o(s) <label> que representa(m) as tags
     .should('contain.text', Tag); // 4. Validar se tem o nome da lista nova   


});
Cypress.Commands.add('naoPermitirTagComMesmoTexto', (Tarefa, Tag) => {
   cy.contains('p', Tarefa) // 1. Localiza a tarefa
     .parents('.content')// 2. Verificar o content
     .find('footer label') // 3. pega o(s) <label> que representa(m) as tags
     .filter(`:contains("${Tag}")`) // 4. Filtrar pelo nome da lista nova
     .should('have.length', 1)// 5. Validar se o valor da tag está duplicado
})



