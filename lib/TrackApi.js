var usps = require('./usps.js');


function trackUSPS(userName, trackingNumber) {
	var trackusps = new usps(userName);
	return trackusps.getShippingInfo(trackingNumber);
}
exports.trackUSPS = trackUSPS;

function trackMultipleUSPS(userName, trackingNumberArr) {
	var trackusps = new usps(userName);
	return trackusps.getMultipleShippingInfo(trackingNumberArr);
}
exports.trackMultipleUSPS = trackMultipleUSPS;


function trackUPS() {

}
exports.trackUPS = trackUPS;

function trackFedex() {
}
exports.trackFedex = trackFedex;
