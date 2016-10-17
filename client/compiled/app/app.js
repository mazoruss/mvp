'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		var deck = new Deck();
		_this.state = defaultState();
		_this.reset();
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
			this.setState({ playerCards: cards });
			if (isBust(cards)) {
				this.setState({ busted: true, reveal: true });
			}
		}
	}, {
		key: 'reset',
		value: function reset() {
			this.setState(defaultState());
			setTimeout(this.dealerDraw.bind(this), 250);
			setTimeout(this.dealerDraw.bind(this), 500);
			setTimeout(this.hitMe.bind(this), 750);
			setTimeout(this.hitMe.bind(this), 1000);
		}
	}, {
		key: 'dealerDraw',
		value: function dealerDraw() {
			var cards = this.state.dealerCards.slice();
			cards.push(this.state.deck.draw());
			this.setState({ dealerCards: cards });
		}
	}, {
		key: 'keep',
		value: function keep() {
			if (this.state.reveal) {
				this.setState({ reveal: false, playerCards: [],
					dealerCards: [], busted: false, winner: '' });
				setTimeout(this.dealerDraw.bind(this), 250);
				setTimeout(this.dealerDraw.bind(this), 500);
				setTimeout(this.hitMe.bind(this), 750);
				setTimeout(this.hitMe.bind(this), 1000);
			} else {
				this.setState({ reveal: true });
				var cards = this.state.dealerCards.slice();
				while (points(cards) < 17) {
					cards.push(this.state.deck.draw());
					this.setState({ dealerCards: cards });
				}
				if (points(cards) > 21 || points(cards) < points(this.state.playerCards)) {
					this.setState({ winner: 'Player' });
				} else {
					this.setState({ winner: 'Dealer' });
				}
			}
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
				' ',
				React.createElement('br', null),
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
				React.createElement(
					'button',
					{ onClick: this.keep.bind(this) },
					this.state.reveal ? 'Next Hand' : 'Keep'
				),
				React.createElement(Dealer, { cards: this.state.dealerCards, reveal: this.state.reveal }),
				React.createElement(Player, { cards: this.state.playerCards }),
				React.createElement(Result, { bust: this.state.busted, winner: this.state.winner })
			);
		}
	}]);

	return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

