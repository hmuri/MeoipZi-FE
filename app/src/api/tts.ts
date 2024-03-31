import axios from 'axios';

// Base64 문자열을 Blob 객체로 변환하는 함수
export const base64ToBlob = (base64: string, mimeType: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: mimeType});
};

// Google TTS API를 호출하는 함수
export const getTTSpeech = async (text: string | undefined, voiceType: string) => {
  const data = {
    input: { text },
    voice: { languageCode: "ko-KR", ssmlGender: voiceType === "FEMALE_VOICE" ? "FEMALE" : "MALE" },
    audioConfig: { audioEncoding: "MP3" },
  };

  try {
    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_GOOGLE_API_URL}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const audioBlob = base64ToBlob(response.data.audioContent, 'audio/mp3');
    const audioUrl = URL.createObjectURL(audioBlob);
    return audioUrl;
  } catch (error) {
    console.error('TTS error:', error);
    throw new Error("Text-to-Speech 변환 중 오류가 발생했습니다.");
  }
};
