exports.index = function(req, res) {
	res.render('user', {
        user: req.user
    });
};