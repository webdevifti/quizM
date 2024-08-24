# Welcome to QuizM Project
# About Project
>> A Quiz management system where performer attend quizes and get score.This system has two type of user 1. Admin and 2. Performer

>> ### Admin Capabilities:
>> - #### Manage Quizzes: Admins can create, edit, analyz and delete quizzes. Each quiz can have multiple questions, and each question can have multiple options.
>> - #### Dashboard: Admins has a dashboard where they can view quiz leaderboars, total quizes and performer data for now.
>> - #### Admin can delete performer
>> #### Admin can see leaderboards

>> ### Performer Capabilities:
>> - #### Attend Quizzes: Performers can participate in available quizzes. They select answers for each question, and their responses are stored and see their score after submit the quiz immediately.
>> - #### Leaderboard: After completing quizzes, performers' scores are calculated and displayed on a leaderboard, allowing them to see their rankings compared to other participants.
## ER-Diagram
![ER-Diagram](https://ibb.co/myq6SQ0 "ER-Diagram")
## Flow Chart
![Flow Chart](https://ibb.co/4WvYCbF "Flow Chart")


## Installation commands , open project directory cmd or powershell
``composer update``

 ``copy .env.example .env ``
 
``php artisan key:generate``
#### go to .env file and put your database information
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

## database migrate and generate new data: 
``php artisan migrate:refresh --seed``

## Then start the server
``php artisan serve``

``npm install && npm run dev``
>> you can see the server running url and go to the url to see the application interface
>> ### Now you can login as Admin and Performer
>> #### check the database who is admin and performer, you can login with username and password, default password is ``1234567890`` 