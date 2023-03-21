const logger = (req, res, next) => {
  console.log("Middleware Baina");
  req.miniiNer = "Azure";
  next();
};
module.exports = logger;
