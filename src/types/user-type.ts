export type vertifyType = "VERIFIED" | "UNVERIFIED" | "BLOCKED";
export type roleType = "ADMIN" | "EDITOR" | "USER";
export type genderType = "male" | "female";

export interface userType {
  id: string;
  email: string;
  password: string;
  userAgent: string;
  verified: vertifyType;
  role: roleType;
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
  gender: genderType;
  birthDate: Date;
  phoneNumber: string;
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
  gender: genderType;
  message: string;
  createAt: string;
  updateAt: string;
}
