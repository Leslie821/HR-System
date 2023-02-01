set -e
npm run build
docker build . -t 'hr-system:latest'
