# Wildfire App

Welcome!

- To begin, you would need to clone this repository by running
  `git clone https://github.com/reskillamericans/Wildfire-Group1.git`
  on your local computer.

- Each feature you work on will be done in a separate branch. Each new branc should be named by the feature being worked on. You can use namings like "feature/newsLetter".
  To create a new branch, run `git checkout -b branch_name` (where branch_name is the name of the new branch being created.)
- Once you're done, pull from the remote _development_ branch, by running `git pull origin development`.
- Fix all merge conflicts that may arise
- Push your code to upstream by running
  `git push origin -u branch_name`.
- Now you can proceed to github to create a _pull request_ to the _development_ branch.
- Your pull request will be merged once it is verified not to have conflicts.
  _Please do not push directly to the main branch_

  ## Running the server

- Don't forget to 'npm install' after clonning the project!
- Make sure to have a .env file with the follwing information

  - DATABASE_URL=mongodb://localhost:27017/wildfireApp
  - NODE_ENV=development

- Command lines to start the server
  - To start server in development mode: 'npm run dev'
  - To start server in production mode: 'npm run prod'

All the best!
