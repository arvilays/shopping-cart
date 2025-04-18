import { describe, it, expect } from "vitest";

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });
  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

//// EXAMPLE 1
// import { describe, it, expect } from "vitest";
// import { render, screen } from "@testing-library/react";
// import App from "./App";

// describe("App component", () => {
//   it("renders correct heading", () => {
//     render(<App />);
//     expect(screen.getByRole("heading").textContent).toMatch(/our first test/i);
//   });
// });

//// EXAMPLE 2
// import { describe, it, expect } from "vitest";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import App from "./App";

// describe("App component", () => {
//   it("renders magnificent monkeys", () => {
//     // since screen does not have the container property, we'll destructure render to obtain a container for this test
//     const { container } = render(<App />);
//     expect(container).toMatchSnapshot();
//   });

//   it("renders radical rhinos after button click", async () => {
//     const user = userEvent.setup();

//     render(<App />);
//     const button = screen.getByRole("button", { name: "Click Me" });

//     await user.click(button);

//     expect(screen.getByRole("heading").textContent).toMatch(/radical rhinos/i);
//   });
// });

//// EXAMPLE 3
// import { vi, describe, it, expect } from 'vitest'
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import CustomButton from "./CustomButton";

// describe("CustomButton", () => {
//   it("should render a button with the text 'Click me'", () => {
//     render(<CustomButton onClick={() => { }} />);

//     const button = screen.getByRole("button", { name: "Click me" });

//     expect(button).toBeInTheDocument();
//   });

//   it("should call the onClick function when clicked", async () => {
//     const onClick = vi.fn();
//     const user = userEvent.setup()
//     render(<CustomButton onClick={onClick} />);

//     const button = screen.getByRole("button", { name: "Click me" });

//     await user.click(button);

//     expect(onClick).toHaveBeenCalled();
//   });

//   it("should not call the onClick function when it isn't clicked", async () => {
//     const onClick = vi.fn();
//     render(<CustomButton onClick={onClick} />);

//     expect(onClick).not.toHaveBeenCalled();
//   });
// });
