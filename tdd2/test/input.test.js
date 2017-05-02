import React from 'react';
import {shallow, render, mount} from 'enzyme';
import {expect} from 'chai';

import Input from '../src/input';

describe('app 输入部分测试:', function() {
	let wrapper_shallow = null,
		wrapper_mount = null;

	beforeEach(function() {
		wrapper_shallow = shallow(<Input />);
		wrapper_mount = mount(<Input />);
	});

	afterEach(function() {
		wrapper_shallow = null;
		wrapper_mount = null;
	});

	it('输入部分应该有子节点(子节点数大于0)', function() {
		expect(wrapper_shallow.children()).to.have.length.above(0);
	});

	it('有一个输入框', function() {
		expect(wrapper_shallow.children('input')).to.have.length.above(0);
	});

	it('输入框是文本输入框', function() {
		expect(wrapper_shallow.children('input')).to.have.attr('type', 'text');
	});

	it('输入框中有输入todo的placeholder的提示', function() {
		expect(wrapper_shallow.children('input')).to.have.attr('placeholder').equal('请输入待办事项');
	});

	it('输入框可以输入任何值', function() {
		let input = wrapper_mount.find('input');
		expect(input).to.have.prop('onChange');

		input.simulate('change', {target: {value: 111}});
		expect(input).to.have.value('111');
	});

	it('有一个按钮', function() {
		expect(wrapper_shallow.children('button')).to.have.length.above(0);
	});

	it('按钮为确认按钮', function() {
		expect(wrapper_shallow.children('button')).to.have.attr('type').equal('button');
		expect(wrapper_shallow.children('button')).to.have.text('确定');
	});

	it('按钮有点击事件', function() {
		// given
		let btn_add_todo = wrapper_shallow.find('button');
		// when
		
		// then
		expect(btn_add_todo).to.have.prop('onClick');
	});

	it('按钮点击后input会清空', function() {
		// given
		let btn_add_todo = wrapper_mount.find('button');
		let input = wrapper_mount.find('input');
		// when
		wrapper_mount.simulate('change', {target: {val: 122223}});
		btn_add_todo.simulate('click');
		// then
		expect(input).to.have.value('');
	});
});