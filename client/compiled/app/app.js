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
			if (this.state.reveal) {
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
							return _this2.setState({ dealerCards: cards }).bind(_this2);
						});
					}
					//if dealer busts, or points is less than player, player wins
					if (points(cards) > 21 || points(cards) < points(_this2.state.playerCards)) {
						animate.push(function () {
							return _this2.setState({ winner: 'PLAYER', money: _this2.state.money + _this2.state.bet }).bind(_this2);
						});
					} else {
						//otherwise player wins
						animate.push(function () {
							return _this2.setState({ winner: 'DEALER', money: _this2.state.money - _this2.state.bet }).bind(_this2);
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
			}
		}
	}, {
		key: 'updateBet',
		value: function updateBet(amount) {
			this.setState({
				bet: amount
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
							{ className: 'wallet' },
							'Wallet: $',
							this.state.money,
							' '
						),
						React.createElement(
							'span',
							{ className: 'bet' },
							'Bet: ',
							this.state.bet
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
				),
				React.createElement('div', { className: 'info' })
			);
		}
	}]);

	return App;
}(React.Component);

ReactDOM.render(React.createElement(App, { money: '1000' }), document.getElementById('app'));

// babel . --out-dir compiled --presets=es2015,react --ignore=node_modules,compiled --source-maps inline --watch
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9hcHAuanMiXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJkZWNrIiwiRGVjayIsInN0YXRlIiwiZGVmYXVsdFN0YXRlIiwibW9uZXkiLCJOdW1iZXIiLCJidXN0ZWQiLCJyZXZlYWwiLCJkZWFsZXJDYXJkcyIsImxlbmd0aCIsImNhcmRzIiwicGxheWVyQ2FyZHMiLCJzbGljZSIsInB1c2giLCJkcmF3Iiwic2V0U3RhdGUiLCJpc0J1c3QiLCJiZXQiLCJzdGFydCIsImFuaW1hdGUiLCJwb2ludHMiLCJiaW5kIiwid2lubmVyIiwiZm9yRWFjaCIsImZ1bmMiLCJpIiwic2V0VGltZW91dCIsImJvb2wiLCJkZWFsZXJEcmF3IiwiaGl0TWUiLCJhbW91bnQiLCJyZXNldCIsImtlZXAiLCJ1cGRhdGVCZXQiLCJSZWFjdCIsIkNvbXBvbmVudCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxHOzs7QUFFTCxjQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsd0dBQ1pBLEtBRFk7O0FBRWxCLE1BQUlDLE9BQU8sSUFBSUMsSUFBSixFQUFYO0FBQ0EsUUFBS0MsS0FBTCxHQUFhQyxjQUFiO0FBQ0EsUUFBS0QsS0FBTCxDQUFXRSxLQUFYLEdBQW1CQyxPQUFPTixNQUFNSyxLQUFiLENBQW5CO0FBSmtCO0FBS2xCOzs7OzBCQUVPO0FBQ1A7QUFDQSxPQUFHLEtBQUtGLEtBQUwsQ0FBV0ksTUFBWCxJQUFxQixLQUFLSixLQUFMLENBQVdLLE1BQWhDLElBQTBDLEtBQUtMLEtBQUwsQ0FBV00sV0FBWCxDQUF1QkMsTUFBdkIsS0FBa0MsQ0FBL0UsRUFBa0Y7QUFBRTtBQUFTO0FBQzdGO0FBQ0EsT0FBSUMsUUFBUSxLQUFLUixLQUFMLENBQVdTLFdBQVgsQ0FBdUJDLEtBQXZCLEVBQVo7QUFDQUYsU0FBTUcsSUFBTixDQUFXLEtBQUtYLEtBQUwsQ0FBV0YsSUFBWCxDQUFnQmMsSUFBaEIsRUFBWDtBQUNBLFFBQUtDLFFBQUwsQ0FBYyxFQUFFSixhQUFhRCxLQUFmLEVBQWQ7QUFDQTtBQUNBLE9BQUlNLE9BQU9OLEtBQVAsQ0FBSixFQUFtQjtBQUNsQixTQUFLSyxRQUFMLENBQWMsRUFBRVQsUUFBUSxJQUFWLEVBQWdCQyxRQUFRLElBQXhCLEVBQThCSCxPQUFPLEtBQUtGLEtBQUwsQ0FBV0UsS0FBWCxHQUFtQixLQUFLRixLQUFMLENBQVdlLEdBQW5FLEVBQWQ7QUFDQTtBQUNEOzs7eUJBRU07QUFBQTs7QUFDTjtBQUNBLE9BQUksS0FBS2YsS0FBTCxDQUFXSyxNQUFmLEVBQXVCO0FBQ3RCLFNBQUtXLEtBQUwsQ0FBVyxJQUFYO0FBQ0EsSUFGRCxNQUVPO0FBQUE7QUFDTjtBQUNBLFlBQUtILFFBQUwsQ0FBYyxFQUFDUixRQUFRLElBQVQsRUFBZDtBQUNBO0FBQ0EsU0FBSVksVUFBVSxFQUFkO0FBQ0EsU0FBSVQsUUFBUSxPQUFLUixLQUFMLENBQVdNLFdBQVgsQ0FBdUJJLEtBQXZCLEVBQVo7QUFDQTtBQUNBLFlBQU1RLE9BQU9WLEtBQVAsSUFBZ0IsRUFBdEIsRUFBMEI7QUFDekJBLFlBQU1HLElBQU4sQ0FBVyxPQUFLWCxLQUFMLENBQVdGLElBQVgsQ0FBZ0JjLElBQWhCLEVBQVg7QUFDQUssY0FBUU4sSUFBUixDQUFhO0FBQUEsY0FBTSxPQUFLRSxRQUFMLENBQWMsRUFBRVAsYUFBYUUsS0FBZixFQUFkLEVBQXNDVyxJQUF0QyxRQUFOO0FBQUEsT0FBYjtBQUNBO0FBQ0Q7QUFDQSxTQUFJRCxPQUFPVixLQUFQLElBQWdCLEVBQWhCLElBQXNCVSxPQUFPVixLQUFQLElBQWdCVSxPQUFPLE9BQUtsQixLQUFMLENBQVdTLFdBQWxCLENBQTFDLEVBQTBFO0FBQ3pFUSxjQUFRTixJQUFSLENBQWM7QUFBQSxjQUFNLE9BQUtFLFFBQUwsQ0FBYyxFQUFDTyxRQUFRLFFBQVQsRUFBbUJsQixPQUFPLE9BQUtGLEtBQUwsQ0FBV0UsS0FBWCxHQUFtQixPQUFLRixLQUFMLENBQVdlLEdBQXhELEVBQWQsRUFBNEVJLElBQTVFLFFBQU47QUFBQSxPQUFkO0FBQ0EsTUFGRCxNQUVPO0FBQ1A7QUFDQ0YsY0FBUU4sSUFBUixDQUFjO0FBQUEsY0FBTSxPQUFLRSxRQUFMLENBQWMsRUFBQ08sUUFBUSxRQUFULEVBQW1CbEIsT0FBTyxPQUFLRixLQUFMLENBQVdFLEtBQVgsR0FBbUIsT0FBS0YsS0FBTCxDQUFXZSxHQUF4RCxFQUFkLEVBQTRFSSxJQUE1RSxRQUFOO0FBQUEsT0FBZDtBQUNBO0FBQ0Q7QUFDQUYsYUFBUUksT0FBUixDQUFnQixVQUFDQyxJQUFELEVBQU9DLENBQVAsRUFBYTtBQUM1QkMsaUJBQVdGLElBQVgsRUFBaUIsQ0FBQ0MsSUFBSSxDQUFMLElBQVUsR0FBM0I7QUFDQSxNQUZEO0FBbkJNO0FBdUJOO0FBQ0Q7O0FBRUQ7Ozs7K0JBQ2E7QUFDWixPQUFJZixRQUFRLEtBQUtSLEtBQUwsQ0FBV00sV0FBWCxDQUF1QkksS0FBdkIsRUFBWjtBQUNBRixTQUFNRyxJQUFOLENBQVcsS0FBS1gsS0FBTCxDQUFXRixJQUFYLENBQWdCYyxJQUFoQixFQUFYO0FBQ0EsUUFBS0MsUUFBTCxDQUFjLEVBQUVQLGFBQWFFLEtBQWYsRUFBZDtBQUNBOztBQUVEOzs7OzBCQUNRO0FBQ1AsUUFBS0ssUUFBTCxDQUFjWixjQUFkO0FBQ0E7O0FBRUQ7Ozs7d0JBQ013QixJLEVBQU07QUFDWCxPQUFHLEtBQUt6QixLQUFMLENBQVdTLFdBQVgsQ0FBdUJGLE1BQXZCLEtBQWtDLENBQWxDLElBQXVDa0IsSUFBMUMsRUFBZ0Q7QUFDL0MsU0FBS1osUUFBTCxDQUFjLEVBQUVSLFFBQVEsS0FBVixFQUFpQkksYUFBYSxFQUE5QixFQUFrQ0gsYUFBYSxFQUEvQyxFQUFtREYsUUFBUSxLQUEzRCxFQUFrRWdCLFFBQVEsRUFBMUUsRUFBZDtBQUNBSSxlQUFXLEtBQUtFLFVBQUwsQ0FBZ0JQLElBQWhCLENBQXFCLElBQXJCLENBQVgsRUFBdUMsR0FBdkM7QUFDQUssZUFBVyxLQUFLRSxVQUFMLENBQWdCUCxJQUFoQixDQUFxQixJQUFyQixDQUFYLEVBQXVDLEdBQXZDO0FBQ0FLLGVBQVcsS0FBS0csS0FBTCxDQUFXUixJQUFYLENBQWdCLElBQWhCLENBQVgsRUFBa0MsR0FBbEM7QUFDQUssZUFBVyxLQUFLRyxLQUFMLENBQVdSLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBWCxFQUFrQyxJQUFsQztBQUNBO0FBQ0Q7Ozs0QkFFU1MsTSxFQUFRO0FBQ2pCLFFBQUtmLFFBQUwsQ0FBYztBQUNiRSxTQUFLYTtBQURRLElBQWQ7QUFHQTs7OzJCQUVRO0FBQUE7O0FBQ1IsVUFDQztBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUEsT0FBSyxXQUFVLE1BQWY7QUFDQztBQUFBO0FBQUEsUUFBSyxXQUFVLE9BQWY7QUFDQyxtQ0FBSyxLQUFJLGlCQUFULEVBQTJCLFdBQVUsWUFBckM7QUFERCxNQUREO0FBS0M7QUFBQTtBQUFBLFFBQUssV0FBVSxPQUFmO0FBQ0MsMEJBQUMsTUFBRCxJQUFRLE9BQU8sS0FBSzVCLEtBQUwsQ0FBV00sV0FBMUIsRUFBdUMsUUFBUSxLQUFLTixLQUFMLENBQVdLLE1BQTFELEdBREQ7QUFFQywwQkFBQyxNQUFELElBQVEsT0FBTyxLQUFLTCxLQUFMLENBQVdTLFdBQTFCLEdBRkQ7QUFHQywwQkFBQyxNQUFELElBQVEsTUFBTSxLQUFLVCxLQUFMLENBQVdJLE1BQXpCLEVBQWlDLFFBQVEsS0FBS0osS0FBTCxDQUFXb0IsTUFBcEQsR0FIRDtBQUtDO0FBQUE7QUFBQSxTQUFLLFdBQVUsYUFBZjtBQUNDO0FBQUE7QUFBQSxVQUFNLFNBQVMsS0FBS0osS0FBTCxDQUFXRyxJQUFYLENBQWdCLElBQWhCLENBQWY7QUFBQTtBQUFBLFFBREQ7QUFBQTtBQUNvRCxzQ0FEcEQ7QUFFQztBQUFBO0FBQUEsVUFBTSxTQUFTLEtBQUtVLEtBQUwsQ0FBV1YsSUFBWCxDQUFnQixJQUFoQixDQUFmO0FBQUE7QUFBQTtBQUZELE9BTEQ7QUFVQztBQUFBO0FBQUEsU0FBSyxXQUFVLGNBQWY7QUFDQztBQUFBO0FBQUEsVUFBTSxTQUFTLEtBQUtRLEtBQUwsQ0FBV1IsSUFBWCxDQUFnQixJQUFoQixDQUFmO0FBQUE7QUFBQSxRQUREO0FBQUE7QUFDcUQsc0NBRHJEO0FBRUM7QUFBQTtBQUFBLFVBQU0sU0FBUyxLQUFLVyxJQUFMLENBQVVYLElBQVYsQ0FBZSxJQUFmLENBQWY7QUFBc0MsYUFBS25CLEtBQUwsQ0FBV0ssTUFBWCxHQUFvQixPQUFwQixHQUE4QjtBQUFwRTtBQUZEO0FBVkQsTUFMRDtBQXFCQztBQUFBO0FBQUEsUUFBSyxXQUFVLE1BQWY7QUFDQztBQUFBO0FBQUEsU0FBTSxXQUFVLFFBQWhCO0FBQUE7QUFBbUMsWUFBS0wsS0FBTCxDQUFXRSxLQUE5QztBQUFBO0FBQUEsT0FERDtBQUVDO0FBQUE7QUFBQSxTQUFNLFdBQVUsS0FBaEI7QUFBQTtBQUE0QixZQUFLRixLQUFMLENBQVdlO0FBQXZDO0FBRkQsTUFyQkQ7QUEwQkM7QUFBQTtBQUFBLFFBQUssV0FBVSxTQUFmO0FBQ0M7QUFBQTtBQUFBLFNBQUssV0FBVSxNQUFmLEVBQXNCLFNBQVM7QUFBQSxnQkFBTSxPQUFLZ0IsU0FBTCxDQUFlLENBQWYsRUFBa0JaLElBQWxCLFFBQU47QUFBQSxTQUEvQjtBQUFBO0FBQUEsT0FERDtBQUVDO0FBQUE7QUFBQSxTQUFLLFdBQVUsT0FBZixFQUF1QixTQUFTO0FBQUEsZ0JBQU0sT0FBS1ksU0FBTCxDQUFlLEVBQWYsRUFBbUJaLElBQW5CLFFBQU47QUFBQSxTQUFoQztBQUFBO0FBQUEsT0FGRDtBQUdDO0FBQUE7QUFBQSxTQUFLLFdBQVUsT0FBZixFQUF1QixTQUFTO0FBQUEsZ0JBQU0sT0FBS1ksU0FBTCxDQUFlLEVBQWYsRUFBbUJaLElBQW5CLFFBQU47QUFBQSxTQUFoQztBQUFBO0FBQUEsT0FIRDtBQUlDO0FBQUE7QUFBQSxTQUFLLFdBQVUsT0FBZixFQUF1QixTQUFTO0FBQUEsZ0JBQU0sT0FBS1ksU0FBTCxDQUFlLEVBQWYsRUFBbUJaLElBQW5CLFFBQU47QUFBQSxTQUFoQztBQUFBO0FBQUEsT0FKRDtBQUtDO0FBQUE7QUFBQSxTQUFLLFdBQVUsUUFBZixFQUF3QixTQUFTO0FBQUEsZ0JBQU0sT0FBS1ksU0FBTCxDQUFlLEdBQWYsRUFBb0JaLElBQXBCLFFBQU47QUFBQSxTQUFqQztBQUFBO0FBQUEsT0FMRDtBQU1DO0FBQUE7QUFBQSxTQUFLLFdBQVUsUUFBZixFQUF3QixTQUFTO0FBQUEsZ0JBQU0sT0FBS1ksU0FBTCxDQUFlLEdBQWYsRUFBb0JaLElBQXBCLFFBQU47QUFBQSxTQUFqQztBQUFBO0FBQUE7QUFORDtBQTFCRCxLQUREO0FBb0NDLGlDQUFLLFdBQVUsTUFBZjtBQXBDRCxJQUREO0FBeUNBOzs7O0VBM0hnQmEsTUFBTUMsUzs7QUE4SHhCQyxTQUFTQyxNQUFULENBQWdCLG9CQUFFLEdBQUYsSUFBTSxPQUFNLE1BQVosR0FBaEIsRUFBc0NDLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBdEM7O0FBRUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR2YXIgZGVjayA9IG5ldyBEZWNrKCk7XG5cdFx0dGhpcy5zdGF0ZSA9IGRlZmF1bHRTdGF0ZSgpO1xuXHRcdHRoaXMuc3RhdGUubW9uZXkgPSBOdW1iZXIocHJvcHMubW9uZXkpO1xuXHR9XG5cblx0aGl0TWUoKSB7XG5cdFx0Ly8gaWYgZ2FtZSBpcyBvdmVyLCBoaXQgbWUgZG9lcyBub3RoaW5nXG5cdFx0aWYodGhpcy5zdGF0ZS5idXN0ZWQgfHwgdGhpcy5zdGF0ZS5yZXZlYWwgfHwgdGhpcy5zdGF0ZS5kZWFsZXJDYXJkcy5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cdFx0Ly9zZXQgc3RhdGUgaXMgYXN5bmMsIHNvIHVzaW5nIGNhcmRzIHRvIGtlZXAgdHJhY2sgb2Ygc3RhdHVzXG5cdFx0bGV0IGNhcmRzID0gdGhpcy5zdGF0ZS5wbGF5ZXJDYXJkcy5zbGljZSgpO1xuXHRcdGNhcmRzLnB1c2godGhpcy5zdGF0ZS5kZWNrLmRyYXcoKSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHBsYXllckNhcmRzOiBjYXJkcyB9KTtcblx0XHQvLyBpZiBwbGF5ZXIgYnVzdGVkLCBzZXQgZ2FtZSBzdGF0ZSB0byBnYW1lIG92ZXJcblx0XHRpZiAoaXNCdXN0KGNhcmRzKSkgeyBcblx0XHRcdHRoaXMuc2V0U3RhdGUoeyBidXN0ZWQ6IHRydWUsIHJldmVhbDogdHJ1ZSwgbW9uZXk6IHRoaXMuc3RhdGUubW9uZXkgLSB0aGlzLnN0YXRlLmJldCB9KTtcblx0XHR9XG5cdH1cblxuXHRrZWVwKCkge1xuXHRcdC8vIGlmIGdhbWUgaXMgb3ZlciwgdGhlIGtlZXAgYnV0dG9uIGJlY29tZXMgZGVhbCFcblx0XHRpZiAodGhpcy5zdGF0ZS5yZXZlYWwpIHtcblx0XHRcdHRoaXMuc3RhcnQodHJ1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vZW5kcyB0aGUgcm91bmQgYnkgcmV2ZWFsaW5nIHRoZSBmYWNlIGRvd24gY2FyZFxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7cmV2ZWFsOiB0cnVlfSk7XG5cdFx0XHQvL2FuaW1hdGUgdG8gc2xvdyBkb3duIHRoZSBkZWFsZXIncyBhbmltYXRpb25cblx0XHRcdGxldCBhbmltYXRlID0gW107XG5cdFx0XHRsZXQgY2FyZHMgPSB0aGlzLnN0YXRlLmRlYWxlckNhcmRzLnNsaWNlKCk7XG5cdFx0XHQvL2RlYWxlciBkcmF3cyB3aGVuIHBvaW50cyBpcyBiZWxvdyAxN1xuXHRcdFx0d2hpbGUocG9pbnRzKGNhcmRzKSA8IDE3KSB7XG5cdFx0XHRcdGNhcmRzLnB1c2godGhpcy5zdGF0ZS5kZWNrLmRyYXcoKSk7XG5cdFx0XHRcdGFuaW1hdGUucHVzaCgoKSA9PiB0aGlzLnNldFN0YXRlKHsgZGVhbGVyQ2FyZHM6IGNhcmRzIH0pLmJpbmQodGhpcykpO1xuXHRcdFx0fVxuXHRcdFx0Ly9pZiBkZWFsZXIgYnVzdHMsIG9yIHBvaW50cyBpcyBsZXNzIHRoYW4gcGxheWVyLCBwbGF5ZXIgd2luc1xuXHRcdFx0aWYgKHBvaW50cyhjYXJkcykgPiAyMSB8fCBwb2ludHMoY2FyZHMpIDwgcG9pbnRzKHRoaXMuc3RhdGUucGxheWVyQ2FyZHMpKSB7XG5cdFx0XHRcdGFuaW1hdGUucHVzaCggKCkgPT4gdGhpcy5zZXRTdGF0ZSh7d2lubmVyOiAnUExBWUVSJywgbW9uZXk6IHRoaXMuc3RhdGUubW9uZXkgKyB0aGlzLnN0YXRlLmJldH0pLmJpbmQodGhpcykgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHQvL290aGVyd2lzZSBwbGF5ZXIgd2luc1xuXHRcdFx0XHRhbmltYXRlLnB1c2goICgpID0+IHRoaXMuc2V0U3RhdGUoe3dpbm5lcjogJ0RFQUxFUicsIG1vbmV5OiB0aGlzLnN0YXRlLm1vbmV5IC0gdGhpcy5zdGF0ZS5iZXR9KS5iaW5kKHRoaXMpICk7XG5cdFx0XHR9XG5cdFx0XHQvL2FuaW1hdGUgZm9yIGRlYWxlclxuXHRcdFx0YW5pbWF0ZS5mb3JFYWNoKChmdW5jLCBpKSA9PiB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuYywgKGkgKyAxKSAqIDUwMCk7XG5cdFx0XHR9KVxuXG5cdFx0fVxuXHR9XG5cblx0Ly8gZGVhbGVyIGRyYXdzIGNhcmRcblx0ZGVhbGVyRHJhdygpIHtcblx0XHRsZXQgY2FyZHMgPSB0aGlzLnN0YXRlLmRlYWxlckNhcmRzLnNsaWNlKCk7XG5cdFx0Y2FyZHMucHVzaCh0aGlzLnN0YXRlLmRlY2suZHJhdygpKTtcblx0XHR0aGlzLnNldFN0YXRlKHsgZGVhbGVyQ2FyZHM6IGNhcmRzIH0pO1xuXHR9XG5cblx0Ly9zaHVmZmxlcyB0aGUgZGVja1xuXHRyZXNldCgpIHtcblx0XHR0aGlzLnNldFN0YXRlKGRlZmF1bHRTdGF0ZSgpKTtcblx0fVxuXG5cdC8vZGVhbHMgaGFuZHMgdG8gYmVnaW4gdGhlIGdhbWVcblx0c3RhcnQoYm9vbCkge1xuXHRcdGlmKHRoaXMuc3RhdGUucGxheWVyQ2FyZHMubGVuZ3RoID09PSAwIHx8IGJvb2wpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoeyByZXZlYWw6IGZhbHNlLCBwbGF5ZXJDYXJkczogW10sIGRlYWxlckNhcmRzOiBbXSwgYnVzdGVkOiBmYWxzZSwgd2lubmVyOiAnJ30pO1xuXHRcdFx0c2V0VGltZW91dCh0aGlzLmRlYWxlckRyYXcuYmluZCh0aGlzKSwgMjUwKTtcblx0XHRcdHNldFRpbWVvdXQodGhpcy5kZWFsZXJEcmF3LmJpbmQodGhpcyksIDUwMCk7XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMuaGl0TWUuYmluZCh0aGlzKSwgNzUwKTtcblx0XHRcdHNldFRpbWVvdXQodGhpcy5oaXRNZS5iaW5kKHRoaXMpLCAxMDAwKTtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVCZXQoYW1vdW50KSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRiZXQ6IGFtb3VudFxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nZ2FtZSc+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3RpdGxlJz5cblx0XHRcdFx0XHRcdDxpbWcgc3JjPSdjYXJkcy90aXRsZS5wbmcnIGNsYXNzTmFtZT0ndGl0bGVJbWFnZScgLz5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd0YWJsZSc+XG5cdFx0XHRcdFx0XHQ8RGVhbGVyIGNhcmRzPXt0aGlzLnN0YXRlLmRlYWxlckNhcmRzfSByZXZlYWw9e3RoaXMuc3RhdGUucmV2ZWFsfS8+XG5cdFx0XHRcdFx0XHQ8UGxheWVyIGNhcmRzPXt0aGlzLnN0YXRlLnBsYXllckNhcmRzfSAvPlxuXHRcdFx0XHRcdFx0PFJlc3VsdCBidXN0PXt0aGlzLnN0YXRlLmJ1c3RlZH0gd2lubmVyPXt0aGlzLnN0YXRlLndpbm5lcn0gLz5cblxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2xlZnRCdXR0b25zJz5cblx0XHRcdFx0XHRcdFx0PHNwYW4gb25DbGljaz17dGhpcy5zdGFydC5iaW5kKHRoaXMpfT5TdGFydDwvc3Bhbj4gPGJyLz5cblx0XHRcdFx0XHRcdFx0PHNwYW4gb25DbGljaz17dGhpcy5yZXNldC5iaW5kKHRoaXMpfT5TaHVmZmxlPC9zcGFuPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdyaWdodEJ1dHRvbnMnPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBvbkNsaWNrPXt0aGlzLmhpdE1lLmJpbmQodGhpcyl9PkhpdCBNZTwvc3Bhbj4gPGJyLz5cblx0XHRcdFx0XHRcdFx0PHNwYW4gb25DbGljaz17dGhpcy5rZWVwLmJpbmQodGhpcyl9Pnt0aGlzLnN0YXRlLnJldmVhbCA/ICdEZWFsIScgOiAnS2VlcCd9PC9zcGFuPlx0XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXRzJz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT0nd2FsbGV0Jz5XYWxsZXQ6ICR7dGhpcy5zdGF0ZS5tb25leX0gPC9zcGFuPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPSdiZXQnPkJldDoge3RoaXMuc3RhdGUuYmV0fTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdhbGxCZXRzJz5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXQ1JyBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZUJldCg1KS5iaW5kKHRoaXMpfT41PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0MTAnIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDEwKS5iaW5kKHRoaXMpfT4xMDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JldDI1JyBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZUJldCgyNSkuYmluZCh0aGlzKX0+MjU8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXQ1MCcgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVCZXQoNTApLmJpbmQodGhpcyl9PjUwPC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0MTAwJyBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZUJldCgxMDApLmJpbmQodGhpcyl9PjEwMDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JldDIwMCcgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVCZXQoMjAwKS5iaW5kKHRoaXMpfT4yMDA8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdpbmZvJz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuUmVhY3RET00ucmVuZGVyKDwgQXBwIG1vbmV5PScxMDAwJy8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xuXG4vLyBiYWJlbCAuIC0tb3V0LWRpciBjb21waWxlZCAtLXByZXNldHM9ZXMyMDE1LHJlYWN0IC0taWdub3JlPW5vZGVfbW9kdWxlcyxjb21waWxlZCAtLXNvdXJjZS1tYXBzIGlubGluZSAtLXdhdGNoXG5cblxuXG5cbiJdfQ==