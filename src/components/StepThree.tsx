'use client';

import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Link } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function StepThree() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Упутство за дигитално потписивање
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" paragraph>
          Сви чланови иницијативног одбора морају дигитално потписати документе користећи квалификовани електронски потпис.
          Ево корака за потписивање:
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="1. Припрема докумената"
              secondary="Преузмите PDF документе из претходног корака и сачувајте их на вашем рачунару."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="2. Пријава на сервис"
              secondary={
                <>
                  Посетите{' '}
                  <Link href="https://cloud.eid.gov.rs" target="_blank" rel="noopener noreferrer">
                    cloud.eid.gov.rs
                  </Link>{' '}
                  и пријавите се користећи вашу електронску личну карту.
                </>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="3. Учитавање документа"
              secondary="Користите опцију 'Учитај документ' и изаберите PDF фајл који желите да потпишете."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="4. Потписивање"
              secondary="Потврдите да желите да потпишете документ. Систем ће вас замолити да уметнете вашу електронску личну карту."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="5. Секвенцијално потписивање"
              secondary={
                <>
                  Важно: Сви чланови иницијативног одбора морају потписати документ један за другим.
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowForwardIcon color="action" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Први члан"
                        secondary="Потписује оригинални документ"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowForwardIcon color="action" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Следећи члан"
                        secondary="Потписује документ који је већ потписао претходни члан"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ArrowForwardIcon color="action" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Последњи члан"
                        secondary="Потписује документ који садржи све претходне потписе"
                      />
                    </ListItem>
                  </List>
                </>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="6. Преузимање потписаног документа"
              secondary="Након што су сви чланови потписали документ, преузмите коначну верзију са свим потписима."
            />
          </ListItem>
        </List>

        <Typography variant="body1" color="error" sx={{ mt: 3 }}>
          Напомена: Сваки члан иницијативног одбора мора имати важећу електронску личну карту са квалификованим електронским потписом.
        </Typography>
      </Paper>
    </Box>
  );
} 