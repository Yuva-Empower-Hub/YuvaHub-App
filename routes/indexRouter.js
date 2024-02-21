
const express = require('express');
const router = express.Router();

/* GET users listing. */

router.get("/", function (req, res, next) {
    res.render("index", { title: "index"
    });
});

router.get("/login", function (req, res, next) {
    res.render("login", { title: "Login"
    });
});

router.get("/signup", function (req, res, next) {
    res.render("signup", { title: "Signup"
    });
});

router.get("/verify", function (req, res, next) {
    res.render("verify", { title: "Verify"
    });
});

module.exports = router;
