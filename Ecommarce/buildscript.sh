npm run build
sed -i '' 's|/assets|assets|g' dist/index.html
sed -i '' 's|/vite|vite|g' dist/index.html

