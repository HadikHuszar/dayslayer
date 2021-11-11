import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { CopyToClipboard } from "react-copy-to-clipboard";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
import SendIcon from "@mui/icons-material/Send";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { GuideType } from ".";

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
          icon: "✔️",
        },
        {
          id: "2",
          title:
            "Invite people to share something they’re leaving at the door.",
          icon: "✔️",
        },
        {
          id: "3",
          title: "Start the Mediation Guide you selected earlier.",
          icon: "✔️",
        },
        {
          id: "4",
          title:
            "After mediation, ask if anyone has anything special to share about what they worked on or how they did the evening before.",
          icon: "✔️",
        },
        {
          id: "5",
          title: "Enumerate all items in the day’s schedule.",
          icon: "✔️",
        },
        {
          id: "6",
          title: "Announce any mentors that are available for the day.",
          icon: "✔️",
        },
        {
          id: "7",
          title: "Ask if there are any questions.",
          icon: "✔️",
        },
        {
          id: "8",
          title: "Share any announcements.",
          icon: "✔️",
        },
      ];
      setMorningGuide(morningguide);
      setCurrentGuide(GuideType.MORNING);
    },
  },
  {
    label: "Code Challenge Guide",
    description: "Pull Items for the Guide for Code Challenges",
    button: `Display Morning Stand-Up Guide`,
    action: (e, { setCodeGuide, setCurrentGuide }) => {
      const codeguide = [
        {
          id: "1",
          title: "Call on people to share their solutions.",
          icon: "✔️",
        },
        {
          id: "2",
          title:
            "Make sure that everyone has shared about the same amount of times during the week.",
          icon: "✔️",
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
          icon: "✔️",
        },
        {
          id: "2",
          title:
            "Ask how the day went and if anyone has anything to quickly share.",
          icon: "✔️",
        },
        {
          id: "3",
          title:
            "Ask how the day went and have people think about what they want to share.",
          icon: "✔️",
        },
        {
          id: "4",
          title: "Put the list of team members into the chat.",
          icon: "✔️",
        },
        {
          id: "5",
          title:
            "Call on the first team member to share, summarizing in one minute their Rose-Bud-Thorn for the day.",
          icon: "✔️",
        },
        {
          id: "6",
          title:
            "Try to give feedback from each particpant as a sequeway to the next team member.",
          icon: "✔️",
        },
        {
          id: "7",
          title: "Ask if there are any questions.",
          icon: "✔️",
        },
        {
          id: "8",
          title: "Share any announcements.",
          icon: "✔️",
        },
      ];
      setWrapUpGuide(wrapupguide);
      setCurrentGuide(GuideType.WRAPUP);
    },
  },
  {
    label: "Soft Skills Day Guide",
    description: `Generate the inspirational quote for the day.`,
    button: `Display Soft Skills Day Guide`,
    action: (e, { setSoftSkillsGuide, setCurrentGuide }) => {
      const softskills = [
        {
          id: "1",
          title: "Call on people to share their solutions.",
          icon: "✔️",
        },
        {
          id: "2",
          title:
            "Make sure that everyone has shared about the same amount of times during the week.",
          icon: "✔️",
        },
      ];
      setSoftSkillsGuide(softskills);
      setCurrentGuide(GuideType.SOFTSKILLS);
    },
  },
  {
    label: "Visiting Speaker Interviewing Guide",
    description: `Add discussion threads automatically here.`,
    button: `Display Wrap-Up Guide`,
    action: (e, { setInterviewGuide, setCurrentGuide }) => {
      const interview = [
        {
          id: "1",
          title: "Welcome everyone.",
          icon: "✔️",
        },
        {
          id: "2",
          title:
            "Thank the guest speaker for making themselves available for this discussion.",
          icon: "✔️",
        },
        {
          id: "3",
          title: "Lead the interview with the following questions:",
          icon: "✔️",
        },
        {
          id: "4",
          title: "Please give us your elevator pitch introduction.",
          icon: "✔️",
        },
        {
          id: "5",
          title: "What type of challenges have you faced in your career?",
          icon: "✔️",
        },
        {
          id: "6",
          title:
            "What is good professional advice that you could share with us?",
          icon: "✔️",
        },
        {
          id: "7",
          title: "What has your career path looked like so far?",
          icon: "✔️",
        },
        {
          id: "8",
          title: "How does your past career complement your path in tech?",
          icon: "✔️",
        },
        {
          id: "9",
          title:
            "What forms of processing or venting do you recommend to underrepresented people in a corporate environment?",
          icon: "✔️",
        },
        {
          id: "10",
          title: "Thank everyone for joining.",
          icon: "✔️",
        },
        {
          id: "11",
          title:
            "Remind them to fill out the survey before they sign-off for the evening.",
          icon: "✔️",
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
    <Box sx={{ maxWidth: 750 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 4 ? (
                  <Typography variant="caption">Last step</Typography>
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
                    disabled={index === 0}
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
        <Paper variant="outlined" elevation={0} sx={{ maxWidth: 350, p: 2 }}>
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
