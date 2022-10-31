const { Login } = require("./login");
const { UpdateProfile } = require("./updateprofile");
const { SearchAccounts } = require("./search");
const { GetProfile } = require("./getprofile");
const { GetPicture } = require("./getpicture");

const express = require("express");
const apiRouter = express();

apiRouter.use(require("cors")({origin: '*'}));
apiRouter.use(express.json());

apiRouter.post("/api/login", (request, result) => {
  Login(request, result);
});

apiRouter.post("/api/update", (request, result) => {
  UpdateProfile(request, result);
});

apiRouter.get("/api/search", (request, result) => {
  SearchAccounts(request, result);
});

apiRouter.get("/api/profile", (request, result) => {
  GetProfile(request, result);
});

apiRouter.get("/api/picture", (request, result) => {
  GetPicture(request, result);
});

apiRouter.listen(process.env.REACT_APP_SERVER_PORT);