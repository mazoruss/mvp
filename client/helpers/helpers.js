var allCards = [ '2s', '2h', '2c', '2d', '3s', '3h', '3c', '3d', '4s', '4h', '4c', '4d', '5s', '5h', '5c', '5d', 
								 '6s', '6h', '6c', '6d', '7s', '7h', '7c', '7d', '8s', '8h', '8c', '8d', '9s', '9h', '9c', '9d', 
								 'as', 'ah', 'ac', 'ad', 'ts', 'th', 'tc', 'td', 'js', 'jh', 'jc', 'jd', 'qs', 'qh', 'qc', 'qd', 
								 'ks', 'kh', 'kc', 'kd' ];
var cardImgSrc = {};
allCards.forEach(card => {
	cardImgSrc[card] = `cards/${card}.gif`;
});
cardImgSrc['b'] = `cards/${'b'}.gif`;

var isBust = function(cards) {
	var total = 0;
	cards.forEach(card => {
		if(card[0] === 'a') { total += 1; } 
		else if (isNaN(card[0])) { total += 10; } 
		else { total += Number(card[0]); }
	})
	return total > 21;
}

var points = function(cards) {
	if(!cards) { return; }
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
	return { deck: deck, playerCards: [], dealerCards: [],
					 busted: false, reveal: false, winner: '',
					 bet: 5, display: 'none', username: 'guest' };
}


var changeMoney = function(username, amount, updateUser) {
	$.ajax({
		url: 'http://localhost:5000',
		type: 'POST',
		data: {
			username: username,
			money: amount,
			action: 'changeMoney'
		},
		success: function(data) {
			updateUser(data);
		}
	})
}

var userlogin = function(updateUser) {
	var username = $('#username').val();
	var password = $('#password').val();
	$('#username').val('');
	$('#password').val('');
	console.log(username);
	$.ajax({
		url: 'http://localhost:5000',
		type: 'POST',
		data: {username: username,
					 password: password},
		success: function(data) {
			updateUser(data);
		}
	});
}


















var whyItWorks = 'When there is a higher concentration of tens and aces left in the shoe, the player is going to be dealt more blackjacks (which pay 150% of your bet) and the dealer is going to bust (go over 21) more often. Conversely, when there are more small cards remaining, the player gets fewer blackjacks and the dealer is much less likely to bust. Given those mathematical realities, if a card counter keeps careful track of the concentration of high cards vs low cards, they can place bigger bets when there are more high cards left and smaller bets when there are more low cards left. While this concept is simple to understand it takes a lot of practice and hard work to make it happen in real life.';
var theEdge = 'The true count will tell us what our advantage is at any point in a multiple deck blackjack game. To calculate our True Count, we simply divide our Running Count by the number of decks left to be dealt. In a standard 6 deck blackjack game each true count will move the house edge half a percent toward the player’s advantage. So a true 1 would basically erase the house edge and blackjack would be an even game. A true 2 puts the player advantage up to about half of 1 percent and the house edge becomes the player’s edge. A true 3 would make a player advantage of about 1% and so on. This can vary greatly depending on the rules and how many cards get dealt before the shuffle.';
var howTo = 'Assign a value with each card. With Hi-Lo, the most common card counting system, the card values are as follows: 2-6 = +1, 7-9 = 0, 10-Ace= -1. As each card is dealt, you will either add 1, subtract 1, or do nothing based on each card’s value. Keep a running count'



