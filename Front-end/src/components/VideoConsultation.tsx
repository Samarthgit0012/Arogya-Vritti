import React, { useState, useRef, useEffect } from "react";
import { Camera, Mic, MicOff, Video, VideoOff, MessageSquare, FileText, Share2, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoConsultationProps {
  appointmentId: string;
  doctorName: string;
  patientName: string;
  onEndCall: () => void;
}

const VideoConsultation: React.FC<VideoConsultationProps> = ({
  appointmentId,
  doctorName,
  patientName,
  onEndCall,
}) => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; message: string; timestamp: Date }>>([]);
  const [newMessage, setNewMessage] = useState("");
  // const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Commented out for development
    /*
    const initializeStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setError("Unable to access camera and microphone. Please check your permissions.");
      }
    };

    initializeStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    */
  }, []);

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    // Commented out for development
    /*
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled;
        setIsVideoEnabled(!isVideoEnabled);
      }
    }
    */
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    // Commented out for development
    /*
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled;
        setIsAudioEnabled(!isAudioEnabled);
      }
    }
    */
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          sender: patientName,
          message: newMessage,
          timestamp: new Date()
        }
      ]);
      setNewMessage("");
    }
  };

  const shareScreen = async () => {
    // Commented out for development
    /*
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = screenStream;
      }
    } catch (err) {
      console.error("Error sharing screen:", err);
      setError("Unable to share screen. Please check your permissions.");
    }
    */
    alert("Screen sharing is disabled in development mode");
  };

  if (error) {
    return (
      <div className="flex h-screen bg-gray-900 items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg text-white text-center">
          <h2 className="text-xl font-semibold mb-4">Error</h2>
          <p className="mb-4">{error}</p>
          <Button onClick={onEndCall} className="bg-red-600 hover:bg-red-700">
            End Call
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Main Video Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 relative bg-gray-800">
          {/* Placeholder for video */}
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <p className="text-xl">Video consultation in development mode</p>
          </div>
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
            <p className="font-semibold">Dr. {doctorName}</p>
            <p className="text-sm">Consultation in progress</p>
          </div>
        </div>

        {/* Control Bar */}
        <div className="bg-gray-800 p-4 flex justify-center items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleAudio}
            className="text-white hover:bg-gray-700"
          >
            {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleVideo}
            className="text-white hover:bg-gray-700"
          >
            {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="text-white hover:bg-gray-700"
          >
            <MessageSquare className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPrescriptionOpen(!isPrescriptionOpen)}
            className="text-white hover:bg-gray-700"
          >
            <FileText className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={shareScreen}
            className="text-white hover:bg-gray-700"
          >
            <Share2 className="w-6 h-6" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={onEndCall}
            className="bg-red-600 hover:bg-red-700"
          >
            <PhoneOff className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Chat Sidebar */}
      {isChatOpen && (
        <div className="w-80 bg-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">Chat</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4" ref={chatRef}>
            {chatMessages.map((msg, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">{msg.sender}</span>
                  <span className="text-xs text-gray-400">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-200 bg-gray-700 rounded-lg p-2">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
                Send
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Prescription Sidebar */}
      {isPrescriptionOpen && (
        <div className="w-80 bg-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">Prescription</h3>
          </div>
          <div className="flex-1 p-4">
            <div className="bg-gray-700 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">Current Medications</h4>
              <p className="text-gray-300">No medications prescribed yet</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Notes</h4>
              <textarea
                className="w-full bg-gray-600 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Add consultation notes..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoConsultation; 