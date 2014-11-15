var usps = require('./usps.js');
var ups = require('./ups.js');
var fedex = require('./fedex.js');

function trackUSPS(username, trackingNumber, callback) {
	var trackusps = new usps(username);
	trackusps.getShippingInfo(trackingNumber, callback);
}
exports.trackUSPS = trackUSPS;

function trackMultipleUSPS(username, trackingNumberArr, callback) {
	var trackusps = new usps(username);
	trackusps.getMultipleShippingInfo(trackingNumberArr, callback);
}
exports.trackMultipleUSPS = trackMultipleUSPS;


function trackUPS(username, password, accessKey, trackingNumber, callback) {
	var trackups = new ups(username, password, accessKey);
	trackups.getShippingInfo(trackingNumber, callback);

}
exports.trackUPS = trackUPS;

function trackFedex(username, password, accountNumber, meterNumber, trackingNumber, callback) {
	var trackfedex = new fedex(username, password, accountNumber, meterNumber);
	trackfedex.getShippingInfo(trackingNumber, callback);
}
exports.trackFedex = trackFedex;
