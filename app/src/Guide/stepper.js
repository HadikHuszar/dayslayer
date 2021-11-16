import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
import SendIcon from "@mui/icons-material/Send";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { GuideType } from ".";

const label = { inputProps: { "aria-label": "Checkbox" } };

const steps = [
  {
    label: "Morning Stand-Up Guide",
    description: `Pull items for today's Morning Stand-Up Guide`,
    button: `Display Morning Stand-Up Guide`,
    action: (e, { setMorningGuide, setCurrentGuide }) => {
      const morningguide = [
        {
          id: "1",
          title:
            "Start the stand-up right on time at 8:00am! (This time should not change regardless of when other people will be arriving.)",
          icon: "1️⃣",
        },
        {
          id: "2",
          title:
            "Invite people to share something they’re leaving at the door.",
          icon: "2️⃣",
        },
        {
          id: "3",
          title: "Start the Meditation Guide you selected earlier.",
          icon: "3️⃣",
        },
        {
          id: "4",
          title:
            "After meditation, ask if anyone has anything special to share about what they worked on or how they did the evening before.",
          icon: "4️⃣",
        },
        {
          id: "5",
          title: "Enumerate all items in the day’s schedule.",
          icon: "5️⃣",
        },
        {
          id: "6",
          title: "Announce any mentors that are available for the day.",
          icon: "6️⃣",
        },
        {
          id: "7",
          title: "Ask if there are any questions.",
          icon: "7️⃣",
        },
        {
          id: "8",
          title: "Share any announcements.",
          icon: "8️⃣",
        },
      ];
      setMorningGuide(morningguide);
      setCurrentGuide(GuideType.MORNING);
    },
  },
  {
    label: "Code Challenge Guide",
    description: "Pull Items for the Guide for Code Challenges",
    button: `Display Code Challenge Guide`,
    action: (e, { setCodeGuide, setCurrentGuide }) => {
      const codeguide = [
        {
          id: "1",
          title: "Call on people to share their solutions.",
          icon: "1️⃣",
        },
        {
          id: "2",
          title:
            "Make sure that everyone has shared about the same amount of times during the week.",
          icon: "2️⃣",
        },
      ];
      setCodeGuide(codeguide);
      setCurrentGuide(GuideType.CODE);
    },
  },
  {
    label: "Daily Wrap-Up Guide",
    description: `Pull Items for the Wrap-Up Guide.`,
    button: `Display Wrap-Up Guide`,
    action: (e, { setWrapUpGuide, setCurrentGuide }) => {
      const wrapupguide = [
        {
          id: "1",
          title:
            "Time should not change regardless of when other people can make it.",
          icon: "1️⃣",
        },
        {
          id: "2",
          title:
            "Ask how the day went and if anyone has anything to quickly share.",
          icon: "2️⃣",
        },
        {
          id: "3",
          title:
            "Ask how the day went and have people think about what they want to share.",
          icon: "3️⃣",
        },
        {
          id: "4",
          title: "Put the list of team members into the chat.",
          icon: "4️⃣",
        },
        {
          id: "5",
          title:
            "Call on the first team member to share, summarizing in one minute their Rose-Bud-Thorn for the day.",
          icon: "5️⃣",
        },
        {
          id: "6",
          title:
            "Try to give feedback from each participant as a sequeway to the next team member.",
          icon: "6️⃣",
        },
        {
          id: "7",
          title: "Ask if there are any questions.",
          icon: "7️⃣",
        },
        {
          id: "8",
          title: "Share any announcements.",
          icon: "8️⃣",
        },
        {
          id: "9",
          title:
            "Thank everyone for their hard work.  Remind everyone to get rest and stay away from the computer tonight.",
          icon: "9️⃣",
        },
        {
          id: "10",
          title:
            "Remind them to fill out the Retro Form before they sign-off for the evening.",
          icon: "🔟",
        },
      ];
      setWrapUpGuide(wrapupguide);
      setCurrentGuide(GuideType.WRAPUP);
    },
  },
  {
    label: "Soft Skills Day Guide",
    description: `Pull Items for the Soft Skills Guide.`,
    button: `Display Soft Skills Day Guide`,
    action: (e, { setSoftSkillsGuide, setCurrentGuide }) => {
      const softskills = [
        {
          id: "1",
          title: "Call on people to share their solutions.",
          icon: "1️⃣",
        },
        {
          id: "2",
          title:
            "Make sure that everyone has shared about the same amount of times during the week.",
          icon: "2️⃣",
        },
      ];
      setSoftSkillsGuide(softskills);
      setCurrentGuide(GuideType.SOFTSKILLS);
    },
  },
  {
    label: "Visiting Speaker Interviewing Guide",
    description: `Pull Items for the Interview Guide.`,
    button: `Display Interview Guide`,
    action: (e, { setInterviewGuide, setCurrentGuide }) => {
      const interview = [
        {
          id: "1",
          title: "Welcome everyone.",
          icon: "1️⃣",
        },
        {
          id: "2",
          title:
            "Thank the guest speaker for making themselves available for this discussion.",
          icon: "2️⃣",
        },
        {
          id: "3",
          title: "Lead the interview with the following questions:",
          icon: "3️⃣",
        },
        {
          id: "4",
          title:
            "Question 1:  Please give us your elevator pitch introduction.",
          icon: "4️⃣",
        },
        {
          id: "5",
          title:
            "Question 2:  What type of challenges have you faced in your career?",
          icon: "5️⃣",
        },
        {
          id: "6",
          title:
            "Question 3:  What is good professional advice that you could share with us?",
          icon: "6️⃣",
        },
        {
          id: "7",
          title: "Question 4:  What has your career path looked like so far?",
          icon: "7️⃣",
        },
        {
          id: "8",
          title:
            "Question 5:  How does your past career complement your path in tech?",
          icon: "8️⃣",
        },
        {
          id: "9",
          title: "Thank everyone for joining.",
          icon: "9️⃣",
        },
        {
          id: "10",
          title:
            "Remind them to fill out the survey before they sign-off for the evening.",
          icon: "🔟",
        },
      ];
      setInterviewGuide(interview);
      setCurrentGuide(GuideType.INTERVIEW);
    },
  },
];

export default function VerticalLinearStepper2({
  setMorningGuide,
  setCodeGuide,
  setWrapUpGuide,
  setSoftSkillsGuide,
  setInterviewGuide,
  setCurrentGuide,
}) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 750, ml: 10 }}>
      <Stepper nonLinear activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 4 ? (
                  <Typography variant="caption">Last Guide</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>
                {step.description}
                <Button
                  endIcon={<QueuePlayNextIcon />}
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1, mr: 1, mb: 1, ml: 5 }}
                  onClick={(e) => {
                    return step.action(e, {
                      setMorningGuide,
                      setCodeGuide,
                      setWrapUpGuide,
                      setSoftSkillsGuide,
                      setInterviewGuide,
                      setCurrentGuide,
                    });
                  }}
                >
                  {step.button}
                </Button>
              </Typography>

              <Box sx={{ mb: 0 }}>
                <div>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleNext}
                    sx={{ mt: 0, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    // disabled={index === 0}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mt: 0, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper
          variant="outlined"
          elevation={0}
          sx={{ maxWidth: 350, p: 2, backgroundColor: "#94b7dc" }}
        >
          <Typography>All steps completed - you&apos;re finished!</Typography>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleReset}
            sx={{ mt: 1, mr: 1 }}
          >
            Finish
          </Button>
        </Paper>
      )}
    </Box>
  );
}
