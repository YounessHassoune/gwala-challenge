import { Ref, pre, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { Session } from "./session.model";

@pre<User>("save", function () {
  this._id = new mongoose.Types.ObjectId();
})
export class User {
  @prop({ type: String })
  public _id!: mongoose.Types.ObjectId;

  @prop({ required: true, type: String })
  public name!: string;

  @prop({ required: true, unique: true, type: String })
  public email!: string;

  @prop({ required: true, type: String })
  public password!: string;

  @prop({type: String})
  public avatar?: string;

  
  @prop({ ref: () => Session, default: [] })
  public sessions?: Ref<Session>[];
}
