import AttackWindowManager from './AttackWindowManager.js';
import { API_BASE_URL } from '../config.js';

const VoiceManager = {
  onGenderDetected: null,

  startRecording(scene) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        const chunks = [];

        recorder.ondataavailable = e => chunks.push(e.data);

        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          VoiceManager.detectGender(blob, scene);
          stream.getTracks().forEach(track => track.stop());
        };

        recorder.start();
        scene.time.delayedCall(5000, () => recorder.stop());
      })
      .catch(err => console.error("🎤 Error al acceder al micrófono:", err));
  },

  detectGender(blob, scene) {
    const formData = new FormData();
    formData.append('file', blob, 'audio.wav');
    
    fetch(`${API_BASE_URL}/GenderDetector`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        const gender = data.gender;
        if (!gender) {
          console.error("⚠️ No se detectó género");
          scene.recordButtonGroup?.setVisible(true);
          return;
        }

        scene.recordButtonGroup?.setVisible(false);

        if (VoiceManager.onGenderDetected) {
          VoiceManager.onGenderDetected(scene, blob, gender);
        }
      })
      .catch(err => {
        console.error("❌ Error en llamada a GenderDetector:", err);
        scene.recordButtonGroup?.setVisible(true);
      });
  },

  sendBattle(blob, gender, scene, callback) {
    const formData = new FormData();
    formData.append('file', blob, 'audio.wav');
    formData.append('gender', gender);
    
    fetch(`${API_BASE_URL}/Battle`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (!data || !data.attack_animation) {
          console.error("❌ Respuesta inválida de la API de batalla:", data);
                
          const { width, height } = scene.scale;
          const errorText = scene.add.text(width / 2, height / 2, 'No se entendió el comando,\nintenta nuevamente.', {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#ffffff',
            backgroundColor: '#ff0000',
            padding: { x: 20, y: 10 },
            align: 'center'
          }).setOrigin(0.5).setDepth(200);
        
          scene.time.delayedCall(2000, () => {
            errorText.destroy();
            AttackWindowManager.hide(); 
            scene.recordButtonGroup?.setVisible(true);
            scene.enableRecordButton?.();
          });
        
          return;
        }



        callback?.(data);
      })
      .catch(err => {
        console.error("❌ Error en llamada a Battle:", err);
        scene.recordButtonGroup?.setVisible(true);
        scene.enableRecordButton?.();
        callback?.(null);
      });
  }
};

export default VoiceManager;
