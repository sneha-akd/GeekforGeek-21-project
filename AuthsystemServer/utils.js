const sanitizeUserData = (user) => {
  if (user) {
    const { password, ...userData } = user;

    return userData;
  }
};

export default {
  sanitizeUserData,
};