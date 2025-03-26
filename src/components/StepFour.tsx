'use client';

import { Box, Typography, Paper, TextField, Button, Grid } from '@mui/material';
import { InitiativeData } from '@/types';
import { format } from 'date-fns';
import { sr } from 'date-fns/locale';

interface StepFourProps {
  initiativeData: InitiativeData;
}

export default function StepFour({ initiativeData }: StepFourProps) {
  const today = format(new Date(), 'dd.MM.yyyy.', { locale: sr });
  
  const emailSubject = `Национална иницијатива: ${initiativeData.name}`;
  
  const emailBody = `
Поштовани,

У прилогу вам шаљем документе националне иницијативе "${initiativeData.name}" за општину ${initiativeData.municipality}.

Документи садрже:
1. Обавештење о предлогу за организовање јавне расправе
2. Захтев за прикупљање потписа

Сви документи су дигитално потписани од стране чланова иницијативног одбора.

Иницијативни одбор сачињавају:
${initiativeData.committeeMembers.map((member, index) => `${index + 1}. ${member.fullName}, ${member.address}`).join('\n')}

Датум подношења: ${today}

С поштовањем,
${initiativeData.committeeMembers[0].fullName}
Председник иницијативног одбора
`;

  const handleCopyEmail = () => {
    const emailContent = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = emailContent;
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Слање иницијативе општини
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" paragraph>
          Након што сте прикупили све потписе, потребно је послати документе општини.
          Ево како то можете урадити:
        </Typography>

        <Typography variant="body1" paragraph>
          1. Прво пронађите контакт информације општине {initiativeData.municipality}:
        </Typography>

        <Typography variant="body1" paragraph>
          - Посетите званичну веб страницу општине
          - Потражите е-пошту председника општине или контакт центар
          - Ако не можете пронаћи контакт информације, можете их потражити на Google-у
        </Typography>

        <Typography variant="body1" paragraph>
          2. Припремите е-пошту са следећим садржајем:
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Предмет"
              value={emailSubject}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={10}
              label="Садржај"
              value={emailBody}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCopyEmail}
              fullWidth
            >
              Отвори у е-поштовском клијенту
            </Button>
          </Grid>
        </Grid>

        <Typography variant="body1" color="error" sx={{ mt: 3 }}>
          Напомена: Уверите се да су сви документи дигитално потписани пре слања.
          Такође, сачувајте копију послатих докумената за ваше архивирање.
        </Typography>
      </Paper>
    </Box>
  );
} 