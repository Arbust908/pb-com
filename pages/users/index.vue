<script setup lang="ts">
interface User {
 id: number;
 name: string;
 role: string;
 email: string;
}

const users = ref<User[]>([
 { id: 1, name: "John Doe", role: "Admin", email: "john@example.com" },
 { id: 2, name: "Jane Smith", role: "User", email: "jane@example.com" },
 { id: 3, name: "Bob Johnson", role: "User", email: "bob@example.com" },
]);

function editUser(user: User) {
 // TODO: Implement edit user logic
}

function promoteUser(user: User) {
 // TODO: Implement promote user logic
}

function demoteUser(user: User) {
 // TODO: Implement demote user logic
}

function deleteUser(user: User) {
 // TODO: Implement delete user logic
}

function banUser(user: User) {
 // TODO: Implement ban user logic
}
</script>

<template>
  <div class="mx-auto container">
    <h1 class="mb-4 text-2xl font-bold">
      User Management
    </h1>
    <table class="min-w-full">
      <thead>
        <tr>
          <th class="py-2">
            User
          </th>
          <th class="py-2">
            Role
          </th>
          <th class="py-2">
            Email
          </th>
          <th class="py-2">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="py-2">
            {{ user.name }}
          </td>
          <td class="py-2">
            {{ user.role }}
          </td>
          <td class="py-2">
            {{ user.email }}
          </td>
          <td class="py-2">
            <button class="mr-2" @click="editUser(user)">
              Edit
            </button>
            <button class="mr-2" @click="promoteUser(user)">
              Promote
            </button>
            <button class="mr-2" @click="demoteUser(user)">
              Demote
            </button>
            <button class="mr-2" @click="deleteUser(user)">
              Delete
            </button>
            <button @click="banUser(user)">
              Ban
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Add your Tailwind CSS styles here */
</style>
