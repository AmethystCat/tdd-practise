import React from 'react';
import Input from './input';
import List from './list';
import Filter from './filter';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
      		<Input />
      		<List />
      		<Filter />
      </div>
    );
  }
}
