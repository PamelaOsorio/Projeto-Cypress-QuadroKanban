/// <reference types="cypress" />

describe('Validação do Quadro Kanban', () => {
  beforeEach(() => {
  // Visitar site 
    cy.visit('https://kanban-dusky-five.vercel.app', { failOnStatusCode: false });

  })

  it('Adicionando e validando a inserção de uma nova lista',() => {
   // Dado que estou na tela do quadro Kanban
   // E clico no botão "Adicionar outra lista" 
   // E digito o nome de uma lista nova
   // Quando clico no botão !Adicionar ista"
   // Então verifico que a quadro receberá a lista nova
     cy.criarLista('To Home')
     cy.verificarListaNova('To Home')
      
  })

 
 it('Excluindo e validando a lista criada', () => {
   // Dado que estou na tela do quadro Kanban
   // E tenho criado a lista "To Home"
   // Quando clicar no elemento de exclusão
   // Então verifico que a lista deverá excluída
     cy.criarLista('To Home')
     cy.verificarListaNova('To Home')
     cy.excluirLista('To Home')
     cy.verificarListaExcluida('To Home')
   
  }) 

   it('Adicionando e validando a inserção de uma nova tarefa', () => {
   // Dado que estou na tela do quadro Kanban
   // E clico no botão "Adicionar tarefa" 
   // E digito o nome de uma tarefa nova
   // Quando clico no botão "Enviar"
   // Então verifico que a lista receberá a tarefa nova
    cy.criarTarefa('API')
    cy.verificarTarefaNova('API')

  })

   it('Editando e validando a tarefa', () => {
   // Dado que estou na tela do quadro Kanban
   // E tenho uma tarefa adicionada
   // E clico sobre a tarefa
   // E renomeio a tarefa
   // Quando clico no botão "Enviar"
   // Então verifico que a lista deverá atualizar o nome da tarefa
    cy.editarTarefa('Análise de métricas', 'Documentação e Escopo')
    cy.verificarTarefaNova('Documentação e Escopo')
  }) 

  it ('Excluindo E validando tarefa criada', () => {
   // Dado que estou na tela do quadro Kanban
   // E tenho criado a tarefa "API" criada
   // Quando clicar no elemento de exclusão
   // Então verifico que a tarefa deverá ser excluída
    cy.criarTarefa('API')
    cy.verificarTarefaNova('API')
    cy.excluirTarefa('API')
    cy.verificarTarefaExcluida('API')
  })

  it('Adicionar tag', () => {
   // Dado que estou na tela do quadro Kanban
   // E clico sobre a tarefa
   // E clico em uma cor
   // E clico em "Adicionar Nova Tag"
   // E digito um nome
   // Quando clicar em enviar
   // Então verifico que a quadro receberá a tag nova
    cy.adicionarTag('Análise de métricas', '1Color',  '#API')
    cy.verificarTag('Análise de métricas','#API')

  }) 
   
   it('Adicionar mais de uma tag com cores e textos diferentes', () => {
   // Dado que estou na tela do quadro Kanban
   // E clico sobre a tarefa 
   // Qunado digitar varias tags em cores diferentes
   // Então verifico que a quadro receberá as tags novas
    cy.adicionarTag('Análise de métricas', '1Color',  '#API')
     cy.verificarTag('Análise de métricas','#API')
    cy.adicionarTag('Análise de métricas', '2Color',  '#Dev')
     cy.verificarTag('Análise de métricas','#Dev')
    cy.adicionarTag('Análise de métricas', '0Color',  '#Alta')
     cy.verificarTag('Análise de métricas','#Alta')

  }) 

   it( 'Validação para não permitir adicionar mais de uma tag com o mesmo texto', () => {
   // Dado que estou na tela do quadro Kanban
   // E clico sobre a tarefa 
   // Qunado digitar a mesma tag em cores diferentes
   // Então verifico que a quadro deverá receber apenas uma tag, não permitindo tags com o mesmo textp
    cy.adicionarTag('Análise de métricas', '1Color',  '#API')
     cy.verificarTag('Análise de métricas','#API')
     cy.adicionarTag('Análise de métricas', '2Color',  '#API')
     cy.adicionarTag('Análise de métricas', '0Color',  '#API')
     cy.naoPermitirTagComMesmoTexto('Análise de métricas','#API')
     
  }) 

   

  
})
