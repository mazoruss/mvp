'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// babel . --out-dir compiled --presets=es2015,react --ignore=node_modules,compiled --source-maps inline --watch

var PlayerCard = function PlayerCard(_ref) {
	var card = _ref.card;
	return React.createElement('img', { src: cardImgSrc[card] });
};

var Player = function Player(_ref2) {
	var cards = _ref2.cards;
	return React.createElement(
		'div',
		{ className: 'player' },
		cards.map(function (card) {
			return React.createElement(PlayerCard, { card: card });
		})
	);
};

var Busted = function Busted(_ref3) {
	var bust = _ref3.bust;
	return React.createElement(
		'div',
		{ className: 'busted' },
		React.createElement(
			'span',
			null,
			bust ? 'BUSTED' : ''
		)
	);
};

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		var deck = new Deck();
		_this.state = {
			deck: deck,
			playerCards: [],
			busted: false
		};
		return _this;
	}

	_createClass(App, [{
		key: 'hitMe',
		value: function hitMe() {
			if (this.state.busted) {
				return;
			}
			var cards = this.state.playerCards.slice();
			cards.push(this.state.deck.draw());
			this.setState({
				playerCards: cards
			});
			if (isBust(cards)) {
				this.setState({
					busted: true
				});
			}
		}
	}, {
		key: 'reset',
		value: function reset() {
			var deck = new Deck();
			this.setState({
				deck: deck,
				playerCards: [],
				busted: false
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'span',
					null,
					'Black Jack Table'
				),
				React.createElement('div', { className: 'dealer' }),
				React.createElement(
					'button',
					{ onClick: this.hitMe.bind(this) },
					'Hit Me'
				),
				React.createElement(
					'button',
					{ onClick: this.reset.bind(this) },
					'Restart'
				),
				React.createElement(Player, { cards: this.state.playerCards }),
				React.createElement(Busted, { bust: this.state.busted }),
				React.createElement('div', { className: 'library' }),
				React.createElement('div', { className: 'info' })
			);
		}
	}]);

	return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9hcHAuanMiXSwibmFtZXMiOlsiUGxheWVyQ2FyZCIsImNhcmQiLCJjYXJkSW1nU3JjIiwiUGxheWVyIiwiY2FyZHMiLCJtYXAiLCJCdXN0ZWQiLCJidXN0IiwiQXBwIiwicHJvcHMiLCJkZWNrIiwiRGVjayIsInN0YXRlIiwicGxheWVyQ2FyZHMiLCJidXN0ZWQiLCJzbGljZSIsInB1c2giLCJkcmF3Iiwic2V0U3RhdGUiLCJpc0J1c3QiLCJoaXRNZSIsImJpbmQiLCJyZXNldCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBRUEsSUFBSUEsYUFBYSxTQUFiQSxVQUFhO0FBQUEsS0FBRUMsSUFBRixRQUFFQSxJQUFGO0FBQUEsUUFDaEIsNkJBQUssS0FBS0MsV0FBV0QsSUFBWCxDQUFWLEdBRGdCO0FBQUEsQ0FBakI7O0FBSUEsSUFBSUUsU0FBUyxTQUFUQSxNQUFTO0FBQUEsS0FBRUMsS0FBRixTQUFFQSxLQUFGO0FBQUEsUUFDWjtBQUFBO0FBQUEsSUFBSyxXQUFVLFFBQWY7QUFDRUEsUUFBTUMsR0FBTixDQUFVO0FBQUEsVUFDVixvQkFBQyxVQUFELElBQVksTUFBTUosSUFBbEIsR0FEVTtBQUFBLEdBQVY7QUFERixFQURZO0FBQUEsQ0FBYjs7QUFRQSxJQUFJSyxTQUFTLFNBQVRBLE1BQVM7QUFBQSxLQUFFQyxJQUFGLFNBQUVBLElBQUY7QUFBQSxRQUNaO0FBQUE7QUFBQSxJQUFLLFdBQVUsUUFBZjtBQUNDO0FBQUE7QUFBQTtBQUFPQSxVQUFPLFFBQVAsR0FBa0I7QUFBekI7QUFERCxFQURZO0FBQUEsQ0FBYjs7SUFPTUMsRzs7O0FBQ0wsY0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLHdHQUNaQSxLQURZOztBQUVsQixNQUFJQyxPQUFPLElBQUlDLElBQUosRUFBWDtBQUNBLFFBQUtDLEtBQUwsR0FBYTtBQUNaRixTQUFNQSxJQURNO0FBRVpHLGdCQUFhLEVBRkQ7QUFHWkMsV0FBUTtBQUhJLEdBQWI7QUFIa0I7QUFRbEI7Ozs7MEJBRU87QUFDUCxPQUFHLEtBQUtGLEtBQUwsQ0FBV0UsTUFBZCxFQUFzQjtBQUNyQjtBQUNBO0FBQ0QsT0FBSVYsUUFBUSxLQUFLUSxLQUFMLENBQVdDLFdBQVgsQ0FBdUJFLEtBQXZCLEVBQVo7QUFDQVgsU0FBTVksSUFBTixDQUFXLEtBQUtKLEtBQUwsQ0FBV0YsSUFBWCxDQUFnQk8sSUFBaEIsRUFBWDtBQUNBLFFBQUtDLFFBQUwsQ0FBYztBQUNiTCxpQkFBYVQ7QUFEQSxJQUFkO0FBR0EsT0FBSWUsT0FBT2YsS0FBUCxDQUFKLEVBQW1CO0FBQ2xCLFNBQUtjLFFBQUwsQ0FBYztBQUNiSixhQUFRO0FBREssS0FBZDtBQUdBO0FBQ0Q7OzswQkFFTztBQUNQLE9BQUlKLE9BQU8sSUFBSUMsSUFBSixFQUFYO0FBQ0EsUUFBS08sUUFBTCxDQUFjO0FBQ2JSLFVBQU1BLElBRE87QUFFYkcsaUJBQWEsRUFGQTtBQUdiQyxZQUFRO0FBSEssSUFBZDtBQUtBOzs7MkJBRVE7QUFDUixVQUNDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FERDtBQUVDLGlDQUFLLFdBQVUsUUFBZixHQUZEO0FBSUM7QUFBQTtBQUFBLE9BQVEsU0FBUyxLQUFLTSxLQUFMLENBQVdDLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBakI7QUFBQTtBQUFBLEtBSkQ7QUFLQztBQUFBO0FBQUEsT0FBUSxTQUFTLEtBQUtDLEtBQUwsQ0FBV0QsSUFBWCxDQUFnQixJQUFoQixDQUFqQjtBQUFBO0FBQUEsS0FMRDtBQU1DLHdCQUFDLE1BQUQsSUFBUSxPQUFPLEtBQUtULEtBQUwsQ0FBV0MsV0FBMUIsR0FORDtBQU9DLHdCQUFDLE1BQUQsSUFBUSxNQUFNLEtBQUtELEtBQUwsQ0FBV0UsTUFBekIsR0FQRDtBQVFDLGlDQUFLLFdBQVUsU0FBZixHQVJEO0FBVUMsaUNBQUssV0FBVSxNQUFmO0FBVkQsSUFERDtBQWVBOzs7O0VBcERnQlMsTUFBTUMsUzs7QUF3RHhCQyxTQUFTQyxNQUFULENBQWdCLG9CQUFFLEdBQUYsT0FBaEIsRUFBMEJDLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBMUIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYmFiZWwgLiAtLW91dC1kaXIgY29tcGlsZWQgLS1wcmVzZXRzPWVzMjAxNSxyZWFjdCAtLWlnbm9yZT1ub2RlX21vZHVsZXMsY29tcGlsZWQgLS1zb3VyY2UtbWFwcyBpbmxpbmUgLS13YXRjaFxuXG52YXIgUGxheWVyQ2FyZCA9ICh7Y2FyZH0pID0+IChcblx0PGltZyBzcmM9e2NhcmRJbWdTcmNbY2FyZF19IC8+XG4pXG5cbnZhciBQbGF5ZXIgPSAoe2NhcmRzfSkgPT4gKFxuXHQ8ZGl2IGNsYXNzTmFtZT0ncGxheWVyJz5cblx0XHR7Y2FyZHMubWFwKGNhcmQgPT4gXG5cdFx0XHQ8UGxheWVyQ2FyZCBjYXJkPXtjYXJkfSAvPlxuXHRcdCl9XG5cdDwvZGl2PlxuKVxuXG52YXIgQnVzdGVkID0gKHtidXN0fSkgPT4gKFxuXHQ8ZGl2IGNsYXNzTmFtZT0nYnVzdGVkJz5cblx0XHQ8c3Bhbj57YnVzdCA/ICdCVVNURUQnIDogJyd9PC9zcGFuPlxuXHQ8L2Rpdj5cbilcblxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR2YXIgZGVjayA9IG5ldyBEZWNrKCk7XG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdGRlY2s6IGRlY2ssXG5cdFx0XHRwbGF5ZXJDYXJkczogW10sXG5cdFx0XHRidXN0ZWQ6IGZhbHNlXG5cdFx0fVxuXHR9XG5cblx0aGl0TWUoKSB7XG5cdFx0aWYodGhpcy5zdGF0ZS5idXN0ZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IGNhcmRzID0gdGhpcy5zdGF0ZS5wbGF5ZXJDYXJkcy5zbGljZSgpO1xuXHRcdGNhcmRzLnB1c2godGhpcy5zdGF0ZS5kZWNrLmRyYXcoKSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRwbGF5ZXJDYXJkczogY2FyZHNcblx0XHR9KTtcblx0XHRpZiAoaXNCdXN0KGNhcmRzKSkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGJ1c3RlZDogdHJ1ZVxuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHRyZXNldCgpIHtcblx0XHR2YXIgZGVjayA9IG5ldyBEZWNrKCk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRkZWNrOiBkZWNrLFxuXHRcdFx0cGxheWVyQ2FyZHM6IFtdLFxuXHRcdFx0YnVzdGVkOiBmYWxzZVxuXHRcdH0pXG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxzcGFuPkJsYWNrIEphY2sgVGFibGU8L3NwYW4+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdkZWFsZXInPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhpdE1lLmJpbmQodGhpcyl9PkhpdCBNZTwvYnV0dG9uPlxuXHRcdFx0XHQ8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucmVzZXQuYmluZCh0aGlzKX0+UmVzdGFydDwvYnV0dG9uPlx0XG5cdFx0XHRcdDxQbGF5ZXIgY2FyZHM9e3RoaXMuc3RhdGUucGxheWVyQ2FyZHN9IC8+XG5cdFx0XHRcdDxCdXN0ZWQgYnVzdD17dGhpcy5zdGF0ZS5idXN0ZWR9IC8+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdsaWJyYXJ5Jz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdpbmZvJz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuXG5SZWFjdERPTS5yZW5kZXIoPCBBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7Il19