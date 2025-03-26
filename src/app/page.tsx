'use client';

import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Stepper, Step, StepLabel, Paper, Typography, Button, Stack } from '@mui/material';
import { InitiativeData, Step as StepType } from '@/types';
import StepOne from '@/components/StepOne';
import StepTwo from '@/components/StepTwo';
import StepThree from '@/components/StepThree';
import StepFour from '@/components/StepFour';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const steps = [
  'Унос података о иницијативи',
  'Преузимање докумената',
  'Упутство за дигитално потписивање',
  'Слање иницијативе општини',
];

export default function Home() {
  const [activeStep, setActiveStep] = useState<StepType>(1);
  const [initiativeData, setInitiativeData] = useState<InitiativeData>({
    name: '',
    description: '',
    municipality: '',
    committeeMembers: [],
  });

  const handleNext = (data: InitiativeData) => {
    setInitiativeData(data);
    setActiveStep((prevStep) => (prevStep + 1) as StepType);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => (prevStep - 1) as StepType);
  };

  const handleFinish = () => {
    // Here you could add any final actions needed
    console.log('Initiative process completed');
  };

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return <StepOne onNext={handleNext} initialData={initiativeData} />;
      case 2:
        return <StepTwo initiativeData={initiativeData} />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour initiativeData={initiativeData} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            Националне иницијативе - Упутство
          </Typography>
          
          <Paper sx={{ p: 3, mb: 4 }}>
            <Stepper activeStep={activeStep - 1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>

          <Paper sx={{ p: 3 }}>
            {renderStep()}
            
            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
              {activeStep > 1 && (
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  sx={{ minWidth: 120 }}
                >
                  Назад
                </Button>
              )}
              
              {activeStep < 4 ? (
                <Button
                  variant="contained"
                  onClick={() => handleNext(initiativeData)}
                  sx={{ minWidth: 120 }}
                >
                  Даље
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleFinish}
                  sx={{ minWidth: 120 }}
                >
                  Заврши
                </Button>
              )}
            </Stack>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
} 