const router = require("express").Router();
const controller = require("./contact.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:contact_id")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.destroy)
  .all(methodNotAllowed);

router
  .route("/")
  .get(controller.list)
  .post(controller.post)
  .all(methodNotAllowed);

module.exports = router;
