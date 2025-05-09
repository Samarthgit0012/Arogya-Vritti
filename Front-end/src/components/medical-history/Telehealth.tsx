import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Phone, Calendar } from "lucide-react";

const Telehealth = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Virtual Consultations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="flex items-center justify-center gap-2 h-24">
              <Video className="h-6 w-6" />
              <span>Start Video Call</span>
            </Button>
            <Button className="flex items-center justify-center gap-2 h-24">
              <Phone className="h-6 w-6" />
              <span>Audio Call</span>
            </Button>
            <Button className="flex items-center justify-center gap-2 h-24">
              <Calendar className="h-6 w-6" />
              <span>Schedule Consultation</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Consultations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-500">No upcoming consultations scheduled.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Telehealth; 