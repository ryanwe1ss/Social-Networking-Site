# Social Networking Site (In Progress)
This site gives you the ability to create your own page, having your information for other 
users on the network to see, allowing them to follow and message you directly. Frontend written in React.JS and backend NodeJS.

![](images/profile.png)<br/>
![](images/profile-edit.png)<br/>
![](images/connections.png)<br/>
![](images/chat.png)<br/>

# Requirements
- NPM & NodeJS
- PostgreSQL
- Nginx Web Server (recommended)
- Enable Read & Write for Server folder: sudo chmod a+rwx -R /var/www/html/

# Working Versions
- Node v18.12.1
- NPM v8.19.2

# Usage
- npm install
- npm run build
- node server.js (run server)
- Rename 'example.env' --> '.env' and change variables based on yours

# React Routing - Config Changes for Nginx
- Modify /etc/nginx/sites-available/default
- location / { try_files $uri /index.html; }