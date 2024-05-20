import supabase from "./supabaseClient";

interface Shortform {
  id: number;
  title: string;
  imgUrl: string;
  contents: string;
  createdAt: string;
  updatedAt?: string;
}

interface FetchResponse {
  data?: Shortform[];
  error?: any;
}

//숏폼 만들기
async function createShortform(
  userId: number,
  title: string,
  imgUrl: string,
  contents: string
) {
  const { data, error } = await supabase
    .from("shortforms")
    .insert([{ title, imgUrl, contents, userId }]);

  if (error) {
    console.error("Error posting shortform:", error);
    return;
  }

  console.log("Shortform created:", data);
}

//숏폼 지우기
async function deleteShortform(shortformId: number) {
  const { data, error } = await supabase
    .from("shortforms")
    .delete()
    .match({ id: shortformId });

  if (error) {
    console.error("Error deleting shortform:", error);
    return;
  }

  console.log("Shortform deleted:", data);
}

//숏폼 업데이트
async function updateShortform(
  shortformId: string,
  title: string,
  imgUrl: string,
  contents: string
) {
  const { data, error } = await supabase
    .from("shortforms")
    .update({ title, imgUrl, contents })
    .match({ id: shortformId });

  if (error) {
    console.error("Error updating shortform:", error);
    return;
  }

  console.log("Shortform updated:", data);
}

//숏폼 가져오기 - 최신순
export async function fetchLatestShortforms(): Promise<FetchResponse> {
  const { data, error } = await supabase
    .from("shortforms")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching latest shortforms:", error);
    return { error };
  }

  console.log("Latest shortforms:", data);
  return { data }; // 항상 객체 형태로 반환
}

//숏폼 가져오기 - 인기순
async function fetchPopularShortforms() {
  const { data, error } = await supabase
    .from("shortforms")
    .select("*")
    .order("likesCount", { ascending: false });

  if (error) {
    console.error("Error fetching popular shortforms:", error);
    return;
  }

  console.log("Popular shortforms:", data);
}

//코멘트 달기
async function createComment(
  userId: number,
  shortformId: number,
  contents: string
) {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ shortformId, contents, userId }]);

  if (error) {
    console.error("Error posting shortform:", error);
    return;
  }

  console.log("Comment created:", data);
}
