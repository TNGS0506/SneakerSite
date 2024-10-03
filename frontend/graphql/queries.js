import { gql } from "@apollo/client";

export const CREATE_FEEDBACK = gql`
  mutation createFeedback(
    $sender: String!
    $phoneNumber: String!
    $text: String!
  ) {
    createFeedback(sender: $sender, phoneNumber: $phoneNumber, text: $text) {
      feedback {
        sender
        phoneNumber
        text
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateAppUser($username: String!, $password: String!) {
    createAppUser(username: $username, password: $password) {
      appUser {
        username
      }
    }
  }
`;

export const GET_TOKEN = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const GET_ALLSHOES = gql`
  query GetAllShoes {
    allShoes {
      id
      name
      image
      price
      category {
        id
      }
    }
  }
`;

export const GET_SHOEBYID = gql`
  query GetAllShoes($id: Int!) {
    shoeById(id: $id) {
      name
      price
      description
      image
      category {
        id
        name
      }
      sizes {
        size
      }
      images {
        id
        image
      }
    }
  }
`;

export const GET_TOP4 = gql`
  query {
    topShoes(category: 1) {
      id
      image
    }
  }
`;

export const GET_SHOESBYCAT = gql`
  query GetShoesByCategory($category: String!) {
    shoesByCategory(category: $category) {
      id
      name
      image
      price
    }
  }
`;

export const GET_CATEGORIES = gql`
  query {
    allCategories {
      id
      name
    }
  }
`;

export const GET_LOGGED_IN_USER = gql`
  query {
    viewer {
      id
      username
      email
      phoneNumber
    }
  }
`;
export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $username: String!
    $email: String!
    $phoneNumber: String!
  ) {
    updateUserProfile(
      username: $username
      email: $email
      phoneNumber: $phoneNumber
    ) {
      user {
        username
        email
        phoneNumber
      }
    }
  }
`;
