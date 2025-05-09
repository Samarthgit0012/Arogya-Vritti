
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays, Droplet } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const PeriodTracker = () => {
  // State for tracking period days and cycle information
  const [periodDays, setPeriodDays] = useState<Date[]>([]);
  const [cycleLength, setCycleLength] = useState(28); // Average cycle length
  const [periodLength, setPeriodLength] = useState(5); // Average period length
  const [lastPeriodStart, setLastPeriodStart] = useState<Date | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Function to mark a day as a period day
  const togglePeriodDay = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    const exists = periodDays.some(d => 
      format(d, 'yyyy-MM-dd') === formattedDate
    );
    
    if (exists) {
      setPeriodDays(periodDays.filter(d => 
        format(d, 'yyyy-MM-dd') !== formattedDate
      ));
    } else {
      const newPeriodDays = [...periodDays, date];
      setPeriodDays(newPeriodDays);
      
      // If this is potentially the start of a new period
      if (!lastPeriodStart || date < lastPeriodStart) {
        setLastPeriodStart(date);
      }
    }
  };

  // Calculate the next expected period
  const calculateNextPeriod = () => {
    if (!lastPeriodStart) return null;
    
    const nextPeriodDate = new Date(lastPeriodStart);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);
    
    return nextPeriodDate;
  };
  
  const nextPeriod = calculateNextPeriod();

  // Function to save period information
  const savePeriodData = () => {
    // In a real app, this would call your MongoDB API
    // For now, just show a toast message
    toast("Period Data Saved", {
      description: "Your period information has been saved successfully.",
    });
  };
  
  // Function to highlight period days on calendar
  const isPeriodDay = (date: Date) => {
    return periodDays.some(d => 
      format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Droplet size={20} className="mr-2 text-pink-500" />
          Period Cycle Tracking
        </CardTitle>
        <CardDescription>
          Keep track of your menstrual cycle and get predictions for your next period
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Cycle Information</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Cycle Length:</span>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCycleLength(Math.max(21, cycleLength - 1))}
                    className="h-8 w-8 p-0 rounded-full"
                  >-</Button>
                  <span className="w-8 text-center">{cycleLength}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCycleLength(Math.min(35, cycleLength + 1))}
                    className="h-8 w-8 p-0 rounded-full"
                  >+</Button>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span>Period Length:</span>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setPeriodLength(Math.max(2, periodLength - 1))}
                    className="h-8 w-8 p-0 rounded-full"
                  >-</Button>
                  <span className="w-8 text-center">{periodLength}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setPeriodLength(Math.min(10, periodLength + 1))}
                    className="h-8 w-8 p-0 rounded-full"
                  >+</Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <h3 className="font-medium text-sm">Last Period Start:</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {lastPeriodStart ? format(lastPeriodStart, 'PPP') : <span>Select a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={lastPeriodStart}
                    onSelect={setLastPeriodStart}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {nextPeriod && (
              <div className="bg-pink-50 p-3 rounded-md">
                <h3 className="font-medium text-sm text-pink-700">Next Period Prediction:</h3>
                <p className="text-pink-800">{format(nextPeriod, 'PPP')}</p>
              </div>
            )}
            
            <Button 
              className="w-full mt-4 bg-pink-600 hover:bg-pink-700"
              onClick={savePeriodData}
            >
              Save Period Data
            </Button>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Mark Period Days</h3>
            <p className="text-sm text-gray-500">Click on days to mark/unmark your period</p>
            
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              onDayClick={togglePeriodDay}
              className={cn("p-3 pointer-events-auto border rounded-md")}
              modifiers={{
                period: (date) => isPeriodDay(date)
              }}
              modifiersClassNames={{
                period: "bg-pink-200 text-pink-800 hover:bg-pink-300"
              }}
              footer={
                <div className="text-xs text-center mt-2 text-gray-500">
                  Pink highlighted dates = period days
                </div>
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeriodTracker;
