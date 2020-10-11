export default function pad(n) {
  if (n < 10) {
    return String(`00${n}`).slice(-2);
  }

  return String(n);
}
