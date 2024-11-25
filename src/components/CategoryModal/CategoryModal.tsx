import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  category: any;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  open,
  onClose,
  category,
}) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data);
    onClose();
  };

  const renderContent = () => {
    if (category.options) {
      return (
        <Controller
          name="options"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={category.options.map((option: string) => ({
                value: option,
                label: option,
              }))}
              isMulti
              placeholder={`${category.label} seçin`}
            />
          )}
        />
      );
    } else if (category.fields) {
      return (
        <Box>
          {category.fields.map((field: string, index: number) => (
            <Controller
              key={index}
              name={`field_${index}`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={category.fields[index]}
                  fullWidth
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
              )}
            />
          ))}
        </Box>
      );
    } else if (category.label === 'Fiyat') {
      return (
        <Controller
          name="price"
          control={control}
          defaultValue={[0, 1000]}
          render={({ field }) => (
            <>
              <Slider
                {...field}
                valueLabelDisplay="auto"
                min={0}
                max={5000}
                step={50}
                marks
                sx={{ mt: 2 }}
              />
              <Typography mt={2}>
                Başlangıç Fiyatı: {field.value[0]} TL - Son Fiyat:{' '}
                {field.value[1]} TL
              </Typography>
            </>
          )}
        />
      );
    } else if (category.label === 'Tarih') {
      return (
        <Box>
          <Controller
            name="startDate"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Box sx={{ mb: 2 }}>
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Başlangıç tarihi seçin"
                  customInput={
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Başlangıç Tarihi"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  }
                />
              </Box>
            )}
          />
          <Controller
            name="endDate"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Box>
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Bitiş tarihi seçin"
                  className='date-picker'
                  customInput={
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Bitiş Tarihi"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  }
                />
              </Box>
            )}
          />
        </Box>
      );
    }
     else if (category.label === 'Gün') {
      return (
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Hafta İçi" />
          <FormControlLabel control={<Checkbox />} label="Hafta Sonu" />
          <FormControlLabel control={<Checkbox />} label="Pazartesi" />
          <FormControlLabel control={<Checkbox />} label="Salı" />
          <FormControlLabel control={<Checkbox />} label="Çarşamba" />
          <FormControlLabel control={<Checkbox />} label="Perşembe" />
          <FormControlLabel control={<Checkbox />} label="Cuma" />
          <FormControlLabel control={<Checkbox />} label="Cumartesi" />
          <FormControlLabel control={<Checkbox />} label="Pazar" />
        </FormGroup>
      );
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
          width: '90%',
          maxWidth: '400px',
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {category.label}
        </Typography>
        {renderContent()}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Kaydet
        </Button>
        <Button onClick={onClose} variant="outlined" fullWidth sx={{ mt: 1 }}>
          İptal
        </Button>
      </Box>
    </Modal>
  );
};

export default CategoryModal;
