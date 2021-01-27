const React = require('react'); //script대신 require
//구조분해 문법사용
const {useState, useRef} = React;

const GuGuDan = () => {
    //state를 hooks로 하나씩 분리
    //구조분해(distructuring) or 비구조화할당이라 부름
    //1. state선언
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9))
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9))
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    //ref방법
    const inputRef = useRef(null);

    const onChange= (e) => {
      //value를 새로운 값으로 바꿔주고 싶을 때 
      //hooks에서 사용한 setValue사용
      setValue(e.target.value);
    }

    const onSubmit = (e) =>{
      e.preventDefault();
      if (parseInt(value) === first * second) {
        //비동기므로 한번에 처리 4번 처리되지 않음
        //state를 한번에 처리한 경우도 마찬가지
        setResult('정답'+ value)
        setFirst(Math.ceil(Math.random() * 9))
        setSecond(Math.ceil(Math.random() * 9))
        setValue('')
        inputRef.current.focus();  
      } else {
        console.log(event.target.value)
        setResult('땡')
        setValue('')
        inputRef.current.focus(); 
      }
    }

    //state가 바뀔때마다 함수가 통째로 다시 실행됨
    //더 느릴 수 있다 
    //앞에서는 render함수만 재실행 됐었음
    console.log('렌더링')
    //react에서는 attribute로 class 사용불가 
    //class => className
    //for => htmlFor
    return (
        <>
        <div>{first} 곱하기 {second}는?</div>
        <form onSubmit={onSubmit}>
          <input
            ref={inputRef}
            type="number"
            value={value}
            onChange={onChange}
          />
          <button id="button">입력</button>
        </form>
        <div id="result">{result}</div>
        </>
    );

  }
//파일을 쪼개면 해줘야 하는 일
//다른 곳에서 쓸 수 있도록
module.exports = GuGuDan