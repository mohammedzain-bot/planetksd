const fs = require('fs');

function removeEmiFromFile(filepath) {
    if (!fs.existsSync(filepath)) return;
    let content = fs.readFileSync(filepath, 'utf8');

    // Remove product-emi tags completely
    content = content.replace(/^\s*<p class="product-emi[^>]+>.*?<\/p>\r?\n/gm, '');
    content = content.replace(/^\s*<p class="text-xs text-gold[^>]*EMI.*?<\/p>\r?\n/gmi, '');
    
    // Remove 0% EMI badge
    content = content.replace(/^\s*<span class="badge-gray[^>]+>0% EMI<\/span>\r?\n/gm, '');
    
    // Remove footer link
    content = content.replace(/^\s*<li><a href="#why-us"[^>]+>0% No-Cost EMI<\/a><\/li>\r?\n/gm, '');
    
    // Cart drawer EMI button
    content = content.replace(/<button onclick="showToast\([^)]*EMI[^)]*\)[^>]*>[\s\S]*?<\/button>/gm, '');
    
    // The whole Credit Card EMI card in index.html (Lines ~435-449)
    content = content.replace(/\s*<!-- Credit Card \/ EMI Outline -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gm, '');
    
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Processed ${filepath}`);
}

removeEmiFromFile('c:/Users/varis/OneDrive/Desktop/planet/index.html');
removeEmiFromFile('c:/Users/varis/OneDrive/Desktop/planet/iphones.html');

const jsPath = 'c:/Users/varis/OneDrive/Desktop/planet/js/app.js';
if (fs.existsSync(jsPath)) {
    let jsContent = fs.readFileSync(jsPath, 'utf8');
    jsContent = jsContent.replace(/if\s*\(emiEl\)\s*emiEl\.innerText[^;]+;/g, '');
    jsContent = jsContent.replace(/<p class="product-emi[^>]+>\s*EMI from [^<]+<\/p>/g, '');
    fs.writeFileSync(jsPath, jsContent, 'utf8');
    console.log(`Processed app.js`);
}
