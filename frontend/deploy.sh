echo "Switching to branch master"
git checkout master


echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r dist/* tim@msstore.mn:/var/www/msstore.mn/

echo "Done!"