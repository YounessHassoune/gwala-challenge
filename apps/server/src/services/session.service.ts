import { SessionModel } from "../models";
import { Session } from "../models/session.model";

/**
 * @description Create new session
 * @param {Session | object} data - Session data
 * @returns {Promise<Session>} - Session object
 */
const createSession = async (data: Session | object): Promise<Session> => {
  return await SessionModel.create(data);
};

export { createSession };
