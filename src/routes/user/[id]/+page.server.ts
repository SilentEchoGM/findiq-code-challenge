import { db } from "$lib/db.server";
import { isCard, isUser } from "$lib/types";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { array as A, function as f } from "fp-ts";
import type { PageServerLoad } from "./$types";

const getUser = db.query(`SELECT * FROM users WHERE id = ?1;`);

const getCards = db.query(`SELECT * FROM cards WHERE userId = ?1;`);

export const load: PageServerLoad = ({ params, cookies }) => {

  const user = getUser.get(params.id);
  console.log("load", user);

  if (!isUser(user)) {
    cookies.delete("user", { path: "/" });
    redirect(307, "/");
  }
  console.log(params.id)
  return {
    cards: f.pipe(
      getCards.all(params.id),
      (v) => { console.log("cards", v); return v },
      (result) => (Array.isArray(result) ? result : []),
      A.filter(isCard)
    ),
    user,
  };
};

const addCard = db.query(`INSERT INTO cards (
  question, answer, wrongAnswers, userId
) VALUES (?1, ?2, ?3, ?4)`)

const validString = (v: any): v is string => typeof v === "string" && v.length > 0
export const actions: Actions = {
  logout: async ({ cookies }) => {
    console.log("logging out")
    cookies.delete('user', { path: '/' })
    return redirect(301, "/")
  },
  saveCard: async ({ request, cookies }) => {
    const data = await request.formData()

    console.log("saveCard", data)
    const question = data.get("question")
    const answer = data.get("answer")
    const wrongAnswers = data.get("wrongAnswers")
    const userId = cookies.get("user")

    console.log("data", { question, answer, wrongAnswers, userId })
    if (!validString(question) || !validString(answer) || !validString(wrongAnswers) || !validString(userId)) {
      return fail(401, { error: new Error(`Invalid data supplied: ${JSON.stringify(data.entries())}`) })
    }

    addCard.run(question, answer, wrongAnswers, userId)
  }
};
