'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  Autocomplete,
  IconButton,
  Grid,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { InitiativeData, CommitteeMember } from '@/types';
import municipalities from '@/data/opstine.json';

interface StepOneProps {
  onNext: (data: InitiativeData) => void;
  initialData: InitiativeData;
}

export default function StepOne({ onNext, initialData }: StepOneProps) {
  const [error, setError] = useState<string>('');
  
  const { register, handleSubmit, control, formState: { errors } } = useForm<InitiativeData>({
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "committeeMembers",
  });

  const onSubmit = (data: InitiativeData) => {
    if (data.committeeMembers.length < 3) {
      setError('Потребно је најмање 3 члана иницијативног одбора');
      return;
    }
    setError('');
    onNext(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="body1" paragraph sx={{ mb: 3 }}>
      Добродошли на платформу за грађанске иницијативе! Овде ћете пронаћи документацију, водиче за електронски потпис и алате за креирање грађанске иницијативе.</Typography>

      <Typography variant="h6" gutterBottom>
        Унесите податке о вашој иницијативи
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Назив иницијативе"
            {...register('name', { required: 'Назив иницијативе је обавезан' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Опис иницијативе"
            {...register('description', { required: 'Опис иницијативе је обавезан' })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            options={municipalities}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Општина"
                error={!!errors.municipality}
                helperText={errors.municipality?.message}
              />
            )}
            onChange={(_, value) => {
              register('municipality').onChange({
                target: { name: 'municipality', value: value?.name || '' }
              });
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Чланови иницијативног одбора
          </Typography>
          
          {fields.map((field, index) => (
            <Box key={field.id} sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Име и презиме"
                {...register(`committeeMembers.${index}.fullName` as const, {
                  required: 'Име и презиме су обавезни'
                })}
                error={!!errors.committeeMembers?.[index]?.fullName}
                helperText={errors.committeeMembers?.[index]?.fullName?.message}
              />
              <TextField
                fullWidth
                label="Адреса"
                {...register(`committeeMembers.${index}.address` as const, {
                  required: 'Адреса је обавезна'
                })}
                error={!!errors.committeeMembers?.[index]?.address}
                helperText={errors.committeeMembers?.[index]?.address?.message}
              />
              <IconButton onClick={() => remove(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Button
            startIcon={<AddIcon />}
            onClick={() => append({ fullName: '', address: '' })}
            sx={{ mt: 2 }}
          >
            Додај члана
          </Button>
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Даље
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
} 