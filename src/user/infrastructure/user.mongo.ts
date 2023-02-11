import mongoose from "mongoose";
import { User } from "../domain/user.entity";

type UserDoc = mongoose.Document & User

interface UserModel extends mongoose.Model<UserDoc> {
	build(user: User): UserDoc;
}

const userSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
			index: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			index: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			index: true,
		},
		isActive: {
			type: Boolean,
			required: true,
			default: true,
		},
		createdAt: {
			type: Number,
			required: true,
		},
		updatedAt: {
			type: Number,
			required: true,
		}
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret._id;
				delete ret.__v;
				delete ret.isActive;
				delete ret.password;
			},
		},
	}
)


userSchema.statics.build = (user: User) => {
	return new UserModel(user);
}

export const UserModel = mongoose.model<UserDoc, UserModel>("User", userSchema);