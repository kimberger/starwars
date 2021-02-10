import { render, fireEvent, waitFor } from "@testing-library/react";

import App from "../../App";

describe("Searching for people", () => {
  it("renders results on partial match", async () => {
    const { getByLabelText, getByText } = render(<App />);
    fireEvent.change(getByLabelText("Character"), { target: { value: "r2" } });
    await waitFor(() => getByText("R2-D2"));
  });
});
