// Exporting Images from images folder
import { Asset } from 'expo-asset';

// @ts-ignore
const logo = Asset.fromModule(require('./logo.png')).uri;
const topImage = Asset.fromModule(require('./image.png')).uri;
const subform = Asset.fromModule(require('./subform.png')).uri;
const goodh = Asset.fromModule(require('./goodh.png')).uri;
const quality = Asset.fromModule(require('./quality.png')).uri;
const sustain = Asset.fromModule(require('./sustain.png')).uri;

const ImageCollection = {
   logo,
   topImage,
   subform,
   goodh,
   quality,
   sustain
}

export { ImageCollection };
