import bcrypt from 'bcrypt';

module.exports = async (inputPassword: string) => {
  return await bcrypt.hash(inputPassword, 12);
};
