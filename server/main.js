const { Login } = require("./login");
const { GetProfile } = require("./getprofile");
const { UpdateProfile } = require("./updateprofile");

const port = 80;
const express = require("express");
const apiRouter = express();

apiRouter.use(require("cors")({origin: '*'}));
apiRouter.use(express.json());

apiRouter.post("/api/login", (request, result) => {
  Login(request, result);
});

apiRouter.post("/api/updateprofile", (request, result) => {
  UpdateProfile(request, result);
});

apiRouter.get("/api/getprofile", (request, result) => {
  GetProfile(request, result);
});

apiRouter.listen(port);