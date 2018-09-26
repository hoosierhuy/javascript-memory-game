// TODO: get rid of all jQuery usage, as time permits
(function () {
	const Memory = {
		init (cards) {
			this.gameDiv = document.querySelector('.game');
			this.modal =  document.querySelector('.modal');
			this.overlay = document.querySelector('.modal-overlay');
			this.restartButton = document.querySelector('button.restart');
			this.cardsArray = [...cards, ...cards];
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards (cardsArray) {
			this.$cards = $(this.shuffle(this.cardsArray));
			console.log(this.$cards)
		},

		setup () {
			this.html = this.buildHTML();
			this.gameDiv.innerHTML = this.html;
			this.memoryCards = document.getElementsByClassName('card');
			this.binding();
			this.paused = false;
			this.guess = null;
		},

		binding (){
			const memoryCardsArr = [].slice.call(this.memoryCards);
			memoryCardsArr.map(elem => elem.addEventListener('click', this.cardClicked));
      this.restartButton.addEventListener('click', this.reset.bind(this));
		},
		cardClicked (){
		  // Lo Dash is not used here, just my own notation
			let _ = Memory;
			let $card = $(this);
			if(!_.paused && !$card.find('.inside').hasClass('matched') && !$card.find('.inside').hasClass('picked')){
				$card.find('.inside').addClass('picked');
				if(!_.guess){
					_.guess = $(this).attr('data-id');
				} else if(_.guess === $(this).attr('data-id') && !$(this).hasClass('picked')){
					$('.picked').addClass('matched');
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$('.picked').removeClass('picked');
						Memory.paused = false;
					}, 600);
				}
				if($('.matched').length === $('.card').length){
					_.win();
				}
			}
		},

		win (){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.gameFadeOut();
			}, 1000);
		},

		showModal (){
			this.overlay.style.display = 'block';
			this.modal.style.display = 'block';
		},

		hideModal (){
			this.overlay.style.display = 'none';
			this.modal.style.display = 'none';
		},

		gameFadeOut (){
			setTimeout(
				() => Memory.gameDiv.classList.add('gameFadeOut'),
			500);
		},

		reset (){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.gameDiv.style.display = 'block';
		},

		// Fisher--Yates Algorithm -- https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
		// https://gist.github.com/hoosierhuy/84affabac923959aae95a0686718b96f#file-fisheryatesmodernshufflealgo-js
		shuffle: (array) => {
			let counter = array.length,
					temp,
					index;
			while (counter > 0) {
				index = Math.floor(Math.random() * counter);
				counter--;
				temp = array[counter];
				array[counter] = array[index];
				array[index] = temp;
			}
			return array;
		},

		// I hate doing it like this but for now, just get it up and running quickly, this is why I like components
		buildHTML (){
			let frag = '';
			this.$cards.each(function(index, val){
				frag += '<section class="card" data-id="'+ val.id +'"><div class="inside">\
				<div class="front"><img src="'+ val.img +'"\
				alt="'+ val.name +'" /></div>\
				<div class="back"><img src="images/topgear.jpg"\
				alt="TopGearCrew" /></div></div>\
				</section>';
			});
			return frag;
		}
	};

	// Simulated data
	const cards = [
		{
			name: '4Runner',
			img: 'images/4runner.jpg',
			id: 1,
		},
		{
			name: 'sequoia',
			img: 'images/sequoia.JPG',
			id: 2
		},
		{
			name: 'audi',
			img: 'images/audi.jpg',
			id: 3
		},
		{
			name: 'tacoma',
			img: 'images/tacoma.jpg',
			id: 4
		},
		{
			name: 'mr2',
			img: 'images/mr2.jpg',
			id: 5
		},
		{
			name: 'accord',
			img: 'images/accord.jpg',
			id: 6
		}
	];

	// init() is called here within the IIFE, not in the DOM's body onLoad event, which to me is obtrusive JavaScript
	Memory.init(cards);
})();
