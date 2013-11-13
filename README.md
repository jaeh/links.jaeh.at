links.jaeh.at
==

at the moment its a simple as can be linkshare,
as soon as the spam starts i will have to close it though, lets see how long that takes ;)

to replicate:
    
    git clone https://github.com/jaeh/linkshare.jaeh.at.git
    npm install 
    to test: npm run testenv
    to deploy: forever start -l forever.log -o out.log -e err.log app.js
    //server will be running on port 2323 now.
