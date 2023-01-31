let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}

const sumSal = (salaries) => {
  let temp = 0
  for(let key in salaries){
    temp += salaries[key]
  }

  if(salaries) return temp
  else return null
}

console.log(sumSal(salaries))