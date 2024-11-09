// Exporting Images from images folder
import { Asset } from 'expo-asset';

// @ts-ignore
const logo = Asset.fromModule(require('./logo.png')).uri;
const topImage = Asset.fromModule(require('./image.png')).uri;
const subform = Asset.fromModule(require('./subform.png')).uri;

const ImageCollection = {
   logo,
   topImage,
   subform
}

export { ImageCollection };
