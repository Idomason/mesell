import crypto from "crypto";
import bcrypt from "bcryptjs";
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  passwordConfirm: String | undefined;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: "buyer" | "seller" | "admin";
  isVerified: boolean;
  bvn?: string;
  idDocument?: string;
  businessName?: string;
  businessAddress?: string;
  qualityCertification?: string;
  rating: number;
  totalSales: number;
  passwordChangedAt: Date;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  comparePassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: Date): Boolean;
  createPasswordResetToken(): String;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      // This only works on CREATE or SAVE
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Password do not match",
      },
    },
    firstName: {
      type: String,
      required: [true, "Please provide your first name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please provide your last name"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide your phone number"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    bvn: {
      type: String,
      select: false,
    },
    idDocument: {
      type: String,
      select: false,
    },
    businessName: {
      type: String,
      trim: true,
    },
    businessAddress: {
      type: String,
      trim: true,
    },
    qualityCertification: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now();

  next()
});

// Compare and check password
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Password changed
userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimestamp);

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

// Create password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model<IUser>("User", userSchema);
