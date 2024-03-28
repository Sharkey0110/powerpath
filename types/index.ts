export type CreateUserProps = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserProps = {
  id: string
  account: {
    firstName: string;
    lastName: string;
    photo: string;
  }
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

export type GetPostProps = {
  page: number;
  limit: number;
}

export type DeletePostParams = {
  postId: string
  path: string
}

export type CreateCommentProps = {
  userId: string;
  postId: string;
  comment: {
    text: string
    createdAt: number;
  }
}