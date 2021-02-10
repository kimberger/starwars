import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders hello, world!", () => {
  render(<App />);
  screen.getByText("Hello, World!");
});
