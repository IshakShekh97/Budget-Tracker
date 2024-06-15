export const Curencies = [
  { value: "INR", label: "₹ Indian Rupee", locale: "hi-IN" },
  { value: "USD", label: "$ US Dollar", locale: "en-US" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" },
  { value: "JPY", label: "₹ Yen", locale: "ja-PJ" },
];

export type Currency = (typeof Curencies)[0];
