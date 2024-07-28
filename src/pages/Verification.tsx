import React, { useState, useRef, useEffect } from 'react';

const questions = [
  "Wave your hand.",
  "Show your left hand.",
  "Touch your nose.",
  "Blink three times."
];

function shuffleArray(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

export default function Verification() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isRecording && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          videoRef.current!.srcObject = stream;
          const recorder = new MediaRecorder(stream);
          recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              setRecordedChunks(prev => [...prev, event.data]);
            }
          };
          recorder.start();
          setMediaRecorder(recorder);
        })
        .catch(error => {
          console.error("Error accessing media devices.", error);
        });
    } else {
      if (mediaRecorder) {
        mediaRecorder.stop();
        videoRef.current!.srcObject?.getTracks().forEach(track => track.stop());
        setMediaRecorder(null);
      }
    }
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsPreview(false);
    setRecordedChunks([]);
    setShuffledQuestions(shuffleArray(questions));
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPreview(true);
  };

  const handleSaveRecording = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'verification_video.webm';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-8 m-8 lg:px-8">
      <h1 className="text-2xl font-bold text-center mb-8 text-primary">Video Verification</h1>
      <div className="flex gap-8">
        <div className="flex-1">
          <video ref={videoRef} autoPlay muted={!isPreview} className={`w-full h-64 border rounded-md mb-4 ${isRecording ? 'border-red-500' : 'border-gray-300'}`} />
          {isPreview && recordedChunks.length > 0 && (
            <video ref={previewRef} controls className="w-full h-64 border rounded-md mb-4">
              <source src={URL.createObjectURL(new Blob(recordedChunks, { type: 'video/webm' }))} type="video/webm" />
            </video>
          )}
          {!isRecording && !isPreview && (
            <button
              onClick={handleStartRecording}
              className="px-6 py-2 font-semibold text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Start Verification
            </button>
          )}
          {isRecording && (
            <button
              onClick={handleStopRecording}
              className="px-6 py-2 font-semibold text-white bg-red-500 border border-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Stop Recording
            </button>
          )}
          {isPreview && (
            <>
              <button
                onClick={handleStartRecording}
                className="px-6 py-2 font-semibold text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Start New Recording
              </button>
              <button
                onClick={handleSaveRecording}
                className="px-6 py-2 font-semibold text-white bg-green-500 border border-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 ml-4"
              >
                Save Recording
              </button>
            </>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Verification Questions</h2>
          <ul className="list-decimal pl-5 space-y-2">
            {shuffledQuestions.map((question, index) => (
              <li key={index} className="text-lg">{question}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
