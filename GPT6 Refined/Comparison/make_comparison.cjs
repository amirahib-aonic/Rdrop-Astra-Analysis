const fs=require('fs'),path=require('path');
const sharp=require('C:/Users/User1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const dir=__dirname;
(async()=>{
 for(const v of ['original','refined']) for(const side of ['top','bottom']) {
  const raster=await sharp(path.join(dir,`${v}-${side}.svg`),{density:240}).flatten({background:'#ffffff'}).png().toBuffer();
  await sharp(raster).trim({background:'#ffffff',threshold:4}).resize({width:2000}).extend({top:30,bottom:30,left:30,right:30,background:'#ffffff'}).png().toFile(path.join(dir,`${v}-${side}.png`));
 }
 for(const side of ['top','bottom','3d']) {
  const inputs=[];
  for(const [i,v] of ['original','refined'].entries()){
   const buf=await sharp(path.join(dir,`${v}-${side}.png`)).resize(1500,920,{fit:'contain',background:'#ffffff'}).toBuffer();
   inputs.push({input:buf,left:i*1500,top:80});
  }
  const title=Buffer.from(`<svg width="3000" height="80"><rect width="3000" height="80" fill="#142937"/><g fill="white" font-family="Arial" font-size="30"><text x="30" y="50">ORIGINAL · ${side.toUpperCase()}</text><text x="1530" y="50">GPT6 REFINED · ${side.toUpperCase()}</text></g></svg>`);
  await sharp({create:{width:3000,height:1000,channels:3,background:'#ffffff'}}).composite([...inputs,{input:title,left:0,top:0}]).png().toFile(path.join(dir,`comparison-${side}.png`));
 }
 const c=JSON.parse(fs.readFileSync(path.join(dir,'changes.json')));
 const groups={};for(const t of c.tracks){const k=t.net;groups[k]??={count:0,length:0,before:t.before_mm,after:t.after_mm};groups[k].count++;groups[k].length+=t.length_mm;}
 fs.writeFileSync(path.join(dir,'track-summary.json'),JSON.stringify(groups,null,2));
 console.log(groups);
})();
