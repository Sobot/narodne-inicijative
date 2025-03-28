'use client';

import { Box, Typography, Paper, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { InitiativeData } from '@/types';
import { format } from 'date-fns';
import { sr } from 'date-fns/locale';
import * as municipalityUtils from '@/utils/municipalityContacts';

interface StepFourProps {
  initiativeData: InitiativeData;
}

export default function StepFour({ initiativeData }: StepFourProps) {
  const today = format(new Date(), 'dd.MM.yyyy.', { locale: sr });
  
  const committeeMembersList = initiativeData.committeeMembers.length > 0
    ? initiativeData.committeeMembers
        .map((member, index) => `${index + 1}. ${member.fullName}, ${member.address}`)
        .join('\n')
    : 'Нема унетих чланова иницијативног одбора';

  const municipalityContacts = municipalityUtils.findMunicipalityContacts(initiativeData.municipality);
  const presidentEmail = municipalityUtils.getPresidentEmail(municipalityContacts);
  const otherContacts = municipalityUtils.getOtherContacts(municipalityContacts);

  const emailSubject = `Предлог за организовање јавне расправе - ${initiativeData?.name}`;
  const emailBody = `
Поштовани,

У прилогу вам достављам предлог за организовање јавне расправе.

Назив иницијативе: ${initiativeData.name}
Општина: ${initiativeData.municipality}
Датум: ${today}

Опис иницијативе:
${initiativeData.description}

Иницијативни одбор сачињавају:
${committeeMembersList}

С поштовањем,
${initiativeData.committeeMembers.length > 0 ? initiativeData.committeeMembers[0].fullName : 'Предлагач'}
  `.trim();

  const handleCopyEmail = () => {
    const to = presidentEmail ? `mailto:${presidentEmail}` : 'mailto:';
    const cc = otherContacts.map(c => c.email).join(',');
    const emailContent = `${to}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}${cc ? `&cc=${encodeURIComponent(cc)}` : ''}`;
    window.location.href = emailContent;
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Слање иницијативе општини
      </Typography>

      <Paper sx={{ p: 3, mb: 3, backgroundColor: '#fafafa' }}>
        <Typography variant="subtitle1" gutterBottom>
          Контакти општине {initiativeData.municipality}:
        </Typography>

        <List>
          {municipalityContacts.map((contact, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={contact.position}
                secondary={
                  <>
                    {contact.name && <Typography component="span" variant="body2">{contact.name}<br /></Typography>}
                    {contact.email && <Typography component="span" variant="body2">Email: {contact.email}<br /></Typography>}
                    {contact.phone && <Typography component="span" variant="body2">Телефон: {contact.phone}<br /></Typography>}
                    {contact.web && <Typography component="span" variant="body2">Локал: {contact.web}</Typography>}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Предмет е-поште:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {emailSubject}
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Садржај е-поште:
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            whiteSpace: 'pre-wrap',
            mb: 2,
            backgroundColor: 'white',
            p: 2,
            borderRadius: 1,
            border: '1px solid #e0e0e0'
          }}
        >
          {emailBody}
        </Typography>

        <Button
          variant="contained"
          startIcon={<EmailIcon />}
          onClick={handleCopyEmail}
          fullWidth
        >
          Отвори у поштанском клијенту
        </Button>
      </Paper>
    </Box>
  );
}
