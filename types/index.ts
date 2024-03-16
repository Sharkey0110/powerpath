export type CreateUserProps = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
  onboarded: boolean;
};

export type UpdateUserProps = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

export type SearchParamsProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type CreateTagProps = {
  tagName: string;
};

export type CreatePostProps = {
  userId: string;
  post: {
    text: string
    picture: string;
    tag?: string;
    createdAt: number
  }
}

export type GroupPostProps = {
  searchBy: string;
  type: string;
}