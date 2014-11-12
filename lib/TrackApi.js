var usps = require('./usps.js');


function trackUSPS(userName, trackingNumber, callback) {
	var trackusps = new usps(userName);
	trackusps.getShippingInfo(trackingNumber, callback);
}
exports.trackUSPS = trackUSPS;

function trackMultipleUSPS(userName, trackingNumberArr, callback) {
	var trackusps = new usps(userName);
	trackusps.getMultipleShippingInfo(trackingNumberArr, callback);
}
exports.trackMultipleUSPS = trackMultipleUSPS;


function trackUPS() {

}
exports.trackUPS = trackUPS;

function trackFedex() {
}
exports.trackFedex = trackFedex;
