#After clone the repo
##Installation commands , open project directory cmd or powershell
 - composer update
 - copy .env.example .env
 - php artisan key:generate
##go to .env file and put your database information
 - DB_CONNECTION=mysql
 - DB_HOST=127.0.0.1
 - DB_PORT=3306
 - DB_DATABASE=your_database_name
 - DB_USERNAME=your_database_username
 - DB_PASSWORD=your_database_password

##database migrate and generate new data: 
 - php artisan migrate:refresh --seed

##Then start the server
 - php artisan serve
##optionally 
 - npm install && npm run dev

##then go to browser and brows the site
 - http://127.0.0.1:8000/
###may be your port will different from 8000

##Now you can login as Admin and Performer
##check the database who is admin and performer, you can login with username and password, default password is 1234567890 
