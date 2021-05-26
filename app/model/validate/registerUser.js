const Joi = require('joi')

const registerUser = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().alphanum().min(3).max(30).required(),
})

// schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

// schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -

// try {
//     const value = await user.validateAsync({ username: 'abc', birth_year: 1994 });
// }
// catch (err) {

//  }

module.exports = registerUser
