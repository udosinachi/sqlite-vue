export const useRoleCheck = (user: any) => {
  const isAdmin = () => user === "Admin";
  const isModerator = () => ["Admin", "Moderator"].includes(user);
  const isAllUsers = () => ["Admin", "Moderator", "User"].includes(user);
  const isUser = () => user === "User";

  return { isAdmin, isModerator, isUser, isAllUsers };
};
