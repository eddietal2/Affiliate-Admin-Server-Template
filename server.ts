const mongoose                = require("mongoose");
const express                 = require("express");
const fs                      = require("fs");
const app                     = express();
const cors                    = require('cors');
const dotenv                  = require('dotenv');

// Routers
const authRoute = require('./routes/auth.route');
const productsRoute = require('./routes/products.route');
const usersRoute = require('./routes/users.route');
const reportsRoute = require('./routes/reports.route');
const landingPageRoute = require('./routes/landing-page.route');


// Configure Environment Variables
dotenv.config();

// Connect to Mongo via Mongoose
mongoose
  // For DeprecationWarning:  collection.ensureIndex is deprecated.  Use createIndexes instead.

  // .set('useCreateIndex', true)
  // .set('useFindAndModify', false)

  .connect(process.env.DB_HOST, {
    useNewUrlParser: true, useUnifiedTopology: true
  })

  .then(() => console.log('Connected to MongoDB'))

  .catch((err: Error) => console.log(err))

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/auth", authRoute);
app.use("/products", productsRoute);
app.use("/users", usersRoute);
app.use("/reports", reportsRoute);
app.use("/landing-page", landingPageRoute);

// Listen on PORT
const port = process.env.PORT || 4000;
app.listen(port, 
  () => {
    console.log(`Listening on port ${port}`)})
    console.log('Affiliate Admin Application Server')

export {}