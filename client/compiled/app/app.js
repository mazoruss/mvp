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
		_this.state.money = Number(props.money);
		return _this;
	}

	//player draws


	_createClass(App, [{
		key: 'hitMe',
		value: function hitMe() {
			// if game is over, hit me does nothing
			if (this.state.busted || this.state.reveal || this.state.dealerCards.length === 0) {
				return;
			}
			//set state is async, so using cards to keep track of status
			var cards = this.state.playerCards.slice();
			cards.push(this.state.deck.draw());
			this.setState({ playerCards: cards });
			// if player busted, set game state to game over
			if (isBust(cards)) {
				this.setState({ busted: true, reveal: true, money: this.state.money - this.state.bet });
			}
		}

		//keep, or deal

	}, {
		key: 'keep',
		value: function keep() {
			var _this2 = this;

			if (this.state.reveal || this.state.playerCards.length === 0) {
				this.start(true);
			} else {
				this.setState({ reveal: true });
				var animate = [];
				var cards = this.state.dealerCards.slice();

				var _loop = function _loop() {
					cards.push(_this2.state.deck.draw());
					var hand = cards.slice();
					animate.push(function () {
						return _this2.setState({ dealerCards: hand });
					});
				};

				while (points(cards) < 17) {
					_loop();
				}

				if (points(cards) > 21 || points(cards) < points(this.state.playerCards)) {
					animate.push(function () {
						return _this2.setState({ winner: 'PLAYER', money: _this2.state.money + _this2.state.bet });
					});
				} else {
					animate.push(function () {
						return _this2.setState({ winner: 'DEALER', money: _this2.state.money - _this2.state.bet });
					});
				}

				animate.push(this.needShuffle.bind(this));
				animate.forEach(function (func, i) {
					setTimeout(func, (i + 1) * 500);
				});
			}
		}

		//checks if deck has less than 10 cards, if so, shuffle

	}, {
		key: 'needShuffle',
		value: function needShuffle() {
			if (this.state.deck.cardsLeft() < 10) {
				this.reset();
			}
		}

		// dealer draws card

	}, {
		key: 'dealerDraw',
		value: function dealerDraw() {
			var cards = this.state.dealerCards.slice();
			cards.push(this.state.deck.draw());
			this.setState({ dealerCards: cards });
		}

		//shuffles the deck

	}, {
		key: 'reset',
		value: function reset() {
			this.setState(defaultState());
		}

		//deals hands to begin the game

	}, {
		key: 'start',
		value: function start(bool) {
			if (this.state.playerCards.length === 0 || bool) {
				this.setState({ reveal: false, playerCards: [], dealerCards: [], busted: false, winner: '' });
				setTimeout(this.dealerDraw.bind(this), 250);
				setTimeout(this.dealerDraw.bind(this), 500);
				setTimeout(this.hitMe.bind(this), 750);
				setTimeout(this.hitMe.bind(this), 1000);
				setTimeout(this.checkBlackJack.bind(this), 1250);
			}
		}

		//if starting hand is blackjack, auto win, pay 1.5x

	}, {
		key: 'checkBlackJack',
		value: function checkBlackJack() {
			if (points(this.state.playerCards) === 21) {
				this.setState({ winner: 'PLAYER', money: this.state.money + this.state.bet * 1.5, reveal: true });
			}
		}

		// updates betting amount 

	}, {
		key: 'updateBet',
		value: function updateBet(amount) {
			if (this.state.reveal || this.state.playerCards.length === 0) {
				this.setState({ bet: amount });
			}
		}
	}, {
		key: 'display',
		value: function display(info) {
			this.setState({ display: info });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'info' },
					React.createElement(
						'div',
						{ className: 'cardsLeft' },
						' Cards left: ',
						this.state.deck.cardsLeft()
					),
					React.createElement(
						'div',
						{ className: 'count' },
						' The Count: ',
						this.state.deck.count()
					)
				),
				React.createElement(
					'div',
					{ className: 'display' },
					React.createElement(
						'div',
						{ onClick: function onClick() {
								return _this3.display('why');
							} },
						'Why it works'
					),
					React.createElement(
						'div',
						{ onClick: function onClick() {
								return _this3.display('counting');
							} },
						'How to count'
					),
					React.createElement(
						'div',
						{ onClick: function onClick() {
								return _this3.display('edge');
							} },
						'The edge'
					),
					React.createElement(
						'div',
						{ onClick: function onClick() {
								return _this3.display('none');
							}, className: 'hide' },
						'Hide'
					)
				),
				React.createElement(
					'div',
					{ className: 'howTo' },
					this.state.display === 'none' ? null : React.createElement(HowTo, { info: this.state.display })
				),
				React.createElement(
					'div',
					{ className: 'game' },
					React.createElement(
						'div',
						{ className: 'title' },
						React.createElement('img', { src: 'cards/title.png', className: 'titleImage' })
					),
					React.createElement(
						'div',
						{ className: 'table' },
						React.createElement(Dealer, { cards: this.state.dealerCards, reveal: this.state.reveal }),
						React.createElement(Player, { cards: this.state.playerCards }),
						React.createElement(Result, { bust: this.state.busted, winner: this.state.winner }),
						React.createElement(
							'div',
							{ className: 'rightButtons' },
							React.createElement(
								'span',
								{ onClick: this.hitMe.bind(this) },
								'Hit Me'
							),
							' ',
							React.createElement('br', null),
							React.createElement(
								'span',
								{ onClick: this.keep.bind(this) },
								this.state.reveal || this.state.playerCards.length === 0 ? 'Deal!' : 'Keep'
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'bets' },
						React.createElement(
							'span',
							{ className: 'bet' },
							'Bet: $',
							this.state.bet
						),
						' ',
						React.createElement('br', null),
						React.createElement(
							'span',
							{ className: 'wallet' },
							'Wallet: $',
							this.state.money,
							' '
						)
					),
					React.createElement(
						'div',
						{ className: 'allBets' },
						React.createElement(
							'div',
							{ className: 'bet2', onClick: function onClick() {
									return _this3.updateBet(2);
								} },
							'2'
						),
						React.createElement(
							'div',
							{ className: 'bet5', onClick: function onClick() {
									return _this3.updateBet(5);
								} },
							'5'
						),
						React.createElement(
							'div',
							{ className: 'bet10', onClick: function onClick() {
									return _this3.updateBet(10);
								} },
							'10'
						),
						React.createElement(
							'div',
							{ className: 'bet25', onClick: function onClick() {
									return _this3.updateBet(25);
								} },
							'25'
						),
						React.createElement(
							'div',
							{ className: 'bet50', onClick: function onClick() {
									return _this3.updateBet(50);
								} },
							'50'
						),
						React.createElement(
							'div',
							{ className: 'bet100', onClick: function onClick() {
									return _this3.updateBet(100);
								} },
							'100'
						),
						React.createElement(
							'div',
							{ className: 'bet200', onClick: function onClick() {
									return _this3.updateBet(200);
								} },
							'200'
						)
					)
				)
			);
		}
	}]);

	return App;
}(React.Component);

