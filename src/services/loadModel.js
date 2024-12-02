const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
	tf.loadGraphModel("https://storage.googleapis.com/serta-mulia-zulfikar/models/model.json");
}

module.exports = loadModel;
