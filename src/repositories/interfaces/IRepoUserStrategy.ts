import Profile, { AuthProfile } from "../../entities/Profile";

interface IRepoProductStrategy {
  authUser(email: string, password: string): Promise<AuthProfile | undefined>;
  getUserProfile(id: string): Promise<Profile | undefined>;
  createUser(
    name: string,
    email: string,
    password: string
  ): Promise<AuthProfile | undefined>;
  deleteUser(id: string): Promise<boolean | undefined>;
  updateUserProfile(
    id: string,
    name?: string,
    email?: string,
    password?: string,
    isAdmin?: boolean
  ): Promise<AuthProfile | undefined>;
  getUsers(): Promise<Profile[] | undefined>;
}

export default IRepoProductStrategy;
