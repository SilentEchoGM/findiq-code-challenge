import { db } from "$lib/db.server";
import { isUser } from "$lib/types";
import { fail, redirect } from "@sveltejs/kit";
import { v4 } from "uuid";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ cookies }) => {
  const id = cookies.get("user") ?? "";
  if (id.length > 0) {
    return redirect(302, "/user/" + id);
  }

  const getUsers = db.query(`SELECT * FROM users`);
  const users = getUsers.all();

  return {
    users,
  };
};

export const actions: Actions = {
  register: async ({ request }) => {
    const data = await request.formData();

    const name = data.get("username");

    if (name && typeof name === "string") {
      const id = v4();
      const createUser = db.query(
        `INSERT INTO users (name, id) VALUES (?1, ?2);`
      );
      createUser.run(name, id);

      return { success: true, user: { id, name } };
    } else {
      return { success: false, error: new Error("Name is required") };
    }
  },
  login: async ({ request, cookies }) => {
    const data = await request.formData();

    const id = data.get("userId");

    if (id && typeof id === "string") {
      const getUser = db.query(`SELECT * FROM users WHERE id = ?1;`);
      const user = getUser.get(id);
      console.log(user);
      if (isUser(user)) {
        cookies.set("user", id, { path: "/" });
        return { user };
      } else {
        return fail(401, { error: new Error(`User ${id} not found`) });
      }
    }
  },
};
