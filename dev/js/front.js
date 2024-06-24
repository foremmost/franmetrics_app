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
      'changeTheme',
	    'answerStart','answerMove','answerEnd',
	    'mobileToUp',
			'negativeUploadImage','closeNegativeForm','negativeSend',
	    'showTooltip','hideTooltip','mobileDropdown',
	    'showMobileImage','closeMobileImage',
	    'showEvalImage','closeEvalImage',
    ]);
	  _.finishMove = true;
    _.init();
  }

	showTooltip(){
		const _ = this;
		_.f('.m-tooltip').classList.add('active')
	}
	hideTooltip(){
		const _ = this;
		_.f('.m-tooltip').classList.remove('active')
	}
	mobileDropdown({item}){
		const _ = this;
		let dropdown = item.parentElement;
		let body = item.nextElementSibling;
		if (!dropdown.classList.contains('active')) {
			let height = 0;
			for (let i = 0; i < body.children.length; i++) {
				height += body.children[i].clientHeight + 1;
			}
			dropdown.classList.add('active');
			body.style = `height:${height}px;`
		} else {
			body.removeAttribute('style');
			dropdown.classList.remove('active')
		}
	}
	answerStart({item,event}){
		const _ = this;
		_.start = event.clientX;
		_.moveOffset = 0;
		let style = item.getAttribute('style');
		if (style && style.includes('translateX(')) {
			_.moveOffset = parseInt(style.split('(')[1].replace('px);',''));
		}
		_.dragButton = item;
		_.finishMove = false;
	}
	answerMove({event}){
		const _ = this;
		if (_.finishMove) return;
		let distance = event.clientX - _.start;
		if (distance > 0 && distance + _.moveOffset > 72) {
			_.finishMove = true;
			return;
		}
		if (distance < 0 && distance + _.moveOffset < -72) {
			_.finishMove = true;
			_.negativeAnswer({item:_.dragButton});
			return;
		}
		_.dragButton.style = `transform:translateX(${distance + _.moveOffset}px)`;
	}
	answerEnd(){
		const _ = this;
		if (!_.finishMove) {
			_.finishMove = true;
			_.dragButton.removeAttribute('style');
		}
	}
	negativeAnswer({item}) {
		const _ = this;
		let answerBlock = _.markup(_.negativeAnswerTpl({title:item.textContent}));
		_.f('.m-inner').append(answerBlock);
		_.f('.m-negative').classList.add('active')
	}
	negativeAnswerTpl(data){
		const _ = this;
		let tpl = `
			<form class="m-page m-additional m-negative" data-submit="${_.componentName}:negativeSend">
				<div class="m-block">
					<div class="m-block-header">
						<h4 class="m-block-title">${data.title}</h4>
					</div>
					<div class="m-form m-additional-inner">
						<div class="m-form-block">
							<fieldset class="m-form-input m-form-textarea">
								<legend>Your comment</legend>
								<textarea name="comment"></textarea>
							</fieldset>
							<div class="m-form-block-noty red">*Please, no more than 200 characters</div>
						</div>
						<h4 class="m-block-title">photo proof</h4>
						<div class="m-form-block">
							<div class="m-form-files">
								<label class="m-form-file">
									<svg>
										<use xlink:href="/img/sprite.svg#plusCircle"></use>
									</svg>
									<input type="file" name="file-1" data-change="${_.componentName}:negativeUploadImage">
								</label>
								<label class="m-form-file">
									<svg>
										<use xlink:href="/img/sprite.svg#plusCircle"></use>
									</svg>
									<input type="file" name="file-2" data-change="${_.componentName}:negativeUploadImage">
								</label>
								<label class="m-form-file">
									<svg>
										<use xlink:href="/img/sprite.svg#plusCircle"></use>
									</svg>
									<input type="file" name="file-3" data-change="${_.componentName}:negativeUploadImage">
								</label>
								<label class="m-form-file">
									<svg>
										<use xlink:href="/img/sprite.svg#plusCircle"></use>
									</svg>
									<input type="file" name="file-4" data-change="${_.componentName}:negativeUploadImage">
								</label>
							</div>
							<div class="m-form-block-noty red">*Please, at least 1 image</div>
						</div>
					</div>
				</div>
				<div class="m-block m-controls">
					<button class="m-controls-button fill">Done</button>
					<button type="button" class="m-controls-button" data-click="${_.componentName}:closeNegativeForm">Cancel</button>
				</div>
			</form>
		`;
		return tpl;
	}
	closeNegativeForm({item}){
		const _ = this;
		let form = item.closest('.m-negative');
		form.classList.remove('active');
		setTimeout(()=>{
			form.remove();
		},350)
	}
	negativeUploadImage({item}){
		const _ = this;
		let file = item.files[0];
		if (file) {
			let btn = _.markupElement(`
				<button class="m-form-file-button" type="button" data-click="${_.componentName}:showMobileImage">
					<svg><use xlink:href="/img/sprite.svg#view"></use></svg>
				</button>
			`)
			let fr = new FileReader();
			fr.addEventListener("load", function () {
				let img = document.createElement('img');
				img.setAttribute('src', fr.result);
				btn.append(img);
				item.parentElement.prepend(btn);
			}, false);
			fr.readAsDataURL(file);
		}
	}
	showMobileImage({item}){
		const _ = this;
		let image = item.querySelector('IMG');
		let cont = _.markupElement(`
			<div class="m-image">
				<img src="${image.src}">
				<button data-click="${_.componentName}:closeMobileImage"><svg><use xlink:href="/img/sprite.svg#closeWhite"></use></svg></button>
			</div>
		`);
		item.closest('.m-page').append(cont)
		cont.classList.add('active');
	}
	closeMobileImage({item}){
		const _ = this;
		let cont = item.parentElement;
		cont.classList.remove('active');
		setTimeout(()=>{cont.remove()},350)
	}
	showEvalImage({item}){
		const _ = this;
		let image = item.querySelector('IMG');
		let cont = _.markupElement(`
			<div class="eval-image">
				<div class="eval-image-inner">
					<img src="${image.src}">
					<button data-click="${_.componentName}:closeEvalImage"><svg><use xlink:href="/img/sprite.svg#closeWhite"></use></svg></button>
				</div>
			</div>
		`);
		document.body.append(cont)
		setTimeout(()=>{cont.classList.add('active')})
	}
	closeEvalImage({item}){
		const _ = this;
		let cont = item.closest('.eval-image');
		cont.classList.remove('active');
		setTimeout(()=>{cont.remove()},350)
	}
	negativeSend({item,event}){
		const _ = this;
		event.preventDefault();
		let formData = new FormData(item);
		console.log(formData)
	}
	mobileToUp() {
		const _ = this;
		_.f('.m-center').scrollTo({top:0,behavior: 'smooth'})
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



