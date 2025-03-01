import { fakeDB } from "./fakeDatabase";

export interface Profile {
  fullname: string;
  email: string;
}

export interface Author {
  authorId: number;
  name: string;
}

export interface Quote {
  quoteId: number;
  authorId: number;
  quote: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T | { message: string };
}

export const getInfo = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeDB.profile.fullname + " - " + fakeDB.profile.email);
    }, 500);
  });
};

export const loginRequest = async (
  email: string,
  password: string
): Promise<ApiResponse<{ token: string }>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = fakeDB.users.find(
        (u) => u.email === email && u.password === password
      );
      resolve(
        user
          ? { success: true, data: { token: user.token } }
          : { success: false, data: { message: "Invalid credentials" } }
      );
    }, 1000);
  });
};

export const getProfile = async (
  token: string
): Promise<ApiResponse<Profile>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        token === "mocked-token"
          ? { success: true, data: fakeDB.profile }
          : { success: false, data: { message: "Access denied" } }
      );
    }, 500);
  });
};

export const getAuthor = async (
  token: string,
  signal?: AbortSignal
): Promise<ApiResponse<Author>> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      if (token !== "mocked-token") {
        resolve({ success: false, data: { message: "Access denied" } });
      } else {
        resolve({ success: true, data: fakeDB.authors[0] });
      }
    }, 1000);

    signal?.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new Error("Request aborted"));
    });
  });
};

export const getQuote = async (
  token: string,
  authorId: number,
  signal?: AbortSignal
): Promise<ApiResponse<Quote>> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const quote = fakeDB.quotes.find((q) => q.authorId === authorId);
      if (quote) {
        resolve({ success: true, data: quote });
      } else {
        resolve({ success: false, data: { message: "No quotes found" } });
      }
    }, 1000);

    signal?.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new Error("Request aborted"));
    });
  });
};
