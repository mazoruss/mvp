var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var Deck = function() {
	this.library = shuffle(allCards.slice());
}

Deck.prototype.draw = function() {
	return this.library.pop();
}

Deck.prototype.reset = function() {
	this.library = shuffle(allCards.slice());
}