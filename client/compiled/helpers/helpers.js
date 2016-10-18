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
		bet: 5, display: 'none' };
};

var whyItWorks = 'When there is a higher concentration of tens and aces left in the shoe, the player is going to be dealt more blackjacks (which pay 150% of your bet) and the dealer is going to bust (go over 21) more often. Conversely, when there are more small cards remaining, the player gets fewer blackjacks and the dealer is much less likely to bust. Given those mathematical realities, if a card counter keeps careful track of the concentration of high cards vs low cards, they can place bigger bets when there are more high cards left and smaller bets when there are more low cards left. While this concept is simple to understand it takes a lot of practice and hard work to make it happen in real life.';
var theEdge = 'The true count will tell us what our advantage is at any point in a multiple deck blackjack game. To calculate our True Count, we simply divide our Running Count by the number of decks left to be dealt. In a standard 6 deck blackjack game each true count will move the house edge half a percent toward the player’s advantage. So a true 1 would basically erase the house edge and blackjack would be an even game. A true 2 puts the player advantage up to about half of 1 percent and the house edge becomes the player’s edge. A true 3 would make a player advantage of about 1% and so on. This can vary greatly depending on the rules and how many cards get dealt before the shuffle.';
var howTo = 'Assign a value with each card. With Hi-Lo, the most common card counting system, the card values are as follows: 2-6 = +1, 7-9 = 0, 10-Ace= -1. As each card is dealt, you will either add 1, subtract 1, or do nothing based on each card’s value. Keep a running count';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hlbHBlcnMvaGVscGVycy5qcyJdLCJuYW1lcyI6WyJhbGxDYXJkcyIsImNhcmRJbWdTcmMiLCJmb3JFYWNoIiwiY2FyZCIsImlzQnVzdCIsImNhcmRzIiwidG90YWwiLCJpc05hTiIsIk51bWJlciIsInBvaW50cyIsImFjZSIsImRlZmF1bHRTdGF0ZSIsImRlY2siLCJEZWNrIiwicGxheWVyQ2FyZHMiLCJkZWFsZXJDYXJkcyIsImJ1c3RlZCIsInJldmVhbCIsIndpbm5lciIsImJldCIsImRpc3BsYXkiLCJ3aHlJdFdvcmtzIiwidGhlRWRnZSIsImhvd1RvIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVcsQ0FBRSxJQUFGLEVBQVEsSUFBUixFQUFjLElBQWQsRUFBb0IsSUFBcEIsRUFBMEIsSUFBMUIsRUFBZ0MsSUFBaEMsRUFBc0MsSUFBdEMsRUFBNEMsSUFBNUMsRUFBa0QsSUFBbEQsRUFBd0QsSUFBeEQsRUFBOEQsSUFBOUQsRUFBb0UsSUFBcEUsRUFBMEUsSUFBMUUsRUFBZ0YsSUFBaEYsRUFBc0YsSUFBdEYsRUFBNEYsSUFBNUYsRUFDTixJQURNLEVBQ0EsSUFEQSxFQUNNLElBRE4sRUFDWSxJQURaLEVBQ2tCLElBRGxCLEVBQ3dCLElBRHhCLEVBQzhCLElBRDlCLEVBQ29DLElBRHBDLEVBQzBDLElBRDFDLEVBQ2dELElBRGhELEVBQ3NELElBRHRELEVBQzRELElBRDVELEVBQ2tFLElBRGxFLEVBQ3dFLElBRHhFLEVBQzhFLElBRDlFLEVBQ29GLElBRHBGLEVBRU4sSUFGTSxFQUVBLElBRkEsRUFFTSxJQUZOLEVBRVksSUFGWixFQUVrQixJQUZsQixFQUV3QixJQUZ4QixFQUU4QixJQUY5QixFQUVvQyxJQUZwQyxFQUUwQyxJQUYxQyxFQUVnRCxJQUZoRCxFQUVzRCxJQUZ0RCxFQUU0RCxJQUY1RCxFQUVrRSxJQUZsRSxFQUV3RSxJQUZ4RSxFQUU4RSxJQUY5RSxFQUVvRixJQUZwRixFQUdOLElBSE0sRUFHQSxJQUhBLEVBR00sSUFITixFQUdZLElBSFosQ0FBZjtBQUlBLElBQUlDLGFBQWEsRUFBakI7QUFDQUQsU0FBU0UsT0FBVCxDQUFpQixnQkFBUTtBQUN4QkQsWUFBV0UsSUFBWCxlQUE0QkEsSUFBNUI7QUFDQSxDQUZEO0FBR0FGLFdBQVcsR0FBWCxlQUEyQixHQUEzQjs7QUFFQSxJQUFJRyxTQUFTLFNBQVRBLE1BQVMsQ0FBU0MsS0FBVCxFQUFnQjtBQUM1QixLQUFJQyxRQUFRLENBQVo7QUFDQUQsT0FBTUgsT0FBTixDQUFjLGdCQUFRO0FBQ3JCLE1BQUdDLEtBQUssQ0FBTCxNQUFZLEdBQWYsRUFBb0I7QUFBRUcsWUFBUyxDQUFUO0FBQWEsR0FBbkMsTUFDSyxJQUFJQyxNQUFNSixLQUFLLENBQUwsQ0FBTixDQUFKLEVBQW9CO0FBQUVHLFlBQVMsRUFBVDtBQUFjLEdBQXBDLE1BQ0E7QUFBRUEsWUFBU0UsT0FBT0wsS0FBSyxDQUFMLENBQVAsQ0FBVDtBQUEyQjtBQUNsQyxFQUpEO0FBS0EsUUFBT0csUUFBUSxFQUFmO0FBQ0EsQ0FSRDs7QUFVQSxJQUFJRyxTQUFTLFNBQVRBLE1BQVMsQ0FBU0osS0FBVCxFQUFnQjtBQUM1QixLQUFHLENBQUNBLEtBQUosRUFBVztBQUFFO0FBQVM7QUFDdEIsS0FBSUssTUFBTSxLQUFWO0FBQ0EsS0FBSUosUUFBUSxDQUFaO0FBQ0FELE9BQU1ILE9BQU4sQ0FBYyxnQkFBUTtBQUNyQixNQUFHQyxLQUFLLENBQUwsTUFBWSxHQUFmLEVBQW9CO0FBQ25CTyxTQUFNLElBQU47QUFDQUosWUFBUyxDQUFUO0FBQ0EsR0FIRCxNQUdPLElBQUlDLE1BQU1KLEtBQUssQ0FBTCxDQUFOLENBQUosRUFBb0I7QUFDMUJHLFlBQVMsRUFBVDtBQUNBLEdBRk0sTUFFQTtBQUNOQSxZQUFTRSxPQUFPTCxLQUFLLENBQUwsQ0FBUCxDQUFUO0FBQ0E7QUFDRCxFQVREO0FBVUEsS0FBR08sT0FBT0osUUFBUSxFQUFSLEdBQWEsRUFBdkIsRUFBMkI7QUFDMUJBLFdBQVMsRUFBVDtBQUNBO0FBQ0QsUUFBT0EsS0FBUDtBQUNBLENBbEJEOztBQW9CQSxJQUFJSyxlQUFlLFNBQWZBLFlBQWUsR0FBVztBQUM3QixLQUFJQyxPQUFPLElBQUlDLElBQUosRUFBWDtBQUNBLFFBQU8sRUFBRUQsTUFBTUEsSUFBUixFQUFjRSxhQUFhLEVBQTNCLEVBQStCQyxhQUFhLEVBQTVDO0FBQ0ZDLFVBQVEsS0FETixFQUNhQyxRQUFRLEtBRHJCLEVBQzRCQyxRQUFRLEVBRHBDO0FBRUZDLE9BQUssQ0FGSCxFQUVNQyxTQUFTLE1BRmYsRUFBUDtBQUdBLENBTEQ7O0FBT0EsSUFBSUMsYUFBYSxzckJBQWpCO0FBQ0EsSUFBSUMsVUFBVSx3cUJBQWQ7QUFDQSxJQUFJQyxRQUFRLDBRQUFaIiwiZmlsZSI6ImhlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYWxsQ2FyZHMgPSBbICcycycsICcyaCcsICcyYycsICcyZCcsICczcycsICczaCcsICczYycsICczZCcsICc0cycsICc0aCcsICc0YycsICc0ZCcsICc1cycsICc1aCcsICc1YycsICc1ZCcsIFxuXHRcdFx0XHRcdFx0XHRcdCAnNnMnLCAnNmgnLCAnNmMnLCAnNmQnLCAnN3MnLCAnN2gnLCAnN2MnLCAnN2QnLCAnOHMnLCAnOGgnLCAnOGMnLCAnOGQnLCAnOXMnLCAnOWgnLCAnOWMnLCAnOWQnLCBcblx0XHRcdFx0XHRcdFx0XHQgJ2FzJywgJ2FoJywgJ2FjJywgJ2FkJywgJ3RzJywgJ3RoJywgJ3RjJywgJ3RkJywgJ2pzJywgJ2poJywgJ2pjJywgJ2pkJywgJ3FzJywgJ3FoJywgJ3FjJywgJ3FkJywgXG5cdFx0XHRcdFx0XHRcdFx0ICdrcycsICdraCcsICdrYycsICdrZCcgXTtcbnZhciBjYXJkSW1nU3JjID0ge307XG5hbGxDYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuXHRjYXJkSW1nU3JjW2NhcmRdID0gYGNhcmRzLyR7Y2FyZH0uZ2lmYDtcbn0pO1xuY2FyZEltZ1NyY1snYiddID0gYGNhcmRzLyR7J2InfS5naWZgO1xuXG52YXIgaXNCdXN0ID0gZnVuY3Rpb24oY2FyZHMpIHtcblx0dmFyIHRvdGFsID0gMDtcblx0Y2FyZHMuZm9yRWFjaChjYXJkID0+IHtcblx0XHRpZihjYXJkWzBdID09PSAnYScpIHsgdG90YWwgKz0gMTsgfSBcblx0XHRlbHNlIGlmIChpc05hTihjYXJkWzBdKSkgeyB0b3RhbCArPSAxMDsgfSBcblx0XHRlbHNlIHsgdG90YWwgKz0gTnVtYmVyKGNhcmRbMF0pOyB9XG5cdH0pXG5cdHJldHVybiB0b3RhbCA+IDIxO1xufVxuXG52YXIgcG9pbnRzID0gZnVuY3Rpb24oY2FyZHMpIHtcblx0aWYoIWNhcmRzKSB7IHJldHVybjsgfVxuXHR2YXIgYWNlID0gZmFsc2U7XG5cdHZhciB0b3RhbCA9IDA7XG5cdGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG5cdFx0aWYoY2FyZFswXSA9PT0gJ2EnKSB7XG5cdFx0XHRhY2UgPSB0cnVlO1xuXHRcdFx0dG90YWwgKz0gMTtcblx0XHR9IGVsc2UgaWYgKGlzTmFOKGNhcmRbMF0pKSB7XG5cdFx0XHR0b3RhbCArPSAxMDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dG90YWwgKz0gTnVtYmVyKGNhcmRbMF0pO1xuXHRcdH1cblx0fSlcblx0aWYoYWNlICYmIHRvdGFsICsgMTAgPCAyMikge1xuXHRcdHRvdGFsICs9IDEwO1xuXHR9XG5cdHJldHVybiB0b3RhbDtcbn1cblxudmFyIGRlZmF1bHRTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgZGVjayA9IG5ldyBEZWNrKCk7XG5cdHJldHVybiB7IGRlY2s6IGRlY2ssIHBsYXllckNhcmRzOiBbXSwgZGVhbGVyQ2FyZHM6IFtdLFxuXHRcdFx0XHRcdCBidXN0ZWQ6IGZhbHNlLCByZXZlYWw6IGZhbHNlLCB3aW5uZXI6ICcnLFxuXHRcdFx0XHRcdCBiZXQ6IDUsIGRpc3BsYXk6ICdub25lJyB9O1xufVxuXG52YXIgd2h5SXRXb3JrcyA9ICdXaGVuIHRoZXJlIGlzIGEgaGlnaGVyIGNvbmNlbnRyYXRpb24gb2YgdGVucyBhbmQgYWNlcyBsZWZ0IGluIHRoZSBzaG9lLCB0aGUgcGxheWVyIGlzIGdvaW5nIHRvIGJlIGRlYWx0IG1vcmUgYmxhY2tqYWNrcyAod2hpY2ggcGF5IDE1MCUgb2YgeW91ciBiZXQpIGFuZCB0aGUgZGVhbGVyIGlzIGdvaW5nIHRvIGJ1c3QgKGdvIG92ZXIgMjEpIG1vcmUgb2Z0ZW4uIENvbnZlcnNlbHksIHdoZW4gdGhlcmUgYXJlIG1vcmUgc21hbGwgY2FyZHMgcmVtYWluaW5nLCB0aGUgcGxheWVyIGdldHMgZmV3ZXIgYmxhY2tqYWNrcyBhbmQgdGhlIGRlYWxlciBpcyBtdWNoIGxlc3MgbGlrZWx5IHRvIGJ1c3QuIEdpdmVuIHRob3NlIG1hdGhlbWF0aWNhbCByZWFsaXRpZXMsIGlmIGEgY2FyZCBjb3VudGVyIGtlZXBzIGNhcmVmdWwgdHJhY2sgb2YgdGhlIGNvbmNlbnRyYXRpb24gb2YgaGlnaCBjYXJkcyB2cyBsb3cgY2FyZHMsIHRoZXkgY2FuIHBsYWNlIGJpZ2dlciBiZXRzIHdoZW4gdGhlcmUgYXJlIG1vcmUgaGlnaCBjYXJkcyBsZWZ0IGFuZCBzbWFsbGVyIGJldHMgd2hlbiB0aGVyZSBhcmUgbW9yZSBsb3cgY2FyZHMgbGVmdC4gV2hpbGUgdGhpcyBjb25jZXB0IGlzIHNpbXBsZSB0byB1bmRlcnN0YW5kIGl0IHRha2VzIGEgbG90IG9mIHByYWN0aWNlIGFuZCBoYXJkIHdvcmsgdG8gbWFrZSBpdCBoYXBwZW4gaW4gcmVhbCBsaWZlLic7XG52YXIgdGhlRWRnZSA9ICdUaGUgdHJ1ZSBjb3VudCB3aWxsIHRlbGwgdXMgd2hhdCBvdXIgYWR2YW50YWdlIGlzIGF0IGFueSBwb2ludCBpbiBhIG11bHRpcGxlIGRlY2sgYmxhY2tqYWNrIGdhbWUuIFRvIGNhbGN1bGF0ZSBvdXIgVHJ1ZSBDb3VudCwgd2Ugc2ltcGx5IGRpdmlkZSBvdXIgUnVubmluZyBDb3VudCBieSB0aGUgbnVtYmVyIG9mIGRlY2tzIGxlZnQgdG8gYmUgZGVhbHQuIEluIGEgc3RhbmRhcmQgNiBkZWNrIGJsYWNramFjayBnYW1lIGVhY2ggdHJ1ZSBjb3VudCB3aWxsIG1vdmUgdGhlIGhvdXNlIGVkZ2UgaGFsZiBhIHBlcmNlbnQgdG93YXJkIHRoZSBwbGF5ZXLigJlzIGFkdmFudGFnZS4gU28gYSB0cnVlIDEgd291bGQgYmFzaWNhbGx5IGVyYXNlIHRoZSBob3VzZSBlZGdlIGFuZCBibGFja2phY2sgd291bGQgYmUgYW4gZXZlbiBnYW1lLiBBIHRydWUgMiBwdXRzIHRoZSBwbGF5ZXIgYWR2YW50YWdlIHVwIHRvIGFib3V0IGhhbGYgb2YgMSBwZXJjZW50IGFuZCB0aGUgaG91c2UgZWRnZSBiZWNvbWVzIHRoZSBwbGF5ZXLigJlzIGVkZ2UuIEEgdHJ1ZSAzIHdvdWxkIG1ha2UgYSBwbGF5ZXIgYWR2YW50YWdlIG9mIGFib3V0IDElIGFuZCBzbyBvbi4gVGhpcyBjYW4gdmFyeSBncmVhdGx5IGRlcGVuZGluZyBvbiB0aGUgcnVsZXMgYW5kIGhvdyBtYW55IGNhcmRzIGdldCBkZWFsdCBiZWZvcmUgdGhlIHNodWZmbGUuJztcbnZhciBob3dUbyA9ICdBc3NpZ24gYSB2YWx1ZSB3aXRoIGVhY2ggY2FyZC4gV2l0aCBIaS1MbywgdGhlIG1vc3QgY29tbW9uIGNhcmQgY291bnRpbmcgc3lzdGVtLCB0aGUgY2FyZCB2YWx1ZXMgYXJlIGFzIGZvbGxvd3M6IDItNiA9ICsxLCA3LTkgPSAwLCAxMC1BY2U9IC0xLiBBcyBlYWNoIGNhcmQgaXMgZGVhbHQsIHlvdSB3aWxsIGVpdGhlciBhZGQgMSwgc3VidHJhY3QgMSwgb3IgZG8gbm90aGluZyBiYXNlZCBvbiBlYWNoIGNhcmTigJlzIHZhbHVlLiBLZWVwIGEgcnVubmluZyBjb3VudCdcblxuXG5cbiJdfQ==