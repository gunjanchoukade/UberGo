const z = require('zod')

const validationSchema = z.object({
    fullname:z.object({
        firstname:z.string()
        .min(3,{msg:"firstname should be atleast 3 characters long"})
        .max(10,{msg:"firstname should be max 10 characters long"}),
    }),

    email:z.string()
    .email({msg:"invalid email address"})
    .nonempty({msg:"email should be filled"}),

    password:z.string()
    .min(3,{message:"password should be atleast 3 character long"})
    .max(20,{message:"password should be at max 20 character long"}),
})

module.exports= validationSchema;