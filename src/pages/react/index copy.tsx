import React from 'react';

function ChildrenDemo(props) {
  console.log(props.children);
  console.log(React.Children.map(props.children, (c) => [c, [c, [c]]]));
  console.log(props.children.length);
  return props.children;
}

export default () => (
  <ChildrenDemo>
    <span>1</span>
    <span>2</span>
    <span>3</span>
    <span>4</span>
    <span>5</span>
    <span>6</span>
    <span>7</span>
    <span>8</span>
    <span>9</span>
    <span>10</span>
    <span>11</span>
    <span>12</span>
    <span>13</span>
  </ChildrenDemo>
);
