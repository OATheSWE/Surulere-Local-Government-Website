// Exporting Images from images folder
import { Asset } from 'expo-asset';

// @ts-ignore
const logo = Asset.fromModule(require('./logo.png')).uri;
const hero = Asset.fromModule(require('./hero.png')).uri;
const topImage = Asset.fromModule(require('./image.png')).uri;
const subform = Asset.fromModule(require('./subform.png')).uri;
const goodh = Asset.fromModule(require('./goodh.png')).uri;
const quality = Asset.fromModule(require('./quality.png')).uri;
const sustain = Asset.fromModule(require('./sustain.png')).uri;
const bgdesign = Asset.fromModule(require('./bgdesign.png')).uri;
const bg = Asset.fromModule(require('./bg.png')).uri;
const chairman = Asset.fromModule(require('./chairman.jpeg')).uri;
const wave1 = Asset.fromModule(require('./wave1.png')).uri;
const wave2 = Asset.fromModule(require('./wave2.png')).uri; 

const ImageCollection = {
   logo,
   topImage,
   subform,
   goodh,
   quality,
   sustain,
   bgdesign,
   chairman,
   wave1,
   wave2,
   bg,
   hero
}

export { ImageCollection };
