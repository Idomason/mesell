import crypto from "crypto";
import bcrypt from "bcryptjs";
import mongoose, { HydratedDocument, Schema } from "mongoose";
import { CreateUserInput, UserAddressInput } from "mesell-shared";

interface IUserMethod {
  comparePassword(candidatePassword: string): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: number): boolean;
  createPasswordResetToken(): string;
}

type IUser = CreateUserInput & IUserMethod;
type IUserDocument = HydratedDocument<IUser>;

const addressSchema = new Schema<UserAddressInput>(
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
        validator: function (this: IUserDocument, el: string) {
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
    sellerAcctInfo: {
      subaccount: { type: String },
      settlementBank: {
        type: String,
        required: [true, "Seller must have a settlement bank"],
      },
      percentageCharge: { type: Number, default: 0 },
      paymentDetails: {
        type: {
          type: String,
          required: [
            true,
            "Your bank Type. It could be one of: nuban, ghipss, mobile_money or basa",
          ],
        },
        name: {
          type: String,
          required: [
            true,
            "The seller's name according to their account registration",
          ],
        },
        accountNumber: {
          type: String,
          required: [true, "Seller's account number"],
        },
        bankCode: { type: String, required: [true, "Seller's bank code"] },
        currency: { type: String, required: [true, "Seller's currency"] },
      },
      primaryContactEmail: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, "Please provide your active email"],
      },
      primaryContactName: {
        type: String,
        required: [true, "Please provide a legal name we can contact you with"],
      },
      primaryContactPhone: {
        type: String,
        required: [true, "Kindly provide your primary contact number"],
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
      metadata: {
        custom_fields: [
          {
            display_name: { type: String },
            variable_name: { type: String },
            value: { type: String },
          },
        ],
      },
    },
    // Indicates a pending seller onboarding / subaccount creation awaiting admin approval
    sellerPending: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
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

/* ==========================================
                HOOKS & METHODS 
   ========================================== 
*/

// Hash password before saving
userSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  (this as any).passwordConfirm = undefined;

  next();
});

// Check if password is not modified and the document is a new one
userSchema.pre<IUserDocument>("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = new Date();

  next();
});

// Compare and check password
userSchema.methods.comparePassword = async function (
  this: IUserDocument,
  candidatePassword: string,
) {
  return await bcrypt.compare(candidatePassword, this.password || "");
};

// Password changed
userSchema.methods.changedPasswordAfter = function (
  this: IUserDocument,
  JWTTimestamp: number,
): boolean {
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
userSchema.methods.createPasswordResetToken = function (
  this: IUserDocument,
): string {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

  return resetToken;
};

export const User = mongoose.model<IUser>("User", userSchema);
