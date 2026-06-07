import crypto from "crypto";
import bcrypt from "bcryptjs";
import mongoose, { Document, Schema } from "mongoose";

export interface IAddress {
  fullName: string;
  address: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
}

export interface IUser extends Document {
  email: string;
  password: string;
  passwordConfirm: String | undefined;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  subaccount?: string;
  role: "buyer" | "seller" | "admin";
  isVerified: boolean;
  bvn?: string;
  idDocument?: string;
  businessName?: string;
  businessAddress?: string;
  qualityCertification?: string;
  rating: number;
  totalSales: number;
  points: number;
  addresses: IAddress[];
  passwordChangedAt: Date;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  comparePassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: Date): Boolean;
  createPasswordResetToken(): String;
}

const addressSchema = new mongoose.Schema<IAddress>(
  {
    fullName: {
      type: String,
      required: [true, "Fullname is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required"],
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
  },
);

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
    subaccount: { type: String },
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
    points: { type: Number, default: 0, min: 0 },
    addresses: {
      type: [addressSchema],
      default: [],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = new Date();

  next();
});

// Compare and check password
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
  userPassword: string,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Password changed
userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000,
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
