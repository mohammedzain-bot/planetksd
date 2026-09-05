$env:Path = "C:\Program Files\nodejs;" + $env:Path
Set-Location "C:\Users\varis\OneDrive\Desktop\planet-admin"
& "C:\Program Files\nodejs\npm.cmd" install lucide-react @supabase/supabase-js framer-motion
Write-Host "Dependencies installed successfully"
