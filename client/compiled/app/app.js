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
				(function () {
					//ends the round by revealing the face down card
					_this2.setState({ reveal: true });
					//animate to slow down the dealer's animation
					var animate = [];
					var cards = _this2.state.dealerCards.slice();
					//dealer draws when points is below 17
					while (points(cards) < 17) {
						cards.push(_this2.state.deck.draw());
						animate.push(function () {
							return _this2.setState({ dealerCards: cards });
						});
					}
					//if dealer busts, or points is less than player, player wins
					if (points(cards) > 21 || points(cards) < points(_this2.state.playerCards)) {
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
				})();
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
			console.log(points(this.state.playerCards));
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
								{ onClick: this.start.bind(this) },
								'Start'
							),
							' ',
							React.createElement('br', null),
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
								this.state.reveal ? 'Deal!' : 'Keep'
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
							{ className: 'bet5', onClick: function onClick() {
									return _this3.updateBet(5).bind(_this3);
								} },
							'5'
						),
						React.createElement(
							'div',
							{ className: 'bet10', onClick: function onClick() {
									return _this3.updateBet(10).bind(_this3);
								} },
							'10'
						),
						React.createElement(
							'div',
							{ className: 'bet25', onClick: function onClick() {
									return _this3.updateBet(25).bind(_this3);
								} },
							'25'
						),
						React.createElement(
							'div',
							{ className: 'bet50', onClick: function onClick() {
									return _this3.updateBet(50).bind(_this3);
								} },
							'50'
						),
						React.createElement(
							'div',
							{ className: 'bet100', onClick: function onClick() {
									return _this3.updateBet(100).bind(_this3);
								} },
							'100'
						),
						React.createElement(
							'div',
							{ className: 'bet200', onClick: function onClick() {
									return _this3.updateBet(200).bind(_this3);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9hcHAuanMiXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJkZWNrIiwiRGVjayIsInN0YXRlIiwiZGVmYXVsdFN0YXRlIiwibW9uZXkiLCJOdW1iZXIiLCJidXN0ZWQiLCJyZXZlYWwiLCJkZWFsZXJDYXJkcyIsImxlbmd0aCIsImNhcmRzIiwicGxheWVyQ2FyZHMiLCJzbGljZSIsInB1c2giLCJkcmF3Iiwic2V0U3RhdGUiLCJpc0J1c3QiLCJiZXQiLCJzdGFydCIsImFuaW1hdGUiLCJwb2ludHMiLCJ3aW5uZXIiLCJmb3JFYWNoIiwiZnVuYyIsImkiLCJzZXRUaW1lb3V0IiwiYm9vbCIsImRlYWxlckRyYXciLCJiaW5kIiwiaGl0TWUiLCJjaGVja0JsYWNrSmFjayIsImNvbnNvbGUiLCJsb2ciLCJhbW91bnQiLCJjYXJkc0xlZnQiLCJjb3VudCIsInJlc2V0Iiwia2VlcCIsInVwZGF0ZUJldCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLEc7OztBQUVMLGNBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx3R0FDWkEsS0FEWTs7QUFFbEIsTUFBSUMsT0FBTyxJQUFJQyxJQUFKLEVBQVg7QUFDQSxRQUFLQyxLQUFMLEdBQWFDLGNBQWI7QUFDQSxRQUFLRCxLQUFMLENBQVdFLEtBQVgsR0FBbUJDLE9BQU9OLE1BQU1LLEtBQWIsQ0FBbkI7QUFKa0I7QUFLbEI7Ozs7MEJBRU87QUFDUDtBQUNBLE9BQUcsS0FBS0YsS0FBTCxDQUFXSSxNQUFYLElBQXFCLEtBQUtKLEtBQUwsQ0FBV0ssTUFBaEMsSUFBMEMsS0FBS0wsS0FBTCxDQUFXTSxXQUFYLENBQXVCQyxNQUF2QixLQUFrQyxDQUEvRSxFQUFrRjtBQUFFO0FBQVM7QUFDN0Y7QUFDQSxPQUFJQyxRQUFRLEtBQUtSLEtBQUwsQ0FBV1MsV0FBWCxDQUF1QkMsS0FB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S1UsU0FBTCxDQUFlLEdBQWYsRUFBb0JWLElBQXBCLFFBQU47QUFBQSxTQUFqQztBQUFBO0FBQUE7QUFORDtBQTNCRDtBQU5ELElBREQ7QUFnREE7Ozs7RUEzSWdCVyxNQUFNQyxTOztBQThJeEJDLFNBQVNDLE1BQVQsQ0FBZ0Isb0JBQUUsR0FBRixJQUFNLE9BQU0sTUFBWixHQUFoQixFQUFzQ0MsU0FBU0MsY0FBVCxDQUF3QixLQUF4QixDQUF0Qzs7QUFFQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHZhciBkZWNrID0gbmV3IERlY2soKTtcblx0XHR0aGlzLnN0YXRlID0gZGVmYXVsdFN0YXRlKCk7XG5cdFx0dGhpcy5zdGF0ZS5tb25leSA9IE51bWJlcihwcm9wcy5tb25leSk7XG5cdH1cblxuXHRoaXRNZSgpIHtcblx0XHQvLyBpZiBnYW1lIGlzIG92ZXIsIGhpdCBtZSBkb2VzIG5vdGhpbmdcblx0XHRpZih0aGlzLnN0YXRlLmJ1c3RlZCB8fCB0aGlzLnN0YXRlLnJldmVhbCB8fCB0aGlzLnN0YXRlLmRlYWxlckNhcmRzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cblx0XHQvL3NldCBzdGF0ZSBpcyBhc3luYywgc28gdXNpbmcgY2FyZHMgdG8ga2VlcCB0cmFjayBvZiBzdGF0dXNcblx0XHRsZXQgY2FyZHMgPSB0aGlzLnN0YXRlLnBsYXllckNhcmRzLnNsaWNlKCk7XG5cdFx0Y2FyZHMucHVzaCh0aGlzLnN0YXRlLmRlY2suZHJhdygpKTtcblx0XHR0aGlzLnNldFN0YXRlKHsgcGxheWVyQ2FyZHM6IGNhcmRzIH0pO1xuXHRcdC8vIGlmIHBsYXllciBidXN0ZWQsIHNldCBnYW1lIHN0YXRlIHRvIGdhbWUgb3ZlclxuXHRcdGlmIChpc0J1c3QoY2FyZHMpKSB7IFxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGJ1c3RlZDogdHJ1ZSwgcmV2ZWFsOiB0cnVlLCBtb25leTogdGhpcy5zdGF0ZS5tb25leSAtIHRoaXMuc3RhdGUuYmV0IH0pO1xuXHRcdH1cblx0fVxuXG5cdGtlZXAoKSB7XG5cdFx0Ly8gaWYgZ2FtZSBpcyBvdmVyLCB0aGUga2VlcCBidXR0b24gYmVjb21lcyBkZWFsIVxuXHRcdGlmICh0aGlzLnN0YXRlLnJldmVhbCB8fCB0aGlzLnN0YXRlLnBsYXllckNhcmRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0dGhpcy5zdGFydCh0cnVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly9lbmRzIHRoZSByb3VuZCBieSByZXZlYWxpbmcgdGhlIGZhY2UgZG93biBjYXJkXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtyZXZlYWw6IHRydWV9KTtcblx0XHRcdC8vYW5pbWF0ZSB0byBzbG93IGRvd24gdGhlIGRlYWxlcidzIGFuaW1hdGlvblxuXHRcdFx0bGV0IGFuaW1hdGUgPSBbXTtcblx0XHRcdGxldCBjYXJkcyA9IHRoaXMuc3RhdGUuZGVhbGVyQ2FyZHMuc2xpY2UoKTtcblx0XHRcdC8vZGVhbGVyIGRyYXdzIHdoZW4gcG9pbnRzIGlzIGJlbG93IDE3XG5cdFx0XHR3aGlsZShwb2ludHMoY2FyZHMpIDwgMTcpIHtcblx0XHRcdFx0Y2FyZHMucHVzaCh0aGlzLnN0YXRlLmRlY2suZHJhdygpKTtcblx0XHRcdFx0YW5pbWF0ZS5wdXNoKCgpID0+IHRoaXMuc2V0U3RhdGUoeyBkZWFsZXJDYXJkczogY2FyZHMgfSkpO1xuXHRcdFx0fVxuXHRcdFx0Ly9pZiBkZWFsZXIgYnVzdHMsIG9yIHBvaW50cyBpcyBsZXNzIHRoYW4gcGxheWVyLCBwbGF5ZXIgd2luc1xuXHRcdFx0aWYgKHBvaW50cyhjYXJkcykgPiAyMSB8fCBwb2ludHMoY2FyZHMpIDwgcG9pbnRzKHRoaXMuc3RhdGUucGxheWVyQ2FyZHMpKSB7XG5cdFx0XHRcdGFuaW1hdGUucHVzaCggKCkgPT4gdGhpcy5zZXRTdGF0ZSh7d2lubmVyOiAnUExBWUVSJywgbW9uZXk6IHRoaXMuc3RhdGUubW9uZXkgKyB0aGlzLnN0YXRlLmJldH0pICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0Ly9vdGhlcndpc2UgZGVhbGVyIHdpbnNcblx0XHRcdFx0YW5pbWF0ZS5wdXNoKCAoKSA9PiB0aGlzLnNldFN0YXRlKHt3aW5uZXI6ICdERUFMRVInLCBtb25leTogdGhpcy5zdGF0ZS5tb25leSAtIHRoaXMuc3RhdGUuYmV0fSkgKTtcblx0XHRcdH1cblx0XHRcdC8vYW5pbWF0ZSBmb3IgZGVhbGVyXG5cdFx0XHRhbmltYXRlLmZvckVhY2goKGZ1bmMsIGkpID0+IHtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jLCAoaSArIDEpICogNTAwKTtcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cblx0Ly8gZGVhbGVyIGRyYXdzIGNhcmRcblx0ZGVhbGVyRHJhdygpIHtcblx0XHRsZXQgY2FyZHMgPSB0aGlzLnN0YXRlLmRlYWxlckNhcmRzLnNsaWNlKCk7XG5cdFx0Y2FyZHMucHVzaCh0aGlzLnN0YXRlLmRlY2suZHJhdygpKTtcblx0XHR0aGlzLnNldFN0YXRlKHsgZGVhbGVyQ2FyZHM6IGNhcmRzIH0pO1xuXHR9XG5cblx0Ly9zaHVmZmxlcyB0aGUgZGVja1xuXHRyZXNldCgpIHtcblx0XHR0aGlzLnNldFN0YXRlKGRlZmF1bHRTdGF0ZSgpKTtcblx0fVxuXG5cdC8vZGVhbHMgaGFuZHMgdG8gYmVnaW4gdGhlIGdhbWVcblx0c3RhcnQoYm9vbCkge1xuXHRcdGlmKHRoaXMuc3RhdGUucGxheWVyQ2FyZHMubGVuZ3RoID09PSAwIHx8IGJvb2wpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoeyByZXZlYWw6IGZhbHNlLCBwbGF5ZXJDYXJkczogW10sIGRlYWxlckNhcmRzOiBbXSwgYnVzdGVkOiBmYWxzZSwgd2lubmVyOiAnJ30pO1xuXHRcdFx0c2V0VGltZW91dCh0aGlzLmRlYWxlckRyYXcuYmluZCh0aGlzKSwgMjUwKTtcblx0XHRcdHNldFRpbWVvdXQodGhpcy5kZWFsZXJEcmF3LmJpbmQodGhpcyksIDUwMCk7XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMuaGl0TWUuYmluZCh0aGlzKSwgNzUwKTtcblx0XHRcdHNldFRpbWVvdXQodGhpcy5oaXRNZS5iaW5kKHRoaXMpLCAxMDAwKTtcblx0XHRcdHNldFRpbWVvdXQodGhpcy5jaGVja0JsYWNrSmFjay5iaW5kKHRoaXMpLCAxMjUwKTtcblx0XHR9XG5cdH1cblxuXHRjaGVja0JsYWNrSmFjaygpIHtcblx0XHRjb25zb2xlLmxvZyhwb2ludHModGhpcy5zdGF0ZS5wbGF5ZXJDYXJkcykpO1xuXHRcdGlmIChwb2ludHModGhpcy5zdGF0ZS5wbGF5ZXJDYXJkcykgPT09IDIxKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHt3aW5uZXI6ICdQTEFZRVInLCBtb25leTogdGhpcy5zdGF0ZS5tb25leSArICh0aGlzLnN0YXRlLmJldCAqIDEuNSksIHJldmVhbDogdHJ1ZX0pO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZUJldChhbW91bnQpIHtcblx0XHRpZih0aGlzLnN0YXRlLnJldmVhbCB8fCB0aGlzLnN0YXRlLnBsYXllckNhcmRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGJldDogYW1vdW50XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdpbmZvJz5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nY2FyZHNMZWZ0Jz4gQ2FyZHMgbGVmdDoge3RoaXMuc3RhdGUuZGVjay5jYXJkc0xlZnQoKX08L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nY291bnQnPiBUaGUgQ291bnQ6IHt0aGlzLnN0YXRlLmRlY2suY291bnQoKX08L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2dhbWUnPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd0aXRsZSc+XG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz0nY2FyZHMvdGl0bGUucG5nJyBjbGFzc05hbWU9J3RpdGxlSW1hZ2UnIC8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndGFibGUnPlxuXHRcdFx0XHRcdFx0PERlYWxlciBjYXJkcz17dGhpcy5zdGF0ZS5kZWFsZXJDYXJkc30gcmV2ZWFsPXt0aGlzLnN0YXRlLnJldmVhbH0vPlxuXHRcdFx0XHRcdFx0PFBsYXllciBjYXJkcz17dGhpcy5zdGF0ZS5wbGF5ZXJDYXJkc30gLz5cblx0XHRcdFx0XHRcdDxSZXN1bHQgYnVzdD17dGhpcy5zdGF0ZS5idXN0ZWR9IHdpbm5lcj17dGhpcy5zdGF0ZS53aW5uZXJ9IC8+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdsZWZ0QnV0dG9ucyc+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIG9uQ2xpY2s9e3RoaXMuc3RhcnQuYmluZCh0aGlzKX0+U3RhcnQ8L3NwYW4+IDxici8+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIG9uQ2xpY2s9e3RoaXMucmVzZXQuYmluZCh0aGlzKX0+U2h1ZmZsZTwvc3Bhbj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ncmlnaHRCdXR0b25zJz5cblx0XHRcdFx0XHRcdFx0PHNwYW4gb25DbGljaz17dGhpcy5oaXRNZS5iaW5kKHRoaXMpfT5IaXQgTWU8L3NwYW4+IDxici8+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIG9uQ2xpY2s9e3RoaXMua2VlcC5iaW5kKHRoaXMpfT57dGhpcy5zdGF0ZS5yZXZlYWwgPyAnRGVhbCEnIDogJ0tlZXAnfTwvc3Bhbj5cdFxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0cyc+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9J2JldCc+QmV0OiAke3RoaXMuc3RhdGUuYmV0fTwvc3Bhbj4gPGJyIC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9J3dhbGxldCc+V2FsbGV0OiAke3RoaXMuc3RhdGUubW9uZXl9IDwvc3Bhbj5cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2FsbEJldHMnPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JldDUnIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDUpLmJpbmQodGhpcyl9PjU8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXQxMCcgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVCZXQoMTApLmJpbmQodGhpcyl9PjEwPC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0MjUnIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDI1KS5iaW5kKHRoaXMpfT4yNTwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JldDUwJyBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZUJldCg1MCkuYmluZCh0aGlzKX0+NTA8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXQxMDAnIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDEwMCkuYmluZCh0aGlzKX0+MTAwPC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0MjAwJyBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZUJldCgyMDApLmJpbmQodGhpcyl9PjIwMDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblxuXG5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufVxuXG5SZWFjdERPTS5yZW5kZXIoPCBBcHAgbW9uZXk9JzEwMDAnLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XG5cbi8vIGJhYmVsIC4gLS1vdXQtZGlyIGNvbXBpbGVkIC0tcHJlc2V0cz1lczIwMTUscmVhY3QgLS1pZ25vcmU9bm9kZV9tb2R1bGVzLGNvbXBpbGVkIC0tc291cmNlLW1hcHMgaW5saW5lIC0td2F0Y2hcblxuXG5cblxuIl19