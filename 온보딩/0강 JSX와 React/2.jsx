let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

function topSalary(salaries){
  let top = 0
  let name
  for( let [key, value] of Object.entries(salaries)){
    if( top < value) {
      top = value
      name = key
    }
  }
  if(salaries) return name
  else return null
}

let answer = topSalary(salaries)

console.log(answer)