import { Ref, pre, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { User } from "./user.model";

@pre<Session>("save", function () {
  this._id = new mongoose.Types.ObjectId();
})
export class Session {
  @prop({ type: String })
  public _id!: mongoose.Types.ObjectId;

  @prop({ ref: () => User })
  public userId?: Ref<User>;

  @prop({ type: String })
  public refreshToken?: string;

  @prop({ required: true, type: Date })
  public expiresAt!: Date;
}
