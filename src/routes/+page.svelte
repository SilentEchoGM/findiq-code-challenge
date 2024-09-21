<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
</script>

<div class="container m-auto bg-[#313d5a] h-screen text-[#cbc5ea]">
  <h1 class="text-center text-4xl font-bold pb-24 pt-8">Flashcard Quiz</h1>

  {#if $page.data.users.length > 0}
    <h2 class="text-center text-2xl font-bold pb-8">Login</h2>
    <form
      method="POST"
      use:enhance
      class="grid gap-4 place-content-center text-lg pb-20"
      style:grid-template-columns="8rem min(20rem, calc(100% - 6rem))"
      action="?/login">
      <div>User:</div>
      <select name="userId" id="userId" class="bg-[#73628a] rounded">
        {#each $page.data.users as user}
          <option value="{user.id}" class="text-ellipsis">{user.name}</option>
        {/each}
      </select>

      <button
        class="bg-[#73628a] col-span-2 rounded px-8 py-2 text-xl font-bold"
        type="submit">Login</button>
    </form>
  {/if}

  <h2 class="text-center text-2xl font-bold pb-8">Register</h2>
  <form
    method="POST"
    use:enhance
    class="grid gap-4 place-content-center text-lg"
    style:grid-template-columns="8rem min(20rem, calc(100% - 6rem))"
    action="?/register">
    <div>Username:</div>
    <input
      type="text"
      name="username"
      id="username"
      class="bg-[#73628a] rounded" />
    <button
      class="bg-[#73628a] col-span-2 rounded px-8 py-2 text-xl font-bold"
      type="submit">Register</button>
  </form>
</div>
