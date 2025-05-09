import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleAnalyze = () => {
    // TODO: Implement symptom analysis logic
    setAnalysis('Based on your symptoms, you may have a common cold. Consider resting and staying hydrated. If symptoms persist, consult a healthcare provider.');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Symptom Checker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="symptoms">Describe your symptoms</Label>
              <Input
                id="symptoms"
                placeholder="e.g., fever, cough, headache..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="mt-2"
              />
            </div>
            <Button onClick={handleAnalyze}>Analyze Symptoms</Button>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{analysis}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SymptomChecker; 