const {z} = require("zod")

const signUpValidation = z.object({
    name:z.string().min(5),
    email:z.string().email(),
    password: z.string(),
});

const signInValidation = z.object({
    email:z.string().email(),
    password:z.string().min(5)
});


const updateValidation = z.object({
    name: z.string().optional(),
    password:z.string().optional()
}).strict();

module.exports = { signUpValidation,signInValidation,updateValidation };

