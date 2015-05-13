import NavbarModule from './navbar';
import NavbarController from './navbar.controller';
import NavbarComponent from './navbar.component';
import NavbarTemplate from './navbar.template.html';

import _ from 'lodash';

describe('Navbar', ()=>{

  describe('Module', ()=>{

    var invokeQueue, resgistedComponent;

    before(()=>{
      invokeQueue = NavbarModule._invokeQueue[0];
      // filter returns an array with an object in it
      resgistedComponent = _.filter(invokeQueue, {'0': 'acNavbar'})[0];
    });

    it('should have the right module name', ()=>{
      expect(NavbarModule.name).to.equal('app.components.navbar');
    });

    it('should register the navbar component', ()=>{
      expect(_.indexOf(invokeQueue, 'directive')).to.be.above(-1);
      expect(resgistedComponent[0]).to.equal('acNavbar');
      expect(resgistedComponent[1]).to.equal(NavbarComponent);
    });
  });

  describe('Component', ()=>{
    var component;

    before(()=>{
      component = NavbarComponent();
    });

    it('should have the correct template', ()=>{
      expect(component.template).to.equal(NavbarTemplate);
    });

    it('should use best practices', ()=>{
      expect(component).to.have.property('controllerAs');
      expect(component.controllerAs).to.be.a('string');
      expect(component).have.property('scope');
      expect(component.scope).to.be.an('object');
    });

    it('should have the title in the template', ()=>{
      expect(NavbarTemplate).to.match(/[\s\S]\.title/);
    });
  });

  describe('Controller', ()=>{
    it('should have a title property', ()=>{
      expect(new NavbarController().title).to.be.a('string');
    });
  });
});
