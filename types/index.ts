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
}

export type GetPostProps = {
  page: number;
  query?: string;
}

export type DeletePostParams = {
  id: string
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

export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type GetAccountParams = {
  userId: string;
  query?: string;
}