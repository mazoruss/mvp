// babel . --out-dir compiled --presets=es2015,react --ignore=node_modules,compiled --source-maps inline --watch

var PlayerCard = ({card}) => (
	<img src={cardImgSrc[card]} />
)

var Player = ({cards}) => (
	<div className='player'>
		{cards.map(card => 
			<PlayerCard card={card} />
		)}
	</div>
)

var Busted = ({bust}) => (
	<div className='busted'>
		<span>{bust ? 'BUSTED' : ''}</span>
	</div>
)


class App extends React.Component {
	constructor(props) {
		super(props);
		var deck = new Deck();
		this.state = {
			deck: deck,
			playerCards: [],
			busted: false
		}
	}

	hitMe() {
		if(this.state.busted) {
			return;
		}
		let cards = this.state.playerCards.slice();
		cards.push(this.state.deck.draw());
		this.setState({
			playerCards: cards
		});
		if (isBust(cards)) {
			this.setState({
				busted: true
			})
		}
	}

	reset() {
		var deck = new Deck();
		this.setState({
			deck: deck,
			playerCards: [],
			busted: false
		})
	}

	render() {
		return (
			<div>
				<span>Black Jack Table</span>
				<div className='dealer'>
				</div>
				<button onClick={this.hitMe.bind(this)}>Hit Me</button>
				<button onClick={this.reset.bind(this)}>Restart</button>	
				<Player cards={this.state.playerCards} />
				<Busted bust={this.state.busted} />
				<div className='library'>
				</div>
				<div className='info'>
				</div>
			</div>
		)
	}
}


ReactDOM.render(< App />, document.getElementById('app'));