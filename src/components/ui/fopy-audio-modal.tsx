import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, Check, Download } from "lucide-react";
import { useState } from "react";
import { FopyStates, type FopyState } from "./fopy-states";
import { cn } from "@/lib/utils";
import { startRecording, stopRecording, createDownloadLink } from "@/lib/audio-converter";

interface FopyAudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAudioCaptured: (audioBlob: Blob) => void;
}

const stateMessages = {
  idle: {
    title: "¿En qué puedo ayudarte?",
    description: "Presiona el botón y habla con naturalidad"
  },
  listening: {
    title: "Te escucho...",
    description: "Di algo como &quot;Gasté 25 dólares en comida&quot;"
  },
  thinking: {
    title: "Procesando...",
    description: "Dame un momento para procesar tu mensaje"
  },
  celebrating: {
    title: "¡Listo!",
    description: "He registrado tu transacción"
  }
};

export function FopyAudioModal({ isOpen, onClose, onAudioCaptured }: FopyAudioModalProps) {
  const [fopyState, setFopyState] = useState<FopyState>("idle");
  const [lastRecordingBlob, setLastRecordingBlob] = useState<Blob | null>(null);

  const handleStartRecording = async () => {
    try {
      await startRecording();
      setFopyState("listening");
    } catch (error) {
      console.error('Error al iniciar la grabación:', error);
      setFopyState("idle");
    }
  };

  const handleStopRecording = async () => {
    try {
      const audioBlob = await stopRecording();
      setFopyState("thinking");
      
      setLastRecordingBlob(audioBlob);
      onAudioCaptured(audioBlob);
      setFopyState("celebrating");
      
      setTimeout(() => {
        setFopyState("idle");
      }, 2000);
    } catch (error) {
      console.error('Error al detener la grabación:', error);
      setFopyState("idle");
    }
  };

  const handleDownload = () => {
    if (lastRecordingBlob) {
      createDownloadLink(lastRecordingBlob);
    }
  };

  const isRecording = fopyState === "listening";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="relative min-h-[500px] flex flex-col">
          <div className="flex-1 flex flex-col items-center pt-16 px-6">
            <div className="text-center space-y-2 mb-8">
              <p className="text-xl font-medium">
                {stateMessages[fopyState].title}
              </p>
              <p className="text-sm text-muted-foreground">
                {stateMessages[fopyState].description}
              </p>
            </div>

            <div className="z-10 flex flex-col items-center gap-4">
              {fopyState === "celebrating" ? (
                <>
                  <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center animate-in zoom-in duration-300">
                    <Check className="w-10 h-10 text-white animate-in zoom-in duration-300" />
                  </div>
                  {lastRecordingBlob && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleDownload}
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Descargar Audio
                    </Button>
                  )}
                </>
              ) : fopyState !== "thinking" && (
                <Button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={cn(
                    "w-20 h-20 rounded-full transition-all duration-300",
                    isRecording 
                      ? "bg-destructive hover:bg-destructive/90" 
                      : "bg-primary hover:bg-primary/90"
                  )}
                >
                  <Mic className={cn(
                    "w-8 h-8",
                    isRecording && "animate-pulse"
                  )} />
                </Button>
              )}

              {lastRecordingBlob && fopyState === "idle" && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDownload}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Descargar última grabación
                </Button>
              )}
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
            <FopyStates currentState={fopyState} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 