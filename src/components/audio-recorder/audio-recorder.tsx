import { useState } from "react";
import { FloatingButton } from "@/components/ui/floating-button";
import { FopyAudioModal } from "@/components/ui/fopy-audio-modal";

export function AudioRecorder() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAudioCaptured = (audioBlob: Blob) => {
    // Aquí procesaremos el audio capturado
    console.log("Audio capturado:", audioBlob);
    // TODO: Implementar la lógica para procesar el audio y crear el recurso financiero
  };

  return (
    <>
      <FloatingButton onClick={() => setIsModalOpen(true)} />
      <FopyAudioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAudioCaptured={handleAudioCaptured}
      />
    </>
  );
} 