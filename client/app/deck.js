var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

var Deck = function() {
	this.library = shuffle(allCards.slice());
  this.face = 20;
  this.small = 20;
}

Deck.prototype.draw = function() {
  let card = this.library.pop();
  if (isNaN(card[0])) {
    this.face--;
  } else if (Number(card[0]) < 7 ){
    this.small--;
  }
	return card;
}

Deck.prototype.reset = function() {
	this.library = shuffle(allCards.slice());
  this.face = 20;
  this.small = 20;
}

Deck.prototype.cardsLeft = function() {
  return this.library.length;
}

Deck.prototype.faceLeft = function() {
  return this.face;
}

Deck.prototype.smallLeft = function() {
  return this.small;
}

Deck.prototype.count = function() {
  return this.face - this.small;
}

Deck.prototype.percentage = function() {
  return 49.75 + (this.count() * 0.25);
}
