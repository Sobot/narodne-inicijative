'use client';

import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Stepper, Step, StepLabel, Paper, Typography, Button, Stack, IconButton, useTheme, useMediaQuery } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState<StepType>(1);
  const [isCompleted, setIsCompleted] = useState(false);
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
    setIsCompleted(true);
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Помозите нам да олакшамо процес подношења националних иницијатива!');
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const renderStep = () => {
    if (isCompleted) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Хвала вам!
          </Typography>
          <Typography variant="body1" paragraph>
            Успешно сте завршили процес подношења националне иницијативе.
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Поделите ову веб апликацију са другима
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <IconButton 
              color="primary" 
              onClick={() => handleShare('facebook')}
              sx={{ 
                backgroundColor: '#1877f2',
                color: 'white',
                '&:hover': { backgroundColor: '#166fe5' }
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton 
              color="primary" 
              onClick={() => handleShare('twitter')}
              sx={{ 
                backgroundColor: '#1da1f2',
                color: 'white',
                '&:hover': { backgroundColor: '#1a91da' }
              }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton 
              color="primary" 
              onClick={() => handleShare('linkedin')}
              sx={{ 
                backgroundColor: '#0077b5',
                color: 'white',
                '&:hover': { backgroundColor: '#0066a1' }
              }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton 
              color="primary" 
              onClick={() => handleShare('whatsapp')}
              sx={{ 
                backgroundColor: '#25d366',
                color: 'white',
                '&:hover': { backgroundColor: '#22c55e' }
              }}
            >
              <WhatsAppIcon />
            </IconButton>
          </Stack>
        </Box>
      );
    }

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
            <Stepper 
              activeStep={activeStep - 1} 
              alternativeLabel={!isMobile}
              orientation={isMobile ? 'vertical' : 'horizontal'}
              sx={{
                '& .MuiStepLabel-label': {
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  whiteSpace: 'normal',
                  textAlign: 'center',
                  lineHeight: 1.2,
                },
                '& .MuiStepLabel-labelContainer': {
                  maxWidth: isMobile ? '100%' : '120px',
                },
                '& .MuiStepLabel-iconContainer': {
                  paddingRight: isMobile ? 1 : 0,
                },
                '& .MuiStepConnector-root': {
                  display: isMobile ? 'none' : 'block',
                },
                '& .MuiStep-root': {
                  padding: isMobile ? '8px 0' : '0',
                }
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {!isCompleted && (
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
            )}
          </Paper>

          <Paper sx={{ p: 3 }}>
            {renderStep()}
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
} 