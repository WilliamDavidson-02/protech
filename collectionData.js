import classicRing from "/classic_ring.png";
import classicBracelet from "/Custom Classic Gold.png";
import techRing from "/Ring Tech.png";
import techBracelet from "/Ring Tech 2.png";

// Vercel renames images for optimized urls, there for regular pathname dose not work it will return 404.

const collectionData = [
  [
    {
      img: classicRing,
      title: "Klassisk Ring",
      description: "Klassisk ring.",
    },
    {
      img: classicBracelet,
      title: "Klassiskt Armband",
      description: "Klassisk armband.",
    },
  ],
  [
    {
      img: techRing,
      title: "Tech Ring",
      description: "Senaste ringen med de senaste funktionerna.",
    },
    {
      img: techBracelet,
      title: "Tech Armband",
      description: "Senaste ringen med de senaste funktionerna.",
    },
  ],
];

export default collectionData;
