import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { healthMetrics } from './healthMetricsData';
import { toast } from 'react-hot-toast';
import api from '@/lib/axios';

interface AddHealthReadingProps {
  onReadingAdded: () => void;
}

const AddHealthReading: React.FC<AddHealthReadingProps> = ({ onReadingAdded }) => {
  const [open, setOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [hasMedicalHistory, setHasMedicalHistory] = useState(false);

  useEffect(() => {
    checkMedicalHistory();
  }, []);

  const checkMedicalHistory = async () => {
    try {
      const response = await api.get('/api/medical/records');
      const data = response.data;
      // Check if any of the required fields are filled
      const hasHistory = data && (
        data.bloodType ||
        data.allergies ||
        data.chronicConditions ||
        data.medications ||
        data.familyHistory ||
        data.surgeries ||
        (data.lifestyle && (
          data.lifestyle.smoking ||
          data.lifestyle.alcohol ||
          data.lifestyle.exercise ||
          data.lifestyle.diet
        ))
      );
      setHasMedicalHistory(hasHistory);
    } catch (error) {
      console.error('Error checking medical history:', error);
      setHasMedicalHistory(false);
    }
  };

  const validateInput = () => {
    if (!selectedMetric) {
      toast.error('Please select a metric');
      return false;
    }

    const metric = healthMetrics.find(m => m.id === selectedMetric);
    if (!metric) {
      toast.error('Invalid metric selected');
      return false;
    }

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      toast.error('Please enter a valid number');
      return false;
    }

    // Validate against normal range
    if (numericValue < metric.normalRange.min || numericValue > metric.normalRange.max) {
      toast.error(`Value should be between ${metric.normalRange.min} and ${metric.normalRange.max} ${metric.unit}`);
      return false;
    }

    if (!date) {
      toast.error('Please select a date');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInput()) {
      return;
    }

    setLoading(true);

    try {
      const metric = healthMetrics.find(m => m.id === selectedMetric);
      if (!metric) throw new Error('Invalid metric selected');

      const requestData = {
        type: selectedMetric,
        value: parseFloat(value),
        date: new Date(date).toISOString(),
        unit: metric.unit
      };

      // Log the request data
      console.log('Sending health metric data:', requestData);

      // Check if token exists
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await api.post('/api/medical/health-metrics', requestData);

      // Log the response
      console.log('Server response:', response.data);

      if (response.data) {
        toast.success('Reading added successfully');
        if (!hasMedicalHistory) {
          toast('Consider filling out your medical history for more accurate health insights', {
            duration: 5000,
            icon: '💡',
            style: {
              background: '#f0f9ff',
              color: '#0369a1',
              border: '1px solid #bae6fd',
            },
          });
        }
        setOpen(false);
        setSelectedMetric('');
        setValue('');
        setDate(new Date().toISOString().split('T')[0]);
        onReadingAdded();
      } else {
        throw new Error('No data received from server');
      }
    } catch (error: any) {
      console.error('Error adding reading:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        data: error.response?.data
      });
      
      let errorMessage = 'Failed to add reading';
      if (error.response?.data?.errors) {
        // Handle validation errors
        const validationErrors = error.response.data.errors;
        errorMessage = validationErrors.map((err: any) => 
          `${err.field}: ${err.message}`
        ).join('\n');
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getInputProps = () => {
    const metric = healthMetrics.find(m => m.id === selectedMetric);
    if (!metric) return {};

    return {
      min: metric.normalRange.min,
      max: metric.normalRange.max,
      step: metric.id === 'body-temperature' ? '0.1' : '1',
      placeholder: `Enter value (${metric.normalRange.min}-${metric.normalRange.max} ${metric.unit})`
    };
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          Add New Reading
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Health Metric Reading</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="metric">Select Metric</Label>
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger>
                <SelectValue placeholder="Select a metric" />
              </SelectTrigger>
              <SelectContent>
                {healthMetrics.map((metric) => (
                  <SelectItem key={metric.id} value={metric.id}>
                    {metric.name} ({metric.unit})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              {...getInputProps()}
            />
            {selectedMetric && (
              <p className="text-sm text-gray-500 mt-1">
                Normal range: {healthMetrics.find(m => m.id === selectedMetric)?.normalRange.min} - 
                {healthMetrics.find(m => m.id === selectedMetric)?.normalRange.max} 
                {healthMetrics.find(m => m.id === selectedMetric)?.unit}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Adding...' : 'Add Reading'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHealthReading; 