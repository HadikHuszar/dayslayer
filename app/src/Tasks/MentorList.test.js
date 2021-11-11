import { MentorList } from "./index";
import { render, screen } from "@testing-library/react";

describe("MentorList", () => {
  it("should render formatted start and end strings", () => {
    const data = {
      id: "1",
      title: "There Are No Mentors for Today",
      date: `November 11, 2021`,
      start: `12:30pm`,
      end: `1:30pm`,
      icon: "👥",
      copyableText: `👥  There Are No Mentors for Today`,
    };
    render(<MentorList mentors={[data]} />);

    screen.getByText("There Are No Mentors for Today");
    screen.getByText(/12:30pm - 1:30pm/i);
  });

  it("should not crash if given bad data", () => {
    render(<MentorList mentors={undefined} />);
  });
});
