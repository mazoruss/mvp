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
	}, {
		key: 'keep',
		value: function keep() {
			var _this2 = this;

			// if game is over, the keep button becomes deal!
			if (this.state.reveal || this.state.playerCards.length === 0) {
				this.start(true);
			} else {
				//ends the round by revealing the face down card
				this.setState({ reveal: true });
				//animate to slow down the dealer's animation
				var animate = [];
				var cards = this.state.dealerCards.slice();
				//dealer draws when points is below 17

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
				//if dealer busts, or points is less than player, player wins
				if (points(cards) > 21 || points(cards) < points(this.state.playerCards)) {
					animate.push(function () {
						return _this2.setState({ winner: 'PLAYER', money: _this2.state.money + _this2.state.bet });
					});
				} else {
					//otherwise dealer wins
					animate.push(function () {
						return _this2.setState({ winner: 'DEALER', money: _this2.state.money - _this2.state.bet });
					});
				}

				//animate for dealer
				animate.forEach(function (func, i) {
					setTimeout(func, (i + 1) * 500);
				});
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
	}, {
		key: 'checkBlackJack',
		value: function checkBlackJack() {
			if (points(this.state.playerCards) === 21) {
				this.setState({ winner: 'PLAYER', money: this.state.money + this.state.bet * 1.5, reveal: true });
			}
		}
	}, {
		key: 'updateBet',
		value: function updateBet(amount) {
			if (this.state.reveal || this.state.playerCards.length === 0) {
				this.setState({
					bet: amount
				});
			}
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
							{ className: 'leftButtons' },
							React.createElement(
								'span',
								{ onClick: this.reset.bind(this) },
								'Shuffle'
							)
						),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9hcHAuanMiXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJkZWNrIiwiRGVjayIsInN0YXRlIiwiZGVmYXVsdFN0YXRlIiwibW9uZXkiLCJOdW1iZXIiLCJidXN0ZWQiLCJyZXZlYWwiLCJkZWFsZXJDYXJkcyIsImxlbmd0aCIsImNhcmRzIiwicGxheWVyQ2FyZHMiLCJzbGljZSIsInB1c2giLCJkcmF3Iiwic2V0U3RhdGUiLCJpc0J1c3QiLCJiZXQiLCJzdGFydCIsImFuaW1hdGUiLCJoYW5kIiwicG9pbnRzIiwid2lubmVyIiwiZm9yRWFjaCIsImZ1bmMiLCJpIiwic2V0VGltZW91dCIsImJvb2wiLCJkZWFsZXJEcmF3IiwiYmluZCIsImhpdE1lIiwiY2hlY2tCbGFja0phY2siLCJhbW91bnQiLCJjYXJkc0xlZnQiLCJjb3VudCIsInJlc2V0Iiwia2VlcCIsInVwZGF0ZUJldCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLEc7OztBQUVMLGNBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx3R0FDWkEsS0FEWTs7QUFFbEIsTUFBSUMsT0FBTyxJQUFJQyxJQUFKLEVBQVg7QUFDQSxRQUFLQyxLQUFMLEdBQWFDLGNBQWI7QUFDQSxRQUFLRCxLQUFMLENBQVdFLEtBQVgsR0FBbUJDLE9BQU9OLE1BQU1LLEtBQWIsQ0FBbkI7QUFKa0I7QUFLbEI7Ozs7MEJBRU87QUFDUDtBQUNBLE9BQUcsS0FBS0YsS0FBTCxDQUFXSSxNQUFYLElBQXFCLEtBQUtKLEtBQUwsQ0FBV0ssTUFBaEMsSUFBMEMsS0FBS0wsS0FBTCxDQUFXTSxXQUFYLENBQXVCQyxNQUF2QixLQUFrQyxDQUEvRSxFQUFrRjtBQUFFO0FBQVM7QUFDN0Y7QUFDQSxPQUFJQyxRQUFRLEtBQUtSLEtBQUwsQ0FBV1MsV0FBWCxDQUF1QkMsS0FBdkIsRUFBWjtB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O0FBQUE7QUFBQTtBQVBEO0FBNUJEO0FBTkQsSUFERDtBQWtEQTs7OztFQS9JZ0JDLE1BQU1DLFM7O0FBa0p4QkMsU0FBU0MsTUFBVCxDQUFnQixvQkFBRSxHQUFGLElBQU0sT0FBTSxNQUFaLEdBQWhCLEVBQXNDQyxTQUFTQyxjQUFULENBQXdCLEtBQXhCLENBQXRDOztBQUVBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dmFyIGRlY2sgPSBuZXcgRGVjaygpO1xuXHRcdHRoaXMuc3RhdGUgPSBkZWZhdWx0U3RhdGUoKTtcblx0XHR0aGlzLnN0YXRlLm1vbmV5ID0gTnVtYmVyKHByb3BzLm1vbmV5KTtcblx0fVxuXG5cdGhpdE1lKCkge1xuXHRcdC8vIGlmIGdhbWUgaXMgb3ZlciwgaGl0IG1lIGRvZXMgbm90aGluZ1xuXHRcdGlmKHRoaXMuc3RhdGUuYnVzdGVkIHx8IHRoaXMuc3RhdGUucmV2ZWFsIHx8IHRoaXMuc3RhdGUuZGVhbGVyQ2FyZHMubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuXHRcdC8vc2V0IHN0YXRlIGlzIGFzeW5jLCBzbyB1c2luZyBjYXJkcyB0byBrZWVwIHRyYWNrIG9mIHN0YXR1c1xuXHRcdGxldCBjYXJkcyA9IHRoaXMuc3RhdGUucGxheWVyQ2FyZHMuc2xpY2UoKTtcblx0XHRjYXJkcy5wdXNoKHRoaXMuc3RhdGUuZGVjay5kcmF3KCkpO1xuXHRcdHRoaXMuc2V0U3RhdGUoeyBwbGF5ZXJDYXJkczogY2FyZHMgfSk7XG5cdFx0Ly8gaWYgcGxheWVyIGJ1c3RlZCwgc2V0IGdhbWUgc3RhdGUgdG8gZ2FtZSBvdmVyXG5cdFx0aWYgKGlzQnVzdChjYXJkcykpIHsgXG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgYnVzdGVkOiB0cnVlLCByZXZlYWw6IHRydWUsIG1vbmV5OiB0aGlzLnN0YXRlLm1vbmV5IC0gdGhpcy5zdGF0ZS5iZXQgfSk7XG5cdFx0fVxuXHR9XG5cblx0a2VlcCgpIHtcblx0XHQvLyBpZiBnYW1lIGlzIG92ZXIsIHRoZSBrZWVwIGJ1dHRvbiBiZWNvbWVzIGRlYWwhXG5cdFx0aWYgKHRoaXMuc3RhdGUucmV2ZWFsIHx8IHRoaXMuc3RhdGUucGxheWVyQ2FyZHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLnN0YXJ0KHRydWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvL2VuZHMgdGhlIHJvdW5kIGJ5IHJldmVhbGluZyB0aGUgZmFjZSBkb3duIGNhcmRcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3JldmVhbDogdHJ1ZX0pO1xuXHRcdFx0Ly9hbmltYXRlIHRvIHNsb3cgZG93biB0aGUgZGVhbGVyJ3MgYW5pbWF0aW9uXG5cdFx0XHRsZXQgYW5pbWF0ZSA9IFtdO1xuXHRcdFx0bGV0IGNhcmRzID0gdGhpcy5zdGF0ZS5kZWFsZXJDYXJkcy5zbGljZSgpO1xuXHRcdFx0Ly9kZWFsZXIgZHJhd3Mgd2hlbiBwb2ludHMgaXMgYmVsb3cgMTdcblx0XHRcdHdoaWxlKHBvaW50cyhjYXJkcykgPCAxNykge1xuXHRcdFx0XHRjYXJkcy5wdXNoKHRoaXMuc3RhdGUuZGVjay5kcmF3KCkpO1xuXHRcdFx0XHRsZXQgaGFuZCA9IGNhcmRzLnNsaWNlKCk7XG5cdFx0XHRcdGFuaW1hdGUucHVzaCgoKSA9PiB0aGlzLnNldFN0YXRlKHsgZGVhbGVyQ2FyZHM6IGhhbmQgfSkpO1xuXHRcdFx0fVxuXHRcdFx0Ly9pZiBkZWFsZXIgYnVzdHMsIG9yIHBvaW50cyBpcyBsZXNzIHRoYW4gcGxheWVyLCBwbGF5ZXIgd2luc1xuXHRcdFx0aWYgKHBvaW50cyhjYXJkcykgPiAyMSB8fCBwb2ludHMoY2FyZHMpIDwgcG9pbnRzKHRoaXMuc3RhdGUucGxheWVyQ2FyZHMpKSB7XG5cdFx0XHRcdGFuaW1hdGUucHVzaCggKCkgPT4gdGhpcy5zZXRTdGF0ZSh7d2lubmVyOiAnUExBWUVSJywgbW9uZXk6IHRoaXMuc3RhdGUubW9uZXkgKyB0aGlzLnN0YXRlLmJldH0pICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0Ly9vdGhlcndpc2UgZGVhbGVyIHdpbnNcblx0XHRcdFx0YW5pbWF0ZS5wdXNoKCAoKSA9PiB0aGlzLnNldFN0YXRlKHt3aW5uZXI6ICdERUFMRVInLCBtb25leTogdGhpcy5zdGF0ZS5tb25leSAtIHRoaXMuc3RhdGUuYmV0fSkgKTtcblx0XHRcdH1cblxuXG5cdFx0XHQvL2FuaW1hdGUgZm9yIGRlYWxlclxuXHRcdFx0YW5pbWF0ZS5mb3JFYWNoKChmdW5jLCBpKSA9PiB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuYywgKGkgKyAxKSAqIDUwMCk7XG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXG5cdC8vIGRlYWxlciBkcmF3cyBjYXJkXG5cdGRlYWxlckRyYXcoKSB7XG5cdFx0bGV0IGNhcmRzID0gdGhpcy5zdGF0ZS5kZWFsZXJDYXJkcy5zbGljZSgpO1xuXHRcdGNhcmRzLnB1c2godGhpcy5zdGF0ZS5kZWNrLmRyYXcoKSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGRlYWxlckNhcmRzOiBjYXJkcyB9KTtcblx0fVxuXG5cdC8vc2h1ZmZsZXMgdGhlIGRlY2tcblx0cmVzZXQoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZShkZWZhdWx0U3RhdGUoKSk7XG5cdH1cblxuXHQvL2RlYWxzIGhhbmRzIHRvIGJlZ2luIHRoZSBnYW1lXG5cdHN0YXJ0KGJvb2wpIHtcblx0XHRpZih0aGlzLnN0YXRlLnBsYXllckNhcmRzLmxlbmd0aCA9PT0gMCB8fCBib29sKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgcmV2ZWFsOiBmYWxzZSwgcGxheWVyQ2FyZHM6IFtdLCBkZWFsZXJDYXJkczogW10sIGJ1c3RlZDogZmFsc2UsIHdpbm5lcjogJyd9KTtcblx0XHRcdHNldFRpbWVvdXQodGhpcy5kZWFsZXJEcmF3LmJpbmQodGhpcyksIDI1MCk7XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMuZGVhbGVyRHJhdy5iaW5kKHRoaXMpLCA1MDApO1xuXHRcdFx0c2V0VGltZW91dCh0aGlzLmhpdE1lLmJpbmQodGhpcyksIDc1MCk7XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMuaGl0TWUuYmluZCh0aGlzKSwgMTAwMCk7XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMuY2hlY2tCbGFja0phY2suYmluZCh0aGlzKSwgMTI1MCk7XG5cdFx0fVxuXHR9XG5cblx0Y2hlY2tCbGFja0phY2soKSB7XG5cdFx0aWYgKHBvaW50cyh0aGlzLnN0YXRlLnBsYXllckNhcmRzKSA9PT0gMjEpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3dpbm5lcjogJ1BMQVlFUicsIG1vbmV5OiB0aGlzLnN0YXRlLm1vbmV5ICsgKHRoaXMuc3RhdGUuYmV0ICogMS41KSwgcmV2ZWFsOiB0cnVlfSk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlQmV0KGFtb3VudCkge1xuXHRcdGlmKHRoaXMuc3RhdGUucmV2ZWFsIHx8IHRoaXMuc3RhdGUucGxheWVyQ2FyZHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0YmV0OiBhbW91bnRcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2luZm8nPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjYXJkc0xlZnQnPiBDYXJkcyBsZWZ0OiB7dGhpcy5zdGF0ZS5kZWNrLmNhcmRzTGVmdCgpfTwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjb3VudCc+IFRoZSBDb3VudDoge3RoaXMuc3RhdGUuZGVjay5jb3VudCgpfTwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nZ2FtZSc+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3RpdGxlJz5cblx0XHRcdFx0XHRcdDxpbWcgc3JjPSdjYXJkcy90aXRsZS5wbmcnIGNsYXNzTmFtZT0ndGl0bGVJbWFnZScgLz5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd0YWJsZSc+XG5cdFx0XHRcdFx0XHQ8RGVhbGVyIGNhcmRzPXt0aGlzLnN0YXRlLmRlYWxlckNhcmRzfSByZXZlYWw9e3RoaXMuc3RhdGUucmV2ZWFsfS8+XG5cdFx0XHRcdFx0XHQ8UGxheWVyIGNhcmRzPXt0aGlzLnN0YXRlLnBsYXllckNhcmRzfSAvPlxuXHRcdFx0XHRcdFx0PFJlc3VsdCBidXN0PXt0aGlzLnN0YXRlLmJ1c3RlZH0gd2lubmVyPXt0aGlzLnN0YXRlLndpbm5lcn0gLz5cblxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2xlZnRCdXR0b25zJz5cblx0XHRcdFx0XHRcdFx0PHNwYW4gb25DbGljaz17dGhpcy5yZXNldC5iaW5kKHRoaXMpfT5TaHVmZmxlPC9zcGFuPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdyaWdodEJ1dHRvbnMnPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBvbkNsaWNrPXt0aGlzLmhpdE1lLmJpbmQodGhpcyl9PkhpdCBNZTwvc3Bhbj4gPGJyLz5cblx0XHRcdFx0XHRcdFx0PHNwYW4gb25DbGljaz17dGhpcy5rZWVwLmJpbmQodGhpcyl9PlxuXHRcdFx0XHRcdFx0XHRcdHt0aGlzLnN0YXRlLnJldmVhbCB8fCB0aGlzLnN0YXRlLnBsYXllckNhcmRzLmxlbmd0aCA9PT0gMCA/ICdEZWFsIScgOiAnS2VlcCd9XG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cdFxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0cyc+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9J2JldCc+QmV0OiAke3RoaXMuc3RhdGUuYmV0fTwvc3Bhbj4gPGJyIC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9J3dhbGxldCc+V2FsbGV0OiAke3RoaXMuc3RhdGUubW9uZXl9IDwvc3Bhbj5cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2FsbEJldHMnPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JldDInIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDIpfT4yPC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0NScgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVCZXQoNSl9PjU8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXQxMCcgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVCZXQoMTApfT4xMDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JldDI1JyBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZUJldCgyNSl9PjI1PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0NTAnIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDUwKX0+NTA8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXQxMDAnIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDEwMCl9PjEwMDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JldDIwMCcgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVCZXQoMjAwKX0+MjAwPC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXG5cblxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8IEFwcCBtb25leT0nMTAwMCcvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcblxuLy8gYmFiZWwgLiAtLW91dC1kaXIgY29tcGlsZWQgLS1wcmVzZXRzPWVzMjAxNSxyZWFjdCAtLWlnbm9yZT1ub2RlX21vZHVsZXMsY29tcGlsZWQgLS1zb3VyY2UtbWFwcyBpbmxpbmUgLS13YXRjaFxuXG5cblxuXG4iXX0=