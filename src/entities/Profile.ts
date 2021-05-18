export default interface Profile {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthProfile extends Profile {
  token: string;
}
