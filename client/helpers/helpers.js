var allCards = [ '2s', '2h', '2c', '2d', '3s', '3h', '3c', '3d', '4s', '4h', '4c', '4d', '5s', '5h', '5c', '5d', '6s', '6h', '6c', '6d', '7s', '7h', '7c', '7d', '8s', '8h', '8c', '8d', '9s', '9h', '9c', '9d', 'as', 'ah', 'ac', 'ad', 'ts', 'th', 'tc', 'td', 'js', 'jh', 'jc', 'jd', 'qs', 'qh', 'qc', 'qd', 'ks', 'kh', 'kc', 'kd' ];
var cardImgSrc = {};
allCards.forEach(card => {
	cardImgSrc[card] = `cards/${card}.gif`;
});
cardImgSrc['b'] = `cards/${'b'}.gif`;

var isBust = function(cards) {
	var total = 0;
	cards.forEach(card => {
		if(card[0] === 'a') {
			total += 1;
		} else if (isNaN(card[0])) {
			total += 10;
		} else {
			total += Number(card[0]);
		}
	})
	return total > 21;
}

var points = function(cards) {
	var ace = false;
	var total = 0;
	cards.forEach(card => {
		if(card[0] === 'a') {
			ace = true;
			total += 1;
		} else if (isNaN(card[0])) {
			total += 10;
		} else {
			total += Number(card[0]);
		}
	})
	if(ace && total + 10 < 22) {
		total += 10;
	}
	return total;
}

var defaultState = function() {
	var deck = new Deck();
	return {
			deck: deck,
			playerCards: [],
			dealerCards: [],
			busted: false,
			reveal: false,
			winner: ''
		};
}

