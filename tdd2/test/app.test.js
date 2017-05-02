import React from 'react';
import {shallow, render, mount} from 'enzyme';
import {expect} from 'chai';
import App from '../src/app';
import Input from '../src/input';
import List from '../src/list';
import Filter from '../src/filter';

describe('app jsx test', function() {

    it('root div的class名应该包含container', function() {
        let wrapper = shallow(<App/>);
        let rootDiv_className = 'container';
        expect(wrapper).to.have.className(rootDiv_className);
    });

    it('app 应该包含一个输入部分', function() {
        let wrapper = shallow(<App/>);
        expect(wrapper).to.contain(<Input />);
    });

    it('app 应该包含一个todo列表', function() {
        let wrapper = shallow(<App/>);
        expect(wrapper).to.contain(<List />);
    });

    it('app 应该包含一个筛选的部分', function() {
        let wrapper = shallow(<App/>);
        expect(wrapper).to.contain(<Filter />);
    });

});