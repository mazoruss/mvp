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
				)
			);
		}
	}]);

	return App;
}(React.Component);

ReactDOM.render(React.createElement(App, { money: '1000' }), document.getElementById('app'));

// babel . --out-dir compiled --presets=es2015,react --ignore=node_modules,compiled --source-maps inline --watch
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9hcHAuanMiXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJkZWNrIiwiRGVjayIsInN0YXRlIiwiZGVmYXVsdFN0YXRlIiwibW9uZXkiLCJOdW1iZXIiLCJidXN0ZWQiLCJyZXZlYWwiLCJkZWFsZXJDYXJkcyIsImxlbmd0aCIsImNhcmRzIiwicGxheWVyQ2FyZHMiLCJzbGljZSIsInB1c2giLCJkcmF3Iiwic2V0U3RhdGUiLCJpc0J1c3QiLCJiZXQiLCJzdGFydCIsImFuaW1hdGUiLCJoYW5kIiwicG9pbnRzIiwid2lubmVyIiwibmVlZFNodWZmbGUiLCJiaW5kIiwiZm9yRWFjaCIsImZ1bmMiLCJpIiwic2V0VGltZW91dCIsImNhcmRzTGVmdCIsInJlc2V0IiwiYm9vbCIsImRlYWxlckRyYXciLCJoaXRNZSIsImNoZWNrQmxhY2tKYWNrIiwiYW1vdW50IiwiaW5mbyIsImRpc3BsYXkiLCJjb3VudCIsInBlcmNlbnRhZ2UiLCJrZWVwIiwidXBkYXRlQmV0IiwiUmVhY3QiLCJDb21wb25lbnQiLCJSZWFjdERPTSIsInJlbmRlciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsRzs7O0FBRUwsY0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLHdHQUNaQSxLQURZOztBQUVsQixNQUFJQyxPQUFPLElBQUlDLElBQUosRUFBWDtBQUNBLFFBQUtDLEtBQUwsR0FBYUMsY0FBYjtBQUNBLFFBQUtELEtBQUwsQ0FBV0UsS0FBWCxHQUFtQkMsT0FBT04sTUFBTUssS0FBYixDQUFuQjtBQUprQjtBQUtsQjs7QUFFRDs7Ozs7MEJBQ1E7QUFDUDtBQUNBLE9BQUcsS0FBS0YsS0FBTCxDQUFXSSxNQUFYLElBQXFCLEtBQUtKLEtBQUwsQ0FBV0ssTUFBaEMsSUFBMEMsS0FBS0wsS0FBTCxDQUFXTSxXQUFYLENBQXVCQyxNQUF2QixLQUFrQyxDQUEvRSxFQUFrRjtBQUFFO0FBQVM7QUFDN0Y7QUFDQSxPQUFJQyxRQUFRLEtBQUtSLEtBQUwsQ0FBV1MsV0FBWCxDQUF1QkMsS0FBdkIsRUFBWjtBQUNBRixTQUFNRyxJQUFOLENBQVcsS0FBS1gsS0FBTCxDQUFXRixJQUFYLENBQWdCYyxJQUFoQixFQUFYO0FBQ0EsUUFBS0MsUUFBTCxDQUFjLEVBQUVKLGFBQWFELEtBQWYsRUFBZDtBQUNBO0FBQ0EsT0FBSU0sT0FBT04sS0FBUCxDQUFKLEVBQW1CO0FBQ2xCLFNBQUtLLFFBQUwsQ0FBYyxFQUFFVCxRQUFRLElBQVYsRUFBZ0JDLFFBQVEsSUFBeEIsRUFBOEJILE9BQU8sS0FBS0YsS0FBTCxDQUFXRSxLQUFYLEdBQW1CLEtBQUtGLEtBQUwsQ0FBV2UsR0FBbkUsRUFBZDtBQUNBO0FBQ0Q7O0FBRUQ7Ozs7eUJBQ087QUFBQTs7QUFDTixPQUFJLEtBQUtmLEtBQUwsQ0FBV0ssTUFBWCxJQUFxQixLQUFLTCxLQUFMLENBQVdTLFdBQVgsQ0FBdUJGLE1BQXZCLEtBQWtDLENBQTNELEVBQThEO0FBQzdELFNBQUtTLEtBQUwsQ0FBVyxJQUFYO0FBQ0EsSUFGRCxNQUVPO0FBQ04sU0FBS0gsUUFBTCxDQUFjLEVBQUNSLFFBQVEsSUFBVCxFQUFkO0FBQ0EsUUFBSVksVUFBVSxFQUFkO0FBQ0EsUUFBSVQsUUFBUSxLQUFLUixLQUFMLENBQVdNLFdBQVgsQ0FBdUJJLEtBQXZCLEVBQVo7O0FBSE07QUFNTEYsV0FBTUcsSUFBTixDQUFXLE9BQUtYLEtBQUwsQ0FBV0YsSUFBWCxDQUFnQmMsSUFBaEIsRUFBWDtBQUNBLFNBQUlNLE9BQU9WLE1BQU1FLEtBQU4sRUFBWDtBQUNBTyxhQUFRTixJQUFSLENBQWE7QUFBQSxhQUFNLE9BQUtFLFFBQUwsQ0FBYyxFQUFFUCxhQUFhWSxJQUFmLEVBQWQsQ0FBTjtBQUFBLE1BQWI7QUFSSzs7QUFLTixXQUFNQyxPQUFPWCxLQUFQLElBQWdCLEVBQXRCLEVBQTBCO0FBQUE7QUFJekI7O0FBRUQsUUFBSVcsT0FBT1gsS0FBUCxJQUFnQixFQUFoQixJQUFzQlcsT0FBT1gsS0FBUCxJQUFnQlcsT0FBTyxLQUFLbkIsS0FBTCxDQUFXUyxXQUFsQixDQUExQyxFQUEwRTtBQUN6RVEsYUFBUU4sSUFBUixDQUFjO0FBQUEsYUFBTSxPQUFLRSxRQUFMLENBQWMsRUFBQ08sUUFBUSxRQUFULEVBQW1CbEIsT0FBTyxPQUFLRixLQUFMLENBQVdFLEtBQVgsR0FBbUIsT0FBS0YsS0FBTCxDQUFXZSxHQUF4RCxFQUFkLENBQU47QUFBQSxNQUFkO0FBQ0EsS0FGRCxNQUVPO0FBQ05FLGFBQVFOLElBQVIsQ0FBYztBQUFBLGFBQU0sT0FBS0UsUUFBTCxDQUFjLEVBQUNPLFFBQVEsUUFBVCxFQUFtQmxCLE9BQU8sT0FBS0YsS0FBTCxDQUFXRSxLQUFYLEdBQW1CLE9BQUtGLEtBQUwsQ0FBV2UsR0FBeEQsRUFBZCxDQUFOO0FBQUEsTUFBZDtBQUNBOztBQUVERSxZQUFRTixJQUFSLENBQWEsS0FBS1UsV0FBTCxDQUFpQkMsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBYjtBQUNBTCxZQUFRTSxPQUFSLENBQWdCLFVBQUNDLElBQUQsRUFBT0MsQ0FBUCxFQUFhO0FBQzVCQyxnQkFBV0YsSUFBWCxFQUFpQixDQUFDQyxJQUFJLENBQUwsSUFBVSxHQUEzQjtBQUNBLEtBRkQ7QUFHQTtBQUNEOztBQUVEOzs7O2dDQUNjO0FBQ2IsT0FBSSxLQUFLekIsS0FBTCxDQUFXRixJQUFYLENBQWdCNkIsU0FBaEIsS0FBOEIsRUFBbEMsRUFBc0M7QUFDckMsU0FBS0MsS0FBTDtBQUNBO0FBQ0Q7O0FBRUQ7Ozs7K0JBQ2E7QUFDWixPQUFJcEIsUUFBUSxLQUFLUixLQUFMLENBQVdNLFdBQVgsQ0FBdUJJLEtBQXZCLEVBQVo7QUFDQUYsU0FBTUcsSUFBTixDQUFXLEtBQUtYLEtBQUwsQ0FBV0YsSUFBWCxDQUFnQmMsSUFBaEIsRUFBWDtBQUNBLFFBQUtDLFFBQUwsQ0FBYyxFQUFFUCxhQUFhRSxLQUFmLEVBQWQ7QUFDQTs7QUFFRDs7OzswQkFDUTtBQUNQLFFBQUtLLFFBQUwsQ0FBY1osY0FBZDtBQUNBOztBQUVEOzs7O3dCQUNNNEIsSSxFQUFNO0FBQ1gsT0FBRyxLQUFLN0IsS0FBTCxDQUFXUyxXQUFYLENBQXVCRixNQUF2QixLQUFrQyxDQUFsQyxJQUF1Q3NCLElBQTFDLEVBQWdEO0FBQy9DLFNBQUtoQixRQUFMLENBQWMsRUFBRVIsUUFBUSxLQUFWLEVBQWlCSSxhQUFhLEVBQTlCLEVBQWtDSCxhQUFhLEVBQS9DLEVBQW1ERixRQUFRLEtBQTNELEVBQWtFZ0IsUUFBUSxFQUExRSxFQUFkO0FBQ0FNLGVBQVcsS0FBS0ksVUFBTCxDQUFnQlIsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBWCxFQUF1QyxHQUF2QztBQUNBSSxlQUFXLEtBQUtJLFVBQUwsQ0FBZ0JSLElBQWhCLENBQXFCLElBQXJCLENBQVgsRUFBdUMsR0FBdkM7QUFDQUksZUFBVyxLQUFLSyxLQUFMLENBQVdULElBQVgsQ0FBZ0IsSUFBaEIsQ0FBWCxFQUFrQyxHQUFsQztBQUNBSSxlQUFXLEtBQUtLLEtBQUwsQ0FBV1QsSUFBWCxDQUFnQixJQUFoQixDQUFYLEVBQWtDLElBQWxDO0FBQ0FJLGVBQVcsS0FBS00sY0FBTCxDQUFvQlYsSUFBcEIsQ0FBeUIsSUFBekIsQ0FBWCxFQUEyQyxJQUEzQztBQUNBO0FBQ0Q7O0FBRUQ7Ozs7bUNBQ2lCO0FBQ2hCLE9BQUlILE9BQU8sS0FBS25CLEtBQUwsQ0FBV1MsV0FBbEIsTUFBbUMsRUFBdkMsRUFBMkM7QUFDMUMsU0FBS0ksUUFBTCxDQUFjLEVBQUNPLFFBQVEsUUFBVCxFQUFtQmxCLE9BQU8sS0FBS0YsS0FBTCxDQUFXRSxLQUFYLEdBQW9CLEtBQUtGLEtBQUwsQ0FBV2UsR0FBWCxHQUFpQixHQUEvRCxFQUFxRVYsUUFBUSxJQUE3RSxFQUFkO0FBQ0E7QUFDRDs7QUFFRDs7Ozs0QkFDVTRCLE0sRUFBUTtBQUNqQixPQUFHLEtBQUtqQyxLQUFMLENBQVdLLE1BQVgsSUFBcUIsS0FBS0wsS0FBTCxDQUFXUyxXQUFYLENBQXVCRixNQUF2QixLQUFrQyxDQUExRCxFQUE2RDtBQUM1RCxTQUFLTSxRQUFMLENBQWMsRUFBRUUsS0FBS2tCLE1BQVAsRUFBZDtBQUNBO0FBQ0Q7OzswQkFFT0MsSSxFQUFNO0FBQ2IsUUFBS3JCLFFBQUwsQ0FBYyxFQUFDc0IsU0FBU0QsSUFBVixFQUFkO0FBQ0E7OzsyQkFFUTtBQUFBOztBQUNSLFVBQ0M7QUFBQTtBQUFBO0FBQ0M7QUFBQTtBQUFBLE9BQUssV0FBVSxNQUFmO0FBQ0M7QUFBQTtBQUFBLFFBQUssV0FBVSxXQUFmO0FBQUE7QUFBeUMsV0FBS2xDLEtBQUwsQ0FBV0YsSUFBWCxDQUFnQjZCLFNBQWhCO0FBQXpDLE1BREQ7QUFFQztBQUFBO0FBQUEsUUFBSyxXQUFVLE9BQWY7QUFBQTtBQUFvQyxXQUFLM0IsS0FBTCxDQUFXRixJQUFYLENBQWdCc0MsS0FBaEI7QUFBcEMsTUFGRDtBQUdDO0FBQUE7QUFBQSxRQUFLLFdBQVUsWUFBZjtBQUFBO0FBQXdDLFdBQUtwQyxLQUFMLENBQVdGLElBQVgsQ0FBZ0J1QyxVQUFoQixLQUErQjtBQUF2RTtBQUhELEtBREQ7QUFPQztBQUFBO0FBQUEsT0FBSyxXQUFVLFNBQWY7QUFDQztBQUFBO0FBQUEsUUFBSyxTQUFTO0FBQUEsZUFBTSxPQUFLRixPQUFMLENBQWEsS0FBYixDQUFOO0FBQUEsUUFBZDtBQUFBO0FBQUEsTUFERDtBQUVDO0FBQUE7QUFBQSxRQUFLLFNBQVM7QUFBQSxlQUFNLE9BQUtBLE9BQUwsQ0FBYSxVQUFiLENBQU47QUFBQSxRQUFkO0FBQUE7QUFBQSxNQUZEO0FBR0M7QUFBQTtBQUFBLFFBQUssU0FBUztBQUFBLGVBQU0sT0FBS0EsT0FBTCxDQUFhLE1BQWIsQ0FBTjtBQUFBLFFBQWQ7QUFBQTtBQUFBLE1BSEQ7QUFJQztBQUFBO0FBQUEsUUFBSyxTQUFTO0FBQUEsZUFBTSxPQUFLQSxPQUFMLENBQWEsTUFBYixDQUFOO0FBQUEsUUFBZCxFQUEwQyxXQUFVLE1BQXBEO0FBQUE7QUFBQTtBQUpELEtBUEQ7QUFjQztBQUFBO0FBQUEsT0FBSyxXQUFVLE9BQWY7QUFDRSxVQUFLbkMsS0FBTCxDQUFXbUMsT0FBWCxLQUF1QixNQUF2QixHQUFnQyxJQUFoQyxHQUF1QyxvQkFBQyxLQUFELElBQU8sTUFBTSxLQUFLbkMsS0FBTCxDQUFXbUMsT0FBeEI7QUFEekMsS0FkRDtBQWtCQztBQUFBO0FBQUEsT0FBSyxXQUFVLE1BQWY7QUFDQztBQUFBO0FBQUEsUUFBSyxXQUFVLE9BQWY7QUFDQyxtQ0FBSyxLQUFJLGlCQUFULEVBQTJCLFdBQVUsWUFBckM7QUFERCxNQUREO0FBS0M7QUFBQTtBQUFBLFFBQUssV0FBVSxPQUFmO0FBQ0MsMEJBQUMsTUFBRCxJQUFRLE9BQU8sS0FBS25DLEtBQUwsQ0FBV00sV0FBMUIsRUFBdUMsUUFBUSxLQUFLTixLQUFMLENBQVdLLE1BQTFELEdBREQ7QUFFQywwQkFBQyxNQUFELElBQVEsT0FBTyxLQUFLTCxLQUFMLENBQVdTLFdBQTFCLEdBRkQ7QUFHQywwQkFBQyxNQUFELElBQVEsTUFBTSxLQUFLVCxLQUFMLENBQVdJLE1BQXpCLEVBQWlDLFFBQVEsS0FBS0osS0FBTCxDQUFXb0IsTUFBcEQsR0FIRDtBQUtDO0FBQUE7QUFBQSxTQUFLLFdBQVUsY0FBZjtBQUNDO0FBQUE7QUFBQSxVQUFNLFNBQVMsS0FBS1csS0FBTCxDQUFXVCxJQUFYLENBQWdCLElBQWhCLENBQWY7QUFBQTtBQUFBLFFBREQ7QUFBQTtBQUNxRCxzQ0FEckQ7QUFFQztBQUFBO0FBQUEsVUFBTSxTQUFTLEtBQUtnQixJQUFMLENBQVVoQixJQUFWLENBQWUsSUFBZixDQUFmO0FBQ0UsYUFBS3RCLEtBQUwsQ0FBV0ssTUFBWCxJQUFxQixLQUFLTCxLQUFMLENBQVdTLFdBQVgsQ0FBdUJGLE1BQXZCLEtBQWtDLENBQXZELEdBQTJELE9BQTNELEdBQXFFO0FBRHZFO0FBRkQ7QUFMRCxNQUxEO0FBa0JDO0FBQUE7QUFBQSxRQUFLLFdBQVUsTUFBZjtBQUNDO0FBQUE7QUFBQSxTQUFNLFdBQVUsS0FBaEI7QUFBQTtBQUE2QixZQUFLUCxLQUFMLENBQVdlO0FBQXhDLE9BREQ7QUFBQTtBQUNxRCxxQ0FEckQ7QUFFQztBQUFBO0FBQUEsU0FBTSxXQUFVLFFBQWhCO0FBQUE7QUFBbUMsWUFBS2YsS0FBTCxDQUFXRSxLQUE5QztBQUFBO0FBQUE7QUFGRCxNQWxCRDtBQXVCQztBQUFBO0FBQUEsUUFBSyxXQUFVLFNBQWY7QUFDQztBQUFBO0FBQUEsU0FBSyxXQUFVLE1BQWYsRUFBc0IsU0FBUztBQUFBLGdCQUFNLE9BQUtxQyxTQUFMLENBQWUsQ0FBZixDQUFOO0FBQUEsU0FBL0I7QUFBQTtBQUFBLE9BREQ7QUFFQztBQUFBO0FBQUEsU0FBSyxXQUFVLE1BQWYsRUFBc0IsU0FBUztBQUFBLGdCQUFNLE9BQUtBLFNBQUwsQ0FBZSxDQUFmLENBQU47QUFBQSxTQUEvQjtBQUFBO0FBQUEsT0FGRDtBQUdDO0FBQUE7QUFBQSxTQUFLLFdBQVUsT0FBZixFQUF1QixTQUFTO0FBQUEsZ0JBQU0sT0FBS0EsU0FBTCxDQUFlLEVBQWYsQ0FBTjtBQUFBLFNBQWhDO0FBQUE7QUFBQSxPQUhEO0FBSUM7QUFBQTtBQUFBLFNBQUssV0FBVSxPQUFmLEVBQXVCLFNBQVM7QUFBQSxnQkFBTSxPQUFLQSxTQUFMLENBQWUsRUFBZixDQUFOO0FBQUEsU0FBaEM7QUFBQTtBQUFBLE9BSkQ7QUFLQztBQUFBO0FBQUEsU0FBSyxXQUFVLE9BQWYsRUFBdUIsU0FBUztBQUFBLGdCQUFNLE9BQUtBLFNBQUwsQ0FBZSxFQUFmLENBQU47QUFBQSxTQUFoQztBQUFBO0FBQUEsT0FMRDtBQU1DO0FBQUE7QUFBQSxTQUFLLFdBQVUsUUFBZixFQUF3QixTQUFTO0FBQUEsZ0JBQU0sT0FBS0EsU0FBTCxDQUFlLEdBQWYsQ0FBTjtBQUFBLFNBQWpDO0FBQUE7QUFBQSxPQU5EO0FBT0M7QUFBQTtBQUFBLFNBQUssV0FBVSxRQUFmLEVBQXdCLFNBQVM7QUFBQSxnQkFBTSxPQUFLQSxTQUFMLENBQWUsR0FBZixDQUFOO0FBQUEsU0FBakM7QUFBQTtBQUFBO0FBUEQ7QUF2QkQ7QUFsQkQsSUFERDtBQXNEQTs7OztFQTNKZ0JDLE1BQU1DLFM7O0FBOEp4QkMsU0FBU0MsTUFBVCxDQUFnQixvQkFBRSxHQUFGLElBQU0sT0FBTSxNQUFaLEdBQWhCLEVBQXNDQyxTQUFTQyxjQUFULENBQXdCLEtBQXhCLENBQXRDOztBQUVBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dmFyIGRlY2sgPSBuZXcgRGVjaygpO1xuXHRcdHRoaXMuc3RhdGUgPSBkZWZhdWx0U3RhdGUoKTtcblx0XHR0aGlzLnN0YXRlLm1vbmV5ID0gTnVtYmVyKHByb3BzLm1vbmV5KTtcblx0fVxuXG5cdC8vcGxheWVyIGRyYXdzXG5cdGhpdE1lKCkge1xuXHRcdC8vIGlmIGdhbWUgaXMgb3ZlciwgaGl0IG1lIGRvZXMgbm90aGluZ1xuXHRcdGlmKHRoaXMuc3RhdGUuYnVzdGVkIHx8IHRoaXMuc3RhdGUucmV2ZWFsIHx8IHRoaXMuc3RhdGUuZGVhbGVyQ2FyZHMubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuXHRcdC8vc2V0IHN0YXRlIGlzIGFzeW5jLCBzbyB1c2luZyBjYXJkcyB0byBrZWVwIHRyYWNrIG9mIHN0YXR1c1xuXHRcdGxldCBjYXJkcyA9IHRoaXMuc3RhdGUucGxheWVyQ2FyZHMuc2xpY2UoKTtcblx0XHRjYXJkcy5wdXNoKHRoaXMuc3RhdGUuZGVjay5kcmF3KCkpO1xuXHRcdHRoaXMuc2V0U3RhdGUoeyBwbGF5ZXJDYXJkczogY2FyZHMgfSk7XG5cdFx0Ly8gaWYgcGxheWVyIGJ1c3RlZCwgc2V0IGdhbWUgc3RhdGUgdG8gZ2FtZSBvdmVyXG5cdFx0aWYgKGlzQnVzdChjYXJkcykpIHsgXG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgYnVzdGVkOiB0cnVlLCByZXZlYWw6IHRydWUsIG1vbmV5OiB0aGlzLnN0YXRlLm1vbmV5IC0gdGhpcy5zdGF0ZS5iZXQgfSk7XG5cdFx0fVxuXHR9XG5cblx0Ly9rZWVwLCBvciBkZWFsXG5cdGtlZXAoKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUucmV2ZWFsIHx8IHRoaXMuc3RhdGUucGxheWVyQ2FyZHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLnN0YXJ0KHRydWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtyZXZlYWw6IHRydWV9KTtcblx0XHRcdGxldCBhbmltYXRlID0gW107XG5cdFx0XHRsZXQgY2FyZHMgPSB0aGlzLnN0YXRlLmRlYWxlckNhcmRzLnNsaWNlKCk7XG5cblx0XHRcdHdoaWxlKHBvaW50cyhjYXJkcykgPCAxNykge1xuXHRcdFx0XHRjYXJkcy5wdXNoKHRoaXMuc3RhdGUuZGVjay5kcmF3KCkpO1xuXHRcdFx0XHRsZXQgaGFuZCA9IGNhcmRzLnNsaWNlKCk7XG5cdFx0XHRcdGFuaW1hdGUucHVzaCgoKSA9PiB0aGlzLnNldFN0YXRlKHsgZGVhbGVyQ2FyZHM6IGhhbmQgfSkpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocG9pbnRzKGNhcmRzKSA+IDIxIHx8IHBvaW50cyhjYXJkcykgPCBwb2ludHModGhpcy5zdGF0ZS5wbGF5ZXJDYXJkcykpIHtcblx0XHRcdFx0YW5pbWF0ZS5wdXNoKCAoKSA9PiB0aGlzLnNldFN0YXRlKHt3aW5uZXI6ICdQTEFZRVInLCBtb25leTogdGhpcy5zdGF0ZS5tb25leSArIHRoaXMuc3RhdGUuYmV0fSkgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFuaW1hdGUucHVzaCggKCkgPT4gdGhpcy5zZXRTdGF0ZSh7d2lubmVyOiAnREVBTEVSJywgbW9uZXk6IHRoaXMuc3RhdGUubW9uZXkgLSB0aGlzLnN0YXRlLmJldH0pICk7XG5cdFx0XHR9XG5cblx0XHRcdGFuaW1hdGUucHVzaCh0aGlzLm5lZWRTaHVmZmxlLmJpbmQodGhpcykpO1xuXHRcdFx0YW5pbWF0ZS5mb3JFYWNoKChmdW5jLCBpKSA9PiB7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuYywgKGkgKyAxKSAqIDUwMCk7XG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXG5cdC8vY2hlY2tzIGlmIGRlY2sgaGFzIGxlc3MgdGhhbiAxMCBjYXJkcywgaWYgc28sIHNodWZmbGVcblx0bmVlZFNodWZmbGUoKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUuZGVjay5jYXJkc0xlZnQoKSA8IDEwKSB7XG5cdFx0XHR0aGlzLnJlc2V0KCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gZGVhbGVyIGRyYXdzIGNhcmRcblx0ZGVhbGVyRHJhdygpIHtcblx0XHRsZXQgY2FyZHMgPSB0aGlzLnN0YXRlLmRlYWxlckNhcmRzLnNsaWNlKCk7XG5cdFx0Y2FyZHMucHVzaCh0aGlzLnN0YXRlLmRlY2suZHJhdygpKTtcblx0XHR0aGlzLnNldFN0YXRlKHsgZGVhbGVyQ2FyZHM6IGNhcmRzIH0pO1xuXHR9XG5cblx0Ly9zaHVmZmxlcyB0aGUgZGVja1xuXHRyZXNldCgpIHtcblx0XHR0aGlzLnNldFN0YXRlKGRlZmF1bHRTdGF0ZSgpKTtcblx0fVxuXG5cdC8vZGVhbHMgaGFuZHMgdG8gYmVnaW4gdGhlIGdhbWVcblx0c3RhcnQoYm9vbCkge1xuXHRcdGlmKHRoaXMuc3RhdGUucGxheWVyQ2FyZHMubGVuZ3RoID09PSAwIHx8IGJvb2wpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoeyByZXZlYWw6IGZhbHNlLCBwbGF5ZXJDYXJkczogW10sIGRlYWxlckNhcmRzOiBbXSwgYnVzdGVkOiBmYWxzZSwgd2lubmVyOiAnJ30pO1xuXHRcdFx0c2V0VGltZW91dCh0aGlzLmRlYWxlckRyYXcuYmluZCh0aGlzKSwgMjUwKTtcblx0XHRcdHNldFRpbWVvdXQodGhpcy5kZWFsZXJEcmF3LmJpbmQodGhpcyksIDUwMCk7XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMuaGl0TWUuYmluZCh0aGlzKSwgNzUwKTtcblx0XHRcdHNldFRpbWVvdXQodGhpcy5oaXRNZS5iaW5kKHRoaXMpLCAxMDAwKTtcblx0XHRcdHNldFRpbWVvdXQodGhpcy5jaGVja0JsYWNrSmFjay5iaW5kKHRoaXMpLCAxMjUwKTtcblx0XHR9XG5cdH1cblxuXHQvL2lmIHN0YXJ0aW5nIGhhbmQgaXMgYmxhY2tqYWNrLCBhdXRvIHdpbiwgcGF5IDEuNXhcblx0Y2hlY2tCbGFja0phY2soKSB7XG5cdFx0aWYgKHBvaW50cyh0aGlzLnN0YXRlLnBsYXllckNhcmRzKSA9PT0gMjEpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3dpbm5lcjogJ1BMQVlFUicsIG1vbmV5OiB0aGlzLnN0YXRlLm1vbmV5ICsgKHRoaXMuc3RhdGUuYmV0ICogMS41KSwgcmV2ZWFsOiB0cnVlfSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gdXBkYXRlcyBiZXR0aW5nIGFtb3VudCBcblx0dXBkYXRlQmV0KGFtb3VudCkge1xuXHRcdGlmKHRoaXMuc3RhdGUucmV2ZWFsIHx8IHRoaXMuc3RhdGUucGxheWVyQ2FyZHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgYmV0OiBhbW91bnQgfSk7XG5cdFx0fVxuXHR9XG5cblx0ZGlzcGxheShpbmZvKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7ZGlzcGxheTogaW5mb30pO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0naW5mbyc+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2NhcmRzTGVmdCc+IENhcmRzIGxlZnQ6IHt0aGlzLnN0YXRlLmRlY2suY2FyZHNMZWZ0KCl9PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2NvdW50Jz4gVGhlIENvdW50OiB7dGhpcy5zdGF0ZS5kZWNrLmNvdW50KCl9PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3BlcmNlbnRhZ2UnPiBUaGUgRWRnZToge3RoaXMuc3RhdGUuZGVjay5wZXJjZW50YWdlKCkgKyAnJSd9PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdkaXNwbGF5Jz5cblx0XHRcdFx0XHQ8ZGl2IG9uQ2xpY2s9eygpID0+IHRoaXMuZGlzcGxheSgnd2h5Jyl9PldoeSBpdCB3b3JrczwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgb25DbGljaz17KCkgPT4gdGhpcy5kaXNwbGF5KCdjb3VudGluZycpfT5Ib3cgdG8gY291bnQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IG9uQ2xpY2s9eygpID0+IHRoaXMuZGlzcGxheSgnZWRnZScpfT5UaGUgZWRnZTwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgb25DbGljaz17KCkgPT4gdGhpcy5kaXNwbGF5KCdub25lJyl9IGNsYXNzTmFtZT0naGlkZSc+SGlkZTwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0naG93VG8nPlxuXHRcdFx0XHRcdHt0aGlzLnN0YXRlLmRpc3BsYXkgPT09ICdub25lJyA/IG51bGwgOiA8SG93VG8gaW5mbz17dGhpcy5zdGF0ZS5kaXNwbGF5fS8+fVxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nZ2FtZSc+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3RpdGxlJz5cblx0XHRcdFx0XHRcdDxpbWcgc3JjPSdjYXJkcy90aXRsZS5wbmcnIGNsYXNzTmFtZT0ndGl0bGVJbWFnZScgLz5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd0YWJsZSc+XG5cdFx0XHRcdFx0XHQ8RGVhbGVyIGNhcmRzPXt0aGlzLnN0YXRlLmRlYWxlckNhcmRzfSByZXZlYWw9e3RoaXMuc3RhdGUucmV2ZWFsfS8+XG5cdFx0XHRcdFx0XHQ8UGxheWVyIGNhcmRzPXt0aGlzLnN0YXRlLnBsYXllckNhcmRzfSAvPlxuXHRcdFx0XHRcdFx0PFJlc3VsdCBidXN0PXt0aGlzLnN0YXRlLmJ1c3RlZH0gd2lubmVyPXt0aGlzLnN0YXRlLndpbm5lcn0gLz5cblxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3JpZ2h0QnV0dG9ucyc+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIG9uQ2xpY2s9e3RoaXMuaGl0TWUuYmluZCh0aGlzKX0+SGl0IE1lPC9zcGFuPiA8YnIvPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBvbkNsaWNrPXt0aGlzLmtlZXAuYmluZCh0aGlzKX0+XG5cdFx0XHRcdFx0XHRcdFx0e3RoaXMuc3RhdGUucmV2ZWFsIHx8IHRoaXMuc3RhdGUucGxheWVyQ2FyZHMubGVuZ3RoID09PSAwID8gJ0RlYWwhJyA6ICdLZWVwJ31cblx0XHRcdFx0XHRcdFx0PC9zcGFuPlx0XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXRzJz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT0nYmV0Jz5CZXQ6ICR7dGhpcy5zdGF0ZS5iZXR9PC9zcGFuPiA8YnIgLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT0nd2FsbGV0Jz5XYWxsZXQ6ICR7dGhpcy5zdGF0ZS5tb25leX0gPC9zcGFuPlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2FsbEJldHMnPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JldDInIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDIpfT4yPC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0NScgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVCZXQoNSl9PjU8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXQxMCcgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVCZXQoMTApfT4xMDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JldDI1JyBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZUJldCgyNSl9PjI1PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nYmV0NTAnIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDUwKX0+NTA8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZXQxMDAnIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQmV0KDEwMCl9PjEwMDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JldDIwMCcgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVCZXQoMjAwKX0+MjAwPC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8IEFwcCBtb25leT0nMTAwMCcvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcblxuLy8gYmFiZWwgLiAtLW91dC1kaXIgY29tcGlsZWQgLS1wcmVzZXRzPWVzMjAxNSxyZWFjdCAtLWlnbm9yZT1ub2RlX21vZHVsZXMsY29tcGlsZWQgLS1zb3VyY2UtbWFwcyBpbmxpbmUgLS13YXRjaFxuXG5cblxuXG4iXX0=