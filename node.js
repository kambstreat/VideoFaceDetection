// Load the MobileNet model from TensorFlow.js hosted models
let model;
async function loadModel() {
    model = await tf.loadGraphModel('https://tfhub.dev/google/tfjs-model/mobilenet_v2_1.0_224/1/default/1', {fromTFHub: true});
    console.log('Model loaded successfully');
}

loadModel();

img.onload = async () => {
    const tensor = tf.browser.fromPixels(img).resizeNearestNeighbor([224, 224]).toFloat().expandDims();
    const predictions = await model.predict(tensor).data();
    console.log(predictions);
};
