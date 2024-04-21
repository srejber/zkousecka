exports.index = (req, res) => {
    res.render('home/index', {
        title: 'Domovská stránka',
    });
}

exports.error = (err, req, res, next) => {
    console.log(err);
    res.status(500).render('home/error', {
        title: 'Došlo k chybě',
        error: 500
    });
}
