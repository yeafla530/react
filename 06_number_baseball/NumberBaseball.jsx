import React, { Component } from 'react';
import Try from './Try'

function getNumbers() { //숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen)
  }
  return array
}

class NumberBaseball extends Component {
  state = {
    result: 'baseball',
    value: '',
    answer: getNumbers(), //[1,3,5,7]
    tries: [] //react push쓰면 안돼요
  }
  
  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join('')) { //답 전부 맞았으면
      this.setState({
        result: '홈런!',
        //react는 현재 state랑 예전 state가 다를때 rendering해줌
        //push하면 예전 상태값이 현재상태값과 같아져 상태변화를 인지못함 
        //기존 배열 복사하고 나머지값 넣어주기 
        // tries: [...this.state.tries, {try: this.state.value, result: '홈런!'}]
      })
      alert('정답입니다! 게임을 다시 시작합니다');
      this.setState({
        result: 'baseball',
        value: '',
        answer: getNumbers(),
        tries: []
      })
    } else { //답 틀렸으면
      console.log()
      const answerArray = this.state.value.split('').map((v) => parseInt(v))
      let strike = 0;
      let ball = 0;
      //10번이상 틀렸을 때
      if (this.state.tries.length > 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다`

        });
        alert('게임을 다시 시작합니다!')

        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        })
      } else { //10번 이하일때
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1
          }
        }
        console.log('setState뭐냐',this.setState)
        this.setState({
          tries: [...this.state.tries, {try: this.state.value, result: `${strike} 스크라이크, ${ball} 볼`}],
          value: '',
        })
        console.log('바뀐값',this.state.tries)
      }
    }
  }
  
  onChangeInput = (e) => {
    e.preventDefault();
    console.log(this.state.answer)
    this.setState({
      value: e.target.value,
    });
    console.log('value',this.state.value)
    //화살표함수 안쓰는 경우
    // this를 못씀, 화살표함수로 써야 this사용가능
    // onSubmitForm(e) {
    //   e.preventDefault();
    //   console.log(this.state.value)
    // }
    // onChangeInput(e) {
    //   e.preventDefault();
    //   this.setState({
    //     value: e.target.value
    //   })    
    // }
    

  }
  // fruits = [
  //   {fruit:'사과', taste:'맛있다'},
  //   {fruit:'바나나',taste:'길쭉하다'},
  //   {fruit:'포도',taste:'시다'},
  //   {fruit:'귤',taste:'달다'},
  //   {fruit:'사과', taste:'맛없다'},
  // ]

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input type="text" maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>  
            {this.state.tries.map((v, i) => {
              return(
                <Try key={`${i+1}차 시도 : `} tryInfo={v} index={i} />
              )
            })}
            {/*주석 : 소괄호 해야됨 밑에는 예시*/}
            {/* {this.fruits.map((v, i) => {
              똑같이 반복되는부분을 return안에 담아줌
              return (
                v랑 i를 Try에 전달 : props
                key도 부모에서 지정해주기
                <Try key={v.fruit + v.taste} value={v} index={i}/>
                5번 실행됨
                key안에 i를 넣으면 성능 최적화할때 힘듦 => i쓰지 않도록하기
                react는 key값 정하는게 가장 귀찮 
                차라리 밑에처럼이라도 하기
                100줄짜리라 생각하면 다른 파일로 만들 수 있음
                <li key={v.fruit + v.taste}>
                  <b>{v.fruit}-{v.taste}</b>
                  <div>컨텐츠1</div>
                  <div>컨텐츠2</div>
                  <div>컨텐츠3</div>
                  <div>컨텐츠4</div>
                </li>
              )
            })} */}
        </ul>
      </>
    );
  }
}
export default NumberBaseball;
