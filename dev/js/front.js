import G_G from "./libs/G_G.js";
import { G_Bus } from "./libs/G_Control.js";
class Front extends G_G{
  constructor(){
    super();
    const _ = this;
    // G_Bus
  }
  define(){
    const _ = this;
    _.componentName = 'front';
    G_Bus.on(_, [
      'toggleMenu','openMenu','closeMenu',
      'chooseBlock','showPopup','closePopup',
      'changeTheme'
    ]);
    _.init();
  }
  toggleMenu({item}){
    const  _ = this;
    if(!_.asideCont) return void 0;
    if(_.asideCont.classList.contains('-open')){
      _.asideCont.classList.remove('-open');
    }else{
      _.asideCont.classList.add('-open');
    }
    _.handleMenu();
  }
  openMenu({item}){
    const _ = this;
    if(!_.innerAside) return void 0;
    _.innerAside.classList.add('-open');
    _.handleMenu();
  }
  closeMenu({item}){
    const _ = this;
    _.innerAside.classList.remove('-open');
    _.handleMenu();
  }
  handleMenu(){
    const _ = this;
    console.log(_.asideCont,_.innerAside)
    if( (_.asideCont.classList.contains('-open')) && (!_.innerAside.classList.contains('-open')) ) {
      _.mainCont.className = 'main -full-withpad';
      // Если открыто первое меню
    }
    if( (_.asideCont.classList.contains('-open')) && (_.innerAside.classList.contains('-open')) ) {
      _.mainCont.className = 'main -middle';
      // Если оба меню открыты
    }
    if( (!_.asideCont.classList.contains('-open')) && (_.innerAside.classList.contains('-open')) ) {
      _.mainCont.className = 'main -full';
      // Если открыто второе меню
    }
    if( (!_.asideCont.classList.contains('-open')) && (!_.innerAside.classList.contains('-open')) ) {
      _.mainCont.className = 'main -full-withpad-hided';
      // Если скрыты оба меню
    }

  }
  chooseBlock({item}){
    const _ = this;
    let
      blockToShow = item.getAttribute('data-target-block');
    _.f(`.page-block.-block-active`).classList.remove('-block-active');
    _.f(`[data-block="${blockToShow}"]`).classList.add('-block-active');
  }
  showPopup({item}){
    const _ = this;
    _.f(`.popup`).classList.add('-show');
  }
  closePopup({item}){
    const _ = this;
    _.f(`.popup`).classList.remove('-show');
  }
  changeTheme({item,event}){
    const _ = this;
    let html = document.documentElement;
    if(!html.hasAttribute('data-theme')){
      document.documentElement.setAttribute('data-theme','dark');
    }else{
      document.documentElement.removeAttribute('data-theme');
    }

  }
  init(){
    const _ = this;
    _.asideCont = _.f('#aside');
    _.innerAside = _.f('#inner-aside');
    _.mainCont = _.f('.main');
    _.handleMenu();
  }
}

new Front();



