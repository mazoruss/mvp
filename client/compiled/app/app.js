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
				if (this.state.username === 'guest') {
					this.setState({ busted: true, reveal: true, money: this.state.money - this.state.bet });
				} else {
					this.setState({ busted: true, reveal: true });
					changeMoney(this.state.username, this.state.money - this.state.bet, this.updateUser.bind(this));
				}
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
					if (this.state.username === 'guest') {
						animate.push(function () {
							return _this2.setState({ winner: 'PLAYER', money: _this2.state.money + _this2.state.bet });
						});
					} else {
						animate.push(function () {
							return _this2.setState({ winner: 'PLAYER' });
						});
						changeMoney(this.state.username, this.state.money + this.state.bet, this.updateUser.bind(this));
					}
				} else {
					if (this.state.username === 'guest') {
						animate.push(function () {
							return _this2.setState({ winner: 'DEALER', money: _this2.state.money - _this2.state.bet });
						});
					} else {
						animate.push(function () {
							return _this2.setState({ winner: 'DEALER' });
						});
						changeMoney(this.state.username, this.state.money - this.state.bet, this.updateUser.bind(this));
					}
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
				if (this.state.username === 'guest') {
					this.setState({ winner: 'PLAYER', money: this.state.money + this.state.bet * 1.5, reveal: true });
				} else {
					this.setState({ winner: 'PLAYER', reveal: true });
					changeMoney(this.state.username, this.state.money + this.state.bet * 1.5, this.updateUser.bind(this));
				}
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
		key: 'updateUser',
		value: function updateUser(_ref) {
			var username = _ref.username;
			var money = _ref.money;

			this.setState({
				username: username,
				money: money
			});
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
					),
					React.createElement(
						'div',
						{ className: 'percentage' },
						' The Edge: ',
						this.state.deck.percentage() + '%'
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
				),
				React.createElement(Footer, { cb: this.updateUser.bind(this) })
			);
		}
	}]);

	return App;
}(React.Component);

ReactDOM.render(React.createElement(App, { money: '1000' }), document.getElementById('app'));

