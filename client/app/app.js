class App extends React.Component {
	constructor(props) {
		super(props);
		var deck = new Deck();
		this.state = defaultState();
		this.reset();
	}

	hitMe() {
		if(this.state.busted) { return; }
		let cards = this.state.playerCards.slice();
		cards.push(this.state.deck.draw());
		this.setState({ playerCards: cards });
		if (isBust(cards)) {
			this.setState({ busted: true, reveal: true })
		}
		
	}

	reset() {
		this.setState(defaultState());
		setTimeout(this.dealerDraw.bind(this), 250);
		setTimeout(this.dealerDraw.bind(this), 500);
		setTimeout(this.hitMe.bind(this), 750);
		setTimeout(this.hitMe.bind(this), 1000);
	}

	dealerDraw() {
		let cards = this.state.dealerCards.slice();
		cards.push(this.state.deck.draw());
		this.setState({ dealerCards: cards });
	}

	keep() {
		if (this.state.reveal) {
			this.setState({ reveal: false, playerCards: [], 
				dealerCards: [], busted: false, winner: ''});
			setTimeout(this.dealerDraw.bind(this), 250);
			setTimeout(this.dealerDraw.bind(this), 500);
			setTimeout(this.hitMe.bind(this), 750);
			setTimeout(this.hitMe.bind(this), 1000);
		} else {
			this.setState({reveal: true});
			let cards = this.state.dealerCards.slice();
			while(points(cards) < 17) {
				cards.push(this.state.deck.draw());
				this.setState({ dealerCards: cards });
			}
			if (points(cards) > 21 || points(cards) < points(this.state.playerCards)) {
				this.setState({winner: 'Player'});
			} else {
				this.setState({winner: 'Dealer'});
			}
		}
	}

	render() {
		return (
			<div>
				<span>Black Jack Table</span> <br />

				<button onClick={this.hitMe.bind(this)}>Hit Me</button>
				<button onClick={this.reset.bind(this)}>Restart</button>	
				<button onClick={this.keep.bind(this)}>{this.state.reveal ? 'Next Hand' : 'Keep'}</button>	

				<Dealer cards={this.state.dealerCards} reveal={this.state.reveal}/>
				
				<Player cards={this.state.playerCards} />
				<Result bust={this.state.busted} winner={this.state.winner} />

			</div>
		)
	}
}

ReactDOM.render(< App />, document.getElementById('app'));

// babel . --out-dir compiled --presets=es2015,react --ignore=node_modules,compiled --source-maps inline --watch




