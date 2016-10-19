'use strict';

var allCards = ['2s', '2h', '2c', '2d', '3s', '3h', '3c', '3d', '4s', '4h', '4c', '4d', '5s', '5h', '5c', '5d', '6s', '6h', '6c', '6d', '7s', '7h', '7c', '7d', '8s', '8h', '8c', '8d', '9s', '9h', '9c', '9d', 'as', 'ah', 'ac', 'ad', 'ts', 'th', 'tc', 'td', 'js', 'jh', 'jc', 'jd', 'qs', 'qh', 'qc', 'qd', 'ks', 'kh', 'kc', 'kd'];
var cardImgSrc = {};
allCards.forEach(function (card) {
	cardImgSrc[card] = 'cards/' + card + '.gif';
});
cardImgSrc['b'] = 'cards/' + 'b' + '.gif';

var isBust = function isBust(cards) {
	var total = 0;
	cards.forEach(function (card) {
		if (card[0] === 'a') {
			total += 1;
		} else if (isNaN(card[0])) {
			total += 10;
		} else {
			total += Number(card[0]);
		}
	});
	return total > 21;
};

var points = function points(cards) {
	if (!cards) {
		return;
	}
	var ace = false;
	var total = 0;
	cards.forEach(function (card) {
		if (card[0] === 'a') {
			ace = true;
			total += 1;
		} else if (isNaN(card[0])) {
			total += 10;
		} else {
			total += Number(card[0]);
		}
	});
	if (ace && total + 10 < 22) {
		total += 10;
	}
	return total;
};

var defaultState = function defaultState() {
	var deck = new Deck();
	return { deck: deck, playerCards: [], dealerCards: [],
		busted: false, reveal: false, winner: '',
		bet: 5, display: 'none', username: 'guest' };
};

var changeMoney = function changeMoney(username, amount, updateUser) {
	$.ajax({
		url: 'http://localhost:5000',
		type: 'POST',
		data: {
			username: username,
			money: amount,
			action: 'changeMoney'
		},
		success: function success(data) {
			updateUser(data);
		}
	});
};

var userlogin = function userlogin(updateUser) {
	var username = $('#username').val();
	var password = $('#password').val();
	$('#username').val('');
	$('#password').val('');
	console.log(username);
	$.ajax({
		url: 'http://localhost:5000',
		type: 'POST',
		data: { username: username,
			password: password },
		success: function success(data) {
			updateUser(data);
		}
	});
};

