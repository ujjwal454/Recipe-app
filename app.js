const input = document.querySelector(".input");
const form = document.querySelector(".form");
const searchHeading = document.querySelector(".text");
const list = document.querySelector(".list");
const resepiContainer = document.querySelector(".recepi-container")
const closeBtn = document.querySelector(".close");
const recepiHead = document.querySelector(".resp-heading");
const recepiText = document.querySelector(".recepi-text")
closeBtn.addEventListener("click",()=>{
    resepiContainer.classList.remove("recepi-active")
})
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;
  fetchRecepi(value);
});

const fetchRecepi = async function (searchValue) {
  searchHeading.textContent = `Searching.... for ${searchValue} `;
   await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
        if(data.meals===null){
        searchHeading.textContent=`there is no such result found for ${searchValue}`
    }else{
        searchHeading.textContent=`search result for ${searchValue}`
        let listInput =    data.meals.map((meal)=>{
            return`<div class="item" id = ${meal.idMeal}>
            <img src=${meal.strMealThumb} alt="meal" class="img">
            <p class="name">${meal.strMeal}</p>
            <button class="btn-s">recepi</button>
        </div>`
        
        }
        )
        list.innerHTML=listInput.join("")
        const respBtn = list.querySelectorAll(".btn-s");
        respBtn.forEach((btn)=>{
            btn.addEventListener("click",(e)=>{
                const mealId = e.currentTarget.parentElement.id
                if(data.meals.length===1){
                    data.meals.find((meal)=>{
                        if(meal.idMeal===mealId){
                            showResep(meal);
                            makeVisible()
                        }
                    })
                }else{
                    data.meals.find((meal)=>{
                        if(meal.idMeal===mealId){
                            showResep(meal);
                            makeVisible()
                        }
                    })
                }
            })
        })
        
    }
    })
    
  
};

function showResep(meal){
    recepiHead.textContent=`The recepi for ${meal.strMeal}`;
    recepiText.textContent=meal.strInstructions
}
function makeVisible(){
    resepiContainer.classList.add("recepi-active")
}