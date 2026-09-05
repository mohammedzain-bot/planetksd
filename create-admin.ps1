$env:Path = "C:\Program Files\nodejs;" + $env:Path
cd C:\Users\varis\OneDrive\Desktop
npx create-next-app@latest planet-admin --typescript --tailwind --eslint --app --src-dir --import-alias '@/*' --use-npm --yes
