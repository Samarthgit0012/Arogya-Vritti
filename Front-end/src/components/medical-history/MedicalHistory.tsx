import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MedicalHistory = () => {
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save logic
    console.log('Medical history saved:', formData);
  };

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
                    <SelectItem value="none">No Exercise</SelectItem>
                    <SelectItem value="light">Light (1-2 times/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-4 times/week)</SelectItem>
                    <SelectItem value="heavy">Heavy (5+ times/week)</SelectItem>
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
                    <SelectItem value="omnivore">Omnivore</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit">Save Medical History</Button>
      </div>
    </form>
  );
};

export default MedicalHistory; 