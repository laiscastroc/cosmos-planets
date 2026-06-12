CREATE TABLE IF NOT EXISTS planets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  type VARCHAR(60) NOT NULL,
  star_system VARCHAR(150) NOT NULL,
  distance_from_sun VARCHAR(60) NOT NULL,
  diameter INTEGER,
  moons INTEGER NOT NULL DEFAULT 0,
  orbital_period REAL NOT NULL,
  surface_temp INTEGER NOT NULL,
  description TEXT NOT NULL,
  short_desc VARCHAR(255) NOT NULL,
  curiosity_tag VARCHAR(60) NOT NULL,
  glow_color VARCHAR(20) NOT NULL,
  has_rings BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  img_url VARCHAR(255)
);

INSERT INTO planets (
  name,
  type,
  star_system,
  distance_from_sun,
  diameter,
  moons,
  orbital_period,
  surface_temp,
  description,
  short_desc,
  curiosity_tag,
  glow_color,
  has_rings,
  img_url
)
VALUES
  (
    'GJ 504b',
    'Gasoso',
    'Sistema GJ 504 - 57 anos-luz',
    '57 anos-luz',
    130000,
    0,
    160,
    237,
    'O "planeta rosa" e um gigante gasoso jovem com temperatura de aproximadamente 237 graus Celsius.',
    'Cor rosa magenta real causada pela temperatura jovem de sua superficie.',
    'O planeta rosa',
    '#e75480',
    FALSE,
    '/imagens/prosa.png'
  ),
  (
    'TrES-2b',
    'Gasoso',
    'Sistema TrES-2 - 750 anos-luz',
    '750 anos-luz',
    145000,
    0,
    0.0068,
    980,
    'O planeta mais escuro ja descoberto: reflete menos de 1% da luz que recebe.',
    'Reflete menos de 1% da luz, mais escuro que qualquer substancia conhecida.',
    'O mais escuro',
    '#ff4500',
    FALSE,
    '/imagens/trES2b.webp'
  ),
  (
    '55 Cancri e',
    'Rochoso',
    'Sistema 55 Cancri - 41 anos-luz',
    '41 anos-luz',
    19000,
    0,
    0.0048,
    2573,
    'O planeta de diamante pode ter carbono comprimido por pressoes e temperaturas extremas.',
    'Possivelmente feito de diamante: carbono comprimido a pressoes extremas.',
    'O diamante',
    '#a0d8ef',
    FALSE,
    '/imagens/55cancrie.jpg'
  ),
  (
    'HAT-P-7b',
    'Gasoso',
    'Sistema HAT-P-7 - 1040 anos-luz',
    '1040 anos-luz',
    170000,
    0,
    0.0055,
    2860,
    'Os minerais de corindon podem condensar na atmosfera e precipitar como chuva de pedras preciosas.',
    'Chuvas de safiras e rubis: minerais preciosos que condensam na atmosfera.',
    'Chuva de cristais',
    '#4169e1',
    FALSE,
    '/imagens/hatp7b.jpg'
  ),

('WASP-12b', 'Gasoso', 'Sistema WASP-12 · 1400 anos-luz', '1400 anos-luz', 194000, 0, 0.003, 2200,'Um planeta sendo lentamente devorado por sua estrela. A gravidade da estrela está arrancando a atmosfera de WASP-12b, que perderá toda sua massa em apenas 3 milhões de anos.', 'Está sendo devorado pela sua própria estrela e desaparecerá em 3 milhões de anos.', 'Devorado', '#ff8c00', FALSE, '/imagens/WASP12b.jpg'),

('Kepler-16b', 'Gasoso', 'Sistema Kepler-16 · 245 anos-luz', '245 anos-luz',96000, 0, 0.64, -100, 'O planeta de duas estrelas: orbita dois sóis ao mesmo tempo, tal como Tatooine de Star Wars. No céu, dois pores do sol ocorrem a cada dia.', 'Orbita dois sóis simultaneamente — o Tatooine real do universo.','Dois sóis', '#f5c518', FALSE, '/imagens/Kepler16.jpg'),

('GJ 1214b', 'Mundo de Água', 'Sistema GJ 1214 · 40 anos-luz', '40 anos-luz', 25000, 0, 0.038, 120, 'Um planeta praticamente inteiro de água: estima-se que seja coberto por um oceano profundo de milhares de quilômetros. Nenhuma terra firme — só água em todos os estados.', 'Coberto por água com milhares de km de profundidade.','Oceânico', '#00bfff', FALSE,  '/imagens/GJ1214.png' ),

('PSR 1257+12 b', 'Planeta Pulsar', 'Pulsar PSR 1257+12 · 2300 anos-luz', '2300 anos-luz', 4200, 0, 0.22, -200, 'O primeiro exoplaneta confirmado da história (1992). Orbita um pulsar — uma estrela de nêutrons morta que emite radiação letal. É bombardeado constantemente por radiação intensa.', 'O primeiro exoplaneta descoberto: orbita uma estrela de nêutrons morta.','O primeiro', '#7fff00', FALSE,  '/imagens/PSR.jpg')
  
ON CONFLICT (name) DO UPDATE SET
  type = EXCLUDED.type,
  star_system = EXCLUDED.star_system,
  distance_from_sun = EXCLUDED.distance_from_sun,
  diameter = EXCLUDED.diameter,
  moons = EXCLUDED.moons,
  orbital_period = EXCLUDED.orbital_period,
  surface_temp = EXCLUDED.surface_temp,
  description = EXCLUDED.description,
  short_desc = EXCLUDED.short_desc,
  curiosity_tag = EXCLUDED.curiosity_tag,
  glow_color = EXCLUDED.glow_color,
  has_rings = EXCLUDED.has_rings,
  img_url = EXCLUDED.img_url;
