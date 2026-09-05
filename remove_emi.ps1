$files = @("c:\Users\varis\OneDrive\Desktop\planet\index.html", "c:\Users\varis\OneDrive\Desktop\planet\iphones.html")
foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $content = $content -replace '(?mi)^\s*<p class="product-emi[^>]+>.*?</p>\r?\n', ''
        $content = $content -replace '(?mi)^\s*<p class="text-xs text-gold[^>]*EMI.*?</p>\r?\n', ''
        $content = $content -replace '(?mi)^\s*<span class="badge-gray[^>]+>0% EMI</span>\r?\n', ''
        $content = $content -replace '(?mi)^\s*<li><a href="#why-us"[^>]+>0% No-Cost EMI</a></li>\r?\n', ''
        $content = $content -replace '(?mis)<button onclick="showToast\([^)]*EMI[^)]*\)[^>]*>.*?</button>', ''
        $content = $content -replace '(?mis)\s*<!-- Credit Card / EMI Outline -->.*?</div>\s*</div>\s*</div>', ''
        Set-Content $file $content
        Write-Host "Processed HTML: $file"
    }
}

$jsFile = "c:\Users\varis\OneDrive\Desktop\planet\js\app.js"
if (Test-Path $jsFile) {
    $jsContent = Get-Content $jsFile -Raw
    $jsContent = $jsContent -replace '(?s)if\s*\(emiEl\)\s*emiEl\.innerText[^;]+;', ''
    $jsContent = $jsContent -replace '(?s)<p class="product-emi[^>]+>\s*EMI from [^<]+</p>', ''
    Set-Content $jsFile $jsContent
    Write-Host "Processed JS: $jsFile"
}
