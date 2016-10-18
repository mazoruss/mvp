class App extends React.Component {

	constructor(props) {
		super(props);
		var deck = new Deck();
		this.state = defaultState();
		this.state.money = Number(props.money);
	}

	hitMe() {
		// if game is over, hit me does nothing
		if(this.state.busted || this.state.reveal || this.state.dealerCards.length === 0) { return; }
		//set state is async, so using cards to keep track of status
		let cards = this.state.playerCards.slice();
		cards.push(this.state.deck.draw());
		this.setState({ playerCards: cards });
		// if player busted, set game state to game over
		if (isBust(cards)) { 
			this.setState({ busted: true, reveal: true, money: this.state.money - this.state.bet });
		}
	}

	keep() {
		// if game is over, the keep button becomes deal!
		if (this.state.reveal || this.state.playerCards.length === 0) {
			this.start(true);
		} else {
			//ends the round by revealing the face down card
			this.setState({reveal: true});
			//animate to slow down the dealer's animation
			let animate = [];
			let cards = this.state.dealerCards.slice();
			//dealer draws when points is below 17
			while(points(cards) < 17) {
				cards.push(this.state.deck.draw());
				animate.push(() => this.setState({ dealerCards: cards }));
			}
			//if dealer busts, or points is less than player, player wins
			if (points(cards) > 21 || points(cards) < points(this.state.playerCards)) {
				animate.push( () => this.setState({winner: 'PLAYER', money: this.state.money + this.state.bet}) );
			} else {
			//otherwise dealer wins
				animate.push( () => this.setState({winner: 'DEALER', money: this.state.money - this.state.bet}) );
			}


			//animate for dealer
			animate.forEach((func, i) => {
				setTimeout(func, (i + 1) * 500);
			})
		}
	}

	// dealer draws card
	dealerDraw() {
		let cards = this.state.dealerCards.slice();
		cards.push(this.state.deck.draw());
		this.setState({ dealerCards: cards });
	}

	//shuffles the deck
	reset() {
		this.setState(defaultState());
	}

	//deals hands to begin the game
	start(bool) {
		if(this.state.playerCards.length === 0 || bool) {
			this.setState({ reveal: false, playerCards: [], dealerCards: [], busted: false, winner: ''});
			setTimeout(this.dealerDraw.bind(this), 250);
			setTimeout(this.dealerDraw.bind(this), 500);
			setTimeout(this.hitMe.bind(this), 750);
			setTimeout(this.hitMe.bind(this), 1000);
			setTimeout(this.checkBlackJack.bind(this), 1250);
		}
	}

	checkBlackJack() {
		if (points(this.state.playerCards) === 21) {
			this.setState({winner: 'PLAYER', money: this.state.money + (this.state.bet * 1.5), reveal: true});
		}
	}

	updateBet(amount) {
		if(this.state.reveal || this.state.playerCards.length === 0) {
			this.setState({
				bet: amount
			});
		}
	}

	render() {
		return (
			<div>
				<div className='info'>
					<div className='cardsLeft'> Cards left: {this.state.deck.cardsLeft()}</div>
					<div className='count'> The Count: {this.state.deck.count()}</div>
				</div>

				<div className='game'>
					<div className='title'>
						<img src='cards/title.png' className='titleImage' />
					</div>

					<div className='table'>
						<Dealer cards={this.state.dealerCards} reveal={this.state.reveal}/>
						<Player cards={this.state.playerCards} />
						<Result bust={this.state.busted} winner={this.state.winner} />

						<div className='leftButtons'>
							<span onClick={this.reset.bind(this)}>Shuffle</span>
						</div>

						<div className='rightButtons'>
							<span onClick={this.hitMe.bind(this)}>Hit Me</span> <br/>
							<span onClick={this.keep.bind(this)}>
								{this.state.reveal || this.state.playerCards.length === 0 ? 'Deal!' : 'Keep'}
							</span>	
						</div>
					</div>

					<div className='bets'>
						<span className='bet'>Bet: ${this.state.bet}</span> <br />
						<span className='wallet'>Wallet: ${this.state.money} </span>
						
					</div>

					<div className='allBets'>
						<div className='bet2' onClick={() => this.updateBet(2)}>2</div>
						<div className='bet5' onClick={() => this.updateBet(5)}>5</div>
						<div className='bet10' onClick={() => this.updateBet(10)}>10</div>
						<div className='bet25' onClick={() => this.updateBet(25)}>25</div>
						<div className='bet50' onClick={() => this.updateBet(50)}>50</div>
						<div className='bet100' onClick={() => this.updateBet(100)}>100</div>
						<div className='bet200' onClick={() => this.updateBet(200)}>200</div>
					</div>
				</div>



			</div>
		)
	}
}

ReactDOM.render(< App money='1000'/>, document.getElementById('app'));

// babel . --out-dir compiled --presets=es2015,react --ignore=node_modules,compiled --source-maps inline --watch




