const randNumber = (lower, upper) => Math.floor(Math.random()*(upper-lower+1)+lower)
const randIndexOfArray = (array) => array[randNumber(0, array.length-1)]
module.exports = {
  randIndexOfArray,
  randNumber,
}
