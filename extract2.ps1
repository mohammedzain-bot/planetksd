$zipPath = "c:\Users\varis\OneDrive\Desktop\planet\assets\images\herosection2.zip"
$destPath = "c:\Users\varis\OneDrive\Desktop\planet\assets\images\herosection2_frames"

if (-not (Test-Path $destPath)) {
    New-Item -ItemType Directory -Path $destPath -Force | Out-Null
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory($zipPath, $destPath)

$files = Get-ChildItem -Path $destPath -Recurse -File
Write-Host "Total extracted files: " $files.Count
$files | Select-Object -First 25 Name, FullName, Length | Format-Table -AutoSize

if ($files.Count -gt 0) {
    Add-Type -AssemblyName System.Drawing
    $sample = [System.Drawing.Image]::FromFile($files[0].FullName)
    Write-Host "Sample image ($($files[0].Name)): Width = $($sample.Width), Height = $($sample.Height)"
    $sample.Dispose()
    
    $sorted = $files | Sort-Object Name
    Write-Host "First file:" $sorted[0].Name
    Write-Host "Last file:" $sorted[-1].Name
}
