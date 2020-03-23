export const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el != null) {
    el.scrollIntoView({ block: "start", behavior: "smooth" });
  }
};
