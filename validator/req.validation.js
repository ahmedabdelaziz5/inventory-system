// function to validate wether the schema of each request is valid or not   

exports.validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            var validation = []
            var validationResult = schema.body.validate(req.body);
            if (validationResult.error) {
                validation.push(validationResult.error.details[0].message);
            }
            if (validation.length) {
                res.json({
                    message: validation.join(),
                })
                return {
                    message: "data has an error , please check your data again ",
                    errors: validation
                };
            }
            next();
        }
        catch (err) {
            res.status(500).json({
                message: "something went wrong !"
            })
        }
    }
}