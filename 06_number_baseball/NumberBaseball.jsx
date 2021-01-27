import React, { Component } from 'react';

function getNumbers() { //숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수

}

class NumberBaseball extends Component {
  state = {
    result: 'baseball',
    value: '',
    answer: getNumbers(),
    tries: []
  }

  onSubmitForm = () => {

  }

  onChangeInput = () => {

  }


  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input type="text" maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          <li>
            {['like','like','like','like','like'].map(() => {
              return (
                //5번 실행됨
                <li>like</li>
              )
            })}
          </li>
        </ul>
      </>
    );
  }
}
export default NumberBaseball;
