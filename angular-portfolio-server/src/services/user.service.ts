import  UserModel from "../models/user.model";

class UserService {
  public async getAllUsers(): Promise<any[]> {
    const users = await UserModel.find();
    return users;
  }

  public async getUserById(id: string): Promise<any | null> {
    const user = await UserModel.findById(id);
    return user;
  }

  public async createUser(userData: any): Promise<any> {
    const newUser = await UserModel.create(userData);
    return newUser;
  }

  public async updateUser(id: string, userData: any): Promise<any | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, userData, { new: true });
    return updatedUser;
  }

  public async deleteUser(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }
}

export default UserService;