// babel . --out-dir compiled --presets=es2015,react --ignore=node_modules,compiled --source-maps inline --watch
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9hcHAuanMiXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJkZWNrIiwiRGVjayIsInN0YXRlIiwiZGVmYXVsdFN0YXRlIiwibW9uZXkiLCJOdW1iZXIiLCJidXN0ZWQiLCJyZXZlYWwiLCJkZWFsZXJDYXJkcyIsImxlbmd0aCIsImNhcmRzIiwicGxheWVyQ2FyZHMiLCJzbGljZSIsInB1c2giLCJkcmF3Iiwic2V0U3RhdGUiLCJpc0J1c3QiLCJ1c2VybmFtZSIsImJldCIsImNoYW5nZU1vbmV5IiwidXBkYXRlVXNlciIsImJpbmQiLCJzdGFydCIsImFuaW1hdGUiLCJoYW5kIiwicG9pbnRzIiwid2lubmVyIiwibmVlZFNodWZmbGUiLCJmb3JFYWNoIiwiZnVuYyIsImkiLCJzZXRUaW1lb3V0IiwiY2FyZHNMZWZ0IiwicmVzZXQiLCJib29sIiwiZGVhbGVyRHJhdyIsImhpdE1lIiwiY2hlY2tCbGFja0phY2siLCJhbW91bnQiLCJpbmZvIiwiZGlzcGxheSIsImNvdW50IiwicGVyY2VudGFnZSIsImtlZXAiLCJ1cGRhdGVCZXQiLCJSZWFjdCIsIkNvbXBvbmVudCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxHOzs7QUFFTCxjQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsd0dBQ1pBLEtBRFk7O0FBRWxCLE1BQUlDLE9BQU8sSUFBSUMsSUFBSixFQUFYO0FBQ0EsUUFBS0MsS0FBTCxHQUFhQyxjQUFiO0FBQ0EsUUFBS0QsS0FBTCxDQUFXRSxLQUFYLEdBQW1CQyxPQUFPTixNQUFNSyxLQUFiLENBQW5CO0FBSmtCO0FBS2xCOztBQUVEOzs7OzswQkFDUTtBQUNQO0FBQ0EsT0FBRyxLQUFLRixLQUFMLENBQVdJLE1BQVgsSUFBcUIsS0FBS0osS0FBTCxDQUFXSyxNQUFoQyxJQUEwQyxLQUFLTCxLQUFMLENBQVdNLFdBQVgsQ0FBdUJDLE1BQXZCLEtB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LENBQWUsRUFBZixDQUFOO0FBQUEsU0FBaEM7QUFBQTtBQUFBLE9BSkQ7QUFLQztBQUFBO0FBQUEsU0FBSyxXQUFVLE9BQWYsRUFBdUIsU0FBUztBQUFBLGdCQUFNLE9BQUtBLFNBQUwsQ0FBZSxFQUFmLENBQU47QUFBQSxTQUFoQztBQUFBO0FBQUEsT0FMRDtBQU1DO0FBQUE7QUFBQSxTQUFLLFdBQVUsUUFBZixFQUF3QixTQUFTO0FBQUEsZ0JBQU0sT0FBS0EsU0FBTCxDQUFlLEdBQWYsQ0FBTjtBQUFBLFNBQWpDO0FBQUE7QUFBQSxPQU5EO0FBT0M7QUFBQTtBQUFBLFNBQUssV0FBVSxRQUFmLEVBQXdCLFNBQVM7QUFBQSxnQkFBTSxPQUFLQSxTQUFMLENBQWUsR0FBZixDQUFOO0FBQUEsU0FBakM7QUFBQTtBQUFBO0FBUEQ7QUF2QkQsS0FsQkQ7QUFvREMsd0JBQUMsTUFBRCxJQUFRLElBQUksS0FBS3hCLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLElBQXJCLENBQVo7QUFwREQsSUFERDtBQXdEQTs7OztFQTVMZ0J3QixNQUFNQyxTOztBQStMeEJDLFNBQVNDLE1BQVQsQ0FBZ0Isb0JBQUUsR0FBRixJQUFNLE9BQU0sTUFBWixHQUFoQixFQUFzQ0MsU0FBU0MsY0FBVCxDQUF3QixLQUF4QixDQUF0Qzs7QUFFQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHZhciBkZWNrID0gbmV3IERlY2soKTtcblx0XHR0aGlzLnN0YXRlID0gZGVmYXVsdFN0YXRlKCk7XG5cdFx0dGhpcy5zdGF0ZS5tb25leSA9IE51bWJlcihwcm9wcy5tb25leSk7XG5cdH1cblxuXHQvL3BsYXllciBkcmF3c1xuXHRoaXRNZSgpIHtcblx0XHQvLyBpZiBnYW1lIGlzIG92ZXIsIGhpdCBtZSBkb2VzIG5vdGhpbmdcblx0XHRpZih0aGlzLnN0YXRlLmJ1c3RlZCB8fCB0aGlzLnN0YXRlLnJldmVhbCB8fCB0aGlzLnN0YXRlLmRlYWxlckNhcmRzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cblx0XHQvL3NldCBzdGF0ZSBpcyBhc3luYywgc28gdXNpbmcgY2FyZHMgdG8ga2VlcCB0cmFjayBvZiBzdGF0dXNcblx0XHRsZXQgY2FyZHMgPSB0aGlzLnN0YXRlLnBsYXllckNhcmRzLnNsaWNlKCk7XG5cdFx0Y2FyZHMucHVzaCh0aGlzLnN0YXRlLmRlY2suZHJhdygpKTtcblx0XHR0aGlzLnNldFN0YXRlKHsgcGxheWVyQ2FyZHM6IGNhcmRzIH0pO1xuXHRcdC8vIGlmIHBsYXllciBidXN0ZWQsIHNldCBnYW1lIHN0YXRlIHRvIGdhbWUgb3ZlclxuXHRcdGlmIChpc0J1c3QoY2FyZHMpKSB7IFxuXHRcdFx0aWYgKHRoaXMuc3RhdGUudXNlcm5hbWUgPT09ICdndWVzdCcpIHsgXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoeyBidXN0ZWQ6IHRydWUsIHJldmVhbDogdHJ1ZSwgbW9uZXk6IHRoaXMuc3RhdGUubW9uZXkgLSB0aGlzLnN0YXRlLmJldCB9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHsgYnVzdGVkOiB0cnVlLCByZXZlYWw6IHRydWV9KTtcblx0XHRcdFx0Y2hhbmdlTW9uZXkodGhpcy5zdGF0ZS51c2VybmFtZSwgdGhpcy5zdGF0ZS5tb25leSAtIHRoaXMuc3RhdGUuYmV0LCB0aGlzLnVwZGF0ZVVzZXIuYmluZCh0aGlzKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly9rZWVwLCBvciBkZWFsXG5cdGtlZXAoKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUucmV2ZWFsIHx8IHRoaXMuc3RhdGUucGxheWVyQ2FyZHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLnN0YXJ0KHRydWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtyZXZlYWw6IHRydWV9KTtcblx0XHRcdGxldCBhbmltYXRlID0gW107XG5cdFx0XHRsZXQgY2FyZHMgPSB0aGlzLnN0YXRlLmRlYWxlckNhcmRzLnNsaWNlKCk7XG5cblx0XHRcdHdoaWxlKHBvaW50cyhjYXJkcykgPCAxNykge1xuXHRcdFx0XHRjYXJkcy5wdXNoKHRoaXMuc3RhdGUuZGVjay5kcmF3KCkpO1xuXHRcdFx0XHRsZXQgaGFuZCA9IGNhcmRzLnNsaWNlKCk7XG5cdFx0XHRcdGFuaW1hdGUucHVzaCgoKSA9PiB0aGlzLnNldFN0YXRlKHsgZGVhbGVyQ2FyZHM6IGhhbmQgfSkpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocG9pbnRzKGNhcmRzKSA+IDIxIHx8IHBvaW50cyhjYXJkcykgPCBwb2ludHModGhpcy5zdGF0ZS5wbGF5ZXJDYXJkcykpIHtcblx0XHRcdFx0aWYgKHRoaXMuc3RhdGUudXNlcm5hbWUgPT09ICdndWVzdCcpIHtcblx0XHRcdFx0XHRhbmltYXRlLnB1c2goICgpID0+IHRoaXMuc2V0U3RhdGUoe3dpbm5lcjogJ1BMQVlFUicsIG1vbmV5OiB0aGlzLnN0YXRlLm1vbmV5ICsgdGhpcy5zdGF0ZS5iZXR9KSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGFuaW1hdGUucHVzaCggKCkgPT4gdGhpcy5zZXRTdGF0ZSh7d2lubmVyOiAnUExBWUVSJ30pKTtcblx0XHRcdFx0XHRjaGFuZ2VNb25leSh0aGlzLnN0YXRlLnVzZXJuYW1lLCB0aGlzLnN0YXRlLm1vbmV5ICsgdGhpcy5zdGF0ZS5iZXQsIHRoaXMudXBkYXRlVXNlci5iaW5kKHRoaXMpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRoaXMuc3RhdGUudXNlcm5hbWUgPT09ICdndWVzdCcpIHtcblx0XHRcdFx0XHRhbmltYXRlLnB1c2goICgpID0+IHRoaXMuc2V0U3RhdGUoe3dpbm5lcjogJ0RFQUxFUicsIG1vbmV5OiB0aGlzLnN0YXRlLm1vbmV5IC0gdGhpcy5zdGF0ZS5iZXR9KSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGFuaW1hdGUucHVzaCggKCkgPT4gdGhpcy5zZXRTdGF0ZSh7d2lubmVyOiAnREVBTEVSJ30pKTtcblx0XHRcdFx0XHRjaGFuZ2VNb25leSh0aGlzLnN0YXRlLnVzZXJuYW1lLCB0aGlzLnN0YXRlLm1vbmV5IC0gdGhpcy5zdGF0ZS5iZXQsIHRoaXMudXBkYXRlVXNlci5iaW5kKHRoaXMpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRhbmltYXRlLnB1c2godGhpcy5uZWVkU2h1ZmZsZS5iaW5kKHRoaXMpKTtcblx0XHRcdGFuaW1hdGUuZm9yRWFjaCgoZnVuYywgaSkgPT4ge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmMsIChpICsgMSkgKiA1MDApO1xuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHQvL2NoZWNrcyBpZiBkZWNrIGhhcyBsZXNzIHRoYW4gMTAgY2FyZHMsIGlmIHNvLCBzaHVmZmxlXG5cdG5lZWRTaHVmZmxlKCkge1xuXHRcdGlmICh0aGlzLnN0YXRlLmRlY2suY2FyZHNMZWZ0KCkgPCAxMCkge1xuXHRcdFx0dGhpcy5yZXNldCgpO1xuXHRcdH1cblx0fVxuXG5cdC8vIGRlYWxlciBkcmF3cyBjYXJkXG5cdGRlYWxlckRyYXcoKSB7XG5cdFx0bGV0IGNhcmRzID0gdGhpcy5zdGF0ZS5kZWFsZXJDYXJkcy5zbGljZSgpO1xuXHRcdGNhcmRzLnB1c2godGhpcy5zdGF0ZS5kZWNrLmRyYXcoKSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGRlYWxlckNhcmRzOiBjYXJkcyB9KTtcblx0fVxuXG5cdC8vc2h1ZmZsZXMgdGhlIGRlY2tcblx0cmVzZXQoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZShkZWZhdWx0U3RhdGUoKSk7XG5cdH1cblxuXHQvL2RlYWxzIGhhbmRzIHRvIGJlZ2luIHRoZSBnYW1lXG5cdHN0YXJ0KGJvb2wpIHtcblx0XHRpZih0aGlzLnN0YXRlLnBsYXllckNhcmRzLmxlbmd0aCA9PT0gMCB8fCBib29sKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgcmV2ZWFsOiBmYWxzZSwgcGxheWVyQ2FyZHM6IFtdLCBkZWFsZXJDYXJkczogW10sIGJ1c3RlZDogZmFsc2UsIHdpbm5lcjogJyd9KTtcblx0XHRcdHNldFRpbWVvdXQodGhpcy5kZWFsZXJEcmF3LmJpbmQodGhpcyksIDI1MCk7XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMuZGVhbGVyRHJhdy5iaW5kKHRoaXMpLCA1MDApO1xuXHRcdFx0c2V0VGltZW91dCh0aGlzLmhpdE1lLmJpbmQodGhpcyksIDc1MCk7XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMuaGl0TWUuYmluZCh0aGlzKSwgMTAwMCk7XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMuY2hlY2tCbGFja0phY2suYmluZCh0aGlzKSwgMTI1MCk7XG5cdFx0fVxuXHR9XG5cblx0Ly9pZiBzdGFydGluZyBoYW5kIGlzIGJsYWNramFjaywgYXV0byB3aW4sIHBheSAxLjV4XG5cdGNoZWNrQmxhY2tKYWNrKCkge1xuXHRcdGlmIChwb2ludHModGhpcy5zdGF0ZS5wbGF5ZXJDYXJkcykgPT09IDIxKSB7XG5cdFx0XHRpZiAodGhpcy5zdGF0ZS51c2VybmFtZSA9PT0gJ2d1ZXN0JykgeyBcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7d2lubmVyOiAnUExBWUVSJywgbW9uZXk6IHRoaXMuc3RhdGUubW9uZXkgKyAodGhpcy5zdGF0ZS5iZXQgKiAxLjUpLCByZXZlYWw6IHRydWV9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHt3aW5uZXI6ICdQTEFZRVInLCByZXZlYWw6IHRydWV9KTtcblx0XHRcdFx0Y2hhbmdlTW9uZXkodGhpcy5zdGF0ZS51c2VybmFtZSwgdGhpcy5zdGF0ZS5tb25leSArICh0aGlzLnN0YXRlLmJldCAqIDEuNSksIHRoaXMudXBkYXRlVXNlci5iaW5kKHRoaXMpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyB1cGRhdGVzIGJldHRpbmcgYW1vdW50IFxuXHR1cGRhdGVCZXQoYW1vdW50KSB7XG5cdFx0aWYodGhpcy5zdGF0ZS5yZXZlYWwgfHwgdGhpcy5zdGF0ZS5wbGF5ZXJDYXJkcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoeyBiZXQ6IGFtb3VudCB9KTtcblx0XHR9XG5cdH1cblxuXHRkaXNwbGF5KGluZm8pIHtcblx0XHR0aGlzLnNldFN0YXRlKHtkaXNwbGF5OiBpbmZvfSk7XG5cdH1cblxuXHR1cGRhdGVVc2VyKHt1c2VybmFtZSwgbW9uZXl9KSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHR1c2VybmFtZTogdXNlcm5hbWUsXG5cdFx0XHRtb25leTogbW9uZXlcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2luZm8nPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjYXJkc0xlZnQnPiBDYXJkcyBsZWZ0OiB7dGhpcy5zdGF0ZS5kZWNrLmNhcmRzTGVmdCgpfTwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjb3VudCc+IFRoZSBDb3VudDoge3RoaXMuc3RhdGUuZGVjay5jb3VudCgpfTwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdwZXJjZW50YWdlJz4gVGhlIEVkZ2U6IHt0aGlzLnN0YXRlLmRlY2sucGVyY2VudGFnZSgpICsgJyUnfTwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nZGlzcGxheSc+XG5cdFx0XHRcdFx0PGRpdiBvbkNsaWNrPXsoKSA9PiB0aGlzLmRpc3BsYXkoJ3doeScpfT5XaHkgaXQgd29ya3M8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IG9uQ2xpY2s9eygpID0+IHRoaXMuZGlzcGxheSgnY291bnRpbmcnKX0+SG93IHRvIGNvdW50PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBvbkNsaWNrPXsoKSA9PiB0aGlzLmRpc3BsYXkoJ2VkZ2UnKX0+VGhlIGVkZ2U8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IG9uQ2xpY2s9eygpID0+IHRoaXMuZGlzcGxheSgnbm9uZScpfSBjbGFzc05hbWU9J2hpZGUnPkhpZGU8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2hvd1RvJz5cblx0XHRcdFx0XHR7dGhpcy5zdGF0ZS5kaXNwbGF5ID09PSAnbm9uZScgPyBudWxsIDogPEhvd1RvIGluZm89e3RoaXMuc3RhdGUuZGlzcGxheX0vPn1cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2dhbWUnPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd0aXRsZSc+XG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz0nY2FyZHMvdGl0bGUucG5nJyBjbGFzc05hbWU9J3RpdGxlSW1hZ2UnIC8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndGFibGUnPlxuXHRcdFx0XHRcdFx0PERlYWxlciBjYXJkcz17dGhpcy5zdGF0ZS5kZWFsZXJDYXJkc30gcmV2ZWFsPXt0aGlzLnN0YXRlLnJldmVhbH0vPlxuXHRcdFx0XHRcdFx0PFBsYXllciBjYXJkcz17dGhpcy5zdGF0ZS5wbGF5ZXJDYXJkc30gLz5cblx0XHRcdFx0XHRcdDxSZXN1bHQgYnVzdD17dGhpcy5zdGF0ZS5idXN0ZWR9IHdpbm5lcj17dGhpcy5zdGF0ZS53aW5uZXJ9IC8+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdyaWdodEJ1dHRvbnMnPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBvbkNsaWNrPXt0aGlzLmhpdE1lLmJpbmQodGhpcyl9PkhpdCBNZTwvc3Bhbj4gPGJyLz5cblx0XHRcdFx0XHRcdFx0PHNwYW4gb25DbGljaz17dGhpcy5rZWVwLmJpbmQodGhpcyl9PlxuXHRcdFx0XHRcdFx0XHRcdHt0aGlzLnN0YXRlLnJldmVhbCB8fCB0aGlzLnN0YXRlLnBsYXllckNhcmRzLmxlbmd0aCA9PT0gMCA/ICdEZWFsIScgOiAnS2VlcCd9XG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cdFxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0cyc+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9J2JldCc+QmV0OiAke3RoaXMuc3RhdGUuYmV0fTwvc3Bhbj4gPGJyIC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9J3dhbGxldCc+V2FsbGV0OiAke3RoaXMuc3RhdGUubW9uZXl9IDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdhbGxCZXRzJz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXQyJyBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZUJldCgyKX0+MjwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JldDUnIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDUpfT41PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0MTAnIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDEwKX0+MTA8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXQyNScgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVCZXQoMjUpfT4yNTwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JldDUwJyBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZUJldCg1MCl9PjUwPC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0MTAwJyBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZUJldCgxMDApfT4xMDA8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXQyMDAnIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDIwMCl9PjIwMDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8Rm9vdGVyIGNiPXt0aGlzLnVwZGF0ZVVzZXIuYmluZCh0aGlzKX0vPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8IEFwcCBtb25leT0nMTAwMCcvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcblxuLy8gYmFiZWwgLiAtLW91dC1kaXIgY29tcGlsZWQgLS1wcmVzZXRzPWVzMjAxNSxyZWFjdCAtLWlnbm9yZT1ub2RlX21vZHVsZXMsY29tcGlsZWQgLS1zb3VyY2UtbWFwcyBpbmxpbmUgLS13YXRjaFxuXG5cblxuXG4iXX0=