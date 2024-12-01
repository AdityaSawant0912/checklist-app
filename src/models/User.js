import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this user.'],
    maxlength: [100, 'Name cannot be more than 100 characters.']
  },
  email: {
    type: String,
    unique: [true, 'User with Email {VALUE} already exists'],
    required: [true, 'Please provide an email for this user.'],
    maxlength: [150, 'Email cannot be more than 150 characters.'],
    validate: {
      validator: value =>{
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: prop => `${prop} is not a valid email!`
    }
  },
  image: {
    type: String,
    required: [true, 'Please provide an image for this user.']
  },
  emailVerified: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });
export default mongoose.models.User || mongoose.model('User', UserSchema);
