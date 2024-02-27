export type CreateUserProps = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserProps = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};