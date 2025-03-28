'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Grid, Divider } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { InitiativeData } from '@/types';
import { format } from 'date-fns';
import { sr } from 'date-fns/locale';
import {Options} from "html2pdf.js";

interface StepTwoProps {
  initiativeData: InitiativeData;
}

export default function StepTwo({ initiativeData }: StepTwoProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateDocument1 = () => {
    const today = format(new Date(), 'dd.MM.yyyy.', { locale: sr });
    const committeeMembersList = initiativeData.committeeMembers
      .map((member, index) => `${index + 1}. ${member.fullName}, ${member.address}`)
      .join('\n');

    return `
      <div style="font-family: 'Times New Roman', serif; padding: 20px;">
        <h2 style="text-align: center;">ОБАВЕШТЕЊЕ О ПРЕДЛОГУ ЗА ОРГАНИЗОВАЊЕ ЈАВНЕ РАСПРАВЕ</h2>
        <p>Општина: ${initiativeData.municipality}</p>
        <p>Датум: ${today}</p>
        <p>Назив иницијативе: ${initiativeData.name}</p>
        <p>Опис иницијативе:</p>
        <div style="white-space: pre-line;">${initiativeData.description}</div>
        <p>Иницијативни одбор сачињавају:</p>
        <pre style="white-space: pre-wrap;">${committeeMembersList}</pre>
      </div>
    `;
  };

  const generateDocument2 = () => {
    const today = format(new Date(), 'dd.MM.yyyy.', { locale: sr });
    const committeeMembersList = initiativeData.committeeMembers
      .map((member, index) => `${index + 1}. ${member.fullName}, ${member.address}`)
      .join('\n');

    return `
      <div style="font-family: 'Times New Roman', serif; padding: 20px;">        
        <h2 style="text-align: center;">Захтев за прикупљање електронских потписа подршке за организовање јавне расправе о „${initiativeData.name}"</h2>
        <h2>Председнику скупштине општине ${initiativeData.municipality}</h2> 
        <p>Поштовани,</p>
        <p>На основу Закона о локалној самоуправи, Закона о референдуму и народној иницијативи и Уредби о електронској народној иницијативи, Иницијативи одбор доставља захтев за прикупљање електронских потписа подршке за организовање јавне расправе о „${initiativeData.name}. 
        <p>Дана  ${today}, Иницијативни одбор поднео је предлог председнику скупштине општине ${initiativeData.municipality} за прикупљање потписа за организовање поменуте јавне расправе. Председник скупштине није поступио у року од 15 дана, па се, у складу са чланом 60. Закона о референдуму и народној иницијативи, сматра да је предлог верификован. 
Иницијативни одбор именује Зорана Стаменковића, са пребивалиштем у улици Милоша Обилића бр. 4, Ћуприја, као овлашћено лице за поступање у својству корисника на Порталу еУправа. 
Молимо Вас да у складу са чланом 4. Уредбе о електронској народној, без одлагања, омогућите покретање поступка прикупљања електронских потписа на Порталу еУправа. 
У Ћуприји, 
27.12.2024 
</p>
Иницијативни одбор:
        
        
        <p>Општина: ${initiativeData.municipality}</p>
        <p>Датум: ${today}</p>
        <p>Назив иницијативе: ${initiativeData.name}</p>
        <p>Опис иницијативе:</p>
        <p>${initiativeData.description}</p>
        <p>Иницијативни одбор сачињавају:</p>
        <pre style="white-space: pre-wrap;">${committeeMembersList}</pre>
        <div style="margin-top: 50px;">
          <h3>Потписи грађана</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="border: 1px solid black; padding: 5px;">Р.б.</th>
                <th style="border: 1px solid black; padding: 5px;">Име и презиме</th>
                <th style="border: 1px solid black; padding: 5px;">ЈМБГ</th>
                <th style="border: 1px solid black; padding: 5px;">Адреса</th>
                <th style="border: 1px solid black; padding: 5px;">Потпис</th>
              </tr>
            </thead>
            <tbody>
              ${Array(10).fill(null).map((_, i) => `
                <tr>
                  <td style="border: 1px solid black; padding: 5px;">${i + 1}</td>
                  <td style="border: 1px solid black; padding: 5px;"></td>
                  <td style="border: 1px solid black; padding: 5px;"></td>
                  <td style="border: 1px solid black; padding: 5px;"></td>
                  <td style="border: 1px solid black; padding: 5px;"></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  const downloadDocument = async (content: string, filename: string) => {
    if (!isClient) return;

    setIsGenerating(true);
    let tempElement: HTMLDivElement | null = null;
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      tempElement = document.createElement('div');
      tempElement.innerHTML = content;
      document.body.appendChild(tempElement);

      const opt:Options = {
        margin: 1,
        filename: filename,
       // image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(tempElement).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      if (tempElement && tempElement.parentNode) {
        tempElement.parentNode.removeChild(tempElement);
      }
      setIsGenerating(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Преузимање докумената
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              backgroundColor: '#fafafa'
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Документ 1: Обавештење о предлогу за организовање јавне расправе
            </Typography>

            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: 'white',
                minHeight: '400px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                overflow: 'auto'
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: generateDocument1() }} />
            </Paper>

            <Divider />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() => downloadDocument(generateDocument1(), 'obavestenje.pdf')}
                disabled={isGenerating || !isClient}
              >
                Преузми PDF
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              backgroundColor: '#fafafa'
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Документ 2: Захтев за прикупљање потписа
            </Typography>

            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: 'white',
                minHeight: '400px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                overflow: 'auto'
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: generateDocument2() }} />
            </Paper>

            <Divider />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() => downloadDocument(generateDocument2(), 'zahtev.pdf')}
                disabled={isGenerating || !isClient}
              >
                Преузми PDF
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
