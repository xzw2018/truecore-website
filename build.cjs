const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname);
const dist = path.resolve(root, 'dist');
if (path.relative(root, dist) !== 'dist' || path.dirname(dist) !== root) {
  throw new Error('Refusing to clean a build directory outside the project: ' + dist);
}
if (fs.existsSync(dist) && fs.lstatSync(dist).isSymbolicLink()) {
  throw new Error('Refusing to clean a symbolic build directory: ' + dist);
}
const files = ['index.html','about.html','products.html','product-detail.html','solutions.html','support.html','insights.html','contact.html','styles.css','catalog.css','content.css','contact.css','site.js','home.js','product-data.js','products.js','product-detail.js','content.js','contact.js'];
const data = {window:{}}; vm.runInNewContext(fs.readFileSync(path.join(root,'product-data.js'),'utf8'),data);
const productAssets = [...new Set(data.window.CL_PRODUCTS.map(product => product.image))];
const assets = ['lucide.min.js','LUCIDE-LICENSE.txt','favicon.svg','network-hero.png','technology.jpg'];
const fontAssets = fs.readdirSync(path.join(root,'assets/fonts')).filter(name=>/\.(woff2|txt)$/.test(name)).map(name=>'assets/fonts/'+name);
const allFiles = [...files,'typography.css',...assets.map(name=>'assets/'+name),...fontAssets,...productAssets];
// Validate every input before replacing the project's generated output.
for (const file of allFiles) {
  const source = path.resolve(root, file);
  const target = path.resolve(dist, file);
  if (!source.startsWith(root + path.sep) || !target.startsWith(dist + path.sep)) {
    throw new Error('Invalid build path: ' + file);
  }
  if (!fs.existsSync(source)) throw new Error('Required asset missing: ' + file);
}
fs.rmSync(dist, {recursive:true, force:true});
fs.mkdirSync(path.join(dist,'assets'),{recursive:true});
for(const file of allFiles){
  const source=path.join(root,file), target=path.join(dist,file);
  if(!source.startsWith(root+path.sep)||!target.startsWith(dist+path.sep))throw new Error('Invalid build path: '+file);
  if(!fs.existsSync(source))throw new Error('Required asset missing: '+file);
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.copyFileSync(source,target);
}
console.log('Built '+allFiles.length+' files into '+dist);
