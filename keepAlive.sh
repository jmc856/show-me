# Bash script to ping app every 300 seconds.
# Created because Heroku free servers go to sleep after 1 hour
HOST="https://show-me0.herokuapp.com"

while true
do
  curl $HOST
  sleep 300s
done
