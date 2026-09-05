Add-Type -AssemblyName System.Drawing
$img1 = [System.Drawing.Image]::FromFile("c:\Users\varis\OneDrive\Desktop\planet\assets\images\herosection_frames\ezgif-frame-001.jpg")
$imgMid = [System.Drawing.Image]::FromFile("c:\Users\varis\OneDrive\Desktop\planet\assets\images\herosection_frames\ezgif-frame-100.jpg")
$imgLast = [System.Drawing.Image]::FromFile("c:\Users\varis\OneDrive\Desktop\planet\assets\images\herosection_frames\ezgif-frame-214.jpg")

Write-Host "Width: $($img1.Width) Height: $($img1.Height)"
$img1.Dispose()
$imgMid.Dispose()
$imgLast.Dispose()

$all = Get-ChildItem "c:\Users\varis\OneDrive\Desktop\planet\assets\images\herosection_frames\*.jpg"
Write-Host "Total jpg frames: $($all.Count)"
