# RPL IF-44-11 Kelompok 9
Reza Syah Pahlevi Natanagara - 1301204396\
Naufal Adrian Hidayat - 1301204056\
Muhamad Syaepul Huda - 1301200227\
Fadli Zuhri   - 1301202613

### Guide
Base new branch from dev branch from 14 November and on.
\
New style include new structure, structures you need to know : 
- src --> source codes folder, all js html and css are inside within each respective folder
- node_modules --> node.js modules folder, if not present in branch, means you need to install in your own local
- config --> config folder, for config js files such as index.js or server.js
- files --> use lowercase for all file names, use `-` or `_` if needed

To access the site by code, run npm in terminal with `npm run start` \
**NOTE THAT SITE WON'T RUN WITHOUT .ENV FILE WHICH IS POINTER TO DATABASE**
\
\
Listed dependencies :
` 1.dotenv 2.express 3.knex 4.mysql 5.mysql2 6.sqlite3 `

use `npm install dependencies` and replace dependencies with ones listed above
\
Note that node.modules and .env are files that are ignored by .gitignore
