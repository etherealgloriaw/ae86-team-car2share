const router = require("express").Router();
// const passport = require("passport");
var mySchemas = require('../models/Schemas')

router.get("/:email", async (req, res, next) => {
	console.log(req.params.email);
	try {
		await mySchemas.userItem.find({ email: req.params.email }).then(card => res.send(card))
			.catch(err => console.error(err));
	  } catch (error) {
		console.log(error);
	  }
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

// router.get("/google", passport.authenticate("google", ["profile", "email"]));

// router.get(
// 	"/google/callback",
// 	passport.authenticate("google", {
// 		successRedirect: process.env.CLIENT_URL,
// 		failureRedirect: "/login/failed",
// 	})
// );

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

// signup a new user
router.post('/signUp', async (req, res, next) => {
	const user = {username: req.params.username, password: req.params.password}
	try {
	  await mySchemas.userItem(user).save().then(card => res.send(card))
		.catch(err => console.error(err));
	} catch (error) {
	  console.log(error);
	}
  });

module.exports = router;