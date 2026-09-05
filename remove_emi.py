import re
import os

def remove_emi_from_file(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove product-emi tags completely
    content = re.sub(r'^\s*<p class="product-emi[^>]+>.*?</p>\r?\n', '', content, flags=re.MULTILINE)
    content = re.sub(r'^\s*<p class="text-xs text-gold[^>]*EMI.*?</p>\r?\n', '', content, flags=re.MULTILINE | re.IGNORECASE)
    
    # Remove 0% EMI badge
    content = re.sub(r'^\s*<span class="badge-gray[^>]+>0% EMI</span>\r?\n', '', content, flags=re.MULTILINE)
    
    # Remove footer link
    content = re.sub(r'^\s*<li><a href="#why-us"[^>]+>0% No-Cost EMI</a></li>\r?\n', '', content, flags=re.MULTILINE)
    
    # Cart drawer EMI button
    content = re.sub(r'<button onclick="showToast\([^)]*EMI[^)]*\).*?</button>', '', content, flags=re.DOTALL)
    
    # The whole Credit Card EMI card in index.html (Lines ~435-449)
    # It has <!-- Credit Card / EMI Outline -->
    content = re.sub(r'\s*<!-- Credit Card / EMI Outline -->.*?</div>\s*</div>\s*</div>', '', content, flags=re.DOTALL)
    
    # Any other leftover EMI strings without killing the file
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Processed {filepath}")

remove_emi_from_file('c:/Users/varis/OneDrive/Desktop/planet/index.html')
remove_emi_from_file('c:/Users/varis/OneDrive/Desktop/planet/iphones.html')

# For app.js, we need to remove the logic that updates EMI.
js_path = 'c:/Users/varis/OneDrive/Desktop/planet/js/app.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()
    
# Remove `if (emiEl) emiEl.innerText = \`EMI from ${formatINR(pricing.emi)}/mo\`;`
js_content = re.sub(r'if\s*\(emiEl\)\s*emiEl\.innerText[^;]+;', '', js_content)
# Remove `<p class="product-emi text-xs text-appleGray mt-1">\s*EMI from \$\{formatINR\(currentPricing\.emi\)\}/mo\s*</p>`
js_content = re.sub(r'<p class="product-emi[^>]+>\s*EMI from [^<]+</p>', '', js_content)

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js_content)
print("Processed app.js")

