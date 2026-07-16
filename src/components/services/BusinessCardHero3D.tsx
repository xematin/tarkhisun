import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/**
 * Builds a CanvasTexture that looks like the face of an Iranian business card.
 */
function useCardTexture(face: "front" | "back") {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 640;
    const ctx = c.getContext("2d")!;

    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, 1024, 640);
    if (face === "front") {
      grad.addColorStop(0, "#0b4a3a");
      grad.addColorStop(0.55, "#0d7a5f");
      grad.addColorStop(1, "#1e3a5f");
    } else {
      grad.addColorStop(0, "#0a2540");
      grad.addColorStop(1, "#0b4a3a");
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 640);

    // Subtle diagonal sheen lines
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    for (let i = -640; i < 1024; i += 18) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 640, 640);
      ctx.stroke();
    }

    // Gold border
    ctx.strokeStyle = "#c9a84c";
    ctx.lineWidth = 6;
    ctx.strokeRect(24, 24, 1024 - 48, 640 - 48);

    // RTL Persian text
    ctx.direction = "rtl";
    ctx.textAlign = "right";
    ctx.fillStyle = "#ffffff";

    if (face === "front") {
      // Top header
      ctx.font = "bold 56px 'Bonyade Koodak', 'Noto Sans Arabic', Tahoma, sans-serif";
      ctx.fillStyle = "#ffd877";
      ctx.fillText("کارت بازرگانی", 980, 110);

      ctx.font = "28px 'Bonyade Koodak', 'Noto Sans Arabic', Tahoma, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText("اتاق بازرگانی، صنایع، معادن و کشاورزی ایران", 980, 160);

      // Card number block
      ctx.font = "bold 44px 'Courier New', monospace";
      ctx.direction = "ltr";
      ctx.textAlign = "left";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("IR-1405-8821-4736", 70, 360);

      ctx.font = "20px 'Courier New', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.fillText("VALID  ۱۴۰۵ / ۰۶  →  ۱۴۰۶ / ۰۶", 72, 395);

      // Holder
      ctx.direction = "rtl";
      ctx.textAlign = "right";
      ctx.font = "28px 'Bonyade Koodak', 'Noto Sans Arabic', Tahoma, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fillText("صادر شده برای: شرکت بازرگانی نمونه", 980, 470);

      ctx.font = "22px 'Bonyade Koodak', 'Noto Sans Arabic', Tahoma, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillText("کد اقتصادی: 411 263 489 552", 980, 510);

      // Gold hologram chip
      const chipGrad = ctx.createLinearGradient(70, 200, 220, 290);
      chipGrad.addColorStop(0, "#fff1b8");
      chipGrad.addColorStop(0.5, "#c9a84c");
      chipGrad.addColorStop(1, "#7a5e1f");
      ctx.fillStyle = chipGrad;
      ctx.fillRect(70, 200, 150, 110);
      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.lineWidth = 2;
      for (let y = 215; y < 305; y += 15) {
        ctx.beginPath();
        ctx.moveTo(80, y);
        ctx.lineTo(210, y);
        ctx.stroke();
      }

      // Bottom: logo circle
      ctx.beginPath();
      ctx.arc(110, 560, 38, 0, Math.PI * 2);
      ctx.fillStyle = "#c9a84c";
      ctx.fill();
      ctx.fillStyle = "#0a2540";
      ctx.font = "bold 30px 'Bonyade Koodak', 'Noto Sans Arabic', Tahoma, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("ت", 110, 572);

      ctx.textAlign = "right";
      ctx.font = "22px 'Bonyade Koodak', 'Noto Sans Arabic', Tahoma, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fillText("ترخیصان | صدور و تمدید کارت بازرگانی", 980, 575);
    } else {
      // Back face
      // Magstripe
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(0, 90, 1024, 90);

      ctx.font = "26px 'Bonyade Koodak', 'Noto Sans Arabic', Tahoma, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fillText("این کارت متعلق به اتاق بازرگانی ایران است", 980, 260);
      ctx.fillText("در صورت یافتن لطفاً به نزدیک‌ترین شعبه تحویل دهید", 980, 305);

      // Signature strip
      ctx.fillStyle = "#f4f1e6";
      ctx.fillRect(70, 380, 720, 70);
      ctx.strokeStyle = "rgba(0,0,0,0.15)";
      ctx.strokeRect(70, 380, 720, 70);
      ctx.fillStyle = "#1a1a1a";
      ctx.font = "italic 36px 'Brush Script MT', cursive";
      ctx.textAlign = "left";
      ctx.fillText("Authorized Signature", 90, 425);

      // QR-like square
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(820, 380, 130, 130);
      ctx.fillStyle = "#0a2540";
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          if (Math.random() > 0.5) {
            ctx.fillRect(820 + x * 13, 380 + y * 13, 13, 13);
          }
        }
      }
    }

    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 8;
    tex.needsUpdate = true;
    return tex;
  }, [face]);
}

function BusinessCard() {
  const ref = useRef<THREE.Group>(null);
  const front = useCardTexture("front");
  const back = useCardTexture("back");

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.35;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
  });

  // BoxGeometry face order: +X, -X, +Y, -Y, +Z, -Z. Card face is +Z (front), -Z (back).
  const materials = useMemo(() => {
    const edge = new THREE.MeshPhysicalMaterial({
      color: "#0a3528",
      metalness: 0.7,
      roughness: 0.35,
      clearcoat: 0.6,
    });
    const frontMat = new THREE.MeshPhysicalMaterial({
      map: front,
      metalness: 0.55,
      roughness: 0.28,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
    });
    const backMat = new THREE.MeshPhysicalMaterial({
      map: back,
      metalness: 0.5,
      roughness: 0.32,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
    });
    return [edge, edge, edge, edge, frontMat, backMat];
  }, [front, back]);

  return (
    <group ref={ref} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <mesh material={materials} castShadow receiveShadow>
        <boxGeometry args={[3.4, 2.1, 0.08]} />
      </mesh>
    </group>
  );
}

function ResponsiveScene() {
  const { viewport } = useThree();
  // Card width is 3.4 units; fit with comfortable padding
  const s = Math.min(1, viewport.width / 4.6);
  return (
    <group scale={s}>
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.8}>
        <BusinessCard />
      </Float>
      <Sparkles
        count={40}
        size={3}
        scale={[6, 4, 3]}
        speed={0.4}
        color="#c9a84c"
        opacity={0.7}
      />
    </group>
  );
}

const BusinessCardHero3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 4]} intensity={1.4} color="#fff4d6" />
      <pointLight position={[-4, -2, 3]} intensity={0.9} color="#5cbdb9" />
      <pointLight position={[3, 3, -3]} intensity={0.6} color="#c9a84c" />

      <Suspense fallback={null}>
        <ResponsiveScene />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
};

export default BusinessCardHero3D;

