import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    const particleCount = 10000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * 500;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * 500;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * 500;

      velocities[i * 3] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;

      sizes[i] = Math.random() * 5 + 1;  // Bigger particle sizes
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load('https://your-circular-particle-texture.png'); // Replace with your circular particle texture URL

    const particleMaterial = new THREE.PointsMaterial({
      size: 10,  // Adjust size as needed
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 1000;

    let mouseX = 0, mouseY = 0;
    let attractionTimeout = null;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      if (attractionTimeout) {
        clearTimeout(attractionTimeout);
      }

      attractionTimeout = setTimeout(() => {
        for (let i = 0; i < particleCount; i++) {
          velocities[i * 3] = (Math.random() - 0.5) * 0.1;
          velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
          velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
        }
      }, 2000);
    };

    const animate = function () {
      requestAnimationFrame(animate);

      const positions = particles.attributes.position.array;
      const velocities = particles.attributes.velocity.array;

      for (let i = 0; i < particleCount; i++) {
        const index = i * 3;

        const dx = mouseX * 500 - positions[index];
        const dy = mouseY * 500 - positions[index + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          velocities[index] += (dy * 0.1 - dx * 0.1) * 0.05;
          velocities[index + 1] += (dx * 0.1 - dy * 0.1) * 0.05;
        }

        positions[index] += velocities[index];
        positions[index + 1] += velocities[index + 1];
        positions[index + 2] += velocities[index + 2];

        velocities[index] *= 0.95;
        velocities[index + 1] *= 0.95;
        velocities[index + 2] *= 0.95;
      }

      particles.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      currentMount.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default ThreeScene;
