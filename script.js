let recipeName = document.querySelector('#title');
let recipeIngredient = document.querySelector('#ingredient')
let recipeCategory = document.querySelector('#category')
let recipeInstructions = document.querySelector('#instructions')
let recipesContainer = document.querySelector('#recipesContainer')
let search = document.querySelector('#search');



let recipeList = [];

let storedRecipes = localStorage.getItem('recipeList');
if(storedRecipes){
    recipeList = JSON.parse(storedRecipes)
}
displayRecipes();

function addRecipes() {

   let recipeTitle = recipeName.value;
   let addIngredient = recipeIngredient.value.split(',');
   let addCategory = recipeCategory.value;
   let addInstructions = recipeInstructions.value;
    recipeList.push({Name: recipeTitle, Ingredient: addIngredient, Category: addCategory, Instructions: addInstructions,});
    localStorage.setItem('recipeList', JSON.stringify(recipeList));
    recipeName.value = '';
    recipeIngredient.value  = '';
    recipeCategory.value  = '';
    recipeInstructions.value  = '';


    displayRecipes();
};


function displayRecipes() {
    let storedRecipes = localStorage.getItem('recipeList');
    if (storedRecipes) {
        recipeList = JSON.parse(storedRecipes);
    }
    const mapRecipes = recipeList.map(item => {
          return `
            <div class="recipe-card"> 
             <h4>${item.Name}</h4>
             <spain><strong>Ingredients:</strong> ${item.Ingredient.join(', ')}</spain>
             <spain><strong>Category:</strong> ${item.Category}</spain>
             <spain><strong>Instructions:</strong> ${item.Instructions}</spain>
              <button class="delete" onClick="deleteRecipe('${item.Name}')">Delete</button>
           </div>
           `
    }).join('');

    recipesContainer.innerHTML = mapRecipes;
};



function deleteRecipe(recipeName) {

    console.log(`Deleting recipe: ${recipeName}`);
    
    recipeList = recipeList.filter(item => item.Name !== recipeName);
    
     localStorage.setItem('recipeList', JSON.stringify(recipeList));

    displayRecipes();
}


function searchFun() {
let searchRecipes = search.value.toLowerCase();
let filterRecipes = recipeList.filter(recipe => 
    recipe.Name.toLowerCase().includes(searchRecipes) ||
    recipe.Category.toLowerCase().includes(searchRecipes)
);
  
recipesContainer.innerHTML = filterRecipes.length === 0 ? `<div class="recipe-card ">No recipe found.</div>` :
filterRecipes.map( ({Name, Ingredient, Category, Instructions}) => `
       <div class="recipe-card"> 
             <h3>${Name}</h3>
             <span><strong>Ingredients:</strong> ${Ingredient.join(', ')}</span>
             <span><strong>Category:</strong> ${Category}</span>
             <span><strong>Instructions:</strong> ${Instructions}</span>
              <button class="delete" onClick="deleteRecipe('${Name}')">Delete</button>
           </div>
           `
).join('');
}















