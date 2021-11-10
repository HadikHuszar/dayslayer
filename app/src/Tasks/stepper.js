import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import RecordVoiceOverRoundedIcon from "@mui/icons-material/RecordVoiceOverRounded";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SendIcon from "@mui/icons-material/Send";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "Collect Items from the Team Calendar",
    description: `Pull items from the Team Calendar for the Day`,
    button: `Pull Team Calendar`,
    action: (e, { setEvents }) => {
      const events = [
        {
          id: "1",
          title: "Daily Morning Stand-Up",
          date: `November 11, 2021`,
          start: `8:00 AM`,
          end: `8:30 AM`,
          icon: "☕️",
          link: "https://zoom.us/j/91272177622?pwd=WmVRbDk1eUs0SnpGQVhubXJZV0FOdz09",
          copyableText: `Daily Morning Stand-Up`,
        },
        {
          id: "2",
          title: "Final Project Demos!",
          date: `November 11, 2021`,
          start: `3:30 PM`,
          end: `5:00 PM`,
          icon: "🖥",
          link: "https://zoom.us/j/91272177622?pwd=WmVRbDk1eUs0SnpGQVhubXJZV0FOdz09",
        },
        // {
        //   id: "3",
        //   title: "Final Project Demos!",
        //   date: `November 11, 2021`,
        //   start: `3:30 PM`,
        //   end: `5:00 PM`,
        //   // icon: 🧵 , 🍐, 💻 , ⌨️,  🖥 , 🔍 , 🎥
        // },
      ];
      setEvents(events);
    },
  },
  {
    label: "Check Mentor Calendar",
    description: "Pull mentors for the day from the Mentor Calendar",
    button: `Pull Mentor Calendar`,
    action: (e, { setMentors }) => {
      const mentors = [
        {
          id: "1",
          title: "There Are No Mentors for Today",
          date: `November 11, 2021`,
          start: ``,
          end: ``,
          icon: "👥",
        },
      ];
      setMentors(mentors);
    },
  },
  {
    label: "Breathing Exercise / Meditation Selector",
    description: `Select the Breathing Exercise for the day.`,
    button: `Select Breathing Exercise`,
    action: (e, { setMeditation }) => {
      const meditation = [
        {
          id: "1",
          title: "3-Min Mindful Breathing",
          icon: "🧘‍♂️",
          link: "https://youtu.be/SEfs5TJZ6Nk",
        },
      ];
      setMeditation(meditation);
    },
  },
  {
    label: "Inspirational Quote Generator",
    description: `Generate the inspirational quote for the day.`,
    button: `Generate Quote`,
    action: (e, { setQuote }) => {
      fetch("http://quotes.rest/qod.json?category=inspire")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const quotation = data.contents.quotes[0].quote;
          const author = data.contents.quotes[0].author;
          setQuote({
            quotation,
            author,
            copyableText: `${quotation} -${author}`,
          });
        });
    },
  },
  {
    label: "Create Discussion Threads",
    description: `Add discussion threads automatically here.`,
    button: `Create Discussion Threads`,
    action: (e, { setThreads }) => {
      const threads = [
        {
          id: "1",
          title: "Final Project Demos",
          icon: "🧵",
          copyableText: `🧵 Final Project Demos`,
        },
      ];
      setThreads(threads);
    },
  },
];

export default function VerticalLinearStepper({
  setEvents,
  setMentors,
  setThreads,
  setMeditation,
  setQuote,
  generateCopyableString,
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
    <Box sx={{ maxWidth: 650 }}>
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
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1, mr: 1, mb: 1, ml: 5 }}
                  onClick={(e) => {
                    return step.action(e, {
                      setEvents,
                      setMentors,
                      setThreads,
                      setMeditation,
                      setQuote,
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
            <CopyToClipboard
              text={generateCopyableString()}
              onCopy={() => console.log("copied")}
            >
              <span>Copy to Clipboard</span>
            </CopyToClipboard>
          </Button>
        </Paper>
      )}
    </Box>
  );
}
