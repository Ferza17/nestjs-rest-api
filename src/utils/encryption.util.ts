import * as bcrypt from 'bcrypt';

export const Encrypt = async (str: string): Promise<string> => {
  return await bcrypt.hash(str, await bcrypt.genSalt());
};
