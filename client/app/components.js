var Player = ({cards}) => (
	<div className='player'>
		{cards.map(card => 
			<PlayerCard card={card} />
		)}
	</div>
)

var PlayerCard = ({card}) => (
	<img className ='playerCard' src={cardImgSrc[card]} />
)

var Dealer = ({cards, reveal}) => (
	<div className='dealer'>
		{cards.map((card, i) => 
			<DealerCard card={card} index={i} reveal={reveal} />
		)}
	</div>
)

var DealerCard = ({card, index, reveal}) => (
	<img className='dealerCard' src={index === 0 && !reveal ? cardImgSrc['b'] : cardImgSrc[card]} />
)

var Result = ({bust, winner}) => (
	<div className='result'>
		<span>{bust ? 'BUSTED' : winner ? winner + ' WINS!' : ''}</span>
	</div>
)