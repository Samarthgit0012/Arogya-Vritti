import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Clock, Search, MapPin, Stethoscope, User, Phone, Mail } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import Payment from "./Payment.tsx";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  image: string;
  availability: {
    date: string;
    slots: string[];
  }[];
}

interface Appointment {
  id: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  patientName: string;
  phone: string;
  email: string;
  reason: string;
  symptoms: string;
  status: "upcoming" | "completed" | "cancelled";
}

const BookAppointment = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("find-doctor");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
    symptoms: "",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [appointmentData, setAppointmentData] = useState<Appointment | null>(null);

  // Mock data - Replace with actual API call
  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      experience: "15 years",
      rating: 4.8,
      image: "/doctors/doctor1.jpg",
      availability: [
        {
          date: format(new Date(), "yyyy-MM-dd"),
          slots: ["09:00", "10:00", "11:00", "14:00", "15:00"],
        },
        {
          date: format(new Date(Date.now() + 86400000), "yyyy-MM-dd"), // Tomorrow
          slots: ["09:00", "10:00", "11:00", "14:00", "15:00"],
        },
        {
          date: format(new Date(Date.now() + 172800000), "yyyy-MM-dd"), // Day after tomorrow
          slots: ["09:00", "10:00", "11:00", "14:00", "15:00"],
        },
      ],
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialization: "Neurology",
      experience: "12 years",
      rating: 4.9,
      image: "/doctors/doctor2.jpg",
      availability: [
        {
          date: format(new Date(), "yyyy-MM-dd"),
          slots: ["10:00", "11:00", "15:00", "16:00"],
        },
        {
          date: format(new Date(Date.now() + 86400000), "yyyy-MM-dd"), // Tomorrow
          slots: ["09:00", "10:00", "14:00", "15:00"],
        },
        {
          date: format(new Date(Date.now() + 172800000), "yyyy-MM-dd"), // Day after tomorrow
          slots: ["09:00", "10:00", "14:00", "15:00"],
        },
      ],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a doctor, date, and time for your appointment.",
        variant: "destructive",
      });
      return;
    }

    // Create new appointment
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctorName: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      patientName: formData.name,
      phone: formData.phone,
      email: formData.email,
      reason: formData.reason,
      symptoms: formData.symptoms,
      status: "upcoming"
    };

    setAppointmentData(newAppointment);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    if (!appointmentData) return;

    // Get existing appointments from localStorage
    const existingAppointments = localStorage.getItem("appointments");
    let appointments: Appointment[] = [];
    
    if (existingAppointments) {
      appointments = JSON.parse(existingAppointments);
    }

    // Add new appointment
    appointments.push(appointmentData);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    // Show success message
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${appointmentData.doctorName} has been scheduled for ${appointmentData.date} at ${appointmentData.time}.`,
    });

    // Navigate to appointments page
    navigate("/appointments");
  };

  const handlePaymentError = (error: any) => {
    toast({
      title: "Payment Failed",
      description: "There was an error processing your payment. Please try again.",
      variant: "destructive",
    });
    console.error("Payment error:", error);
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get available time slots for the selected date
  const getAvailableTimeSlots = () => {
    if (!selectedDoctor || !selectedDate) return [];
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    console.log("Selected date:", formattedDate); // Debug log
    console.log("Doctor availability:", selectedDoctor.availability); // Debug log
    const availability = selectedDoctor.availability.find(a => a.date === formattedDate);
    console.log("Found availability:", availability); // Debug log
    return availability?.slots || [];
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {showPayment ? (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complete Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Consultation Fee:</span>
                  <span className="font-semibold">₹500</span>
                </div>
                <Payment 
                  amount={500}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
                <Button 
                  variant="outline" 
                  onClick={() => setShowPayment(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Tabs defaultValue="find-doctor" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="find-doctor">Find Doctor</TabsTrigger>
            <TabsTrigger value="book-appointment">Book Appointment</TabsTrigger>
          </TabsList>

          <TabsContent value="find-doctor" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by doctor name or specialization..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-lg",
                    selectedDoctor?.id === doctor.id && "ring-2 ring-blue-500"
                  )}
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setActiveTab("book-appointment");
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-sm text-gray-500">{doctor.specialization}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-500">{doctor.experience}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-yellow-500">★ {doctor.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="book-appointment">
            <form onSubmit={handleSubmit} className="space-y-6">
              {selectedDoctor && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                        <img
                          src={selectedDoctor.image}
                          alt={selectedDoctor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{selectedDoctor.name}</h3>
                        <p className="text-sm text-gray-500">{selectedDoctor.specialization}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setSelectedTime(undefined); // Reset time when date changes
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Select Time</Label>
                  <Select 
                    value={selectedTime} 
                    onValueChange={setSelectedTime}
                    disabled={!selectedDate}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableTimeSlots().length > 0 ? (
                        getAvailableTimeSlots().map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-slots" disabled>
                          No slots available for this date
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        className="pl-10"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Visit</Label>
                  <div className="relative">
                    <Stethoscope className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="reason"
                      placeholder="Brief reason for your visit"
                      className="pl-10"
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptoms (Optional)</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Describe your symptoms..."
                    value={formData.symptoms}
                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Book Appointment
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default BookAppointment; 