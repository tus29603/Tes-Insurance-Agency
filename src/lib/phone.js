export function digitsOnly(str = "") {
  return (str || "").replace(/\D/g, "");
}
