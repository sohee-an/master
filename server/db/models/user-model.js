import { model } from 'mongoose';
import { UserSchema } from '../schemas/user-schema';

const User = model('users', UserSchema);
console.log(User); 

 class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(userId) {
    const user = await User.findOne({ _id: userId });
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async delete(email) {
    // const filter={email};
    const deleteUser = await User.findOneAndDelete({ email: email });
    return deleteUser;

  }

  async adminDelete(userId) {
    const adminDelete = await User.findOneAndDelete({ _id: userId });
    return adminDelete;
  }

  async roleUpdate(userId, update) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const roleUpdate = await User.findOneAndUpdate(filter, update, option);
    return roleUpdate;
  }

  /////////////////////////////////////기능 추가/////////////////////////////////////

  async updatePaymentData(userId, paymentData) {
    const user = await User.findOneAndUpdate({ _id: userId }, { $set: paymentData });
    return user;
  }

  async updateResetPassword(userId, resetPassword) {
    const user = await User.findOneAndUpdate({ _id: userId }, { $set: { password: resetPassword } })
    return user;
  }

  /////////////////////////////////////기능 추가/////////////////////////////////////

}

const userModel = new UserModel();

export { userModel };
