export const convertToInitials = (fullName:string) => {
  if (fullName) {
    const words = fullName.split(" ");
    const initials = words.map((word) => word.charAt(0).toUpperCase());
  return initials.join("");
  } else return;
};