self.onmessage = function(msg) {
    performance.mark('workerStart')

  var view = new Uint8Array(msg.data),
      numPrimes = 0
  for(var i=0; i<view.length;i++) {
    var primeCandidate = i+2 // 2 is the smalles prime number
    var result = isPrime(primeCandidate)
    if(result) numPrimes++
    view[i] = result
  }
    performance.mark('workerEnd')
    performance.measure('workerTest', 'workerStart', 'workerEnd')
    var timeTaken = performance.getEntriesByName('workerTest')[0].duration;
    console.log('worker - 素数个数:', numPrimes, '; 查找时间:', timeTaken, 'ms');

  self.postMessage({
    buffer: view.buffer,
    numPrimes: numPrimes
  }, [view.buffer]);
}

function isPrime(candidate) {
  var target = Math.floor(Math.sqrt(candidate));
  for(var n=2; n <= target; n++) {
    if(candidate % n === 0) return false
  }
  return true
}
