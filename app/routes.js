var attendance = require('./models/attendance');
var service = require('./service');
var noamiService = require('./noamiService');

module.exports = function (app) {

	// api ---------------------------------------------------------------------
	app.get('/api/find/type/:type', function (req, res) {
		var type = req.params.type;
		service.processFindRequest(res, type);
	});

	app.get('/api/findAll', function (req, res) {
		service.processFindRequest(res, 'limit');
	});


	app.get('/api/conversation/preprocess', function (req, res) {
		noamiService.getThinkingResponse(res);
	});

	app.get('/api/conversation/process', function (req, res) {
		noamiService.getResponse(res);
	});


	// application -------------------------------------------------------------
	app.get('/chart', function (req, res) {
		res.sendfile('./public/chart.html');
	});

	app.get('/animation', function (req, res) {
		res.sendfile('./public/animation.html');
	});

	app.get('/cal', function (req, res) {
		res.sendfile('./public/markup.html');
	});

	app.get('*', function (req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};