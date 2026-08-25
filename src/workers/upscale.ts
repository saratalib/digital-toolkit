import * as tf from "@tensorflow/tfjs";
import Img from "./image";

export default async function upscale(
  image: Img,
  model: tf.GraphModel,
  alpha = false
): Promise<Img> {
  const inputTensor = tf.tensor3d(
    image.data,
    [image.height, image.width, 4],
    "int32"
  );

  const rgbTensor = tf.tidy(() =>
    inputTensor
      .slice([0, 0, 0], [image.height, image.width, 3])
      .toFloat()
      .div(255)
      .expandDims(0)
  );

  inputTensor.dispose();

  let prediction: tf.Tensor | tf.Tensor[];

  try {
    prediction = model.execute(rgbTensor);
  } finally {
    rgbTensor.dispose();
  }

  const resultTensor = Array.isArray(prediction)
    ? prediction[0]
    : prediction;

  if (!resultTensor) {
    throw new Error("Real-ESRGAN returned no image.");
  }

  let tensor = resultTensor as tf.Tensor;

  /*
   * Real-ESRGAN normally returns:
   * [1, height, width, 3]
   *
   * Some converted models can return:
   * [1, 3, height, width]
   *
   * Handle both layouts.
   */

  if (tensor.shape.length === 4) {
    if (tensor.shape[1] === 3) {
      tensor = tensor
        .squeeze([0])
        .transpose([1, 2, 0]);
    } else {
      tensor = tensor.squeeze([0]);
    }
  }

  if (tensor.shape.length !== 3) {
    throw new Error(
      `Unexpected Real-ESRGAN output shape: ${tensor.shape.join(" × ")}`
    );
  }

  const channels = tensor.shape[2];

  if (channels !== 3) {
    throw new Error(
      `Unexpected Real-ESRGAN output channels: ${channels}`
    );
  }

  const outputHeight = tensor.shape[0];
  const outputWidth = tensor.shape[1];

  const clipped = tf.tidy(() =>
    tensor
      .clipByValue(0, 1)
      .mul(255)
      .cast("int32")
  );

  const values = await clipped.data();

  clipped.dispose();

  if (tensor !== resultTensor) {
    tensor.dispose();
  } else {
    resultTensor.dispose();
  }

  const output = new Uint8Array(
    outputWidth * outputHeight * 4
  );

  for (let y = 0; y < outputHeight; y++) {
    for (let x = 0; x < outputWidth; x++) {
      const sourceIndex =
        (y * outputWidth + x) * 3;

      const targetIndex =
        (y * outputWidth + x) * 4;

      output[targetIndex] =
        values[sourceIndex] ?? 0;

      output[targetIndex + 1] =
        values[sourceIndex + 1] ?? 0;

      output[targetIndex + 2] =
        values[sourceIndex + 2] ?? 0;

      output[targetIndex + 3] = 255;
    }
  }

  return new Img(
    outputWidth,
    outputHeight,
    output
  );
}