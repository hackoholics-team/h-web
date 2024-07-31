import { HackoholicDataProvider } from "./types";
import { User } from "@/gen/client"
import profilePic from "@/assets/profile-pic.jpg";

const MOCK_USER: User = {
  id: "dfghjkl",
  email: "johndoe@gmail.com",
  firstName: "John",
  lastName: "Doe",
  username: "John Doe",
  firebaseId: "8520258520",
  photoId: profilePic,
  birthDate: new Date().toISOString()
};

export const userProvider: HackoholicDataProvider<User> = {
  getList: () => {
    throw new Error("Not Impelemented");
  },
  getOne: () => {
    return Promise.resolve(MOCK_USER);
  },
  saveOrUpdate: () => {
    throw new Error("Not Impelemented");
  },
  delete: () => {
    throw new Error("Not Impelemented");
  }
}

