set -e
npm run build
docker build . -t 'hr-system:latest'
docker push leslie821/hr-system:latest
