function timeout() {
	callback(100);
}

function test(callback) {
	setTimeout(timeout, 10);
}

test(function(n) {
	console.log(n);
});