// babel . --out-dir compiled --presets=es2015,react --ignore=node_modules,compiled --source-maps inline --watch
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9hcHAuanMiXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJkZWNrIiwiRGVjayIsInN0YXRlIiwiZGVmYXVsdFN0YXRlIiwicmVzZXQiLCJidXN0ZWQiLCJjYXJkcyIsInBsYXllckNhcmRzIiwic2xpY2UiLCJwdXNoIiwiZHJhdyIsInNldFN0YXRlIiwiaXNCdXN0IiwicmV2ZWFsIiwic2V0VGltZW91dCIsImRlYWxlckRyYXciLCJiaW5kIiwiaGl0TWUiLCJkZWFsZXJDYXJkcyIsIndpbm5lciIsInBvaW50cyIsImtlZXAiLCJSZWFjdCIsIkNvbXBvbmVudCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxHOzs7QUFDTCxjQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsd0dBQ1pBLEtBRFk7O0FBRWxCLE1BQUlDLE9BQU8sSUFBSUMsSUFBSixFQUFYO0FBQ0EsUUFBS0MsS0FBTCxHQUFhQyxjQUFiO0FBQ0EsUUFBS0MsS0FBTDtBQUprQjtBQUtsQjs7OzswQkFFTztBQUNQLE9BQUcsS0FBS0YsS0FBTCxDQUFXRyxNQUFkLEVBQXNCO0FBQUU7QUFBUztBQUNqQyxPQUFJQyxRQUFRLEtBQUtKLEtBQUwsQ0FBV0ssV0FBWCxDQUF1QkMsS0FBdkIsRUFBWjtBQUNBRixTQUFNRyxJQUFOLENBQVcsS0FBS1AsS0FBTCxDQUFXRixJQUFYLENBQWdCVSxJQUFoQixFQUFYO0FBQ0EsUUFBS0MsUUFBTCxDQUFjLEVBQUVKLGFBQWFELEtBQWYsRUFBZDtBQUNBLE9BQUlNLE9BQU9OLEtBQVAsQ0FBSixFQUFtQjtBQUNsQixTQUFLSyxRQUFMLENBQWMsRUFBRU4sUUFBUSxJQUFWLEVBQWdCUSxRQUFRLElBQXhCLEVBQWQ7QUFDQTtBQUVEOzs7MEJBRU87QUFDUCxRQUFLRixRQUFMLENBQWNSLGNBQWQ7QUFDQVcsY0FBVyxLQUFLQyxVQUFMLENBQWdCQyxJQUFo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TUFBRCxJQUFRLE1BQU0sS0FBS0wsS0FBTCxDQUFXRyxNQUF6QixFQUFpQyxRQUFRLEtBQUtILEtBQUwsQ0FBV2lCLE1BQXBEO0FBVkQsSUFERDtBQWVBOzs7O0VBeEVnQkcsTUFBTUMsUzs7QUEyRXhCQyxTQUFTQyxNQUFULENBQWdCLG9CQUFFLEdBQUYsT0FBaEIsRUFBMEJDLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBMUI7O0FBRUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dmFyIGRlY2sgPSBuZXcgRGVjaygpO1xuXHRcdHRoaXMuc3RhdGUgPSBkZWZhdWx0U3RhdGUoKTtcblx0XHR0aGlzLnJlc2V0KCk7XG5cdH1cblxuXHRoaXRNZSgpIHtcblx0XHRpZih0aGlzLnN0YXRlLmJ1c3RlZCkgeyByZXR1cm47IH1cblx0XHRsZXQgY2FyZHMgPSB0aGlzLnN0YXRlLnBsYXllckNhcmRzLnNsaWNlKCk7XG5cdFx0Y2FyZHMucHVzaCh0aGlzLnN0YXRlLmRlY2suZHJhdygpKTtcblx0XHR0aGlzLnNldFN0YXRlKHsgcGxheWVyQ2FyZHM6IGNhcmRzIH0pO1xuXHRcdGlmIChpc0J1c3QoY2FyZHMpKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgYnVzdGVkOiB0cnVlLCByZXZlYWw6IHRydWUgfSlcblx0XHR9XG5cdFx0XG5cdH1cblxuXHRyZXNldCgpIHtcblx0XHR0aGlzLnNldFN0YXRlKGRlZmF1bHRTdGF0ZSgpKTtcblx0XHRzZXRUaW1lb3V0KHRoaXMuZGVhbGVyRHJhdy5iaW5kKHRoaXMpLCAyNTApO1xuXHRcdHNldFRpbWVvdXQodGhpcy5kZWFsZXJEcmF3LmJpbmQodGhpcyksIDUwMCk7XG5cdFx0c2V0VGltZW91dCh0aGlzLmhpdE1lLmJpbmQodGhpcyksIDc1MCk7XG5cdFx0c2V0VGltZW91dCh0aGlzLmhpdE1lLmJpbmQodGhpcyksIDEwMDApO1xuXHR9XG5cblx0ZGVhbGVyRHJhdygpIHtcblx0XHRsZXQgY2FyZHMgPSB0aGlzLnN0YXRlLmRlYWxlckNhcmRzLnNsaWNlKCk7XG5cdFx0Y2FyZHMucHVzaCh0aGlzLnN0YXRlLmRlY2suZHJhdygpKTtcblx0XHR0aGlzLnNldFN0YXRlKHsgZGVhbGVyQ2FyZHM6IGNhcmRzIH0pO1xuXHR9XG5cblx0a2VlcCgpIHtcblx0XHRpZiAodGhpcy5zdGF0ZS5yZXZlYWwpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoeyByZXZlYWw6IGZhbHNlLCBwbGF5ZXJDYXJkczogW10sIFxuXHRcdFx0XHRkZWFsZXJDYXJkczogW10sIGJ1c3RlZDogZmFsc2UsIHdpbm5lcjogJyd9KTtcblx0XHRcdHNldFRpbWVvdXQodGhpcy5kZWFsZXJEcmF3LmJpbmQodGhpcyksIDI1MCk7XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMuZGVhbGVyRHJhdy5iaW5kKHRoaXMpLCA1MDApO1xuXHRcdFx0c2V0VGltZW91dCh0aGlzLmhpdE1lLmJpbmQodGhpcyksIDc1MCk7XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMuaGl0TWUuYmluZCh0aGlzKSwgMTAwMCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3JldmVhbDogdHJ1ZX0pO1xuXHRcdFx0bGV0IGNhcmRzID0gdGhpcy5zdGF0ZS5kZWFsZXJDYXJkcy5zbGljZSgpO1xuXHRcdFx0d2hpbGUocG9pbnRzKGNhcmRzKSA8IDE3KSB7XG5cdFx0XHRcdGNhcmRzLnB1c2godGhpcy5zdGF0ZS5kZWNrLmRyYXcoKSk7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoeyBkZWFsZXJDYXJkczogY2FyZHMgfSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAocG9pbnRzKGNhcmRzKSA+IDIxIHx8IHBvaW50cyhjYXJkcykgPCBwb2ludHModGhpcy5zdGF0ZS5wbGF5ZXJDYXJkcykpIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7d2lubmVyOiAnUGxheWVyJ30pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7d2lubmVyOiAnRGVhbGVyJ30pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PHNwYW4+QmxhY2sgSmFjayBUYWJsZTwvc3Bhbj4gPGJyIC8+XG5cblx0XHRcdFx0PGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhpdE1lLmJpbmQodGhpcyl9PkhpdCBNZTwvYnV0dG9uPlxuXHRcdFx0XHQ8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucmVzZXQuYmluZCh0aGlzKX0+UmVzdGFydDwvYnV0dG9uPlx0XG5cdFx0XHRcdDxidXR0b24gb25DbGljaz17dGhpcy5rZWVwLmJpbmQodGhpcyl9Pnt0aGlzLnN0YXRlLnJldmVhbCA/ICdOZXh0IEhhbmQnIDogJ0tlZXAnfTwvYnV0dG9uPlx0XG5cblx0XHRcdFx0PERlYWxlciBjYXJkcz17dGhpcy5zdGF0ZS5kZWFsZXJDYXJkc30gcmV2ZWFsPXt0aGlzLnN0YXRlLnJldmVhbH0vPlxuXHRcdFx0XHRcblx0XHRcdFx0PFBsYXllciBjYXJkcz17dGhpcy5zdGF0ZS5wbGF5ZXJDYXJkc30gLz5cblx0XHRcdFx0PFJlc3VsdCBidXN0PXt0aGlzLnN0YXRlLmJ1c3RlZH0gd2lubmVyPXt0aGlzLnN0YXRlLndpbm5lcn0gLz5cblxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8IEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcblxuLy8gYmFiZWwgLiAtLW91dC1kaXIgY29tcGlsZWQgLS1wcmVzZXRzPWVzMjAxNSxyZWFjdCAtLWlnbm9yZT1ub2RlX21vZHVsZXMsY29tcGlsZWQgLS1zb3VyY2UtbWFwcyBpbmxpbmUgLS13YXRjaFxuXG5cblxuXG4iXX0=