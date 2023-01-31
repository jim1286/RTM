/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

function render({count, prev,sign}) {
  console.log(count,prev,sign)

  function onClickNumber(num){
    const prevTotal = count;
    if(typeof prev === 'number') render({count : prevTotal * 10 + num, prev: prevTotal*10 + num})
    else if(typeof prev === 'string'){
      sign === '+' ? render({count: prevTotal, prev : prevTotal+num}) :
      sign === '-' ? render({count: prevTotal, prev : prevTotal-num}) :
      sign === '*' ? render({count: prevTotal, prev : prevTotal*num}) :
      render({count: prevTotal, prev : prevTotal/num})
    }
  }

  function onClickSign(sign){
    sign === '=' && typeof prev === 'number' ? 
    render({count: prev}) : 
    render({count: count, prev : sign, sign:sign})
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{count}</p>
      <div>
      {[1,2,3,4,5,6,7,8,9,0].map((i)=>(
        <button type="button" onClick={()=>onClickNumber(i)}>
          {i}
        </button>
      ))}
      </div>
      <div>
        {['+','-','*','/','='].map((i)=>(
          <button type="button" onClick={()=>onClickSign(i)}>
            {i}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({count : 0, prev: 0, sign: ''});
