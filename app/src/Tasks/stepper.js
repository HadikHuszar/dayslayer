import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
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
    action: `() => {
      alert("clicked");
    }`,
  },
  {
    label: "Check Mentor Calendar",
    description: "Pull mentors for the day from the Mentor Calendar",
    button: `Pull Mentor Calendar`,
    action: `() => {
      alert("clicked");
    }`,
  },
  {
    label: "Create Discussion Threads",
    description: `Add discussion threads automatically here.`,
    button: `Create Discusison Threads`,
    action: `() => {
      alert("clicked");
    }`,
  },
  {
    label: "Breathing Exercise / Meditation Selector",
    description: `Select the Breathing Exercise for the day.`,
    button: `Select Breathing Exercise`,
    action: `() => {
      alert("clicked");
    }`,
  },
  {
    label: "Inspirational Quote Generator",
    description: `Generate the inspirational quote for the day.`,
    button: `Generate Quote`,
    action: `() => {
      alert("clicked");
    }`,
  },
];

export default function VerticalLinearStepper() {
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
                  onClick={() => {
                    alert("clicked");
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
            Send to Team
          </Button>
        </Paper>
      )}
    </Box>
  );
}
