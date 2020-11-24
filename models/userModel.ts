import mongoose from 'mongoose';
import validator from 'validator';
// const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'USERNAME REQUIRED'],
    trim: true,
    unqiue: true,
    maxlength: [20, 'USERNAME TOO LONG '],
    minlength: [3, 'USERNAME TOO SHORT '],
    validator: [
      validator.isAlphanumeric,
      'USERNAME MUST BE ALPHANUMERIC'
    ]
  },
  firstName: {
    type: String,
    required: [true, 'NAME REQUIRED'],
    trim: true,
    maxlength: [16, 'NAME TOO LONG'],
    minlength: [3, 'NAME TOO SHORT'],
    validate: [validator.isAlpha, 'NAME MUST CONTAIN ONLY CHARACTERS']
  },
  email: {
    type: String,
    required: [true, 'EMAIL REQUIRED'],
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'INVALID EMAIL']
  },
  role: {
    type: String,
    enum: ['admin', 'moderator', 'user'],
    default: 'user'
  },
  password: {
    type: String,
    maxlength: [64, 'PASSWORD TOO LONG'],
    minlength: [8, 'PASSWORD TOO SHORT'],
    required: [true, 'PASSWORD REQUIRED'],
    select: false
  },
  passwordConfirm: {
    type: String,
    maxlength: [64, 'CONFIRMATION PASSWORD TOO SHORT'],
    minlength: [8, 'CONFIRMATION PASSWORD TOO LONG'],
    required: [true, 'CONFIRMATION PASSWORD REQUIRED'],
    validate: {
      validator(val): boolean {
        // Only works on .save, accept if value returns true:
        return val === this.password;
      },
      message: 'PASSWORDS DO NOT MATCH' // use mongoose value
    }
  },
  token: {
    type: String,
    select: false
  },
  tokenExpiry: {
    type: Date,
    select: false
  }
});

// // encrypt password:
// UserSchema.pre('create', async function(next): Promise<any> {
//   if (!this.isModified('password')) { return next(); }
//   this.password = await bcrypt.hash(this.password, 12); // second parameter defines salt rounds
//   this.passwordConfirm = undefined; // remove passwordConfirm after validation as storing unecessary
//   next();
// });

// // make user email lower case:
// UserSchema.pre('create', async function(next: any): Promise <any> {
//   this.email = this.email.toLowerCase();
//   next();
// });

// // format username:
// UserSchema.pre('create', async function(next: any): Promise<any> {
//   this.firstName = this.firstName.toLowerCase();
//   // make first character upper case:
//   this.firstName = this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1);
//   next();
// });

// // check if password is correct:
// UserSchema.methods.correctPassword = async (
//   candidatePassword: any,
//   userPassword: any
// ) => {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
