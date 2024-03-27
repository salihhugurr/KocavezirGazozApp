export const avatarNameGenerator = (title: string) => {
  const splittedName = title.split(' ');

  return splittedName.length > 1
    ? splittedName[0].charAt(0) + splittedName[1].charAt(0)
    : splittedName[0].charAt(0);
};
