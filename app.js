// TODO: get rid of all jQuery usage
(function () {
	const Memory = {
		init: function (cards) {
			this.$game = $('.game');
			this.modal =  document.querySelector('.modal');
			this.overlay = document.querySelector('.modal-overlay');
			this.$restartButton = $('button.restart');
			this.cardsArray = $.merge(cards, cards);// ES6 has the 'spread' operator to combine/flatten [] && {}, could probably do it with reduce
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function (cardsArray) {
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function () {
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.memoryCards = document.getElementsByClassName('card');
			this.binding();
			this.paused = false;
			this.guess = null;
		},

		binding: function(){

      const memoryCardsArr = [].slice.call(this.memoryCards);
      memoryCardsArr.map(elem => elem.addEventListener('click', this.cardClicked));

			this.$restartButton.on('click', $.proxy(this.reset, this));
		},
		// The infamous setTimeout, (used in multiple methods, like I mentioned during the interview).  On a side note, I love Hungarian Notation, if you haven't noticed already.
		cardClicked: function(){
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

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.overlay.style.display = 'block';
			this.modal.style.display = 'block';
		},

		hideModal: function(){
			this.overlay.style.display = 'none';
			this.modal.style.display = 'none';
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show('slow');
		},

		// Fisher--Yates Algorithm -- https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
		shuffle: function(array){
			let counter = array.length, temp, index;
			// I freaking hate loops, but in the interest of speed
			while (counter > 0) {
				index = Math.floor(Math.random() * counter);
				counter--;
				temp = array[counter];
				array[counter] = array[index];
				array[index] = temp;
			}
			return array;
		},

		// I hate doing it like this but for now, just get it up and running quickly, this is why I like ReactJS components
		buildHTML: function(){
			let frag = '';
			this.$cards.each(function(index, val){
				frag += '<div class="card" data-id="'+ val.id +'"><div class="inside">\
				<div class="front"><img src="'+ val.img +'"\
				alt="'+ val.name +'" /></div>\
				<div class="back"><img src="images/topgear.jpg"\
				alt="TopGearCrew" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	// Again components are the shit.
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
