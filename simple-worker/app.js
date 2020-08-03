document.querySelector('button').addEventListener('click', runTest)

function runTest() {
    var buffer = new ArrayBuffer(1024 * 1024 * 10) // reserves 10 MB
    var view = new Uint8Array(buffer) // view the buffer as bytes

    performance.mark('testStart')
    var worker = new Worker('prime-worker.js')
    worker.onmessage = function(msg) {
        performance.mark('testEnd');
        performance.measure('runTest', 'testStart', 'testEnd');
        var timeTaken = performance.getEntriesByName('runTest')[0].duration;
        view.set(new Uint8Array(msg.data.buffer), 0);
        console.log(msg.data.numPrimes, view)
        console.log('素数个数:', msg.data.numPrimes, '; 查找时间:', timeTaken, 'ms');
    }
    worker.postMessage(buffer);
}
// app.js:15 素数个数: 694716 ; 查找时间: 8349.299999999857 ms
