import { gql } from '@apollo/client';

export const FIND_USER = gql`
  query($username: String!) {
    findUser(username: $username) {
      _id
      username
      firstName
      lastName
      userImage
      postCount
      followerCount
      followingCount
      bio
      posts {
        _id
        postImage
      }
    }
  }
`;

export const FIND_ME = gql`
  query {
    findMe {
      _id
      userImage
    }
  }
`;

export const FIND_POST = gql`
query($postId: ID!) {
  findSinglePost(postId: $postId) {
    _id
    postImage
    description
    userId {
      username
      userImage
    }
    outfit {
      top {
        image
      }
      bottom {
        image
      }
      footwear {
        image
      }
    }
    comments {
      _id
      userId {
        username
        userImage
      }
      commentBody
    }
  }
}
`