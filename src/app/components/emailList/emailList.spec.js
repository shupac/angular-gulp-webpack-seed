import EmailListModule from './emailList';
import EmailListController from './emailList.controller';
import EmailListComponent from './emailList.component';
import EmailListTemplate from './emailList.template.html';
import EmailListFactory from './emailList.factory';
import colors from 'colors/safe';
import _ from 'lodash';

describe('EmailList', ()=>{
  var Emails,
  createController,
  $state,
  $rootScope,
  invokeQueue,
  resgistedComponent;
  // this function does what angular does to directive names
  // takes a name myElement and makes a element tag
  // <my-element></my-element>
  let componentNameToTag = (name='') =>{
    name = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    name = `<${name}></${name}>`;
    return name;
  };
    // mock out and register the angular module
    beforeEach(window.module(EmailListModule.name));
    // The goal here is to use the injector to
    // grab out Emails factory to create our controller
    // that needs it. We have to ask angular for it
    // then create our controller with it.
    // angular lets us use the _ModName_ (underscore)
    // to inject things so we can reserve that name in our
    // test like I did below. We could instead just inject the
    // module with the underscores too.
    beforeEach(inject((_Emails_, _$state_, _$rootScope_)=>{
      Emails = _Emails_;
      $state = _$state_;
      $rootScope = _$rootScope_;

      createController = ()=>{
        return new EmailListController(Emails);
      };
    }));

  describe('Module', ()=>{

    before(()=>{
      invokeQueue = EmailListModule._invokeQueue[0];
      // filter returns an array with an object in it
      resgistedComponent = _.filter(invokeQueue, {'0': 'acEmailList'})[0];
    });

    it('should have the right module name', ()=>{
      expect(EmailListModule.name).to.equal('app.components.emailList');
    });

    it('should register the emailList component', ()=>{
      expect(_.indexOf(invokeQueue, 'directive')).to.be.above(-1);
      expect(resgistedComponent[0]).to.equal('acEmailList');
      expect(resgistedComponent[1]).to.equal(EmailListComponent);
    });

    it('should have the right routing', ()=>{
      $state.go('emailList');
      $rootScope.$apply();

      expect($state.current.name).to.equal('emailList');

      let componentTag = componentNameToTag(resgistedComponent[0]);
      expect($state.current.template).to.equal(componentTag);

      expect($state.current.url).to.match(/email/);
    });
  });

  describe('Component', ()=>{
    var component;

    before(()=>{
      component = EmailListComponent();
    });

    it('should have the correct template', ()=>{
      expect(component.template).to.equal(EmailListTemplate);
    });

    it('should use best practices', ()=>{
      expect(component).to.have.property('controllerAs');
      expect(component.controllerAs).to.be.a('string');
      expect(component).have.property('scope');
      expect(component.scope).to.be.an('object');
    });

    it('should have repeat over the emails in the template', ()=>{
      expect(EmailListTemplate).to.match(/ng-repeat="\w*\sin\s[\s\S].\.emails/);
      expect(EmailListTemplate).to.match(/\.subject/);
      expect(EmailListTemplate).to.match(/\.from/);
    });
  });

  describe('Controller', ()=>{

    it('should bind to the Emails factory', ()=>{
      let instance = createController();
      expect(instance.Emails).to.equal(Emails);
    });

    it('should have an emails collection', ()=>{
      let instance = createController();
      expect(instance.emails).to.be.an('array');
      expect(instance.emails).to.equal(Emails.getState());
    });
  });

  describe('Factory', ()=>{
    var message = `Write some test for the factory!
      Even the ajax calls. Look into $httpBackend.`;
    // ERASE me when/if you write test.
    console.log(colors.random(message));
  });
});
