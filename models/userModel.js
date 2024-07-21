import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    photo: {
      type: String,
    },
    photoPublicId: {
      type: String,
    },
    description: {
      type: String,
    },
    role: {
      type: String,
    },
    password: {
      type: String,
      minlength: 8,
      select: false,
      required: [true, "Please provide a password"],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  // Hash the password with cost of 8
  if (this.password) this.password = await bcrypt.hash(this.password, 8);

  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
