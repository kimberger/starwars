import { render, fireEvent, waitFor } from "@testing-library/react";

import App from "../../App";

describe("Searching for people", () => {
  it("renders results on partial match", async () => {
    const { getByLabelText, getByText } = render(<App />);
    fireEvent.change(getByLabelText("Character"), { target: { value: "r2" } });
    await waitFor(() => getByText("R2-D2"));
  });

  it("allows users to paginate through results", async () => {
    const { getByLabelText, getByText, findByText } = render(<App />);
    fireEvent.change(getByLabelText("Character"), { target: { value: "r" } });
    await waitFor(() => getByText("Luke Skywalker"));

    fireEvent.click(await findByText("Next"));
    await waitFor(() => getByText("Greedo"));

    fireEvent.click(await findByText("Previous"));
    await waitFor(() => getByText("Luke Skywalker"));
  });
});
