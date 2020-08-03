document.querySelector('button').addEventListener('click', runTest)

function runTest() {
  var buffer = new ArrayBuffer(1024 * 1024 * 10) // reserves 10 MB
  var view = new Uint8Array(buffer) // view the buffer as bytes

  performance.mark('testStart')
  var worker = new Worker('prime-worker.js')
  worker.onmessage = function(msg) {
    performance.mark('testEnd')
    performance.measure('runTest', 'testStart', 'testEnd')
    var timeTaken = performance.getEntriesByName('runTest')[0].duration;
    // var view2 = new Uint8Array(msg.data.buffer);
    // view.set(new Uint8Array(msg.data.buffer), 0);
    console.log(msg.data.numPrimes, view)
      console.log('素数个数:', msg.data.numPrimes, '; 查找时间:', timeTaken, 'ms');
    // 素数个数: 694716 ; 查找时间: 9041.000000000167 ms
  }
  worker.postMessage(buffer, [buffer]);
// This second parameter can hold a list of Transferable objects that will be excluded from cloning and will be moved or transferred instead.
}
