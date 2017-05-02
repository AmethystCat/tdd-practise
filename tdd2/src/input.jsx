import React from "react";

class Input extends React.Component {

	state = {
		val: ''
	};

	addTodo = () => {
		this.setState({val: ''});
	}

	changeHandler = (e) => {
		this.setState({val: e.target.value});
	}

	render() {
		return (
			<div>
				<input type="text" placeholder="请输入待办事项" onChange={this.changeHandler} value={this.state.val} />
				<button type="button" onClick={this.addTodo}>确定</button>
			</div>
		);
	}
}
export default Input;