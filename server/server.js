const { Login } = require("./login");
const { Register } = require("./register");
const { UpdateProfile } = require("./updateprofile");
const { SearchAccounts } = require("./search");
const { FetchProfile } = require("./fetchprofile");
const { FetchPicture } = require("./fetchpicture");

const express = require("express");
const apiRouter = express();

apiRouter.use(require("cors")({ origin: '*' }));
apiRouter.use(express.json());

apiRouter.post("/api/login", (request, result) => {
  Login(request, result);
});

apiRouter.post("/api/register", (request, result) => {
  Register(request, result);
});

apiRouter.post("/api/update", (request, result) => {
  UpdateProfile(request, result);
});

apiRouter.get("/api/search", (request, result) => {
  SearchAccounts(request, result);
});

apiRouter.get("/api/profile", (request, result) => {
  FetchProfile(request, result);
});

apiRouter.get("/api/picture", (request, result) => {
  FetchPicture(request, result);
});

apiRouter.listen(process.env.REACT_APP_SERVER_PORT);