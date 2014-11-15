var https = require('https');
var xml2js = require('xml2js');

function fedex(key, password, accountNumber, meterNumber) {
	this.authReq = buildAuth(key, password, accountNumber, meterNumber);
}

fedex.prototype.getShippingInfo = function(trackingNumber, callback) {
	//TODO change to live
	//ws.fedex.com
	req = https.request({
		host: 'wsbeta.fedex.com',
		path: '/xml',
		method: 'POST'
	});

	var xml = buildCommon(this.authReq + buildTrack(trackingNumber));
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
					if (result.TrackReply) {
						callback(result.TrackReply);
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

function buildAuth(key, password, accountNumber, meterNumber) {
	return 	"<WebAuthenticationDetail>"+
				"<UserCredential>" +
					"<Key>"+key+"</Key>"+
					"<Password>"+password+"</Password>"+
				"</UserCredential>"+
			"</WebAuthenticationDetail>"+
			"<ClientDetail>"+
				"<AccountNumber>"+accountNumber+"</AccountNumber>"+
				"<MeterNumber>"+meterNumber+"</MeterNumber>"+
			"</ClientDetail>";
}

function buildTrack(trackingNumber) {
	return 	"<TransactionDetail>"+
				"<CustomerTransactionId>ActiveShipping</CustomerTransactionId>"+
			"</TransactionDetail>"+ 
        	"<Version>"+
        		"<ServiceId>trck</ServiceId>"+
        		"<Major>6</Major>"+
        		"<Intermediate>0</Intermediate>"+
        		"<Minor>0</Minor>"+
        	"</Version>"+
        	"<PackageIdentifier>"+
        		"<Value>"+trackingNumber+"</Value>"+
        		"<Type>TRACKING_NUMBER_OR_DOORTAG</Type>"+
        	"</PackageIdentifier>"+
        	"<IncludeDetailedScans>true</IncludeDetailedScans>";
}

function buildCommon(xmlInsert) {
	return "<TrackRequest xmlns='http://fedex.com/ws/track/v6'>"+xmlInsert+"</TrackRequest>";
}

module.exports = fedex;