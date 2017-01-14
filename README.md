# Language
    ECMAScript2015 (ES6)
    
# Description
    This Project is very simple. 
    Based on node >= 6.9.2

# Usage
#### 1. Install nodejs, mariadb or mysql
    brew update
    brew install mariadb
    mysql_install_db
    mysql.server start
#### 2. Install yarn
    npm install -g yarn
#### 3. Modify the config file
    ./config/config.json
#### 4. run server
    for development
      $ yarn dev
    for production
      $ yarn start
    
# Migration
    ./node_modules/.bin/sequelize db:migrate