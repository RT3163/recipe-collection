describe("Home page", () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it("header contains recipe heading with a message that there are no recipes", () => {
      cy.get('.App-header').should('contain', 'My Recipes')
      cy.get('p').should('contain', 'There are no recipes to list.')
    })

    it("contrains an add recipe button that wehn clicked opens a form", () => {
      const addRecipeButton = cy.get('#add-recipe')
      addRecipeButton.click()

      expect(cy.get('#recipe-form')).toExist()
    })

    it("contains a form with fields 'Recipe Name' and 'Recipe Instructions' after clicking the 'Add Recipe' button", () => {
      const addRecipeButton = cy.get('#add-recipe')
      addRecipeButton.click()
    
      expect(cy.get('input[name="newRecipeName"]')).toExist()
      expect(cy.get('textarea[name="newRecipeInstructions"]')).toExist()
    })

    it("displays a recipe name under the 'My Recipes' heading after it has been added through the 'Add Recipe' form", () => {
      const addRecipeButton = cy.get('#add-recipe')
      addRecipeButton.click().then(() => {  
        cy.get('input[name="newRecipeName"]').type("Tofu Scramble Tacos")
        cy.get('textarea[name="newRecipeInstructions"]').type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")
        cy.get('input[type="submit"]').click()
        cy.get('ul').then(() => { 
          cy.get('ul').contains("Tofu Scramble Tacos")
        }) 
      }) 
    })

    it("displays multiple recipes names under the 'My Recipes' heading", () => {
      const addRecipeButton = cy.get('#add-recipe')
      addRecipeButton.click().then(() => {
        cy.get('input[name="newRecipeName"]').type("Cereal")
        cy.get('textarea[name="newRecipeInstructions"]').type("1. Pour Milk Duh!")
        cy.get('input[type="submit"]').click()

        cy.get('input[name="newRecipeName"]').clear()
        cy.get('textarea[name="newRecipeInstructions"]').clear()


        cy.get('input[name="newRecipeName"]').type("Pancakes")
        cy.get('textarea[name="newRecipeInstructions"]').type("1. Make Batter 2. Burn Pancake")
        cy.get('input[type="submit"]').click()
        
        cy.get('ul').then(() => { 
          cy.get('ul').contains("Cereal")
        }) 

        cy.get('ul').then(() => { 
          cy.get('ul').contains("Pancakes")
        }) 
      })
    })
  })