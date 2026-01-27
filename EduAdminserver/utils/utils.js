const sanitizeUserData = (user) => {
  if (user) {
    const { password, secret, ...userData } = user;

    return userData;
  }
};

export {
  sanitizeUserData,
};