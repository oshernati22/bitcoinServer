const dotenv = require('dotenv');
const app = require('./app'); //use express

dotenv.config({ path: './config.env' }); //set config file

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
