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

var HowTo = ({info}) => (
	<div className='wall'>
	{info === 'why' ? 
		whyItWorks : info === 'counting' ?
		howTo : info === 'edge' ? 
		theEdge : null
	}
	</div>
)

var Footer = ({cb}) => (
	<div className='footer'>
    <span>
      <label for="username">Username:</label>
      <input id="username" type="text" name="username" />
    </span>
    <span>
      <label for="password">Password:</label>
      <input id="password" type="password" name="password" />
    </span>
    <span>
      <button onClick={() => userlogin(cb)}>Log In</button>
    </span>
	</div>
)