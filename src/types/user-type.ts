export type userType =
  | {
      id: string;
      email: string;
      password: string;
      userAgent: string;
      verified: "VERIFIED" | "UNVERIFIED" | "BLOCKED";
      role: "ADMIN" | "EDITOR" | "USER";
      createAt: Date;
      updatedAt: Date;
      userImg: string;
    }
  | undefined;

export type userProfileType = {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  followings: string[];
  followers: string[];
  gender: "male" | "female";
  birthDate: Date;
  facebook: string;
  linkedIn: string;
  instagram: string;
  xMedia: string;
  userId: string;
  createAt: Date;
  updatedAt: Date;
};

// user post
export type userMomentType = {
  id: string;
  title: string;
  desc: string;
  location: string;
  postImages: string[];
  userId: string;
  createAt: Date;
  updatedAt: Date;
};

// user with profile
export type userWithProfileType = userType & {
  profile?: userProfileType | undefined;
};
