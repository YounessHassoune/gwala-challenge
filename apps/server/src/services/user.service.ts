import mongoose, { FilterQuery, ProjectionType, UpdateQuery } from "mongoose";
import { User } from "../models/user.model";
import { UserModel } from "../models";

/**
 * @description Get one user by filter
 * @param {FilterQuery<User>} filter - Filter query
 * @param {ProjectionType<User>} selectedField - Selected field
 * @param {boolean} hidePassword - Hide password field
 * @returns {Promise<User | null>} - User object or null
 */
const getOneUser = async (
  filter: FilterQuery<User> = {},
  selectedField: ProjectionType<User> = {},
  hidePassword: boolean = true
): Promise<User | null> => {
  const hidePasswordAndVersion = { password: 0, __v: 0 };
  return await UserModel.findOne(filter, {
    ...(hidePassword ? hidePasswordAndVersion : {}),
    ...(typeof selectedField === "object" ? selectedField : {}),
  });
};

/**
 * @description Create new user
 * @param {User | object} data - User data
 * @returns {Promise<User>} - User object
 */
async function createUser(data: User | object): Promise<User> {
  return await UserModel.create(data);
}

/**
 * @description Update user by id
 * @param {string | mongoose.Types.ObjectId} id - User id
 * @param {UpdateQuery<User>} data - User data
 * @returns {Promise<User | null>} - User object or null
 */
async function updateOneUserById(
  id: string | mongoose.Types.ObjectId,
  data: UpdateQuery<User>
): Promise<User | null> {
  return await UserModel.findByIdAndUpdate(id, data, { new: true });
}

export { getOneUser, createUser,updateOneUserById };
