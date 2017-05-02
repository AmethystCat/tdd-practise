/**
 * test setup
 */
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {jsdom} from 'jsdom';
let exposedProperties = ['window', 'navigator', 'document'];


chai.use(chaiEnzyme());

global.document = jsdom();
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        global[property] = document.defaultView[property];
    }
});
global.navigator = global.window.navigator;
