import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { getAuthor, getProfile, getQuote } from "../services/api";

interface Profile {
  fullname: string;
  email: string;
}

interface Author {
  authorId: number;
  name: string;
}

interface Quote {
  quoteId: number;
  authorId: number;
  quote: string;
}

const ProfilePage = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [quote, setQuote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  useEffect(() => {
    if (token) {
      getProfile(token)
        .then((res) => {
          if (res.success) setProfile(res.data as Profile);
        })
        .catch(() => console.error("Ошибка загрузки профиля"));
    }
  }, [token]);

  const handleUpdate = async () => {
    setLoading(true);
    const controller = new AbortController();
    setAbortController(controller);

    try {
      if (!token) throw new Error("Token is null");

      const authorRes = await getAuthor(token, controller.signal);
      if (!authorRes.success) throw new Error("Ошибка загрузки автора");
      const author = authorRes.data as Author;

      const quoteRes = await getQuote(
        token,
        author.authorId,
        controller.signal
      );
      if (!quoteRes.success) throw new Error("Ошибка загрузки цитаты");
      const quoteData = quoteRes.data as Quote;

      setQuote(`${author.name}: "${quoteData.quote}"`);
    } catch (error) {
      if (error instanceof Error && error.message === "Request aborted") {
        console.log("Запрос отменён");
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
      setAbortController(null);
    }
  };

  const cancelRequest = () => {
    abortController?.abort();
    setLoading(false);
  };

  return (
    <div>
      <h1>Profile</h1>
      {profile && (
        <p>
          {profile.fullname} ({profile.email})
        </p>
      )}
      <button onClick={handleUpdate} disabled={loading}>
        Update
      </button>
      {loading && <button onClick={cancelRequest}>Cancel</button>}
      {quote && <p>{quote}</p>}
    </div>
  );
};

export default ProfilePage;
