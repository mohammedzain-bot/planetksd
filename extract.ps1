$zipPath = "c:\Users\varis\OneDrive\Desktop\planet\assets\images\herosection.zip"
$destPath = "c:\Users\varis\OneDrive\Desktop\planet\assets\images\herosection_frames"

if (-not (Test-Path $destPath)) {
    New-Item -ItemType Directory -Path $destPath -Force | Out-Null
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory($zipPath, $destPath)

$files = Get-ChildItem -Path $destPath -Recurse -File
Write-Host "Total extracted files: " $files.Count
$files | Select-Object -First 25 Name, FullName, Length | Format-Table -AutoSize
