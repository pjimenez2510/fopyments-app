import { useState } from "react";
import { FloatingButton } from "@/components/ui/floating-button";
import { FopyAudioModal } from "@/components/ui/fopy-audio-modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AudioService } from "@/features/audio/services/audio.service";

export function AudioRecorder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const audioService = AudioService.getInstance();

  const handleAudioCaptured = async (audioBlob: Blob) => {
    try {
      setIsProcessing(true);
      const response = await audioService.sendAudio(audioBlob);

      toast.success("Audio procesado con éxito", {
        description: "Tu audio ha sido procesado correctamente"
      });

      console.log(response);

      if (response.formData) {
        const { path, schema } = response.formData;
        router.push(`/management/${path}/create?data=${encodeURIComponent(JSON.stringify(schema))}`);
      }
    } catch (error) {
      console.error("Error al procesar el audio:", error);
      toast.error("Error al procesar el audio", {
        description: "Por favor, intenta nuevamente más tarde"
      });
    } finally {
      setIsProcessing(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <FloatingButton onClick={() => setIsModalOpen(true)} />
      <FopyAudioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAudioCaptured={handleAudioCaptured}
        isProcessing={isProcessing}
      />
    </>
  );
}