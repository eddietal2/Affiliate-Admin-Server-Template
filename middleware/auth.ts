// This is our custom middleware that will be used to check if 
// there is an existing and valid JWT present in the request headers. 
// This is how we will be identifying the user.


const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req: { headers: { [x: string]: any; }; user: any; }, 
  res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }, 
  next: () => void) {
  //get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, config.get("myprivatekey"));
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};