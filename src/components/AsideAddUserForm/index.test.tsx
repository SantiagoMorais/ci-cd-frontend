import { render } from "@testing-library/react";
import userEvent from "@testing-library/react";

test("It should work", async () => {
  render(
    <div>
      <button onClick={() => console.log("It worked!")}>Click</button>
    </div>,
  );

  expect(true).toBe(true);
});
