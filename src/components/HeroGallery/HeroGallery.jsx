import './HeroGallery.css';

const charactersData = [
  { id: 1, name: "Warrior", role: "Frontline Fighter", description: "A mighty warrior skilled in melee combat, wielding massive weapons with incredible strength.", strength: "95", agility: "70", intelligence: "45", defense: "90", abilities: ["Whirlwind Slash", "Battle Cry", "Shield Block"], image: "https://assets.codepen.io/16327/portrait-number-01.png" },
  { id: 2, name: "Mage", role: "Arcane Spellcaster", description: "Master of the arcane arts, able to manipulate reality itself. Wields powerful spells.", strength: "30", agility: "60", intelligence: "100", defense: "50", abilities: ["Fireball", "Frost Nova", "Teleport"], image: "https://assets.codepen.io/16327/portrait-number-02.png" },
  { id: 3, name: "Archer", role: "Ranged Marksman", description: "Precise and deadly from afar, the archer can hit targets at incredible distances.", strength: "60", agility: "95", intelligence: "55", defense: "65", abilities: ["Piercing Arrow", "Multi-Shot", "Eagle Eye"], image: "https://assets.codepen.io/16327/portrait-number-03.png" },
  { id: 4, name: "Assassin", role: "Shadow Killer", description: "Silent and swift, assassins strike from the shadows. Experts in poison and critical attacks.", strength: "65", agility: "100", intelligence: "70", defense: "45", abilities: ["Stealth", "Backstab", "Poison Blade"], image: "https://assets.codepen.io/16327/portrait-number-04.png" },
  { id: 5, name: "Priest", role: "Divine Healer", description: "Holy servant who channels divine power to heal allies and smite undead.", strength: "40", agility: "45", intelligence: "85", defense: "60", abilities: ["Heal", "Blessing", "Purify"], image: "https://assets.codepen.io/16327/portrait-number-05.png" },
  { id: 6, name: "Paladin", role: "Holy Knight", description: "Righteous warriors combining martial prowess with holy magic.", strength: "85", agility: "55", intelligence: "60", defense: "95", abilities: ["Divine Shield", "Holy Light", "Judgment"], image: "https://assets.codepen.io/16327/portrait-number-06.png" },
  { id: 7, name: "Druid", role: "Nature's Guardian", description: "Masters of nature magic who can shape-shift into beasts.", strength: "70", agility: "75", intelligence: "80", defense: "70", abilities: ["Bear Form", "Healing Touch", "Entangling Roots"], image: "https://assets.codepen.io/16327/portrait-number-07.png" }
];

const HeroGallery = () => {
  return (
    <div className="hero-gallery-wrapper">
      <div className="hero-gallery-content">
        <div className="hero-gallery-banner">
          <div className="hero-banner-text">
            <h3>✨ EPIC CHARACTERS ✨</h3>
            <p>Discover the <span className="highlight">legendary warriors</span> from ancient realms</p>
            <p>Each hero carries a <span className="highlight">unique power</span> waiting to be unleashed</p>
            <p>Join the adventure and <span className="highlight">claim your destiny</span> today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroGallery;