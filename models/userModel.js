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
      default: "/default.webp",
    },
    description: {
      type: String,
      default: "This user has not provided a description!",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      minlength: 8,
      select: false,
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
