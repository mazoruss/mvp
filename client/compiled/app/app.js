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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9hcHAuanMiXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJkZWNrIiwiRGVjayIsInN0YXRlIiwiZGVmYXVsdFN0YXRlIiwibW9uZXkiLCJOdW1iZXIiLCJidXN0ZWQiLCJyZXZlYWwiLCJkZWFsZXJDYXJkcyIsImxlbmd0aCIsImNhcmRzIiwicGxheWVyQ2FyZHMiLCJzbGljZSIsInB1c2giLCJkcmF3Iiwic2V0U3RhdGUiLCJpc0J1c3QiLCJiZXQiLCJzdGFydCIsImFuaW1hdGUiLCJwb2ludHMiLCJ3aW5uZXIiLCJmb3JFYWNoIiwiZnVuYyIsImkiLCJzZXRUaW1lb3V0IiwiYm9vbCIsImRlYWxlckRyYXciLCJiaW5kIiwiaGl0TWUiLCJjaGVja0JsYWNrSmFjayIsImFtb3VudCIsImNhcmRzTGVmdCIsImNvdW50IiwicmVzZXQiLCJrZWVwIiwidXBkYXRlQmV0IiwiUmVhY3QiLCJDb21wb25lbnQiLCJSZWFjdERPTSIsInJlbmRlciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsRzs7O0FBRUwsY0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLHdHQUNaQSxLQURZOztBQUVsQixNQUFJQyxPQUFPLElBQUlDLElBQUosRUFBWDtBQUNBLFFBQUtDLEtBQUwsR0FBYUMsY0FBYjtBQUNBLFFBQUtELEtBQUwsQ0FBV0UsS0FBWCxHQUFtQkMsT0FBT04sTUFBTUssS0FBYixDQUFuQjtBQUprQjtBQUtsQjs7OzswQkFFTztBQUNQO0FBQ0EsT0FBRyxLQUFLRixLQUFMLENBQVdJLE1BQVgsSUFBcUIsS0FBS0osS0FBTCxDQUFXSyxNQUFoQyxJQUEwQyxLQUFLTCxLQUFMLENBQVdNLFdBQVgsQ0FBdUJDLE1BQXZCLEtBQWtDLENBQS9FLEVBQWtGO0FBQUU7QUFBUztBQUM3RjtBQUNBLE9BQUlDLFFBQVEsS0FBS1IsS0FBTCxDQUFXUyxXQUFYLENBQXVCQyxLQUF2QixFQUFaO0FBQ0FGLFNBQU1HLElBQU4sQ0FBVyxLQUFLWCxLQUFMLENBQVdGLElBQVgsQ0FBZ0JjLElBQWhCLEVBQVg7QUFDQSxRQUFLQyxRQUFMLENBQWMsRUFBRUosYUFBYUQsS0FBZixFQUFkO0FBQ0E7QUFDQSxPQUFJTSxPQUFPTixLQUFQLENBQUosRUFBbUI7QUFDbEIsU0FBS0ssUUFBTCxDQUFjLEVBQUVULFFBQVEsSUFBVixFQUFnQkMsUUFBUSxJQUF4QixFQUE4QkgsT0FBTyxLQUFLRixLQUFMLENBQVdFLEtBQVgsR0FBbUIsS0FBS0YsS0FBTCxDQUFXZSxHQUFuRSxFQUFkO0FBQ0E7QUFDRDs7O3lCQUVNO0FBQUE7O0FBQ047QUFDQSxPQUFJLEtBQUtmLEtBQUwsQ0FBV0ssTUFBWCxJQUFxQixLQUFLTCxLQUFMLENBQVdTLFdBQVgsQ0FBdUJGLE1BQXZCLEtBQWtDLENBQTNELEVBQThEO0FBQzdELFNBQUtTLEtBQUwsQ0FBVyxJQUFYO0FBQ0EsSUFGRCxNQUVPO0FBQUE7QUFDTjtBQUNBLFlBQUtILFFBQUwsQ0FBYyxFQUFDUixRQUFRLElBQVQsRUFBZDtBQUNBO0FBQ0EsU0FBSVksVUFBVSxFQUFkO0FBQ0EsU0FBSVQsUUFBUSxPQUFLUixLQUFMLENBQVdNLFdBQVgsQ0FBdUJJLEtBQXZCLEVBQVo7QUFDQTtBQUNBLFlBQU1RLE9BQU9WLEtBQVAsSUFBZ0IsRUFBdEIsRUFBMEI7QUFDekJBLFlBQU1HLElBQU4sQ0FBVyxPQUFLWCxLQUFMLENBQVdGLElBQVgsQ0FBZ0JjLElBQWhCLEVBQVg7QUFDQUssY0FBUU4sSUFBUixDQUFhO0FBQUEsY0FBTSxPQUFLRSxRQUFMLENBQWMsRUFBRVAsYUFBYUUsS0FBZixFQUFkLENBQU47QUFBQSxPQUFiO0FBQ0E7QUFDRDtBQUNBLFNBQUlVLE9BQU9WLEtBQVAsSUFBZ0IsRUFBaEIsSUFBc0JVLE9BQU9WLEtBQVAsSUFBZ0JVLE9BQU8sT0FBS2xCLEtBQUwsQ0FBV1MsV0FBbEIsQ0FBMUMsRUFBMEU7QUFDekVRLGNBQVFOLElBQVIsQ0FBYztBQUFBLGNBQU0sT0FBS0UsUUFBTCxDQUFjLEVBQUNNLFFBQVEsUUFBVCxFQUFtQmpCLE9BQU8sT0FBS0YsS0FBTCxDQUFXRSxLQUFYLEdBQW1CLE9BQUtGLEtBQUwsQ0FBV2UsR0FBeEQsRUFBZCxDQUFOO0FBQUEsT0FBZDtBQUNBLE1BRkQsTUFFTztBQUNQO0FBQ0NFLGNBQVFOLElBQVIsQ0FBYztBQUFBLGNBQU0sT0FBS0UsUUFBTCxDQUFjLEVBQUNNLFFBQVEsUUFBVCxFQUFtQmpCLE9BQU8sT0FBS0YsS0FBTCxDQUFXRSxLQUFYLEdBQW1CLE9BQUtGLEtBQUwsQ0FBV2UsR0FBeEQsRUFBZCxDQUFOO0FBQUEsT0FBZDtBQUNBOztBQUdEO0FBQ0FFLGFBQVFHLE9BQVIsQ0FBZ0IsVUFBQ0MsSUFBRCxFQUFPQyxDQUFQLEVBQWE7QUFDNUJDLGlCQUFXRixJQUFYLEVBQWlCLENBQUNDLElBQUksQ0FBTCxJQUFVLEdBQTNCO0FBQ0EsTUFGRDtBQXJCTTtBQXdCTjtBQUNEOztBQUVEOzs7OytCQUNhO0FBQ1osT0FBSWQsUUFBUSxLQUFLUixLQUFMLENBQVdNLFdBQVgsQ0FBdUJJLEtBQXZCLEVBQVo7QUFDQUYsU0FBTUcsSUFBTixDQUFXLEtBQUtYLEtBQUwsQ0FBV0YsSUFBWCxDQUFnQmMsSUFBaEIsRUFBWDtBQUNBLFFBQUtDLFFBQUwsQ0FBYyxFQUFFUCxhQUFhRSxLQUFmLEVBQWQ7QUFDQTs7QUFFRDs7OzswQkFDUTtBQUNQLFFBQUtLLFFBQUwsQ0FBY1osY0FBZDtBQUNBOztBQUVEOzs7O3dCQUNNdUIsSSxFQUFNO0FBQ1gsT0FBRyxLQUFLeEIsS0FBTCxDQUFXUyxXQUFYLENBQXVCRixNQUF2QixLQUFrQyxDQUFsQyxJQUF1Q2lCLElBQTFDLEVBQWdEO0FBQy9DLFNBQUtYLFFBQUwsQ0FBYyxFQUFFUixRQUFRLEtBQVYsRUFBaUJJLGFBQWEsRUFBOUIsRUFBa0NILGFBQWEsRUFBL0MsRUFBbURGLFFBQVEsS0FBM0QsRUFBa0VlLFFBQVEsRUFBMUUsRUFBZDtBQUNBSSxlQUFXLEtBQUtFLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLElBQXJCLENBQVgsRUFBdUMsR0FBdkM7QUFDQUgsZUFBVyxLQUFLRSxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixJQUFyQixDQUFYLEVBQXVDLEdBQXZDO0FBQ0FILGVBQVcsS0FBS0ksS0FBTCxDQUFXRCxJQUFYLENBQWdCLElBQWhCLENBQVgsRUFBa0MsR0FBbEM7QUFDQUgsZUFBVyxLQUFLSSxLQUFMLENBQVdELElBQVgsQ0FBZ0IsSUFBaEIsQ0FBWCxFQUFrQyxJQUFsQztBQUNBSCxlQUFXLEtBQUtLLGNBQUwsQ0FBb0JGLElBQXBCLENBQXlCLElBQXpCLENBQVgsRUFBMkMsSUFBM0M7QUFDQTtBQUNEOzs7bUNBRWdCO0FBQ2hCLE9BQUlSLE9BQU8sS0FBS2xCLEtBQUwsQ0FBV1MsV0FBbEIsTUFBbUMsRUFBdkMsRUFBMkM7QUFDMUMsU0FBS0ksUUFBTCxDQUFjLEVBQUNNLFFBQVEsUUFBVCxFQUFtQmpCLE9BQU8sS0FBS0YsS0FBTCxDQUFXRSxLQUFYLEdBQW9CLEtBQUtGLEtBQUwsQ0FBV2UsR0FBWCxHQUFpQixHQUEvRCxFQUFxRVYsUUFBUSxJQUE3RSxFQUFkO0FBQ0E7QUFDRDs7OzRCQUVTd0IsTSxFQUFRO0FBQ2pCLE9BQUcsS0FBSzdCLEtBQUwsQ0FBV0ssTUFBWCxJQUFxQixLQUFLTCxLQUFMLENBQVdTLFdBQVgsQ0FBdUJGLE1BQXZCLEtBQWtDLENBQTFELEVBQTZEO0FBQzVELFNBQUtNLFFBQUwsQ0FBYztBQUNiRSxVQUFLYztBQURRLEtBQWQ7QUFHQTtBQUNEOzs7MkJBRVE7QUFBQTs7QUFDUixVQUNDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQSxPQUFLLFdBQVUsTUFBZjtBQUNDO0FBQUE7QUFBQSxRQUFLLFdBQVUsV0FBZjtBQUFBO0FBQXlDLFdBQUs3QixLQUFMLENBQVdGLElBQVgsQ0FBZ0JnQyxTQUFoQjtBQUF6QyxNQUREO0FBRUM7QUFBQTtBQUFBLFFBQUssV0FBVSxPQUFmO0FBQUE7QUFBb0MsV0FBSzlCLEtBQUwsQ0FBV0YsSUFBWCxDQUFnQmlDLEtBQWhCO0FBQXBDO0FBRkQsS0FERDtBQU1DO0FBQUE7QUFBQSxPQUFLLFdBQVUsTUFBZjtBQUNDO0FBQUE7QUFBQSxRQUFLLFdBQVUsT0FBZjtBQUNDLG1DQUFLLEtBQUksaUJBQVQsRUFBMkIsV0FBVSxZQUFyQztBQURELE1BREQ7QUFLQztBQUFBO0FBQUEsUUFBSyxXQUFVLE9BQWY7QUFDQywwQkFBQyxNQUFELElBQVEsT0FBTyxLQUFLL0IsS0FBTCxDQUFXTSxXQUExQixFQUF1QyxRQUFRLEtBQUtOLEtBQUwsQ0FBV0ssTUFBMUQsR0FERDtBQUVDLDBCQUFDLE1BQUQsSUFBUSxPQUFPLEtBQUtMLEtBQUwsQ0FBV1MsV0FBMUIsR0FGRDtBQUdDLDBCQUFDLE1BQUQsSUFBUSxNQUFNLEtBQUtULEtBQUwsQ0FBV0ksTUFBekIsRUFBaUMsUUFBUSxLQUFLSixLQUFMLENBQVdtQixNQUFwRCxHQUhEO0FBS0M7QUFBQTtBQUFBLFNBQUssV0FBVSxhQUFmO0FBQ0M7QUFBQTtBQUFBLFVBQU0sU0FBUyxLQUFLYSxLQUFMLENBQVdOLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBZjtBQUFBO0FBQUE7QUFERCxPQUxEO0FBU0M7QUFBQTtBQUFBLFNBQUssV0FBVSxjQUFmO0FBQ0M7QUFBQTtBQUFBLFVBQU0sU0FBUyxLQUFLQyxLQUFMLENBQVdELElBQVgsQ0FBZ0IsSUFBaEIsQ0FBZjtBQUFBO0FBQUEsUUFERDtBQUFBO0FBQ3FELHNDQURyRDtBQUVDO0FBQUE7QUFBQSxVQUFNLFNBQVMsS0FBS08sSUFBTCxDQUFVUCxJQUFWLENBQWUsSUFBZixDQUFmO0FBQ0UsYUFBSzFCLEtBQUwsQ0FBV0ssTUFBWCxJQUFxQixLQUFLTCxLQUFMLENBQVdTLFdBQVgsQ0FBdUJGLE1BQXZCLEtBQWtDLENBQXZELEdBQTJELE9BQTNELEdBQXFFO0FBRHZFO0FBRkQ7QUFURCxNQUxEO0FBc0JDO0FBQUE7QUFBQSxRQUFLLFdBQVUsTUFBZjtBQUNDO0FBQUE7QUFBQSxTQUFNLFdBQVUsS0FBaEI7QUFBQTtBQUE2QixZQUFLUCxLQUFMLENBQVdlO0FBQXhDLE9BREQ7QUFBQTtBQUNxRCxxQ0FEckQ7QUFFQztBQUFBO0FBQUEsU0FBTSxXQUFVLFFBQWhCO0FBQUE7QUFBbUMsWUFBS2YsS0FBTCxDQUFXRSxLQUE5QztBQUFBO0FBQUE7QUFGRCxNQXRCRDtBQTRCQztBQUFBO0FBQUEsUUFBSyxXQUFVLFNBQWY7QUFDQztBQUFBO0FBQUEsU0FBSyxXQUFVLE1BQWYsRUFBc0IsU0FBUztBQUFBLGdCQUFNLE9BQUtnQyxTQUFMLENBQWUsQ0FBZixDQUFOO0FBQUEsU0FBL0I7QUFBQTtBQUFBLE9BREQ7QUFFQztBQUFBO0FBQUEsU0FBSyxXQUFVLE1BQWYsRUFBc0IsU0FBUztBQUFBLGdCQUFNLE9BQUtBLFNBQUwsQ0FBZSxDQUFmLENBQU47QUFBQSxTQUEvQjtBQUFBO0FBQUEsT0FGRDtBQUdDO0FBQUE7QUFBQSxTQUFLLFdBQVUsT0FBZixFQUF1QixTQUFTO0FBQUEsZ0JBQU0sT0FBS0EsU0FBTCxDQUFlLEVBQWYsQ0FBTjtBQUFBLFNBQWhDO0FBQUE7QUFBQSxPQUhEO0FBSUM7QUFBQTtBQUFBLFNBQUssV0FBVSxPQUFmLEVBQXVCLFNBQVM7QUFBQSxnQkFBTSxPQUFLQSxTQUFMLENBQWUsRUFBZixDQUFOO0FBQUEsU0FBaEM7QUFBQTtBQUFBLE9BSkQ7QUFLQztBQUFBO0FBQUEsU0FBSyxXQUFVLE9BQWYsRUFBdUIsU0FBUztBQUFBLGdCQUFNLE9BQUtBLFNBQUwsQ0FBZSxFQUFmLENBQU47QUFBQSxTQUFoQztBQUFBO0FBQUEsT0FMRDtBQU1DO0FBQUE7QUFBQSxTQUFLLFdBQVUsUUFBZixFQUF3QixTQUFTO0FBQUEsZ0JBQU0sT0FBS0EsU0FBTCxDQUFlLEdBQWYsQ0FBTjtBQUFBLFNBQWpDO0FBQUE7QUFBQSxPQU5EO0FBT0M7QUFBQTtBQUFBLFNBQUssV0FBVSxRQUFmLEVBQXdCLFNBQVM7QUFBQSxnQkFBTSxPQUFLQSxTQUFMLENBQWUsR0FBZixDQUFOO0FBQUEsU0FBakM7QUFBQTtBQUFBO0FBUEQ7QUE1QkQ7QUFORCxJQUREO0FBa0RBOzs7O0VBOUlnQkMsTUFBTUMsUzs7QUFpSnhCQyxTQUFTQyxNQUFULENBQWdCLG9CQUFFLEdBQUYsSUFBTSxPQUFNLE1BQVosR0FBaEIsRUFBc0NDLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBdEM7O0FBRUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR2YXIgZGVjayA9IG5ldyBEZWNrKCk7XG5cdFx0dGhpcy5zdGF0ZSA9IGRlZmF1bHRTdGF0ZSgpO1xuXHRcdHRoaXMuc3RhdGUubW9uZXkgPSBOdW1iZXIocHJvcHMubW9uZXkpO1xuXHR9XG5cblx0aGl0TWUoKSB7XG5cdFx0Ly8gaWYgZ2FtZSBpcyBvdmVyLCBoaXQgbWUgZG9lcyBub3RoaW5nXG5cdFx0aWYodGhpcy5zdGF0ZS5idXN0ZWQgfHwgdGhpcy5zdGF0ZS5yZXZlYWwgfHwgdGhpcy5zdGF0ZS5kZWFsZXJDYXJkcy5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cdFx0Ly9zZXQgc3RhdGUgaXMgYXN5bmMsIHNvIHVzaW5nIGNhcmRzIHRvIGtlZXAgdHJhY2sgb2Ygc3RhdHVzXG5cdFx0bGV0IGNhcmRzID0gdGhpcy5zdGF0ZS5wbGF5ZXJDYXJkcy5zbGljZSgpO1xuXHRcdGNhcmRzLnB1c2godGhpcy5zdGF0ZS5kZWNrLmRyYXcoKSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHBsYXllckNhcmRzOiBjYXJkcyB9KTtcblx0XHQvLyBpZiBwbGF5ZXIgYnVzdGVkLCBzZXQgZ2FtZSBzdGF0ZSB0byBnYW1lIG92ZXJcblx0XHRpZiAoaXNCdXN0KGNhcmRzKSkgeyBcblx0XHRcdHRoaXMuc2V0U3RhdGUoeyBidXN0ZWQ6IHRydWUsIHJldmVhbDogdHJ1ZSwgbW9uZXk6IHRoaXMuc3RhdGUubW9uZXkgLSB0aGlzLnN0YXRlLmJldCB9KTtcblx0XHR9XG5cdH1cblxuXHRrZWVwKCkge1xuXHRcdC8vIGlmIGdhbWUgaXMgb3ZlciwgdGhlIGtlZXAgYnV0dG9uIGJlY29tZXMgZGVhbCFcblx0XHRpZiAodGhpcy5zdGF0ZS5yZXZlYWwgfHwgdGhpcy5zdGF0ZS5wbGF5ZXJDYXJkcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMuc3RhcnQodHJ1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vZW5kcyB0aGUgcm91bmQgYnkgcmV2ZWFsaW5nIHRoZSBmYWNlIGRvd24gY2FyZFxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7cmV2ZWFsOiB0cnVlfSk7XG5cdFx0XHQvL2FuaW1hdGUgdG8gc2xvdyBkb3duIHRoZSBkZWFsZXIncyBhbmltYXRpb25cblx0XHRcdGxldCBhbmltYXRlID0gW107XG5cdFx0XHRsZXQgY2FyZHMgPSB0aGlzLnN0YXRlLmRlYWxlckNhcmRzLnNsaWNlKCk7XG5cdFx0XHQvL2RlYWxlciBkcmF3cyB3aGVuIHBvaW50cyBpcyBiZWxvdyAxN1xuXHRcdFx0d2hpbGUocG9pbnRzKGNhcmRzKSA8IDE3KSB7XG5cdFx0XHRcdGNhcmRzLnB1c2godGhpcy5zdGF0ZS5kZWNrLmRyYXcoKSk7XG5cdFx0XHRcdGFuaW1hdGUucHVzaCgoKSA9PiB0aGlzLnNldFN0YXRlKHsgZGVhbGVyQ2FyZHM6IGNhcmRzIH0pKTtcblx0XHRcdH1cblx0XHRcdC8vaWYgZGVhbGVyIGJ1c3RzLCBvciBwb2ludHMgaXMgbGVzcyB0aGFuIHBsYXllciwgcGxheWVyIHdpbnNcblx0XHRcdGlmIChwb2ludHMoY2FyZHMpID4gMjEgfHwgcG9pbnRzKGNhcmRzKSA8IHBvaW50cyh0aGlzLnN0YXRlLnBsYXllckNhcmRzKSkge1xuXHRcdFx0XHRhbmltYXRlLnB1c2goICgpID0+IHRoaXMuc2V0U3RhdGUoe3dpbm5lcjogJ1BMQVlFUicsIG1vbmV5OiB0aGlzLnN0YXRlLm1vbmV5ICsgdGhpcy5zdGF0ZS5iZXR9KSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdC8vb3RoZXJ3aXNlIGRlYWxlciB3aW5zXG5cdFx0XHRcdGFuaW1hdGUucHVzaCggKCkgPT4gdGhpcy5zZXRTdGF0ZSh7d2lubmVyOiAnREVBTEVSJywgbW9uZXk6IHRoaXMuc3RhdGUubW9uZXkgLSB0aGlzLnN0YXRlLmJldH0pICk7XG5cdFx0XHR9XG5cblxuXHRcdFx0Ly9hbmltYXRlIGZvciBkZWFsZXJcblx0XHRcdGFuaW1hdGUuZm9yRWFjaCgoZnVuYywgaSkgPT4ge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmMsIChpICsgMSkgKiA1MDApO1xuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHQvLyBkZWFsZXIgZHJhd3MgY2FyZFxuXHRkZWFsZXJEcmF3KCkge1xuXHRcdGxldCBjYXJkcyA9IHRoaXMuc3RhdGUuZGVhbGVyQ2FyZHMuc2xpY2UoKTtcblx0XHRjYXJkcy5wdXNoKHRoaXMuc3RhdGUuZGVjay5kcmF3KCkpO1xuXHRcdHRoaXMuc2V0U3RhdGUoeyBkZWFsZXJDYXJkczogY2FyZHMgfSk7XG5cdH1cblxuXHQvL3NodWZmbGVzIHRoZSBkZWNrXG5cdHJlc2V0KCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoZGVmYXVsdFN0YXRlKCkpO1xuXHR9XG5cblx0Ly9kZWFscyBoYW5kcyB0byBiZWdpbiB0aGUgZ2FtZVxuXHRzdGFydChib29sKSB7XG5cdFx0aWYodGhpcy5zdGF0ZS5wbGF5ZXJDYXJkcy5sZW5ndGggPT09IDAgfHwgYm9vbCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7IHJldmVhbDogZmFsc2UsIHBsYXllckNhcmRzOiBbXSwgZGVhbGVyQ2FyZHM6IFtdLCBidXN0ZWQ6IGZhbHNlLCB3aW5uZXI6ICcnfSk7XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMuZGVhbGVyRHJhdy5iaW5kKHRoaXMpLCAyNTApO1xuXHRcdFx0c2V0VGltZW91dCh0aGlzLmRlYWxlckRyYXcuYmluZCh0aGlzKSwgNTAwKTtcblx0XHRcdHNldFRpbWVvdXQodGhpcy5oaXRNZS5iaW5kKHRoaXMpLCA3NTApO1xuXHRcdFx0c2V0VGltZW91dCh0aGlzLmhpdE1lLmJpbmQodGhpcyksIDEwMDApO1xuXHRcdFx0c2V0VGltZW91dCh0aGlzLmNoZWNrQmxhY2tKYWNrLmJpbmQodGhpcyksIDEyNTApO1xuXHRcdH1cblx0fVxuXG5cdGNoZWNrQmxhY2tKYWNrKCkge1xuXHRcdGlmIChwb2ludHModGhpcy5zdGF0ZS5wbGF5ZXJDYXJkcykgPT09IDIxKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHt3aW5uZXI6ICdQTEFZRVInLCBtb25leTogdGhpcy5zdGF0ZS5tb25leSArICh0aGlzLnN0YXRlLmJldCAqIDEuNSksIHJldmVhbDogdHJ1ZX0pO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZUJldChhbW91bnQpIHtcblx0XHRpZih0aGlzLnN0YXRlLnJldmVhbCB8fCB0aGlzLnN0YXRlLnBsYXllckNhcmRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGJldDogYW1vdW50XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdpbmZvJz5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nY2FyZHNMZWZ0Jz4gQ2FyZHMgbGVmdDoge3RoaXMuc3RhdGUuZGVjay5jYXJkc0xlZnQoKX08L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nY291bnQnPiBUaGUgQ291bnQ6IHt0aGlzLnN0YXRlLmRlY2suY291bnQoKX08L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2dhbWUnPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd0aXRsZSc+XG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz0nY2FyZHMvdGl0bGUucG5nJyBjbGFzc05hbWU9J3RpdGxlSW1hZ2UnIC8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndGFibGUnPlxuXHRcdFx0XHRcdFx0PERlYWxlciBjYXJkcz17dGhpcy5zdGF0ZS5kZWFsZXJDYXJkc30gcmV2ZWFsPXt0aGlzLnN0YXRlLnJldmVhbH0vPlxuXHRcdFx0XHRcdFx0PFBsYXllciBjYXJkcz17dGhpcy5zdGF0ZS5wbGF5ZXJDYXJkc30gLz5cblx0XHRcdFx0XHRcdDxSZXN1bHQgYnVzdD17dGhpcy5zdGF0ZS5idXN0ZWR9IHdpbm5lcj17dGhpcy5zdGF0ZS53aW5uZXJ9IC8+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdsZWZ0QnV0dG9ucyc+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIG9uQ2xpY2s9e3RoaXMucmVzZXQuYmluZCh0aGlzKX0+U2h1ZmZsZTwvc3Bhbj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ncmlnaHRCdXR0b25zJz5cblx0XHRcdFx0XHRcdFx0PHNwYW4gb25DbGljaz17dGhpcy5oaXRNZS5iaW5kKHRoaXMpfT5IaXQgTWU8L3NwYW4+IDxici8+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIG9uQ2xpY2s9e3RoaXMua2VlcC5iaW5kKHRoaXMpfT5cblx0XHRcdFx0XHRcdFx0XHR7dGhpcy5zdGF0ZS5yZXZlYWwgfHwgdGhpcy5zdGF0ZS5wbGF5ZXJDYXJkcy5sZW5ndGggPT09IDAgPyAnRGVhbCEnIDogJ0tlZXAnfVxuXHRcdFx0XHRcdFx0XHQ8L3NwYW4+XHRcblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JldHMnPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPSdiZXQnPkJldDogJHt0aGlzLnN0YXRlLmJldH08L3NwYW4+IDxiciAvPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPSd3YWxsZXQnPldhbGxldDogJHt0aGlzLnN0YXRlLm1vbmV5fSA8L3NwYW4+XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdhbGxCZXRzJz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXQyJyBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZUJldCgyKX0+MjwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JldDUnIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDUpfT41PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0MTAnIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDEwKX0+MTA8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXQyNScgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVCZXQoMjUpfT4yNTwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JldDUwJyBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZUJldCg1MCl9PjUwPC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0MTAwJyBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZUJldCgxMDApfT4xMDA8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXQyMDAnIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDIwMCl9PjIwMDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblxuXG5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufVxuXG5SZWFjdERPTS5yZW5kZXIoPCBBcHAgbW9uZXk9JzEwMDAnLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XG5cbi8vIGJhYmVsIC4gLS1vdXQtZGlyIGNvbXBpbGVkIC0tcHJlc2V0cz1lczIwMTUscmVhY3QgLS1pZ25vcmU9bm9kZV9tb2R1bGVzLGNvbXBpbGVkIC0tc291cmNlLW1hcHMgaW5saW5lIC0td2F0Y2hcblxuXG5cblxuIl19