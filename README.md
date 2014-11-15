node-package-tracking-api
=========================

Packing tracking api for Node.js. Focused on USPS, Fedex, UPS


To use:

var tracking = require('./TrackApi.js'); to load

USPS:
tracking.trackUSPS(username, trackingNumber, callback);

UPS:
tracking.trackUPS(usernane, password, accessKey, trackingNumber, callback);

Fedex:
tracking.trackFedex(username, password, accountNumber, meterNumber, trackingNumber, callback);

