import lamejs from 'lamejs';

let mediaRecorder = null;
let audioChunks = [];

export async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        echoCancellation: true
      }
    });

    audioChunks = [];
    mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm;codecs=opus'
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.start();
  } catch (error) {
    console.error('Error al iniciar la grabación:', error);
    throw error;
  }
}

export function stopRecording() {
  return new Promise((resolve, reject) => {
    if (!mediaRecorder) {
      reject(new Error('No hay grabación activa'));
      return;
    }

    mediaRecorder.onstop = async () => {
      try {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm;codecs=opus' });
        const mp3Blob = await convertToMp3(audioBlob);
        
        // Limpiamos las pistas de audio
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        
        resolve(mp3Blob);
      } catch (error) {
        console.error('Error al convertir el audio:', error);
        reject(error);
      }
    };

    mediaRecorder.stop();
  });
}

async function convertToMp3(audioBlob) {
  // Convertimos el blob a un ArrayBuffer
  const arrayBuffer = await audioBlob.arrayBuffer();
  // Convertimos el ArrayBuffer a un Float32Array
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
  // Configuración del MP3
  const mp3encoder = new lamejs.Mp3Encoder(1, audioBuffer.sampleRate, 128);
  const samples = new Int16Array(audioBuffer.length);
  
  // Convertimos los samples de Float32 a Int16
  const channel = audioBuffer.getChannelData(0);
  for (let i = 0; i < channel.length; i++) {
    samples[i] = channel[i] < 0 ? channel[i] * 0x8000 : channel[i] * 0x7FFF;
  }
  
  // Codificamos a MP3
  const mp3Data = [];
  const blockSize = 1152; // Este es el tamaño de bloque que lamejs espera
  
  for (let i = 0; i < samples.length; i += blockSize) {
    const sampleChunk = samples.subarray(i, i + blockSize);
    const mp3buf = mp3encoder.encodeBuffer(sampleChunk);
    if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
    }
  }
  
  // Finalizamos la codificación
  const mp3buf = mp3encoder.flush();
  if (mp3buf.length > 0) {
    mp3Data.push(mp3buf);
  }
  
  // Creamos un nuevo Blob con los datos MP3
  return new Blob(mp3Data, { type: 'audio/mp3' });
}

export function createDownloadLink(blob, filename = 'audio.mp3') {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
} 