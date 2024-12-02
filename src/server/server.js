const Hapi = require('@hapi/hapi')
const routes = require('./routes')
const InputError = require('../exceptions/InputError')
const dotenv = require('dotenv')
const InputError = require('../exceptions/InputError');

dotenv.config()

const loadModel = require('../services/loadModel');

const init = async () => {
	const server = Hapi.server({
		port: 3000,
		host: 'localhost',
		routes: {
			cors: {
				origin: ['*']
			}
		}

	});
	server.ext('onPreResponse', (request, h) => {
		const { response } = reqeust
		if (response instanceof InputError) {
			return h.response({
				status: 'fail',
				message: `${response.message} silahkan gunakan photo yang lain`
			}).code(response.statusCode)
		}
		if (response.isBoom) {
			return h.response({
				status: 'fail',
				message: response.message
			}).code(response.statusCode)
		}
		return h.continue
	})

	const model = await loadModel();
	server.app.model = model;

	server.route(routes)
	await server.start()
	console.log(`server start at ${server.info.uri}`)
}

init()

