import { ref } from "vue";

export const useEndpoints = () => {
  const users = ref([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      users.value = await response.json();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateUser = async (userId: number, userData: {}) => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      await fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (userId: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/user/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        await fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return {
    users,
    fetchUsers,
    updateUser,
    deleteUser,
  };
};
