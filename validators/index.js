const createPostValidator = (req, res, next) => {
    req.check('title', "Write a title").notEmpty()
    req.check('title', "Title must be between 4 to 150 characters").isLength({
        min: 4,
        max: 150,
    })
    // Body
    req.check('body', "Write a body").notEmpty()
    req.check('body', "Body must be between 4 to 150 characters").isLength({
        min: 4,
        max: 3000,
    })
    // Check for errors
    const errors = req.validationErrors()
    // if error show the first one as they happen
    if(errors){
        const firstError = errors.map(err => err.msg)[0]
        return res.status(400).json({
            result: 'fail',
            error: firstError,
        })
    }
    // Proceed to next middleware
    next()
}

module.exports = {
    createPostValidator,
}