import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import api from '@/lib/axios';
import { toast } from 'react-hot-toast';

interface MedicalRecord {
  bloodType: string;
  allergies: string;
  chronicConditions: string;
  medications: string;
  familyHistory: string;
  surgeries: string;
  lifestyle: {
    smoking: string;
    alcohol: string;
    exercise: string;
    diet: string;
  };
}

const MedicalHistory = () => {
  const [formData, setFormData] = useState<MedicalRecord>({
    bloodType: 'O+',
    allergies: '',
    chronicConditions: '',
    medications: '',
    familyHistory: '',
    surgeries: '',
    lifestyle: {
      smoking: 'never',
      alcohol: 'none',
      exercise: 'moderate',
      diet: 'regular'
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMedicalRecord();
  }, []);

  const fetchMedicalRecord = async () => {
    try {
      const response = await api.get('/api/medical/records');
      if (response.data) {
        // Ensure the lifestyle object exists with default values
        const data = {
          ...response.data,
          lifestyle: {
            smoking: response.data.lifestyle?.smoking || '',
            alcohol: response.data.lifestyle?.alcohol || '',
            exercise: response.data.lifestyle?.exercise || '',
            diet: response.data.lifestyle?.diet || ''
          }
        };
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching medical record:', error);
      toast.error('Failed to load medical record');
      // Set default form data on error
      setFormData({
        bloodType: '',
        allergies: '',
        chronicConditions: '',
        medications: '',
        familyHistory: '',
        surgeries: '',
        lifestyle: {
          smoking: '',
          alcohol: '',
          exercise: '',
          diet: ''
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.post('/api/medical/records', formData);
      toast.success('Medical history saved successfully');
    } catch (error) {
      console.error('Error saving medical record:', error);
      toast.error('Failed to save medical record');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading medical history...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Medical Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select
                  value={formData.bloodType}
                  onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  placeholder="List any allergies..."
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="chronicConditions">Chronic Conditions</Label>
                <Textarea
                  id="chronicConditions"
                  placeholder="List any chronic conditions..."
                  value={formData.chronicConditions}
                  onChange={(e) => setFormData({ ...formData, chronicConditions: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  placeholder="List current medications..."
                  value={formData.medications}
                  onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="familyHistory">Family Medical History</Label>
                <Textarea
                  id="familyHistory"
                  placeholder="List relevant family medical history..."
                  value={formData.familyHistory}
                  onChange={(e) => setFormData({ ...formData, familyHistory: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="surgeries">Past Surgeries</Label>
                <Textarea
                  id="surgeries"
                  placeholder="List past surgeries..."
                  value={formData.surgeries}
                  onChange={(e) => setFormData({ ...formData, surgeries: e.target.value })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lifestyle Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="smoking">Smoking Status</Label>
                <Select
                  value={formData.lifestyle.smoking}
                  onValueChange={(value) => setFormData({ 
                    ...formData, 
                    lifestyle: { ...formData.lifestyle, smoking: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select smoking status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never Smoked</SelectItem>
                    <SelectItem value="former">Former Smoker</SelectItem>
                    <SelectItem value="current">Current Smoker</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="alcohol">Alcohol Consumption</Label>
                <Select
                  value={formData.lifestyle.alcohol}
                  onValueChange={(value) => setFormData({ 
                    ...formData, 
                    lifestyle: { ...formData.lifestyle, alcohol: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select alcohol consumption" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="occasional">Occasional</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="heavy">Heavy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="exercise">Exercise Habits</Label>
                <Select
                  value={formData.lifestyle.exercise}
                  onValueChange={(value) => setFormData({ 
                    ...formData, 
                    lifestyle: { ...formData.lifestyle, exercise: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select exercise habits" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="light">Light (1-2 times/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-4 times/week)</SelectItem>
                    <SelectItem value="active">Active (5+ times/week)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="diet">Diet Type</Label>
                <Select
                  value={formData.lifestyle.diet}
                  onValueChange={(value) => setFormData({ 
                    ...formData, 
                    lifestyle: { ...formData.lifestyle, diet: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select diet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="paleo">Paleo</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Medical History'}
        </Button>
      </div>
    </form>
  );
};

export default MedicalHistory; 