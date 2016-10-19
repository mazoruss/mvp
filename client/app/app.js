class App extends React.Component {

	constructor(props) {
		super(props);
		var deck = new Deck();
		this.state = defaultState();
		this.state.money = Number(props.money);
	}

	//player draws
	hitMe() {
		// if game is over, hit me does nothing
		if(this.state.busted || this.state.reveal || this.state.dealerCards.length === 0) { return; }
		//set state is async, so using cards to keep track of status
		let cards = this.state.playerCards.slice();
		cards.push(this.state.deck.draw());
		this.setState({ playerCards: cards });
		// if player busted, set game state to game over
		if (isBust(cards)) { 
			if (this.state.username === 'guest') { 
				this.setState({ busted: true, reveal: true, money: this.state.money - this.state.bet });
			}
			else {
				this.setState({ busted: true, reveal: true});
				changeMoney(this.state.username, this.state.money - this.state.bet, this.updateUser.bind(this));
			}
		}
	}

	//keep, or deal
	keep() {
		if (this.state.reveal || this.state.playerCards.length === 0) {
			this.start(true);
		} else {
			this.setState({reveal: true});
			let animate = [];
			let cards = this.state.dealerCards.slice();

			while(points(cards) < 17) {
				cards.push(this.state.deck.draw());
				let hand = cards.slice();
				animate.push(() => this.setState({ dealerCards: hand }));
			}

			if (points(cards) > 21 || points(cards) < points(this.state.playerCards)) {
				if (this.state.username === 'guest') {
					animate.push( () => this.setState({winner: 'PLAYER', money: this.state.money + this.state.bet}) );
				}
				else {
					animate.push( () => this.setState({winner: 'PLAYER'}));
					changeMoney(this.state.username, this.state.money + this.state.bet, this.updateUser.bind(this));
				}
			} else {
				if (this.state.username === 'guest') {
					animate.push( () => this.setState({winner: 'DEALER', money: this.state.money - this.state.bet}) );
				}
				else {
					animate.push( () => this.setState({winner: 'DEALER'}));
					changeMoney(this.state.username, this.state.money - this.state.bet, this.updateUser.bind(this));
				}
			}

			animate.push(this.needShuffle.bind(this));
			animate.forEach((func, i) => {
				setTimeout(func, (i + 1) * 500);
			})
		}
	}

	//checks if deck has less than 10 cards, if so, shuffle
	needShuffle() {
		if (this.state.deck.cardsLeft() < 10) {
			this.reset();
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

	//if starting hand is blackjack, auto win, pay 1.5x
	checkBlackJack() {
		if (points(this.state.playerCards) === 21) {
			if (this.state.username === 'guest') { 
				this.setState({winner: 'PLAYER', money: this.state.money + (this.state.bet * 1.5), reveal: true});
			}
			else {
				this.setState({winner: 'PLAYER', reveal: true});
				changeMoney(this.state.username, this.state.money + (this.state.bet * 1.5), this.updateUser.bind(this));
			}
		}
	}

	// updates betting amount 
	updateBet(amount) {
		if(this.state.reveal || this.state.playerCards.length === 0) {
			this.setState({ bet: amount });
		}
	}

	display(info) {
		this.setState({display: info});
	}

	updateUser({username, money}) {
		this.setState({
			username: username,
			money: money
		});
	}

	render() {
		return (
			<div>
				<div className='info'>
					<div className='cardsLeft'> Cards left: {this.state.deck.cardsLeft()}</div>
					<div className='count'> The Count: {this.state.deck.count()}</div>
					<div className='percentage'> The Edge: {this.state.deck.percentage() + '%'}</div>
				</div>

				<div className='display'>
					<div onClick={() => this.display('why')}>Why it works</div>
					<div onClick={() => this.display('counting')}>How to count</div>
					<div onClick={() => this.display('edge')}>The edge</div>
					<div onClick={() => this.display('none')} className='hide'>Hide</div>
				</div>

				<div className='howTo'>
					{this.state.display === 'none' ? null : <HowTo info={this.state.display}/>}
				</div>

				<div className='game'>
					<div className='title'>
						<img src='cards/title.png' className='titleImage' />
					</div>

					<div className='table'>
						<Dealer cards={this.state.dealerCards} reveal={this.state.reveal}/>
						<Player cards={this.state.playerCards} />
						<Result bust={this.state.busted} winner={this.state.winner} />

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

				<Footer cb={this.updateUser.bind(this)}/>
			</div>
		)
	}
}

ReactDOM.render(< App money='1000'/>, document.getElementById('app'));

// babel . --out-dir compiled --presets=es2015,react --ignore=node_modules,compiled --source-maps inline --watch




