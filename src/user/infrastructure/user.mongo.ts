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
			},
		},
	}
)


userSchema.statics.build = (user: User) => {
	return new UserModel({
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	});
}

export const UserModel = mongoose.model<UserDoc, UserModel>("User", userSchema);