export interface userType {
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

// user profile type
export interface userProfileType {
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
}

// user post
export interface userMomentType {
  id: string;
  title: string;
  desc: string;
  location: string;
  postImages: string[];
  userId: string;
  createAt: Date;
  updatedAt: Date;
}

// user with profile
export interface userWithProfileType extends userType {
  profile?: userProfileType;
}

// user comment type
export interface userCommentType {
  id: string;
  comment: string;
  momentId: string | null;
  user: userWithProfileType;
  userId: string;
  createAt: Date;
  updatedAt: Date;
}

// user reviews
export interface userReviewsType {
  id: string;
  text: string;
  rating: string;
  reviewImages: string[];
  userId: string;
  toursId: string;
  createAt: Date;
  updatedAt: Date;
}

// user message type
export interface userMessageType {
  id: string;
  fullName: string;
  userImg: string;
  gender: "male" | "female";
  message: string;
  createAt: string;
  updateAt: string;
}
