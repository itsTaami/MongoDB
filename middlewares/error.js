const error = (err, req, res, next) => {
  console.log("ERROR HANDLER" + err.red);
  //   console.log("ERROR HANDLER" + err.statuscode);
  //   console.log("ERROR HANDLER" + err.name);
  if (err.name === "CastError") {
    err.statuscode = 400;
    err.message = "Buruu butetstei id baina";
  }
  res.status(err.statuscode || 500).json({ message: err.message });
  console.log(res);
};

module.exports = error;
