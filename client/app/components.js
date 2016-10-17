var Player = ({cards}) => (
	<div className='player'>
		{cards.map(card => 
			<SingleCard card={card} />
		)}
	</div>
)

var SingleCard = ({card}) => (
	<img src={cardImgSrc[card]} />
)

var Dealer = ({cards, reveal}) => (
	<div className='dealer'>
		{cards.map((card, i) => 
			<DealerCard card={card} index={i} reveal={reveal} />
		)}
	</div>
)

var DealerCard = ({card, index, reveal}) => (
	<img src={index === 0 && !reveal ? cardImgSrc['b'] : cardImgSrc[card]} />
)

var Result = ({bust, winner}) => (
	<div className='busted'>
		<span>{bust ? 'BUSTED' : winner ? winner + ' WINS!' : ''}</span>
	</div>
)