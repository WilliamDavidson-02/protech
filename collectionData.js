import classicRing from "/Preview_Classic_Gold.png";
import classicBracelet from "/Classy_Gold.png";
import techRing from "/Preview_Tech_Black.png";
import techBracelet from "/Tech_Dark.png";

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
