'use client';

import { useEffect, useRef } from 'react';

export const QrScannerComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });

        videoRef.current!.srcObject = stream;
        await videoRef.current!.play();
        scanQRCode();

        window.addEventListener('beforeunload', () => {
          stream.getTracks().forEach((t) => t.stop());
        });
      } catch (err) {
        console.error('Camera access denied', err);
      }
    };

    const scanQRCode = () => {
      if (!('BarcodeDetector' in window)) {
        console.error('BarcodeDetector not supported');
        return;
      }

      const detector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });

      const loop = async () => {
        if (videoRef.current?.readyState === 4) {
          try {
            const codes = await detector.detect(videoRef.current);
            if (codes.length > 0) {
              window.location.href = codes[0].rawValue; // redirect
              return;
            }
          } catch (err) {
            console.error('QR detection failed', err);
          }
        }
        requestAnimationFrame(loop);
      };

      loop();
    };

    startCamera();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-3">
      <h1 className="text-[#09090B]">Ширээний QR код уншуулна уу</h1>
      <video ref={videoRef} className="w-[360px] h-[360px] rounded-3xl object-cover" autoPlay muted playsInline />
    </div>
  );
};
