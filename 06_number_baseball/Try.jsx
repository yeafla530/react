import React, { Component } from 'react';

// 재사용성을 위해 분리
class Try extends Component {
  render() {
    return (
      <li>
        <div>{this.props.tryInfo.try}</div>
        <div>{this.props.tryInfo.result}</div>
      </li>
      //props를 보고 부모가 있는걸 파악하기
      // <li>
      //   <b>{this.props.value.fruit}-{this.props.value.taste}</b> - {this.props.index}
      //   <div>컨텐츠1</div>
      //   <div>컨텐츠2</div>
      //   <div>컨텐츠3</div>
      //   <div>컨텐츠4</div>
      // </li>
    )
  }
}
export default Try;