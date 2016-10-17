'use strict';

var Player = function Player(_ref) {
	var cards = _ref.cards;
	return React.createElement(
		'div',
		{ className: 'player' },
		cards.map(function (card) {
			return React.createElement(PlayerCard, { card: card });
		})
	);
};

var PlayerCard = function PlayerCard(_ref2) {
	var card = _ref2.card;
	return React.createElement('img', { className: 'playerCard', src: cardImgSrc[card] });
};

var Dealer = function Dealer(_ref3) {
	var cards = _ref3.cards;
	var reveal = _ref3.reveal;
	return React.createElement(
		'div',
		{ className: 'dealer' },
		cards.map(function (card, i) {
			return React.createElement(DealerCard, { card: card, index: i, reveal: reveal });
		})
	);
};

var DealerCard = function DealerCard(_ref4) {
	var card = _ref4.card;
	var index = _ref4.index;
	var reveal = _ref4.reveal;
	return React.createElement('img', { className: 'dealerCard', src: index === 0 && !reveal ? cardImgSrc['b'] : cardImgSrc[card] });
};

var Result = function Result(_ref5) {
	var bust = _ref5.bust;
	var winner = _ref5.winner;
	return React.createElement(
		'div',
		{ className: 'result' },
		React.createElement(
			'span',
			null,
			bust ? 'BUSTED' : winner ? winner + ' WINS!' : ''
		)
	);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9jb21wb25lbnRzLmpzIl0sIm5hbWVzIjpbIlBsYXllciIsImNhcmRzIiwibWFwIiwiY2FyZCIsIlBsYXllckNhcmQiLCJjYXJkSW1nU3JjIiwiRGVhbGVyIiwicmV2ZWFsIiwiaSIsIkRlYWxlckNhcmQiLCJpbmRleCIsIlJlc3VsdCIsImJ1c3QiLCJ3aW5uZXIiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsU0FBUyxTQUFUQSxNQUFTO0FBQUEsS0FBRUMsS0FBRixRQUFFQSxLQUFGO0FBQUEsUUFDWjtBQUFBO0FBQUEsSUFBSyxXQUFVLFFBQWY7QUFDRUEsUUFBTUMsR0FBTixDQUFVO0FBQUEsVUFDVixvQkFBQyxVQUFELElBQVksTUFBTUMsSUFBbEIsR0FEVTtBQUFBLEdBQVY7QUFERixFQURZO0FBQUEsQ0FBYjs7QUFRQSxJQUFJQyxhQUFhLFNBQWJBLFVBQWE7QUFBQSxLQUFFRCxJQUFGLFNBQUVBLElBQUY7QUFBQSxRQUNoQiw2QkFBSyxXQUFXLFlBQWhCLEVBQTZCLEtBQUtFLFdBQVdGLElBQVgsQ0FBbEMsR0FEZ0I7QUFBQSxDQUFqQjs7QUFJQSxJQUFJRyxTQUFTLFNBQVRBLE1BQVM7QUFBQSxLQUFFTCxLQUFGLFNBQUVBLEtBQUY7QUFBQSxLQUFTTSxNQUFULFNBQVNBLE1BQVQ7QUFBQSxRQUNaO0FBQUE7QUFBQSxJQUFLLFdBQVUsUUFBZjtBQUNFTixRQUFNQyxHQUFOLENBQVUsVUFBQ0MsSUFBRCxFQUFPSyxDQUFQO0FBQUEsVUFDVixvQkFBQyxVQUFELElBQVksTUFBTUwsSUFBbEIsRUFBd0IsT0FBT0ssQ0FBL0IsRUFBa0MsUUFBUUQsTUFBMUMsR0FEVTtBQUFBLEdBQVY7QUFERixFQURZO0FBQUEsQ0FBYjs7QUFRQSxJQUFJRSxhQUFhLFNBQWJBLFVBQWE7QUFBQSxLQUFFTixJQUFGLFNBQUVBLElBQUY7QUFBQSxLQUFRTyxLQUFSLFNBQVFBLEtBQVI7QUFBQSxLQUFlSCxNQUFmLFNBQWVBLE1BQWY7QUFBQSxRQUNoQiw2QkFBSyxXQUFVLFlBQWYsRUFBNEIsS0FBS0csVUFBVSxDQUFWLElBQWUsQ0FBQ0gsTUFBaEIsR0FBeUJGLFdBQVcsR0FBWCxDQUF6QixHQUEyQ0EsV0FBV0YsSUFBWCxDQUE1RSxHQURnQjtBQUFBLENBQWpCOztBQUlBLElBQUlRLFNBQVMsU0FBVEEsTUFBUztBQUFBLEtBQUVDLElBQUYsU0FBRUEsSUFBRjtBQUFBLEtBQVFDLE1BQVIsU0FBUUEsTUFBUjtBQUFBLFFBQ1o7QUFBQTtBQUFBLElBQUssV0FBVSxRQUFmO0FBQ0M7QUFBQTtBQUFBO0FBQU9ELFVBQU8sUUFBUCxHQUFrQkMsU0FBU0EsU0FBUyxRQUFsQixHQUE2QjtBQUF0RDtBQURELEVBRFk7QUFBQSxDQUFiIiwiZmlsZSI6ImNvbXBvbmVudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUGxheWVyID0gKHtjYXJkc30pID0+IChcblx0PGRpdiBjbGFzc05hbWU9J3BsYXllcic+XG5cdFx0e2NhcmRzLm1hcChjYXJkID0+IFxuXHRcdFx0PFBsYXllckNhcmQgY2FyZD17Y2FyZH0gLz5cblx0XHQpfVxuXHQ8L2Rpdj5cbilcblxudmFyIFBsYXllckNhcmQgPSAoe2NhcmR9KSA9PiAoXG5cdDxpbWcgY2xhc3NOYW1lID0ncGxheWVyQ2FyZCcgc3JjPXtjYXJkSW1nU3JjW2NhcmRdfSAvPlxuKVxuXG52YXIgRGVhbGVyID0gKHtjYXJkcywgcmV2ZWFsfSkgPT4gKFxuXHQ8ZGl2IGNsYXNzTmFtZT0nZGVhbGVyJz5cblx0XHR7Y2FyZHMubWFwKChjYXJkLCBpKSA9PiBcblx0XHRcdDxEZWFsZXJDYXJkIGNhcmQ9e2NhcmR9IGluZGV4PXtpfSByZXZlYWw9e3JldmVhbH0gLz5cblx0XHQpfVxuXHQ8L2Rpdj5cbilcblxudmFyIERlYWxlckNhcmQgPSAoe2NhcmQsIGluZGV4LCByZXZlYWx9KSA9PiAoXG5cdDxpbWcgY2xhc3NOYW1lPSdkZWFsZXJDYXJkJyBzcmM9e2luZGV4ID09PSAwICYmICFyZXZlYWwgPyBjYXJkSW1nU3JjWydiJ10gOiBjYXJkSW1nU3JjW2NhcmRdfSAvPlxuKVxuXG52YXIgUmVzdWx0ID0gKHtidXN0LCB3aW5uZXJ9KSA9PiAoXG5cdDxkaXYgY2xhc3NOYW1lPSdyZXN1bHQnPlxuXHRcdDxzcGFuPntidXN0ID8gJ0JVU1RFRCcgOiB3aW5uZXIgPyB3aW5uZXIgKyAnIFdJTlMhJyA6ICcnfTwvc3Bhbj5cblx0PC9kaXY+XG4pIl19