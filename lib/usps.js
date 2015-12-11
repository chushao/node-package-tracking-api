var http = require('http');
var xml2js = require('xml2js');


function usps(username) {
	this.userName = username;
}

usps.prototype.getShippingInfo = function (trackingNumber, callback) {
	var path = '<TrackRequest USERID="'+this.userName+'">'+'<TrackID ID="'+trackingNumber+'"></TrackID></TrackRequest>';
  sendRequest(path, callback);
}

usps.prototype.getMultipleShippingInfo = function (trackingNumberArr, callback) {
	var path = '<TrackRequest USERID="'+this.userName+'">';
	for (var i = 0; i < trackingNumberArr.length; i++) {
		path += '<TrackID ID="'+trackingNumberArr[i]+'"></TrackID>';
	}
	path += '</TrackRequest>';
	sendRequest(path, callback);
}

function sendRequest(path, callback) {
	var reqObj = {
		host: 'production.shippingapis.com',
		port: 80,
		path: '/ShippingAPI.dll?API=TrackV2&XML='+encodeURIComponent(path),
		headers: {
			'Content-Type': 'text/xml'
		}
	};

	http.get(reqObj, function(res) {
		var str = '';
		res.on('data', function(data) {
			str += data;
		});
		res.on("end", function() {
			var parser = new xml2js.Parser();
			parser.parseString(str, function(err, result){
				if (!err) {
					if (result.TrackResponse) {
            callback(result);
					}
				} else {
					console.log("Err first: " + err);
					callback(err);
				}
			});
		});
	}).on('error', function(e) {
		console.log("Err second: " + e.message);
		callback(e.message);
	});

}

module.exports = usps;
