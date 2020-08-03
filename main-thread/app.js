document.querySelector('button').addEventListener('click', runTest)

function runTest() {
  var buffer = new ArrayBuffer(1024 * 1024 * 10) // reserves 10 MB
  var view = new Uint8Array(buffer) // view the buffer as bytes
  var numPrimes = 0

  performance.mark('testStart');
  for(var i=0; i<view.length;i++) {
    var primeCandidate = i+2; // 2 is the smalles prime number
    var result = isPrime(primeCandidate);
    if(result) numPrimes++;
    view[i] = result;
  }
  performance.mark('testEnd');
  performance.measure('runTest', 'testStart', 'testEnd')
  var timeTaken = performance.getEntriesByName('runTest')[0].duration

  console.log('素数个数:', numPrimes, '; 查找时间:', timeTaken, 'ms');
}
// 1 会卡死整个页面
// 2 素数个数: 694716 ; 查找时间: 8144.29999999993 ms

function isPrime(candidate) {
  var target = Math.floor(Math.sqrt(candidate));
  for(var i=2; i<=target; i++) {
    if(candidate % i === 0) return false;
  }
  return true;
}
