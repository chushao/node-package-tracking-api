var http = require('http');
var xml2js= require('xml2js');


function usps(userName) {
	this.userName = userName;
}

usps.prototype.getShippingInfo = function (trackingNumber) {
	var path = '<TrackRequest USERID="'+this.userName+'">'+'<TrackID ID="'+trackingNumber+'"></TrackID></TrackRequest>';
	return sendRequest(path);
}

usps.prototype.getMultipleShippingInfo = function (trackingNumberArr) {
	var path = '<TrackRequest USERID="'+this.userName+'">';
	for (var i = 0; i < trackingNumberArr.length; i++) {
		path += '<TrackID ID="'+trackingNumberArr[i]+'"></TrackID>';
	}
	path += '</TrackRequest>';
	return sendRequest(path);
}

function sendRequest(path) {
	//production.shippingapis.com TODO change
	var reqObj = {
		host: 'testing.shippingapis.com',
		port: 80,
		path: '/ShippingAPITest.dll?API=TrackV2&XML='+encodeURIComponent(path),
		headers: {
			'Content-Type': 'text/xml'
		}
	};

	return http.get(reqObj, function(res) {
		var str = '';
		res.on('data', function(data) {
			str += data;
		});
		res.on("end", function() {
			var parser = new xml2js.Parser();
			parser.parseString(str, function(err, result){
				if (!err) {
					if (result.TrackResponse) {
						console.log(result.TrackResponse);
					}
				} else {
					console.log("Err first: " + err);
				}
			});
		});
	}).on('error', function(e) {
		console.log("Err second: " + e.message);
	});
}

module.exports = usps;