export const useRoleCheck = (user: string) => {
  const isAdmin = () => user.toLowerCase() === "admin";
  const isModerator = () => ["admin", "moderator"].includes(user.toLowerCase());
  const isAllUsers = () =>
    ["admin", "moderator", "user"].includes(user.toLowerCase());
  const isUser = () => user.toLowerCase() === "User";

  return { isAdmin, isModerator, isUser, isAllUsers };
};
