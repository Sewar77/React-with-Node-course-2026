
export const validate = (schema) => {
    return (req, res, next) => {
        const { err } = schema.validate(req.body, {
            abortEarly: false
        })
        if (err) {
            return res.status(400).json({ message: "validation error" })
        }
        next()
    }
}