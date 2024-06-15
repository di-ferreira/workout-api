type strArr = string[];

type SearchParams = {
  page?: number;
  limit?: number;
};

interface iList<T> {
  per_page: number;
  total_registers: number;
  current_page: number;
  data: T[];
}

const muscleGroups = {
  abductors: 'abdutores',
  adductors: 'adutores',
  cardiovascular_system: 'sistema cardiovascular',
  delts: 'deltoides',
  glutes: 'glúteos',
  lats: 'dorsais',
  levator_scapulae: 'elevador da escápula',
  pectorals: 'peitorais',
  quads: 'quadríceps',
  serratus_anterior: 'serrátil anterior',
  spine: 'coluna vertebral',
  upper_back: 'parte superior das costas',
  neck: 'pescoço',
  trapezius: 'trapézio',
  back: 'costas',
  erector_spinae: 'eretor da espinha',
  biceps: 'bíceps',
  triceps: 'tríceps',
  forearm: 'antebraço',
  abs_core: 'abdômen/core',
  leg: 'perna',
  calf: 'panturrilha',
  hips: 'quadris',
  cardio: 'cardio',
  full_body: 'full body',
} as const;

type tMuscleGroups = keyof typeof muscleGroups;

const equipments = {
  assisted: 'assistido',
  band: 'faixa',
  barbell: 'barra',
  body_weight: 'peso corporal',
  bosu_ball: 'bola bosu',
  cable: 'cabo',
  dumbbell: 'halter',
  elliptical_machine: 'máquina elíptica',
  ez_barbell: 'barra w',
  hammer: 'martelo',
  kettlebell: 'kettlebell',
  leverage_machine: 'máquina de alavanca',
  medicine_ball: 'bola medicinal',
  olympic_barbell: 'barra olímpica',
  resistance_band: 'faixa de resistência',
  roller: 'rolo',
  rope: 'corda',
  skierg_machine: 'máquina skierg',
  sled_machine: 'máquina de trenó',
  smith_machine: 'máquina smith',
  stability_ball: 'bola de estabilidade',
  stationary_bike: 'bicicleta estacionária',
  stepmill_machine: 'máquina de escada',
  tire: 'pneu',
  trap_bar: 'barra hexagonal',
  upper_body_ergometer: 'ergômetro de parte superior do corpo',
  weighted: 'com peso',
  wheel_roller: 'rolo de roda',
} as const;

type tEquipment = keyof typeof equipments;
