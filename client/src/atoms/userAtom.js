import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const defaultUserState = {
  id: null,
  username: null,
  email: null,
  name: null,
  cover_picture: null,
  profile_picture: null,
  location: null,
  website: null
};

const userState = atom({
  key: "user",
  default: defaultUserState,
  effects_UNSTABLE: [persistAtom]
});

export default userState;
