cd ../Book-movie-tickets-client

npm install
npm run build

rm -r ../Book-movie-tickets-server/dist
mv dist/ ../Book-movie-tickets-server/

cd ../Book-movie-tickets-server/
npm install