ReactDOM.render(React.createElement(App, { money: '1000' }), document.getElementById('app'));

// babel . --out-dir compiled --presets=es2015,react --ignore=node_modules,compiled --source-maps inline --watch
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9hcHAuanMiXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJkZWNrIiwiRGVjayIsInN0YXRlIiwiZGVmYXVsdFN0YXRlIiwibW9uZXkiLCJOdW1iZXIiLCJidXN0ZWQiLCJyZXZlYWwiLCJkZWFsZXJDYXJkcyIsImxlbmd0aCIsImNhcmRzIiwicGxheWVyQ2FyZHMiLCJzbGljZSIsInB1c2giLCJkcmF3Iiwic2V0U3RhdGUiLCJpc0J1c3QiLCJiZXQiLCJzdGFydCIsImFuaW1hdGUiLCJoYW5kIiwicG9pbnRzIiwid2lubmVyIiwibmVlZFNodWZmbGUiLCJiaW5kIiwiZm9yRWFjaCIsImZ1bmMiLCJpIiwic2V0VGltZW91dCIsImNhcmRzTGVmdCIsInJlc2V0IiwiYm9vbCIsImRlYWxlckRyYXciLCJoaXRNZSIsImNoZWNrQmxhY2tKYWNrIiwiYW1vdW50IiwiaW5mbyIsImRpc3BsYXkiLCJjb3VudCIsImtlZXAiLCJ1cGRhdGVCZXQiLCJSZWFjdCIsIkNvbXBvbmVudCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxHOzs7QUFFTCxjQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsd0dBQ1pBLEtBRFk7O0FBRWxCLE1BQUlDLE9BQU8sSUFBSUMsSUFBSixFQUFYO0FBQ0EsUUFBS0MsS0FBTCxHQUFhQyxjQUFiO0FBQ0EsUUFBS0QsS0FBTCxDQUFXRSxLQUFYLEdBQW1CQyxPQUFPTixNQUFNSyxLQUFiLENBQW5CO0FBSmtCO0FBS2xCOztBQUVEOzs7OzswQkFDUTtBQUNQO0FBQ0EsT0FBRyxLQUFLRixLQUFMLENBQVdJLE1BQVgsSUFBcUIsS0FBS0osS0FBTCxDQUFXSyxNQUFoQyxJQUEwQyxLQUFLTCxLQUFMLENBQVdNLFdBQVgsQ0FBdUJDLE1BQXZCLEtBQWtDLENBQS9FLEVBQWtGO0FBQUU7QUFBUztBQUM3RjtBQUNBLE9BQUlDLFFBQVEsS0FB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ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHZhciBkZWNrID0gbmV3IERlY2soKTtcblx0XHR0aGlzLnN0YXRlID0gZGVmYXVsdFN0YXRlKCk7XG5cdFx0dGhpcy5zdGF0ZS5tb25leSA9IE51bWJlcihwcm9wcy5tb25leSk7XG5cdH1cblxuXHQvL3BsYXllciBkcmF3c1xuXHRoaXRNZSgpIHtcblx0XHQvLyBpZiBnYW1lIGlzIG92ZXIsIGhpdCBtZSBkb2VzIG5vdGhpbmdcblx0XHRpZih0aGlzLnN0YXRlLmJ1c3RlZCB8fCB0aGlzLnN0YXRlLnJldmVhbCB8fCB0aGlzLnN0YXRlLmRlYWxlckNhcmRzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cblx0XHQvL3NldCBzdGF0ZSBpcyBhc3luYywgc28gdXNpbmcgY2FyZHMgdG8ga2VlcCB0cmFjayBvZiBzdGF0dXNcblx0XHRsZXQgY2FyZHMgPSB0aGlzLnN0YXRlLnBsYXllckNhcmRzLnNsaWNlKCk7XG5cdFx0Y2FyZHMucHVzaCh0aGlzLnN0YXRlLmRlY2suZHJhdygpKTtcblx0XHR0aGlzLnNldFN0YXRlKHsgcGxheWVyQ2FyZHM6IGNhcmRzIH0pO1xuXHRcdC8vIGlmIHBsYXllciBidXN0ZWQsIHNldCBnYW1lIHN0YXRlIHRvIGdhbWUgb3ZlclxuXHRcdGlmIChpc0J1c3QoY2FyZHMpKSB7IFxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGJ1c3RlZDogdHJ1ZSwgcmV2ZWFsOiB0cnVlLCBtb25leTogdGhpcy5zdGF0ZS5tb25leSAtIHRoaXMuc3RhdGUuYmV0IH0pO1xuXHRcdH1cblx0fVxuXG5cdC8va2VlcCwgb3IgZGVhbFxuXHRrZWVwKCkge1xuXHRcdGlmICh0aGlzLnN0YXRlLnJldmVhbCB8fCB0aGlzLnN0YXRlLnBsYXllckNhcmRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0dGhpcy5zdGFydCh0cnVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7cmV2ZWFsOiB0cnVlfSk7XG5cdFx0XHRsZXQgYW5pbWF0ZSA9IFtdO1xuXHRcdFx0bGV0IGNhcmRzID0gdGhpcy5zdGF0ZS5kZWFsZXJDYXJkcy5zbGljZSgpO1xuXG5cdFx0XHR3aGlsZShwb2ludHMoY2FyZHMpIDwgMTcpIHtcblx0XHRcdFx0Y2FyZHMucHVzaCh0aGlzLnN0YXRlLmRlY2suZHJhdygpKTtcblx0XHRcdFx0bGV0IGhhbmQgPSBjYXJkcy5zbGljZSgpO1xuXHRcdFx0XHRhbmltYXRlLnB1c2goKCkgPT4gdGhpcy5zZXRTdGF0ZSh7IGRlYWxlckNhcmRzOiBoYW5kIH0pKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHBvaW50cyhjYXJkcykgPiAyMSB8fCBwb2ludHMoY2FyZHMpIDwgcG9pbnRzKHRoaXMuc3RhdGUucGxheWVyQ2FyZHMpKSB7XG5cdFx0XHRcdGFuaW1hdGUucHVzaCggKCkgPT4gdGhpcy5zZXRTdGF0ZSh7d2lubmVyOiAnUExBWUVSJywgbW9uZXk6IHRoaXMuc3RhdGUubW9uZXkgKyB0aGlzLnN0YXRlLmJldH0pICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhbmltYXRlLnB1c2goICgpID0+IHRoaXMuc2V0U3RhdGUoe3dpbm5lcjogJ0RFQUxFUicsIG1vbmV5OiB0aGlzLnN0YXRlLm1vbmV5IC0gdGhpcy5zdGF0ZS5iZXR9KSApO1xuXHRcdFx0fVxuXG5cdFx0XHRhbmltYXRlLnB1c2godGhpcy5uZWVkU2h1ZmZsZS5iaW5kKHRoaXMpKTtcblx0XHRcdGFuaW1hdGUuZm9yRWFjaCgoZnVuYywgaSkgPT4ge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmMsIChpICsgMSkgKiA1MDApO1xuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHQvL2NoZWNrcyBpZiBkZWNrIGhhcyBsZXNzIHRoYW4gMTAgY2FyZHMsIGlmIHNvLCBzaHVmZmxlXG5cdG5lZWRTaHVmZmxlKCkge1xuXHRcdGlmICh0aGlzLnN0YXRlLmRlY2suY2FyZHNMZWZ0KCkgPCAxMCkge1xuXHRcdFx0dGhpcy5yZXNldCgpO1xuXHRcdH1cblx0fVxuXG5cdC8vIGRlYWxlciBkcmF3cyBjYXJkXG5cdGRlYWxlckRyYXcoKSB7XG5cdFx0bGV0IGNhcmRzID0gdGhpcy5zdGF0ZS5kZWFsZXJDYXJkcy5zbGljZSgpO1xuXHRcdGNhcmRzLnB1c2godGhpcy5zdGF0ZS5kZWNrLmRyYXcoKSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGRlYWxlckNhcmRzOiBjYXJkcyB9KTtcblx0fVxuXG5cdC8vc2h1ZmZsZXMgdGhlIGRlY2tcblx0cmVzZXQoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZShkZWZhdWx0U3RhdGUoKSk7XG5cdH1cblxuXHQvL2RlYWxzIGhhbmRzIHRvIGJlZ2luIHRoZSBnYW1lXG5cdHN0YXJ0KGJvb2wpIHtcblx0XHRpZih0aGlzLnN0YXRlLnBsYXllckNhcmRzLmxlbmd0aCA9PT0gMCB8fCBib29sKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgcmV2ZWFsOiBmYWxzZSwgcGxheWVyQ2FyZHM6IFtdLCBkZWFsZXJDYXJkczogW10sIGJ1c3RlZDogZmFsc2UsIHdpbm5lcjogJyd9KTtcblx0XHRcdHNldFRpbWVvdXQodGhpcy5kZWFsZXJEcmF3LmJpbmQodGhpcyksIDI1MCk7XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMuZGVhbGVyRHJhdy5iaW5kKHRoaXMpLCA1MDApO1xuXHRcdFx0c2V0VGltZW91dCh0aGlzLmhpdE1lLmJpbmQodGhpcyksIDc1MCk7XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMuaGl0TWUuYmluZCh0aGlzKSwgMTAwMCk7XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMuY2hlY2tCbGFja0phY2suYmluZCh0aGlzKSwgMTI1MCk7XG5cdFx0fVxuXHR9XG5cblx0Ly9pZiBzdGFydGluZyBoYW5kIGlzIGJsYWNramFjaywgYXV0byB3aW4sIHBheSAxLjV4XG5cdGNoZWNrQmxhY2tKYWNrKCkge1xuXHRcdGlmIChwb2ludHModGhpcy5zdGF0ZS5wbGF5ZXJDYXJkcykgPT09IDIxKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHt3aW5uZXI6ICdQTEFZRVInLCBtb25leTogdGhpcy5zdGF0ZS5tb25leSArICh0aGlzLnN0YXRlLmJldCAqIDEuNSksIHJldmVhbDogdHJ1ZX0pO1xuXHRcdH1cblx0fVxuXG5cdC8vIHVwZGF0ZXMgYmV0dGluZyBhbW91bnQgXG5cdHVwZGF0ZUJldChhbW91bnQpIHtcblx0XHRpZih0aGlzLnN0YXRlLnJldmVhbCB8fCB0aGlzLnN0YXRlLnBsYXllckNhcmRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGJldDogYW1vdW50IH0pO1xuXHRcdH1cblx0fVxuXG5cdGRpc3BsYXkoaW5mbykge1xuXHRcdHRoaXMuc2V0U3RhdGUoe2Rpc3BsYXk6IGluZm99KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2luZm8nPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjYXJkc0xlZnQnPiBDYXJkcyBsZWZ0OiB7dGhpcy5zdGF0ZS5kZWNrLmNhcmRzTGVmdCgpfTwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjb3VudCc+IFRoZSBDb3VudDoge3RoaXMuc3RhdGUuZGVjay5jb3VudCgpfTwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nZGlzcGxheSc+XG5cdFx0XHRcdFx0PGRpdiBvbkNsaWNrPXsoKSA9PiB0aGlzLmRpc3BsYXkoJ3doeScpfT5XaHkgaXQgd29ya3M8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IG9uQ2xpY2s9eygpID0+IHRoaXMuZGlzcGxheSgnY291bnRpbmcnKX0+SG93IHRvIGNvdW50PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBvbkNsaWNrPXsoKSA9PiB0aGlzLmRpc3BsYXkoJ2VkZ2UnKX0+VGhlIGVkZ2U8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IG9uQ2xpY2s9eygpID0+IHRoaXMuZGlzcGxheSgnbm9uZScpfSBjbGFzc05hbWU9J2hpZGUnPkhpZGU8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2hvd1RvJz5cblx0XHRcdFx0XHR7dGhpcy5zdGF0ZS5kaXNwbGF5ID09PSAnbm9uZScgPyBudWxsIDogPEhvd1RvIGluZm89e3RoaXMuc3RhdGUuZGlzcGxheX0vPn1cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2dhbWUnPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd0aXRsZSc+XG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz0nY2FyZHMvdGl0bGUucG5nJyBjbGFzc05hbWU9J3RpdGxlSW1hZ2UnIC8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndGFibGUnPlxuXHRcdFx0XHRcdFx0PERlYWxlciBjYXJkcz17dGhpcy5zdGF0ZS5kZWFsZXJDYXJkc30gcmV2ZWFsPXt0aGlzLnN0YXRlLnJldmVhbH0vPlxuXHRcdFx0XHRcdFx0PFBsYXllciBjYXJkcz17dGhpcy5zdGF0ZS5wbGF5ZXJDYXJkc30gLz5cblx0XHRcdFx0XHRcdDxSZXN1bHQgYnVzdD17dGhpcy5zdGF0ZS5idXN0ZWR9IHdpbm5lcj17dGhpcy5zdGF0ZS53aW5uZXJ9IC8+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdyaWdodEJ1dHRvbnMnPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBvbkNsaWNrPXt0aGlzLmhpdE1lLmJpbmQodGhpcyl9PkhpdCBNZTwvc3Bhbj4gPGJyLz5cblx0XHRcdFx0XHRcdFx0PHNwYW4gb25DbGljaz17dGhpcy5rZWVwLmJpbmQodGhpcyl9PlxuXHRcdFx0XHRcdFx0XHRcdHt0aGlzLnN0YXRlLnJldmVhbCB8fCB0aGlzLnN0YXRlLnBsYXllckNhcmRzLmxlbmd0aCA9PT0gMCA/ICdEZWFsIScgOiAnS2VlcCd9XG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cdFxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0cyc+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9J2JldCc+QmV0OiAke3RoaXMuc3RhdGUuYmV0fTwvc3Bhbj4gPGJyIC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9J3dhbGxldCc+V2FsbGV0OiAke3RoaXMuc3RhdGUubW9uZXl9IDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdhbGxCZXRzJz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXQyJyBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZUJldCgyKX0+MjwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JldDUnIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDUpfT41PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0MTAnIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDEwKX0+MTA8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXQyNScgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVCZXQoMjUpfT4yNTwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JldDUwJyBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZUJldCg1MCl9PjUwPC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0MTAwJyBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZUJldCgxMDApfT4xMDA8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXQyMDAnIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDIwMCl9PjIwMDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufVxuXG5SZWFjdERPTS5yZW5kZXIoPCBBcHAgbW9uZXk9JzEwMDAnLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XG5cbi8vIGJhYmVsIC4gLS1vdXQtZGlyIGNvbXBpbGVkIC0tcHJlc2V0cz1lczIwMTUscmVhY3QgLS1pZ25vcmU9bm9kZV9tb2R1bGVzLGNvbXBpbGVkIC0tc291cmNlLW1hcHMgaW5saW5lIC0td2F0Y2hcblxuXG5cblxuIl19