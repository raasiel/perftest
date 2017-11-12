localdata=/home/azad/sql-dump
approot=/home/azad/work/nuarca-perf-test/perftest
sudo docker login -u nuarcaclient -p nuarca234@
sudo docker run --name dataload -v $approot:/app -v $localdata:/data -w /app nuarca/ast-pv-nodeserver node app.js
# sudo docker rm -f dataload
sudo docker logout 