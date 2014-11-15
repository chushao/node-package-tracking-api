var https = require('https');
var xml2js = require('xml2js');


function ups(username, password, accessKey) {
	this.authReq = buildAuth(username, password, accessKey);
}

ups.prototype.getShippingInfo = function(trackingNumber, callback) {
	//TODO change to live
	//onlinetools.ups.com
	req = https.request({
		host: 'wwwcie.ups.com',
		path: '/ups.app/xml/Track',
		method: 'POST'
	});

	var xml = this.authReq + buildTrack(trackingNumber);
	req.write(xml);

	req.on('response', function(res) {
		var str = '';
		res.on('data', function(data) {
			str += data;
		});
		res.on("end", function() {
			var parser = new xml2js.Parser();
			parser.parseString(str, function(err, result){
				if (!err) {
					if (result.TrackResponse) {
							callback(result.TrackResponse);
					}
				} else {
					console.log("Err first: " + err);
					callback(err);
				}
			});
		});
	});
	req.end();
}

function buildAuth(username, password, accessKey) {

		return "<?xml version='1.0' encoding='utf-8'?>"+
					"<AccessRequest xml:lang='en-US'>"+
						"<AccessLicenseNumber>"+accessKey+"</AccessLicenseNumber>"+
						"<UserId>"+username+"</UserId>"+
						"<Password>"+password+"</Password>"+
    				"</AccessRequest>";
}

function buildTrack(trackingNumber) {

	return "<?xml version='1.0' encoding='utf-8'?>" +
				"<TrackRequest xml:lang='en-US'>"+
					"<Request>"+
						"<TransactionReference>"+
							"<CustomerContext>Package Tracking</CustomerContext>"+
							"<XpciVersion>1.0</XpciVersion>"+
						"</TransactionReference>"+
						"<RequestAction>Track</RequestAction>"+
						"<RequestOption>activity</RequestOption>"+
					"</Request>"+
					"<TrackingNumber>"+trackingNumber+"</TrackingNumber>"+
				"</TrackRequest>";
}

module.exports = ups;
