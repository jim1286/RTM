// 함수 호출 전
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};
console.log(menu)

const multiplyNumeric = (menu) => {
  for(key in menu){
    if(typeof menu[key] === 'number'){
      menu[key] *=2
    }
  }
};

multiplyNumeric(menu)

console.log(menu)