const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const sources = ['servers.json','switches.json','storage-accessories.json','network-accessories.json'];
const all = sources.flatMap(file => JSON.parse(fs.readFileSync(path.join(root,'research',file),'utf8').replace(/^\uFEFF/,'')));
const imageMapPath = path.join(root,'research','web-images.json');
const imageMap = fs.existsSync(imageMapPath) ? JSON.parse(fs.readFileSync(imageMapPath,'utf8')) : {};
function imageCaption(product, isRearView) {
  if (product.imageScope === 'series') {
    if (product.category === 'storage') return 'Manufacturer series image. Capacity and interface may vary; refer to the listed part number.';
    if (product.subtype === 'memory') return 'Manufacturer series image. Specifications apply to the listed module; layout may vary.';
    if (product.subtype === 'nic') return 'Manufacturer series image. Ports and brackets vary by model.';
    return 'Manufacturer series image. Details may vary by model.';
  }
  if (isRearView) return 'Manufacturer rear-view image. Rear drive bays and I/O vary by configuration.';
  if (product.category === 'server') return 'Manufacturer image. Drive bays and components vary by configuration.';
  if (product.category === 'switch') return 'Manufacturer image of this switch model.';
  if (product.category === 'storage') return 'Manufacturer drive image. Label details may vary.';
  const component = {nic:'network adapter',raid:'RAID controller',memory:'memory module',transceiver:'optical transceiver',cable:'cable'}[product.subtype];
  return component ? 'Manufacturer image of this ' + component + '.' : 'Manufacturer product image.';
}
const seen = new Set();
for(const product of all){
  if(seen.has(product.id))throw new Error('Duplicate product: '+product.id);seen.add(product.id);
  for(const key of ['id','name','brand','model','category','subtype','image','imageSource','sourceUrl','description','scenario','specs'])if(!product[key])throw new Error('Missing '+key+' in '+product.id);
  if(!fs.existsSync(path.join(root,product.image)))throw new Error('Missing image: '+product.image);
  if(product.image.endsWith('.svg'))throw new Error('Specific product needs photography: '+product.id);
  if(!['model','series'].includes(product.imageScope))throw new Error('Image scope must be explicit: '+product.id);
  if(!/^https:\/\//.test(product.sourceUrl)||!/^https:\/\//.test(product.imageSource))throw new Error('Invalid source in '+product.id);
  product.price=null;product.colors=[];
  product.tags = [...new Set(product.tags || [])];
  const isRearView = product.imageView === 'rear' || /\brear[- ]view\b|\brear panel\b/i.test(product.imageNote || '');
  product.provenanceNote = product.imageNote;
  product.imageNote = imageCaption(product, isRearView);
  if(imageMap[product.image]) { product.originalImage=product.image; product.image=imageMap[product.image]; }
}
const order = ['server','switch','storage','accessory'];
const groups = order.map(category => all.filter(p => p.category === category));
const products = [];
for(let index=0;index<Math.max(...groups.map(g=>g.length));index++)for(const group of groups)if(group[index])products.push(group[index]);
products.forEach((product,index) => product.newRank=products.length-index);
const first = category => products.find(p=>p.category===category)?.id;
const aliases = {'rack-server-2u':products.find(p=>p.subtype==='rack-2u')?.id || first('server'),'rack-server-1u':products.find(p=>p.subtype==='rack-1u')?.id || first('server'),'datacenter-switch':products.find(p=>p.subtype==='datacenter')?.id || first('switch'),'access-switch':products.find(p=>p.subtype==='access')?.id || first('switch'),'optical-module':first('accessory'),'dac-cable':first('accessory'),'rack-rail':first('accessory'),'power-module':first('accessory')};
// Only chassis and network routes have direct replacements. Generic accessory links cannot identify a specific compatible part.
for(const key of ['optical-module','dac-cable','rack-rail','power-module'])delete aliases[key];
const categories = {all:'All products',server:'Servers',switch:'Switches',storage:'Server drives',accessory:'Components'};
const types = {'rack-1u':'1U rack servers','rack-2u':'2U rack servers',tower:'Tower servers',access:'Access switches',aggregation:'Aggregation switches',datacenter:'Data center switches',hdd:'Enterprise HDDs','sas-hdd':'SAS HDDs','sata-ssd':'SATA SSDs','sas-ssd':'SAS SSDs','nvme-ssd':'NVMe SSDs',nic:'Network adapters',raid:'RAID controllers',memory:'ECC server memory',transceiver:'Optical transceivers',cable:'Direct-attach cables'};
const out = '/* Manufacturer-sourced model cases. Maintain research/*.json and run node compile-products.cjs. */\n'
  + 'window.CL_PRODUCTS = Object.freeze('+JSON.stringify(products,null,2)+');\n'
  + 'window.CL_CATEGORIES = Object.freeze('+JSON.stringify(categories)+');\n'
  + 'window.CL_PRODUCT_TYPES = Object.freeze('+JSON.stringify(types)+');\n'
  + 'window.CL_PRODUCT_ALIASES = Object.freeze('+JSON.stringify(aliases)+');\n';
fs.writeFileSync(path.join(root,'product-data.js'),out);
fs.writeFileSync(path.join(root,'research','catalog-sources.json'),JSON.stringify(products.map(({id,name,brand,model,category,sourceUrl,sourceTitle,image,imageSource,imageScope,imageNote,verifiedAt})=>({id,name,brand,model,category,sourceUrl,sourceTitle,image,imageSource,imageScope,imageNote,verifiedAt})),null,2));
console.log(JSON.stringify({total:products.length,categories:Object.fromEntries(order.map(c=>[c,products.filter(p=>p.category===c).length])),brands:[...new Set(products.map(p=>p.brand))]},null,2));
