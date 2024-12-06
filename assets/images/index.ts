// Exporting Images from images folder
import { Asset } from 'expo-asset';

// @ts-ignore
const logo = Asset.fromModule(require('./logo.jpeg')).uri;
const slider1 = Asset.fromModule(require('./slider1.jpeg')).uri;
const slider2 = Asset.fromModule(require('./slider2.jpeg')).uri;
const slider3 = Asset.fromModule(require('./slider3.jpeg')).uri;
const slider4 = Asset.fromModule(require('./slider4.jpeg')).uri;
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
const nav1 = Asset.fromModule(require('./nav1.png')).uri;
const nav2 = Asset.fromModule(require('./nav2.png')).uri;

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
   hero,
   slider1,
   slider2,
   slider3,
   slider4,
   nav1,
   nav2,

}

export { ImageCollection };
