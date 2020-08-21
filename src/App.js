import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    isAddRecipeFormDisplayed: false,
    recipes: [],
    newRecipeName: "",
    newRecipeInstructions: ""
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;

    this.setState({[name]: target.value});
  }

  toggleAddRecipeForm = () => {
    this.setState({isAddRecipeFormDisplayed: !this.state.isAddRecipeFormDisplayed})
  }

  submitRecipe = (event) => {
    event.preventDefault()
    let newRecipe = { name: this.state.newRecipeName, instructions :this.state.newRecipeInstructions }
    let newList = this.state.recipes.concat(newRecipe)
    this.setState({recipes: newList})
  }

  render() {
    const addNewRecipeForm = (
      <form id="recipe-form" onSubmit={this.submitRecipe}> 
        <label htmlFor="newRecipeName">Recipe name: </label>
        <input type="text" name="newRecipeName" onChange={this.handleChange} value={this.state.newRecipeName} />
        <label htmlFor="newRecipeInstructions">Instructions:</label>
        <textarea name="newRecipeInstructions" 
                placeholder="write recipe instructions here..." 
                onChange={this.handleChange} 
                value={this.state.newRecipeInstructions} />
        <input type="submit" />
      </form>
    )

    return (
      <div className="App">
        <h1 className="App-header">My Recipes</h1>
        {
           this.state.isAddRecipeFormDisplayed 
            ? addNewRecipeForm 
          : <button id="add-recipe" onClick={this.toggleAddRecipeForm}>Add Recipe</button>
    }
    {
      this.state.recipes.length > 0 ?
      <ul>
        {this.state.recipes.map(recipe => 
          <li>{recipe.name}</li> )}
      </ul> :
      <p>There are no recipes to list.</p>
    }
  </div>
    )
  }
}

export default App;
