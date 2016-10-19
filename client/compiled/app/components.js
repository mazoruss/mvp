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

var HowTo = function HowTo(_ref6) {
	var info = _ref6.info;
	return React.createElement(
		'div',
		{ className: 'wall' },
		info === 'why' ? whyItWorks : info === 'counting' ? howTo : info === 'edge' ? theEdge : null
	);
};

var Footer = function Footer(_ref7) {
	var cb = _ref7.cb;
	return React.createElement(
		'div',
		{ className: 'footer' },
		React.createElement(
			'span',
			null,
			React.createElement(
				'label',
				{ 'for': 'username' },
				'Username:'
			),
			React.createElement('input', { id: 'username', type: 'text', name: 'username' })
		),
		React.createElement(
			'span',
			null,
			React.createElement(
				'label',
				{ 'for': 'password' },
				'Password:'
			),
			React.createElement('input', { id: 'password', type: 'password', name: 'password' })
		),
		React.createElement(
			'span',
			null,
			React.createElement(
				'button',
				{ onClick: function onClick() {
						return userlogin(cb);
					} },
				'Log In'
			)
		)
	);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9jb21wb25lbnRzLmpzIl0sIm5hbWVzIjpbIlBsYXllciIsImNhcmRzIiwibWFwIiwiY2FyZCIsIlBsYXllckNhcmQiLCJjYXJkSW1nU3JjIiwiRGVhbGVyIiwicmV2ZWFsIiwiaSIsIkRlYWxlckNhcmQiLCJpbmRleCIsIlJlc3VsdCIsImJ1c3QiLCJ3aW5uZXIiLCJIb3dUbyIsImluZm8iLCJ3aHlJdFdvcmtzIiwiaG93VG8iLCJ0aGVFZGdlIiwiRm9vdGVyIiwiY2IiLCJ1c2VybG9naW4iXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsU0FBUyxTQUFUQSxNQUFTO0FBQUEsS0FBRUMsS0FBRixRQUFFQSxLQUFGO0FBQUEsUUFDWjtBQUFBO0FBQUEsSUFBSyxXQUFVLFFBQWY7QUFDRUEsUUFBTUMsR0FBTixDQUFVO0FBQUEsVUFDVixvQkFBQyxVQUFELElBQVksTUFBTUMsSUFBbEIsR0FEVTtBQUFBLEdBQVY7QUFERixFQURZO0FBQUEsQ0FBYjs7QUFRQSxJQUFJQyxhQUFhLFNBQWJBLFVBQWE7QUFBQSxLQUFFRCxJQUFGLFNBQUVBLElBQUY7QUFBQSxRQUNoQiw2QkFBSyxXQUFXLFlBQWhCLEVBQTZCLEtBQUtFLFdBQVdGLElBQVgsQ0FBbEMsR0FEZ0I7QUFBQSxDQUFqQjs7QUFJQSxJQUFJRyxTQUFTLFNBQVRBLE1BQVM7QUFBQSxLQUFFTCxLQUFGLFNBQUVBLEtBQUY7QUFBQSxLQUFTTSxNQUFULFNBQVNBLE1BQVQ7QUFBQSxRQUNaO0FBQUE7QUFBQSxJQUFLLFdBQVUsUUFBZjtBQUNFTixRQUFNQyxHQUFOLENBQVUsVUFBQ0MsSUFBRCxFQUFPSyxDQUFQO0FBQUEsVUFDVixvQkFBQyxVQUFELElBQVksTUFBTUwsSUFBbEIsRUFBd0IsT0FBT0ssQ0FBL0IsRUFBa0MsUUFBUUQsTUFBMUMsR0FEVTtBQUFBLEdBQVY7QUFERixFQURZO0FBQUEsQ0FBYjs7QUFRQSxJQUFJRSxhQUFhLFNBQWJBLFVBQWE7QUFBQSxLQUFFTixJQUFGLFNBQUVBLElBQUY7QUFBQSxLQUFRTyxLQUFSLFNBQVFBLEtBQVI7QUFBQSxLQUFlSCxNQUFmLFNBQWVBLE1BQWY7QUFBQSxRQUNoQiw2QkFBSyxXQUFVLFlBQWYsRUFBNEIsS0FBS0csVUFBVSxDQUFWLElBQWUsQ0FBQ0gsTUFBaEIsR0FBeUJGLFdBQVcsR0FBWCxDQUF6QixHQUEyQ0EsV0FBV0YsSUFBWCxDQUE1RSxHQURnQjtBQUFBLENBQWpCOztBQUlBLElBQUlRLFNBQVMsU0FBVEEsTUFBUztBQUFBLEtBQUVDLElBQUYsU0FBRUEsSUFBRjtBQUFBLEtBQVFDLE1BQVIsU0FBUUEsTUFBUjtBQUFBLFFBQ1o7QUFBQTtBQUFBLElBQUssV0FBVSxRQUFmO0FBQ0M7QUFBQTtBQUFBO0FBQU9ELFVBQU8sUUFBUCxHQUFrQkMsU0FBU0EsU0FBUyxRQUFsQixHQUE2QjtBQUF0RDtBQURELEVBRFk7QUFBQSxDQUFiOztBQU1BLElBQUlDLFFBQVEsU0FBUkEsS0FBUTtBQUFBLEtBQUVDLElBQUYsU0FBRUEsSUFBRjtBQUFBLFFBQ1g7QUFBQTtBQUFBLElBQUssV0FBVSxNQUFmO0FBQ0NBLFdBQVMsS0FBVCxHQUNBQyxVQURBLEdBQ2FELFNBQVMsVUFBVCxHQUNiRSxLQURhLEdBQ0xGLFNBQVMsTUFBVCxHQUNSRyxPQURRLEdBQ0U7QUFKWCxFQURXO0FBQUEsQ0FBWjs7QUFVQSxJQUFJQyxTQUFTLFNBQVRBLE1BQVM7QUFBQSxLQUFFQyxFQUFGLFNBQUVBLEVBQUY7QUFBQSxRQUNaO0FBQUE7QUFBQSxJQUFLLFdBQVUsUUFBZjtBQUNHO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxNQUFPLE9BQUksVUFBWDtBQUFBO0FBQUEsSUFERjtBQUVFLGtDQUFPLElBQUcsVUFBVixFQUFxQixNQUFLLE1BQTFCLEVBQWlDLE1BQUssVUFBdEM7QUFGRixHQURIO0FBS0c7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLE1BQU8sT0FBSSxVQUFYO0FBQUE7QUFBQSxJQURGO0FBRUUsa0NBQU8sSUFBRyxVQUFWLEVBQXFCLE1BQUssVUFBMUIsRUFBcUMsTUFBSyxVQUExQztBQUZGLEdBTEg7QUFTRztBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsTUFBUSxTQUFTO0FBQUEsYUFBTUMsVUFBVUQsRUFBVixDQUFOO0FBQUEsTUFBakI7QUFBQTtBQUFBO0FBREY7QUFUSCxFQURZO0FBQUEsQ0FBYiIsImZpbGUiOiJjb21wb25lbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFBsYXllciA9ICh7Y2FyZHN9KSA9PiAoXG5cdDxkaXYgY2xhc3NOYW1lPSdwbGF5ZXInPlxuXHRcdHtjYXJkcy5tYXAoY2FyZCA9PiBcblx0XHRcdDxQbGF5ZXJDYXJkIGNhcmQ9e2NhcmR9IC8+XG5cdFx0KX1cblx0PC9kaXY+XG4pXG5cbnZhciBQbGF5ZXJDYXJkID0gKHtjYXJkfSkgPT4gKFxuXHQ8aW1nIGNsYXNzTmFtZSA9J3BsYXllckNhcmQnIHNyYz17Y2FyZEltZ1NyY1tjYXJkXX0gLz5cbilcblxudmFyIERlYWxlciA9ICh7Y2FyZHMsIHJldmVhbH0pID0+IChcblx0PGRpdiBjbGFzc05hbWU9J2RlYWxlcic+XG5cdFx0e2NhcmRzLm1hcCgoY2FyZCwgaSkgPT4gXG5cdFx0XHQ8RGVhbGVyQ2FyZCBjYXJkPXtjYXJkfSBpbmRleD17aX0gcmV2ZWFsPXtyZXZlYWx9IC8+XG5cdFx0KX1cblx0PC9kaXY+XG4pXG5cbnZhciBEZWFsZXJDYXJkID0gKHtjYXJkLCBpbmRleCwgcmV2ZWFsfSkgPT4gKFxuXHQ8aW1nIGNsYXNzTmFtZT0nZGVhbGVyQ2FyZCcgc3JjPXtpbmRleCA9PT0gMCAmJiAhcmV2ZWFsID8gY2FyZEltZ1NyY1snYiddIDogY2FyZEltZ1NyY1tjYXJkXX0gLz5cbilcblxudmFyIFJlc3VsdCA9ICh7YnVzdCwgd2lubmVyfSkgPT4gKFxuXHQ8ZGl2IGNsYXNzTmFtZT0ncmVzdWx0Jz5cblx0XHQ8c3Bhbj57YnVzdCA/ICdCVVNURUQnIDogd2lubmVyID8gd2lubmVyICsgJyBXSU5TIScgOiAnJ308L3NwYW4+XG5cdDwvZGl2PlxuKVxuXG52YXIgSG93VG8gPSAoe2luZm99KSA9PiAoXG5cdDxkaXYgY2xhc3NOYW1lPSd3YWxsJz5cblx0e2luZm8gPT09ICd3aHknID8gXG5cdFx0d2h5SXRXb3JrcyA6IGluZm8gPT09ICdjb3VudGluZycgP1xuXHRcdGhvd1RvIDogaW5mbyA9PT0gJ2VkZ2UnID8gXG5cdFx0dGhlRWRnZSA6IG51bGxcblx0fVxuXHQ8L2Rpdj5cbilcblxudmFyIEZvb3RlciA9ICh7Y2J9KSA9PiAoXG5cdDxkaXYgY2xhc3NOYW1lPSdmb290ZXInPlxuICAgIDxzcGFuPlxuICAgICAgPGxhYmVsIGZvcj1cInVzZXJuYW1lXCI+VXNlcm5hbWU6PC9sYWJlbD5cbiAgICAgIDxpbnB1dCBpZD1cInVzZXJuYW1lXCIgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlcm5hbWVcIiAvPlxuICAgIDwvc3Bhbj5cbiAgICA8c3Bhbj5cbiAgICAgIDxsYWJlbCBmb3I9XCJwYXNzd29yZFwiPlBhc3N3b3JkOjwvbGFiZWw+XG4gICAgICA8aW5wdXQgaWQ9XCJwYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIC8+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB1c2VybG9naW4oY2IpfT5Mb2cgSW48L2J1dHRvbj5cbiAgICA8L3NwYW4+XG5cdDwvZGl2PlxuKSJdfQ==