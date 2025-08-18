"use client";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useTexture,
  OrbitControls,
  Text,
  Environment,
  Float,
} from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Project Data with local placeholder images
const projects = [
  {
    id: 1,
    image: "/placeholder.svg", // Add this to public/images
    title: "Project Alpha",
    description: "A comprehensive full-stack application.",
    color: "#6366f1",
  },
  {
    id: 2,
    image: "/placeholder.svg", // Add this to public/images
    title: "Project Beta",
    description: "A dynamic and interactive front-end experience.",
    color: "#10b981",
  },
  {
    id: 3,
    image: "/placeholder.svg", // Add this to public/images
    title: "Project Gamma",
    description: "A responsive e-commerce platform.",
    color: "#f59e0b",
  },
  {
    id: 4,
    image: "/placeholder.svg", // Add this to public/images
    title: "Project Delta",
    description: "A mobile-first progressive web app.",
    color: "#3b82f6",
  },
  {
    id: 5,
    image: "/placeholder.svg", // Add this to public/images
    title: "Project Epsilon",
    description: "An AI-powered data visualization tool.",
    color: "#8b5cf6",
  },
  {
    id: 6,
    image: "/placeholder.svg", // Add this to public/images
    title: "Project Zeta",
    description: "A decentralized blockchain application.",
    color: "#ec4899",
  },
];

const ProjectCard = ({ position, image, title, color, className, active }) => {
  const meshRef = useRef();
  const [textureError, setTextureError] = useState(false);

  // Safely load texture with error handling
  const texture = useTexture(image, undefined, (error) => {
    console.error("Failed to load texture:", image, error);
    setTextureError(true);
  });

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <motion.group
      ref={meshRef}
      position={position}
      className={className}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{
        scale: active ? 1.1 : 0.9,
        opacity: 1,
      }}
      transition={{ duration: 0.8, ease: "back.out" }}
    >
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[10, 6, 0.5]} />
          {textureError || !texture ? (
            <meshStandardMaterial
              color={color}
              roughness={0.2}
              metalness={0.1}
            />
          ) : (
            <meshStandardMaterial
              map={texture}
              roughness={0.2}
              metalness={0.1}
            />
          )}
        </mesh>

        {active && (
          <mesh position={[0, 0, -0.6]}>
            <planeGeometry args={[10.5, 6.5]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.3}
              toneMapped={false}
            />
          </mesh>
        )}
      </Float>

      <Text
        position={[0, -4.5, 0]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineColor="black"
        outlineWidth={0.02}
      >
        {title}
      </Text>
    </motion.group>
  );
};

const Scene = ({ setCameraReady, activeProject }) => {
  const cameraRef = useRef();
  const controlsRef = useRef();

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <>
      <perspectiveCamera
        ref={(ref) => {
          cameraRef.current = ref;
          if (ref) setCameraReady(true);
        }}
        position={[0, 0, 40]}
        fov={45}
        near={0.1}
        far={1000}
        makeDefault
      />

      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 20, 15]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        maxDistance={60}
        minDistance={15}
      />

      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          className={`card-${index + 1}`}
          position={[index % 2 === 0 ? -12 : 12, 0, index * -15]}
          image={project.image}
          title={project.title}
          color={project.color}
          active={activeProject === index}
        />
      ))}
    </>
  );
};

const Projects3D = () => {
  const containerRef = useRef();
  const [cameraReady, setCameraReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(0);
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      if (!containerRef.current || !cameraReady) return;

      setLoading(false);

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress * (projects.length - 1);
          setProgress(progress);
          setActiveProject(Math.floor(progress));
        },
      });

      return () => st.kill();
    },
    { scope: containerRef, dependencies: [cameraReady] }
  );

  useGSAP(
    () => {
      if (!cameraReady) return;

      const currentProject = Math.floor(progress);
      const progressInSection = progress % 1;

      const startPos = [
        currentProject % 2 === 0 ? -12 : 12,
        0,
        currentProject * -15,
      ];

      const endPos = [
        (currentProject + 1) % 2 === 0 ? -12 : 12,
        0,
        (currentProject + 1) * -15,
      ];

      const camX = gsap.utils.interpolate(
        startPos[0],
        endPos[0],
        progressInSection
      );
      const camY = gsap.utils.interpolate(
        startPos[1],
        endPos[1],
        progressInSection
      );
      const camZ = gsap.utils.interpolate(
        startPos[2] + 30,
        endPos[2] + 30,
        progressInSection
      );

      gsap.to(".camera", {
        x: camX * 0.5,
        y: camY + 5,
        z: camZ,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    { dependencies: [progress] }
  );

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen relative bg-black overflow-hidden"
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-white z-50">
          <div className="text-center">
            <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto mb-4">
              <motion.div
                className="h-full bg-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <p className="text-xl font-light animate-pulse">
              Loading 3D Experience
            </p>
          </div>
        </div>
      )}

      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center text-white">
            Loading 3D assets...
          </div>
        }
      >
        <Canvas shadows>
          <Scene
            setCameraReady={setCameraReady}
            activeProject={activeProject}
          />
        </Canvas>
      </Suspense>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
        <motion.div
          className="bg-black bg-opacity-70 backdrop-blur-sm rounded-xl p-6 max-w-md"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">
            {projects[activeProject]?.title}
          </h3>
          <p className="text-gray-300">
            {projects[activeProject]?.description}
          </p>
          <div className="mt-4 flex space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === activeProject ? "bg-white w-6" : "bg-gray-600 w-3"
                }`}
                onClick={() => {
                  window.scrollTo({
                    top: (index / (projects.length - 1)) * 3000,
                    behavior: "smooth",
                  });
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects3D;
