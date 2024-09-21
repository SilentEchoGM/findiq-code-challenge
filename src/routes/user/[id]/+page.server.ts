import { db } from "$lib/db.server";
import { isCard, isUser } from "$lib/types";
import { fail, redirect } from "@sveltejs/kit";
import { array as A, function as f } from "fp-ts";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = ({ params, cookies }) => {
  const getUser = db.query(`SELECT * FROM users WHERE id = ?1;`);

  const user = getUser.get(params.id);
  console.log("load", user);

  if (!isUser(user)) {
    cookies.delete("user", { path: "/" });
    redirect(401, "/");
  }

  const getCards = db.query(`SELECT * FROM cards WHERE userId = ?1;`);

  return {
    cards: f.pipe(
      getCards.get(params.id),
      (result) => (Array.isArray(result) ? result : []),
      A.filter(isCard)
    ),
    user,
  };
};

export const actions = {
  login: async ({ params, cookies }) => {
    const { id } = params;

    const getUser = db.query(`SELECT * FROM users WHERE id = ?1;`);

    const user = getUser.get(id);

    console.log(user);

    if (isUser(user)) {
      cookies.set("user", id, { path: "/" });
      return { user };
    } else {
      return fail(401, {
        success: false,
        error: new Error(`User ${id} not found`),
      });
    }
  },
};
