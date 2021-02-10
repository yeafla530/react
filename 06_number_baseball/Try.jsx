import React, { Component } from 'react';

// 재사용성을 위해 분리

const Try = ({tryInfo}) => {
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    )
}
// const Try = (props) => {
//   return (
//     <li>
//       <div>{props.tryInfo.try}</div>
//       <div>{props.tryInfo.result}</div>
//     </li>
//   )
// }

export default Try;