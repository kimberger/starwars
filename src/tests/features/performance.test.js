import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import { renderWithRouter } from "../helpers";
import App from "../../App";

describe("Performance", () => {
  it("debounces requests to the starwars api", async () => {
    const axiosSpy = jest.spyOn(axios, "get");
    const { getByLabelText, getByText } = renderWithRouter(<App />);
    fireEvent.change(getByLabelText("Character"), { target: { value: "x" } });
    fireEvent.change(getByLabelText("Character"), { target: { value: "r2" } });
    await waitFor(() => getByText("R2-D2"));
    expect(axiosSpy).toHaveBeenCalledTimes(1);
  });
});
