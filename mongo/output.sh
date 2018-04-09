mongoexport -h localhost -d flc -c Image --type=csv  --fields base64Img -q '{}' --out base64Images.csv
mongo localhost:27017/flc setup-script.js