var whyItWorks = 'When there is a higher concentration of tens and aces left in the shoe, the player is going to be dealt more blackjacks (which pay 150% of your bet) and the dealer is going to bust (go over 21) more often. Conversely, when there are more small cards remaining, the player gets fewer blackjacks and the dealer is much less likely to bust. Given those mathematical realities, if a card counter keeps careful track of the concentration of high cards vs low cards, they can place bigger bets when there are more high cards left and smaller bets when there are more low cards left. While this concept is simple to understand it takes a lot of practice and hard work to make it happen in real life.';
var theEdge = 'The true count will tell us what our advantage is at any point in a multiple deck blackjack game. To calculate our True Count, we simply divide our Running Count by the number of decks left to be dealt. In a standard 6 deck blackjack game each true count will move the house edge half a percent toward the player’s advantage. So a true 1 would basically erase the house edge and blackjack would be an even game. A true 2 puts the player advantage up to about half of 1 percent and the house edge becomes the player’s edge. A true 3 would make a player advantage of about 1% and so on. This can vary greatly depending on the rules and how many cards get dealt before the shuffle.';
var howTo = 'Assign a value with each card. With Hi-Lo, the most common card counting system, the card values are as follows: 2-6 = +1, 7-9 = 0, 10-Ace= -1. As each card is dealt, you will either add 1, subtract 1, or do nothing based on each card’s value. Keep a running count';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hlbHBlcnMvaGVscGVycy5qcyJdLCJuYW1lcyI6WyJhbGxDYXJkcyIsImNhcmRJbWdTcmMiLCJmb3JFYWNoIiwiY2FyZCIsImlzQnVzdCIsImNhcmRzIiwidG90YWwiLCJpc05hTiIsIk51bWJlciIsInBvaW50cyIsImFjZSIsImRlZmF1bHRTdGF0ZSIsImRlY2siLCJEZWNrIiwicGxheWVyQ2FyZHMiLCJkZWFsZXJDYXJkcyIsImJ1c3RlZCIsInJldmVhbCIsIndpbm5lciIsImJldCIsImRpc3BsYXkiLCJ1c2VybmFtZSIsImNoYW5nZU1vbmV5IiwiYW1vdW50IiwidXBkYXRlVXNlciIsIiQiLCJhamF4IiwidXJsIiwidHlwZSIsImRhdGEiLCJtb25leSIsImFjdGlvbiIsInN1Y2Nlc3MiLCJ1c2VybG9naW4iLCJ2YWwiLCJwYXNzd29yZCIsImNvbnNvbGUiLCJsb2ciLCJ3aHlJdFdvcmtzIiwidGhlRWRnZSIsImhvd1RvIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVcsQ0FBRSxJQUFGLEVBQVEsSUFBUixFQUFjLElBQWQsRUFBb0IsSUFBcEIsRUFBMEIsSUFBMUIsRUFBZ0MsSUFBaEMsRUFBc0MsSUFBdEMsRUFBNEMsSUFBNUMsRUFBa0QsSUFBbEQsRUFBd0QsSUFBeEQsRUFBOEQsSUFBOUQsRUFBb0UsSUFBcEUsRUFBMEUsSUFBMUUsRUFBZ0YsSUFBaEYsRUFBc0YsSUFBdEYsRUFBNEYsSUFBNUYsRUFDTixJQURNLEVBQ0EsSUFEQSxFQUNNLElBRE4sRUFDWSxJQURaLEVBQ2tCLElBRGxCLEVBQ3dCLElBRHhCLEVBQzhCLElBRDlCLEVBQ29DLElBRHBDLEVBQzBDLElBRDFDLEVBQ2dELElBRGhELEVBQ3NELElBRHRELEVBQzRELElBRDVELEVBQ2tFLElBRGxFLEVBQ3dFLElBRHhFLEVBQzhFLElBRDlFLEVBQ29GLElBRHBGLEVBRU4sSUFGTSxFQUVBLElBRkEsRUFFTSxJQUZOLEVBRVksSUFGWixFQUVrQixJQUZsQixFQUV3QixJ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UixDQUFZaEIsUUFBWjtBQUNBSSxHQUFFQyxJQUFGLENBQU87QUFDTkMsT0FBSyx1QkFEQztBQUVOQyxRQUFNLE1BRkE7QUFHTkMsUUFBTSxFQUFDUixVQUFVQSxRQUFYO0FBQ0ZjLGFBQVVBLFFBRFIsRUFIQTtBQUtOSCxXQUFTLGlCQUFTSCxJQUFULEVBQWU7QUFDdkJMLGNBQVdLLElBQVg7QUFDQTtBQVBLLEVBQVA7QUFTQSxDQWZEOztBQWtDQSxJQUFJUyxhQUFhLHNyQkFBakI7QUFDQSxJQUFJQyxVQUFVLHdxQkFBZDtBQUNBLElBQUlDLFFBQVEsMFFBQVoiLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhbGxDYXJkcyA9IFsgJzJzJywgJzJoJywgJzJjJywgJzJkJywgJzNzJywgJzNoJywgJzNjJywgJzNkJywgJzRzJywgJzRoJywgJzRjJywgJzRkJywgJzVzJywgJzVoJywgJzVjJywgJzVkJywgXG5cdFx0XHRcdFx0XHRcdFx0ICc2cycsICc2aCcsICc2YycsICc2ZCcsICc3cycsICc3aCcsICc3YycsICc3ZCcsICc4cycsICc4aCcsICc4YycsICc4ZCcsICc5cycsICc5aCcsICc5YycsICc5ZCcsIFxuXHRcdFx0XHRcdFx0XHRcdCAnYXMnLCAnYWgnLCAnYWMnLCAnYWQnLCAndHMnLCAndGgnLCAndGMnLCAndGQnLCAnanMnLCAnamgnLCAnamMnLCAnamQnLCAncXMnLCAncWgnLCAncWMnLCAncWQnLCBcblx0XHRcdFx0XHRcdFx0XHQgJ2tzJywgJ2toJywgJ2tjJywgJ2tkJyBdO1xudmFyIGNhcmRJbWdTcmMgPSB7fTtcbmFsbENhcmRzLmZvckVhY2goY2FyZCA9PiB7XG5cdGNhcmRJbWdTcmNbY2FyZF0gPSBgY2FyZHMvJHtjYXJkfS5naWZgO1xufSk7XG5jYXJkSW1nU3JjWydiJ10gPSBgY2FyZHMvJHsnYid9LmdpZmA7XG5cbnZhciBpc0J1c3QgPSBmdW5jdGlvbihjYXJkcykge1xuXHR2YXIgdG90YWwgPSAwO1xuXHRjYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuXHRcdGlmKGNhcmRbMF0gPT09ICdhJykgeyB0b3RhbCArPSAxOyB9IFxuXHRcdGVsc2UgaWYgKGlzTmFOKGNhcmRbMF0pKSB7IHRvdGFsICs9IDEwOyB9IFxuXHRcdGVsc2UgeyB0b3RhbCArPSBOdW1iZXIoY2FyZFswXSk7IH1cblx0fSlcblx0cmV0dXJuIHRvdGFsID4gMjE7XG59XG5cbnZhciBwb2ludHMgPSBmdW5jdGlvbihjYXJkcykge1xuXHRpZighY2FyZHMpIHsgcmV0dXJuOyB9XG5cdHZhciBhY2UgPSBmYWxzZTtcblx0dmFyIHRvdGFsID0gMDtcblx0Y2FyZHMuZm9yRWFjaChjYXJkID0+IHtcblx0XHRpZihjYXJkWzBdID09PSAnYScpIHtcblx0XHRcdGFjZSA9IHRydWU7XG5cdFx0XHR0b3RhbCArPSAxO1xuXHRcdH0gZWxzZSBpZiAoaXNOYU4oY2FyZFswXSkpIHtcblx0XHRcdHRvdGFsICs9IDEwO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0b3RhbCArPSBOdW1iZXIoY2FyZFswXSk7XG5cdFx0fVxuXHR9KVxuXHRpZihhY2UgJiYgdG90YWwgKyAxMCA8IDIyKSB7XG5cdFx0dG90YWwgKz0gMTA7XG5cdH1cblx0cmV0dXJuIHRvdGFsO1xufVxuXG52YXIgZGVmYXVsdFN0YXRlID0gZnVuY3Rpb24oKSB7XG5cdHZhciBkZWNrID0gbmV3IERlY2soKTtcblx0cmV0dXJuIHsgZGVjazogZGVjaywgcGxheWVyQ2FyZHM6IFtdLCBkZWFsZXJDYXJkczogW10sXG5cdFx0XHRcdFx0IGJ1c3RlZDogZmFsc2UsIHJldmVhbDogZmFsc2UsIHdpbm5lcjogJycsXG5cdFx0XHRcdFx0IGJldDogNSwgZGlzcGxheTogJ25vbmUnLCB1c2VybmFtZTogJ2d1ZXN0JyB9O1xufVxuXG5cbnZhciBjaGFuZ2VNb25leSA9IGZ1bmN0aW9uKHVzZXJuYW1lLCBhbW91bnQsIHVwZGF0ZVVzZXIpIHtcblx0JC5hamF4KHtcblx0XHR1cmw6ICdodHRwOi8vbG9jYWxob3N0OjUwMDAnLFxuXHRcdHR5cGU6ICdQT1NUJyxcblx0XHRkYXRhOiB7XG5cdFx0XHR1c2VybmFtZTogdXNlcm5hbWUsXG5cdFx0XHRtb25leTogYW1vdW50LFxuXHRcdFx0YWN0aW9uOiAnY2hhbmdlTW9uZXknXG5cdFx0fSxcblx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHR1cGRhdGVVc2VyKGRhdGEpO1xuXHRcdH1cblx0fSlcbn1cblxudmFyIHVzZXJsb2dpbiA9IGZ1bmN0aW9uKHVwZGF0ZVVzZXIpIHtcblx0dmFyIHVzZXJuYW1lID0gJCgnI3VzZXJuYW1lJykudmFsKCk7XG5cdHZhciBwYXNzd29yZCA9ICQoJyNwYXNzd29yZCcpLnZhbCgpO1xuXHQkKCcjdXNlcm5hbWUnKS52YWwoJycpO1xuXHQkKCcjcGFzc3dvcmQnKS52YWwoJycpO1xuXHRjb25zb2xlLmxvZyh1c2VybmFtZSk7XG5cdCQuYWpheCh7XG5cdFx0dXJsOiAnaHR0cDovL2xvY2FsaG9zdDo1MDAwJyxcblx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0ZGF0YToge3VzZXJuYW1lOiB1c2VybmFtZSxcblx0XHRcdFx0XHQgcGFzc3dvcmQ6IHBhc3N3b3JkfSxcblx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHR1cGRhdGVVc2VyKGRhdGEpO1xuXHRcdH1cblx0fSk7XG59XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG52YXIgd2h5SXRXb3JrcyA9ICdXaGVuIHRoZXJlIGlzIGEgaGlnaGVyIGNvbmNlbnRyYXRpb24gb2YgdGVucyBhbmQgYWNlcyBsZWZ0IGluIHRoZSBzaG9lLCB0aGUgcGxheWVyIGlzIGdvaW5nIHRvIGJlIGRlYWx0IG1vcmUgYmxhY2tqYWNrcyAod2hpY2ggcGF5IDE1MCUgb2YgeW91ciBiZXQpIGFuZCB0aGUgZGVhbGVyIGlzIGdvaW5nIHRvIGJ1c3QgKGdvIG92ZXIgMjEpIG1vcmUgb2Z0ZW4uIENvbnZlcnNlbHksIHdoZW4gdGhlcmUgYXJlIG1vcmUgc21hbGwgY2FyZHMgcmVtYWluaW5nLCB0aGUgcGxheWVyIGdldHMgZmV3ZXIgYmxhY2tqYWNrcyBhbmQgdGhlIGRlYWxlciBpcyBtdWNoIGxlc3MgbGlrZWx5IHRvIGJ1c3QuIEdpdmVuIHRob3NlIG1hdGhlbWF0aWNhbCByZWFsaXRpZXMsIGlmIGEgY2FyZCBjb3VudGVyIGtlZXBzIGNhcmVmdWwgdHJhY2sgb2YgdGhlIGNvbmNlbnRyYXRpb24gb2YgaGlnaCBjYXJkcyB2cyBsb3cgY2FyZHMsIHRoZXkgY2FuIHBsYWNlIGJpZ2dlciBiZXRzIHdoZW4gdGhlcmUgYXJlIG1vcmUgaGlnaCBjYXJkcyBsZWZ0IGFuZCBzbWFsbGVyIGJldHMgd2hlbiB0aGVyZSBhcmUgbW9yZSBsb3cgY2FyZHMgbGVmdC4gV2hpbGUgdGhpcyBjb25jZXB0IGlzIHNpbXBsZSB0byB1bmRlcnN0YW5kIGl0IHRha2VzIGEgbG90IG9mIHByYWN0aWNlIGFuZCBoYXJkIHdvcmsgdG8gbWFrZSBpdCBoYXBwZW4gaW4gcmVhbCBsaWZlLic7XG52YXIgdGhlRWRnZSA9ICdUaGUgdHJ1ZSBjb3VudCB3aWxsIHRlbGwgdXMgd2hhdCBvdXIgYWR2YW50YWdlIGlzIGF0IGFueSBwb2ludCBpbiBhIG11bHRpcGxlIGRlY2sgYmxhY2tqYWNrIGdhbWUuIFRvIGNhbGN1bGF0ZSBvdXIgVHJ1ZSBDb3VudCwgd2Ugc2ltcGx5IGRpdmlkZSBvdXIgUnVubmluZyBDb3VudCBieSB0aGUgbnVtYmVyIG9mIGRlY2tzIGxlZnQgdG8gYmUgZGVhbHQuIEluIGEgc3RhbmRhcmQgNiBkZWNrIGJsYWNramFjayBnYW1lIGVhY2ggdHJ1ZSBjb3VudCB3aWxsIG1vdmUgdGhlIGhvdXNlIGVkZ2UgaGFsZiBhIHBlcmNlbnQgdG93YXJkIHRoZSBwbGF5ZXLigJlzIGFkdmFudGFnZS4gU28gYSB0cnVlIDEgd291bGQgYmFzaWNhbGx5IGVyYXNlIHRoZSBob3VzZSBlZGdlIGFuZCBibGFja2phY2sgd291bGQgYmUgYW4gZXZlbiBnYW1lLiBBIHRydWUgMiBwdXRzIHRoZSBwbGF5ZXIgYWR2YW50YWdlIHVwIHRvIGFib3V0IGhhbGYgb2YgMSBwZXJjZW50IGFuZCB0aGUgaG91c2UgZWRnZSBiZWNvbWVzIHRoZSBwbGF5ZXLigJlzIGVkZ2UuIEEgdHJ1ZSAzIHdvdWxkIG1ha2UgYSBwbGF5ZXIgYWR2YW50YWdlIG9mIGFib3V0IDElIGFuZCBzbyBvbi4gVGhpcyBjYW4gdmFyeSBncmVhdGx5IGRlcGVuZGluZyBvbiB0aGUgcnVsZXMgYW5kIGhvdyBtYW55IGNhcmRzIGdldCBkZWFsdCBiZWZvcmUgdGhlIHNodWZmbGUuJztcbnZhciBob3dUbyA9ICdBc3NpZ24gYSB2YWx1ZSB3aXRoIGVhY2ggY2FyZC4gV2l0aCBIaS1MbywgdGhlIG1vc3QgY29tbW9uIGNhcmQgY291bnRpbmcgc3lzdGVtLCB0aGUgY2FyZCB2YWx1ZXMgYXJlIGFzIGZvbGxvd3M6IDItNiA9ICsxLCA3LTkgPSAwLCAxMC1BY2U9IC0xLiBBcyBlYWNoIGNhcmQgaXMgZGVhbHQsIHlvdSB3aWxsIGVpdGhlciBhZGQgMSwgc3VidHJhY3QgMSwgb3IgZG8gbm90aGluZyBiYXNlZCBvbiBlYWNoIGNhcmTigJlzIHZhbHVlLiBLZWVwIGEgcnVubmluZyBjb3VudCdcblxuXG5cbiJdfQ==