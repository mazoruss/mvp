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
		if (this.state.reveal) {
			this.start(true);
		} else {
			this.setState({reveal: true});
			let cards = this.state.dealerCards.slice();
			while(points(cards) < 17) {
				cards.push(this.state.deck.draw());
				this.setState({ dealerCards: cards });
			}
			if (points(cards) > 21 || points(cards) < points(this.state.playerCards)) {
				this.setState({winner: 'PLAYER', money: this.state.money + this.state.bet});
			} else {
				this.setState({winner: 'DEALER', money: this.state.money - this.state.bet});
			}
		}
	}


	dealerDraw() {
		let cards = this.state.dealerCards.slice();
		cards.push(this.state.deck.draw());
		this.setState({ dealerCards: cards });
	}

	reset() {
		this.setState(defaultState());
	}

	start(bool) {
		if(this.state.playerCards.length === 0 || bool) {
			this.setState({ reveal: false, playerCards: [], dealerCards: [], busted: false, winner: ''});
			setTimeout(this.dealerDraw.bind(this), 250);
			setTimeout(this.dealerDraw.bind(this), 500);
			setTimeout(this.hitMe.bind(this), 750);
			setTimeout(this.hitMe.bind(this), 1000);
		}
	}

	render() {
		return (
			<div>
				<div className='game'>
					<div className='title'>
						<img src='cards/title.png' className='titleImage' />
					</div>

					<div className='table'>
						<Dealer cards={this.state.dealerCards} reveal={this.state.reveal}/>
						<Player cards={this.state.playerCards} />
						<Result bust={this.state.busted} winner={this.state.winner} />

						<div className='leftButtons'>
							<span onClick={this.start.bind(this)}>Start</span> <br/>
							<span onClick={this.reset.bind(this)}>Shuffle</span>
						</div>

						<div className='rightButtons'>
							<span onClick={this.hitMe.bind(this)}>Hit Me</span> <br/>
							<span onClick={this.keep.bind(this)}>{this.state.reveal ? 'Next Hand' : 'Keep'}</span>	
						</div>
					</div>

					<div className='bets'>
						<span className='wallet'>Wallet: ${this.state.money} </span>
						<span className='bet'>Bet: {this.state.bet}</span><br />
					</div>
				</div>
				<div className='info'>
				</div>
			</div>
		)
	}
}

ReactDOM.render(< App money='1000'/>, document.getElementById('app'));

// babel . --out-dir compiled --presets=es2015,react --ignore=node_modules,compiled --source-maps inline --watch




