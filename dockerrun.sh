localdata=/home/shafqat/Downloads/sqldump
approot=/home/shafqat/projects/perftest
sudo docker login -u nuarcaclient -p nuarca234@
sudo docker run -v $localdata:/data -v $approot:/app -w /app --name dataload nuarca/ast-pv-nodeserver node app.js
sudo docker rm -f dataload
sudo docker logout 