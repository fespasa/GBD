export const questionsData = {
  adults: [
    // NIVEL A - Emergencia crítica (Bloque 1)
    {
      id: "adults_a1",
      text: "¿Presenta debilidad súbita o entumecimiento, especialmente en un lado del cuerpo?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      stopOnYes: true
    },
    {
      id: "adults_a2",
      text: "¿Tiene dificultad para hablar o entender, o visión borrosa o doble de repente?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      stopOnYes: true
    },
    {
      id: "adults_a3",
      text: "¿Tiene dificultad severa para respirar (cuesta que entre y salga el aire, con ruidos respiratorios)?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      stopOnYes: true
    },
    {
      id: "adults_a4",
      text: "¿Ha tenido pérdida de conciencia o desmayo, convulsiones o ataques?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      stopOnYes: true
    },
    {
      id: "adults_a5",
      text: "¿Tiene dolor de cabeza muy intenso, experimentado así por primera vez?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      stopOnYes: true
    },
    {
      id: "adults_a6",
      text: "¿Tiene sangrado abundante que no cede (por herida, corte, metrorragia, etc.)?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      stopOnYes: true
    },
    {
      id: "adults_a7",
      text: "¿Tiene dolor intenso en el pecho, especialmente si se extiende al brazo o mandíbula?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      stopOnYes: true
    },
    {
      id: "adults_a8",
      text: "¿Ha tenido un golpe en la cabeza o un golpe importante y toma medicación anticoagulante?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      stopOnYes: true
    },
    
    // NIVEL B - Urgencia moderada (Bloque 2)
    {
      id: "adults_b1",
      text: "¿Tiene dificultad para respirar (cuesta un poco más de lo habitual, con algún ruido)?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      stopOnYes: false
    },
    {
      id: "adults_b2",
      text: "¿Tiene latidos rápidos o irregulares del corazón, sin dolor en el pecho?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      stopOnYes: false
    },
    {
      id: "adults_b3",
      text: "¿Tiene una quemadura pequeña y no severa?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      stopOnYes: false
    },
    {
      id: "adults_b4",
      text: "¿Tiene dolor de cabeza muy fuerte, pero sin síntomas neurológicos (como debilidad)?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      stopOnYes: false
    },
    {
      id: "adults_b5",
      text: "¿Tiene reacción alérgica leve (ronchas o picazón)?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      stopOnYes: false
    },
    {
      id: "adults_b6",
      text: "¿Tiene presión arterial alta o baja, o azúcar en sangre alta o baja, pero se siente bien?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      stopOnYes: false
    },
    {
      id: "adults_b7",
      text: "¿Tiene vértigo o mareos?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      stopOnYes: false
    },
    {
      id: "adults_b8",
      text: "¿Tiene fiebre mayor de 38,5°C o menos pero con muchos temblores?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      stopOnYes: false
    },
    {
      id: "adults_b9",
      text: "¿Tiene lesión menor por caída o golpe, sin deformidad?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      stopOnYes: false
    },
    {
      id: "adults_b10",
      text: "¿Ha tenido golpe en la cabeza o los ojos, sin pérdida de conciencia ni problemas de visión?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      stopOnYes: false
    },
    
    // NIVEL C - Consultas diferidas (Bloque 3)
    {
      id: "adults_c1",
      text: "¿Tiene cansancio o malestar general, sin otros síntomas graves?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    {
      id: "adults_c2",
      text: "¿Tiene problemas digestivos leves, como malestar estomacal manejable?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    {
      id: "adults_c3",
      text: "¿Tiene dolor de garganta, dolor de oído o fiebre menor a 38.5°C?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    {
      id: "adults_c4",
      text: "¿Tiene dolor abdominal o dental leve a moderado?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    {
      id: "adults_c5",
      text: "¿Tiene dolor crónico manejable con medicación?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    {
      id: "adults_c6",
      text: "¿Tiene molestias ginecológicas o urológicas?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    
    // NIVEL D - Atenciones no urgentes (Bloque 4)
    {
      id: "adults_d1",
      text: "¿Tiene lesión cutánea leve o picadura de insecto, que no se extiende rápidamente?",
      options: ["Sí", "No"],
      level: "D",
      condition: "Sí",
      block: 4,
      stopOnYes: false
    },
    {
      id: "adults_d2",
      text: "¿Tiene tos, pero sin dificultad para respirar?",
      options: ["Sí", "No"],
      level: "D",
      condition: "Sí",
      block: 4,
      stopOnYes: false
    },
    {
      id: "adults_d3",
      text: "¿Tiene ojos rojos con irritación leve?",
      options: ["Sí", "No"],
      level: "D",
      condition: "Sí",
      block: 4,
      stopOnYes: false
    },
    {
      id: "adults_d4",
      text: "¿Tiene dolor muscular o calambres leves, que no impiden actividades diarias?",
      options: ["Sí", "No"],
      level: "D",
      condition: "Sí",
      block: 4,
      stopOnYes: false
    },
    {
      id: "adults_d5",
      text: "¿Necesita consejo o seguimiento de una enfermedad crónica?",
      options: ["Sí", "No"],
      level: "D",
      condition: "Sí",
      block: 4,
      stopOnYes: false
    },
    {
      id: "adults_d6",
      text: "¿Es para revisión médica rutinaria o dudas sobre medicación/sintomatología?",
      options: ["Sí", "No"],
      level: "D",
      condition: "Sí",
      block: 4,
      stopOnYes: false
    }
  ],

  pediatria: [
    // INFORMACIÓN PREVIA
    {
      id: "ped_info_1",
      text: "¿Qué edad tiene el niño/a?",
      options: ["Menos de 3 meses", "3-6 meses", "6 meses - 3 años", "3 - 12 años", "12 - 18 años"],
      level: "INFO",
      condition: null,
      required: true
    },
    {
      id: "ped_info_2",
      text: "¿Es un paciente crónico complejo (malformaciones congénitas, enfermedades graves conocidas)?",
      options: ["Sí", "No"],
      level: "INFO",
      condition: null,
      required: true
    },
    {
      id: "ped_info_3",
      text: "¿Tiene el calendario vacunal al día?",
      options: ["Sí", "No", "No lo sé"],
      level: "INFO",
      condition: null,
      required: true
    },
    
    // NIVEL A - Urgencia inmediata
    {
      id: "ped_a1",
      text: "¿El niño/a está inconsciente, no responde o no hace contacto visual?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      stopOnYes: true
    },
    {
      id: "ped_a2",
      text: "¿Respira con mucha dificultad o hace pausas respiratorias?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      stopOnYes: true
    },
    {
      id: "ped_a3",
      text: "¿Se ve color azulado en labios/lengua o manchas púrpuras en la piel?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      stopOnYes: true
    },
    {
      id: "ped_a4",
      text: "¿Ha tenido una convulsión reciente (actual o hace pocos minutos)?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      stopOnYes: true
    },
    {
      id: "ped_a5_fever",
      text: "¿Tiene fiebre de 38°C o más y es menor de 3 meses?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      stopOnYes: true,
      dependsOn: "ped_info_1",
      showIf: "Menos de 3 meses"
    },
    {
      id: "ped_a6_fever",
      text: "¿Tiene fiebre de 40°C o más y es mayor de 3 meses?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      stopOnYes: true,
      dependsOn: "ped_info_1",
      showIf: ["3-6 meses", "6 meses - 3 años", "3 - 12 años", "12 - 18 años"]
    },
    
    // NIVEL B - Inestabilidad inminente
    // Bloque 1: Respiratorio
    {
      id: "ped_b1_resp_count",
      text: "Cuente las respiraciones del niño durante 15 segundos y multiplique por 4. ¿Cuántas respiraciones por minuto tiene?",
      type: "number",
      level: "B",
      condition: ">60",
      block: 2,
      subBlock: "respiratorio",
      stopOnYes: false,
      description: "Contar durante 15 segundos y multiplicar por 4"
    },
    {
      id: "ped_b2_resp",
      text: "¿Presenta tiraje marcado (hundimiento de costillas al respirar)?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      subBlock: "respiratorio",
      stopOnYes: false
    },
    {
      id: "ped_b3_resp",
      text: "¿Tiene aleteo nasal (las fosas nasales se abren mucho al respirar)?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      subBlock: "respiratorio",
      stopOnYes: false
    },
    {
      id: "ped_b4_resp",
      text: "¿Hace estridor (ruido agudo) audible en reposo?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      subBlock: "respiratorio",
      stopOnYes: false
    },
    {
      id: "ped_b5_resp",
      text: "¿Es incapaz de hablar/comer por falta de aire?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      subBlock: "respiratorio",
      stopOnYes: false
    },
    
    // Bloque 2: Circulatorio
    {
      id: "ped_b6_circ",
      text: "¿Tiene la piel muy pálida, fría o manchada que no mejora?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      subBlock: "circulatorio",
      stopOnYes: false
    },
    {
      id: "ped_b7_circ",
      text: "¿Ha tenido mareo intenso o desmayo reciente sin causa clara?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      subBlock: "circulatorio",
      stopOnYes: false
    },
    
    // Bloque 3: Neurológico
    {
      id: "ped_b8_neuro_head_vomit",
      text: "¿Tiene dolor de cabeza intenso acompañado de vómitos bruscos (no náuseas)?",
      options: ["Sí", "No"],
      level: "A", // Si ambas son Sí, es nivel A
      condition: "Sí",
      block: 2,
      subBlock: "neurológico",
      stopOnYes: true,
      description: "Si ambos síntomas están presentes, se clasifica como Nivel A"
    },
    {
      id: "ped_b9_neuro",
      text: "¿Ha tenido convulsión febril que terminó hace menos de 30 minutos?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      subBlock: "neurológico",
      stopOnYes: false
    },
    {
      id: "ped_b10_neuro",
      text: "¿Presenta rigidez de nuca (no puede mover el cuello hacia adelante)?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      subBlock: "neurológico",
      stopOnYes: false
    },
    {
      id: "ped_b11_neuro",
      text: "¿Tiene parálisis súbita de alguna parte del cuerpo?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      subBlock: "neurológico",
      stopOnYes: false
    },
    {
      id: "ped_b12_neuro",
      text: "¿Ha tenido pérdida de consciencia de la que ya se ha recuperado?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      subBlock: "neurológico",
      stopOnYes: false
    },
    
    // Bloque 4: Piel y Tegumentos
    {
      id: "ped_b13_skin",
      text: "¿Tiene sangrado abundante y activo que no se detiene con presión?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      subBlock: "piel",
      stopOnYes: false
    },
    {
      id: "ped_b14_skin",
      text: "¿Tiene herida penetrante profunda o fractura abierta?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      subBlock: "piel",
      stopOnYes: false
    },
    
    // NIVEL C - Atención el mismo día
    {
      id: "ped_c1_lesion",
      text: "¿Tiene hinchazón o deformidad en una extremidad con dolor moderado, pero con movilidad parcial?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    {
      id: "ped_c2_wound",
      text: "¿Tiene herida limpia que podría requerir puntos sin sangrado activo importante?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    {
      id: "ped_c3_fever_3_6_months",
      text: "¿Tiene fiebre >39°C y tiene entre 3-6 meses de edad?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false,
      dependsOn: "ped_info_1",
      showIf: "3-6 meses"
    },
    {
      id: "ped_c4_fever_duration",
      text: "¿Ha tenido fiebre durante más de 5 días sin mejorar?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    {
      id: "ped_c5_fever_fluids",
      text: "¿Tiene fiebre con disminución notable de la ingesta de líquidos?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    {
      id: "ped_c6_cough",
      text: "¿Tiene tos persistente con taquipnea (respiración rápida) o sibilancias?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    {
      id: "ped_c7_asthma",
      text: "¿Tiene crisis asmáticas leves que no ceden completamente con la medicación habitual?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    {
      id: "ped_c8_vomit",
      text: "¿Tiene vómitos con o sin dificultad para tolerar líquidos?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    {
      id: "ped_c9_diarrhea",
      text: "¿Tiene diarrea? Por favor indique color y frecuencia:",
      type: "text",
      level: "C",
      condition: "any_text",
      block: 3,
      stopOnYes: false,
      description: "Describir color y frecuencia de las deposiciones"
    },
    {
      id: "ped_c10_urination",
      text: "¿Ha orinado menos de 3 veces en 24 horas?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    {
      id: "ped_c11_urinary_pain",
      text: "¿Tiene dolor intenso al orinar?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    {
      id: "ped_c12_abdominal",
      text: "¿Tiene dolor abdominal intenso recurrente con períodos de calma?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    {
      id: "ped_c13_rash",
      text: "¿Tiene erupción extensa con picor intenso?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    {
      id: "ped_c14_swelling",
      text: "¿Tiene hinchazón rápida de ojos, labios o piel (sin dificultad respiratoria)?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      stopOnYes: false
    },
    
    // NIVEL D - No urgente
    {
      id: "ped_d1",
      text: "¿Tiene resfriado común sin signos de alarma?",
      options: ["Sí", "No"],
      level: "D",
      condition: "Sí",
      block: 4,
      stopOnYes: false
    },
    {
      id: "ped_d2",
      text: "¿Tiene tos leve sin dificultad respiratoria?",
      options: ["Sí", "No"],
      level: "D",
      condition: "Sí",
      block: 4,
      stopOnYes: false
    },
    {
      id: "ped_d3",
      text: "¿Tiene fiebre <39°C y es mayor de 6 meses con buen estado general?",
      options: ["Sí", "No"],
      level: "D",
      condition: "Sí",
      block: 4,
      stopOnYes: false,
      dependsOn: "ped_info_1",
      showIf: ["6 meses - 3 años", "3 - 12 años", "12 - 18 años"]
    },
    {
      id: "ped_d4",
      text: "¿Es para revisión rutinaria o vacunación programada?",
      options: ["Sí", "No"],
      level: "D",
      condition: "Sí",
      block: 4,
      stopOnYes: false
    }
  ],

  dona: [
    // BIFURCACIÓN INICIAL
    {
      id: "dona_branch",
      text: "¿Estás embarazada o puerperal (postparto) o tienes otras consultas ginecológicas?",
      options: ["Embarazada", "Puérpera (postparto hasta 6 semanas)", "Otras consultas ginecológicas"],
      level: "BRANCH",
      condition: null,
      required: true
    },
    
    // INFORMACIÓN PREVIA PARA EMBARAZADAS
    {
      id: "dona_emb_info",
      text: "¿Tienes diagnósticos conocidos que puedan influenciar el embarazo (hipertensión, diabetes gestacional, etc.)?",
      options: ["Sí", "No"],
      level: "INFO",
      condition: null,
      branch: "embarazada",
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    
    // EMBARAZADAS - NIVEL A
    {
      id: "dona_emb_a1",
      text: "¿Tiene dolor torácico fuerte, dificultad respiratoria importante o sensación de asfixia?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      branch: "embarazada",
      stopOnYes: true,
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    {
      id: "dona_emb_a2",
      text: "¿Tiene pérdida de sangre abundante vaginal (empapa varias compresas, coágulos grandes, mareo/desmayo)?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      branch: "embarazada",
      stopOnYes: true,
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    {
      id: "dona_emb_a3",
      text: "¿Tiene fuga de líquido amniótico antes de las 37 semanas?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      branch: "embarazada",
      stopOnYes: true,
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    {
      id: "dona_emb_a4",
      text: "¿Tiene contracciones regulares muy intensas que no ceden con reposo antes de lo esperado?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      branch: "embarazada",
      stopOnYes: true,
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    {
      id: "dona_emb_a5",
      text: "¿Los movimientos fetales están muy disminuidos o ausentes?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      branch: "embarazada",
      stopOnYes: true,
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    {
      id: "dona_emb_a6",
      text: "¿Tiene síntomas sugestivos de preeclampsia severa (cefalea persistente intensa, visión borrosa, dolor abdominal superior, hinchazón repentina de cara/manos)?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      branch: "embarazada",
      stopOnYes: true,
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    {
      id: "dona_emb_a7",
      text: "¿Tiene fiebre alta (≥ 38.5 ºC) con escalofríos, malestar general o vómitos persistentes?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      branch: "embarazada",
      stopOnYes: true,
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    {
      id: "dona_emb_a8",
      text: "¿Tiene mareos importantes, desmayo, pulso muy rápido o sensación de shock?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      branch: "embarazada",
      stopOnYes: true,
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    
    // EMBARAZADAS - NIVEL B
    {
      id: "dona_emb_b1",
      text: "¿Tiene sangrado ligero vaginal que no está aumentando, sin dolor fuerte?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "embarazada",
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    {
      id: "dona_emb_b2",
      text: "¿Tiene contracciones leves que desaparecen con reposo o cambio de posición?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "embarazada",
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    {
      id: "dona_emb_b3",
      text: "¿Tiene dolor de espalda/lumbar continuo, sin otros síntomas?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "embarazada",
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    {
      id: "dona_emb_b4",
      text: "¿Tiene náuseas/vómitos moderados que pueden mantenerse con líquidos?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "embarazada",
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    {
      id: "dona_emb_b5",
      text: "¿Tiene hinchazón (edema) en tobillos/pies al final del día, sin signos de preeclampsia?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "embarazada",
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    {
      id: "dona_emb_b6",
      text: "¿Tiene picazón sin erupción severa (posible colestasis), sin ictericia visible ni síntomas graves?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "embarazada",
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    
    // EMBARAZADAS - NIVEL C
    {
      id: "dona_emb_c1",
      text: "¿Tiene dudas rutinarias (alimentación, ejercicio, suplementación, bienestar general)?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      branch: "embarazada",
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    {
      id: "dona_emb_c2",
      text: "¿Tiene cambios menores que no molestan mucho (piernas pesadas, acidez, hinchazón leve)?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      branch: "embarazada",
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    {
      id: "dona_emb_c3",
      text: "¿Tiene preguntas sobre preparación para el parto o planes de maternidad?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      branch: "embarazada",
      dependsOn: "dona_branch",
      showIf: "Embarazada"
    },
    
    // PUÉRPERAS - INFORMACIÓN PREVIA
    {
      id: "dona_puer_info",
      text: "¿Qué tipo de parto tuvo y hubo complicaciones (vaginal, cesárea, fórceps, hemorragia, etc.)?",
      type: "text",
      level: "INFO",
      condition: null,
      branch: "puerpera",
      dependsOn: "dona_branch",
      showIf: "Puérpera (postparto hasta 6 semanas)"
    },
    
    // PUÉRPERAS - NIVEL A
    {
      id: "dona_puer_a1",
      text: "¿Tiene hemorragia postparto abundante (empapando compresa grande en ≤1h, coágulos grandes, mareo/desmayo)?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      branch: "puerpera",
      stopOnYes: true,
      dependsOn: "dona_branch",
      showIf: "Puérpera (postparto hasta 6 semanas)"
    },
    {
      id: "dona_puer_a2",
      text: "¿Tiene fiebre ≥ 38.5 ºC con escalofríos, dolor abdominal severo o mal olor intenso en loquios (sospecha de infección)?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      branch: "puerpera",
      stopOnYes: true,
      dependsOn: "dona_branch",
      showIf: "Puérpera (postparto hasta 6 semanas)"
    },
    {
      id: "dona_puer_a3",
      text: "¿Tiene dolor torácico, falta de aire importante, o dolor unilateral en pierna con hinchazón (sospecha TEP/trombosis)?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      branch: "puerpera",
      stopOnYes: true,
      dependsOn: "dona_branch",
      showIf: "Puérpera (postparto hasta 6 semanas)"
    },
    {
      id: "dona_puer_a4",
      text: "¿Tiene dolor de cabeza muy intenso, visión borrosa, convulsión o presión arterial muy alta (riesgo de preeclampsia postparto)?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      branch: "puerpera",
      stopOnYes: true,
      dependsOn: "dona_branch",
      showIf: "Puérpera (postparto hasta 6 semanas)"
    },
    {
      id: "dona_puer_a5",
      text: "¿Ha tenido pensamientos de hacer daño al bebé o de no poder cuidarlo (depresión postparto)?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      branch: "puerpera",
      stopOnYes: true,
      dependsOn: "dona_branch",
      showIf: "Puérpera (postparto hasta 6 semanas)"
    },
    
    // PUÉRPERAS - NIVEL B
    {
      id: "dona_puer_b1",
      text: "¿Tiene sangrado moderado que persiste o aumenta?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "puerpera",
      dependsOn: "dona_branch",
      showIf: "Puérpera (postparto hasta 6 semanas)"
    },
    {
      id: "dona_puer_b2",
      text: "¿Tiene fiebre moderada (≥ 38 ºC) con dolor localizado en cesárea, episiotomía o mama?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "puerpera",
      dependsOn: "dona_branch",
      showIf: "Puérpera (postparto hasta 6 semanas)"
    },
    {
      id: "dona_puer_b3",
      text: "¿Tiene dolor en mama con enrojecimiento localizado + febrícula (sospecha de mastitis inicial)?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "puerpera",
      dependsOn: "dona_branch",
      showIf: "Puérpera (postparto hasta 6 semanas)"
    },
    {
      id: "dona_puer_b4",
      text: "¿Tiene retención urinaria o síntomas urinarios severos?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "puerpera",
      dependsOn: "dona_branch",
      showIf: "Puérpera (postparto hasta 6 semanas)"
    },
    {
      id: "dona_puer_b5",
      text: "¿Tiene hinchazón progresiva en una pierna más que en la otra?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "puerpera",
      dependsOn: "dona_branch",
      showIf: "Puérpera (postparto hasta 6 semanas)"
    },
    {
      id: "dona_puer_b6",
      text: "¿Tiene dolor abdominal persistente moderado que no mejora con analgésicos?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "puerpera",
      dependsOn: "dona_branch",
      showIf: "Puérpera (postparto hasta 6 semanas)"
    },
    
    // PUÉRPERAS - NIVEL C
    {
      id: "dona_puer_c1",
      text: "¿Tiene dolor en herida (episiotomía/cesárea) que mejora con analgésicos simples?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      branch: "puerpera",
      dependsOn: "dona_branch",
      showIf: "Puérpera (postparto hasta 6 semanas)"
    },
    {
      id: "dona_puer_c2",
      text: "¿Tiene loquios de curso normal?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      branch: "puerpera",
      dependsOn: "dona_branch",
      showIf: "Puérpera (postparto hasta 6 semanas)"
    },
    {
      id: "dona_puer_c3",
      text: "¿Tiene congestión mamaria, dolor leve de pezón, o dudas de lactancia sin fiebre?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      branch: "puerpera",
      dependsOn: "dona_branch",
      showIf: "Puérpera (postparto hasta 6 semanas)"
    },
    {
      id: "dona_puer_c4",
      text: "¿Tiene estreñimiento, hemorroides o molestias leves postparto?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      branch: "puerpera",
      dependsOn: "dona_branch",
      showIf: "Puérpera (postparto hasta 6 semanas)"
    },
    {
      id: "dona_puer_c5",
      text: "¿Tiene sueño, cansancio o tristeza leve ('baby blues') y dudas al respecto?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      branch: "puerpera",
      dependsOn: "dona_branch",
      showIf: "Puérpera (postparto hasta 6 semanas)"
    },
    
    // OTRAS CONSULTAS GINECOLÓGICAS - NIVEL A
    {
      id: "dona_gin_a1",
      text: "¿Tiene sangrado vaginal muy abundante o sensación de desmayo por la pérdida de sangre?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      branch: "ginecologica",
      stopOnYes: true,
      dependsOn: "dona_branch",
      showIf: "Otras consultas ginecológicas"
    },
    {
      id: "dona_gin_a2",
      text: "¿Tiene dolor pélvico o abdominal súbito e intenso con náuseas/vómitos o pérdida de conciencia (torsión ovárica o embarazo ectópico)?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      branch: "ginecologica",
      stopOnYes: true,
      dependsOn: "dona_branch",
      showIf: "Otras consultas ginecológicas"
    },
    {
      id: "dona_gin_a3",
      text: "¿Tiene fiebre alta (≥ 38.5 ºC) con dolor abdominal/tensión en pelvis o secreción vaginal maloliente (sospecha de infección grave)?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 1,
      branch: "ginecologica",
      stopOnYes: true,
      dependsOn: "dona_branch",
      showIf: "Otras consultas ginecológicas"
    },
    
    // OTRAS CONSULTAS GINECOLÓGICAS - NIVEL B
    {
      id: "dona_gin_b1",
      text: "¿Tiene sangrado vaginal persistente fuera de la regla o más abundante de lo habitual?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "ginecologica",
      dependsOn: "dona_branch",
      showIf: "Otras consultas ginecológicas"
    },
    {
      id: "dona_gin_b2",
      text: "¿Tiene dolor pélvico constante que limita actividades?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "ginecologica",
      dependsOn: "dona_branch",
      showIf: "Otras consultas ginecológicas"
    },
    {
      id: "dona_gin_b3",
      text: "¿Tiene secreción vaginal inusual o picor con algo de fiebre o dolor al orinar?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "ginecologica",
      dependsOn: "dona_branch",
      showIf: "Otras consultas ginecológicas"
    },
    {
      id: "dona_gin_b4",
      text: "¿Tiene bulto o masa en la pelvis o dolor localizado al tacto (ej. ovario)?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "ginecologica",
      dependsOn: "dona_branch",
      showIf: "Otras consultas ginecológicas"
    },
    {
      id: "dona_gin_b5",
      text: "¿Tiene bulto vulvar/vaginal (sospecha bartolinitis/absceso)?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "ginecologica",
      dependsOn: "dona_branch",
      showIf: "Otras consultas ginecológicas"
    },
    {
      id: "dona_gin_b6",
      text: "¿Tiene sangrado post procedimiento o herida que supura?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      branch: "ginecologica",
      dependsOn: "dona_branch",
      showIf: "Otras consultas ginecológicas"
    },
    
    // OTRAS CONSULTAS GINECOLÓGICAS - NIVEL C
    {
      id: "dona_gin_c1",
      text: "¿Necesita información para intentar quedarse embarazada (preconcepción)?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      branch: "ginecologica",
      dependsOn: "dona_branch",
      showIf: "Otras consultas ginecológicas"
    },
    {
      id: "dona_gin_c2",
      text: "¿Tiene menstruaciones irregulares (sin sangrado excesivo ni dolor invalidante)?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      branch: "ginecologica",
      dependsOn: "dona_branch",
      showIf: "Otras consultas ginecológicas"
    },
    {
      id: "dona_gin_c3",
      text: "¿Necesita asesoramiento sobre anticoncepción o menopausia?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      branch: "ginecologica",
      dependsOn: "dona_branch",
      showIf: "Otras consultas ginecológicas"
    },
    {
      id: "dona_gin_c4",
      text: "¿Tiene dudas sobre chequeos de cribado (Papanicolaou/HPV)?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 3,
      branch: "ginecologica",
      dependsOn: "dona_branch",
      showIf: "Otras consultas ginecológicas"
    }
  ],

  "salut-mental": [
    // NIVEL A - Máxima prioridad (Bloque 3: Factores de alerta grave)
    {
      id: "sm_a1_harm_thoughts",
      text: "¿Ha pensado que la vida no vale la pena o ha tenido ideas de hacerse daño?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 3,
      stopOnYes: true,
      description: "Factores de alerta grave"
    },
    {
      id: "sm_a2_suicide_plan",
      text: "¿Tiene un plan concreto para hacerse daño o quitarse la vida?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 3,
      stopOnYes: true,
      description: "Factores de alerta grave"
    },
    {
      id: "sm_a3_violence_thoughts",
      text: "¿Ha tenido pensamientos de agredir a alguien más o de perder el control?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 3,
      stopOnYes: true,
      description: "Factores de alerta grave"
    },
    {
      id: "sm_a4_recent_harm",
      text: "¿Ha tenido pensamientos de hacerse daño o quitarse la vida en los últimos días?",
      options: ["Sí, en los últimos días", "Sí, pero no recientemente", "No"],
      level: "A",
      condition: "Sí, en los últimos días",
      block: 3,
      stopOnYes: true,
      description: "Sección 3 - Ideación suicida reciente"
    },
    {
      id: "sm_a5_hallucinations",
      text: "¿Ha escuchado voces o visto cosas que otros no ven u oyen en la última semana?",
      options: ["Sí", "No"],
      level: "A",
      condition: "Sí",
      block: 3,
      stopOnYes: true,
      description: "Alucinaciones recientes"
    },
    
    // NIVEL B - Alta prioridad (Bloque 2: Factores de alerta moderada)
    {
      id: "sm_b1_medication",
      text: "¿Ha dejado de tomar la medicación de forma repentina?",
      options: ["Sí", "No", "No tomo medicación"],
      level: "B",
      condition: "Sí",
      block: 2,
      stopOnYes: false,
      description: "Factores de alerta moderada"
    },
    {
      id: "sm_b2_agitation",
      text: "¿Ha tenido episodios de mucha agitación, irritabilidad o comportamientos impulsivos?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      stopOnYes: false,
      description: "Factores de alerta moderada"
    },
    {
      id: "sm_b3_reality_changes",
      text: "¿Ha notado cambios importantes en su percepción de la realidad (oír voces, pensar que quieren hacerle daño)?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      stopOnYes: false,
      description: "Factores de alerta moderada"
    },
    {
      id: "sm_b4_family_concern",
      text: "¿Alguien de su entorno está preocupado por usted y le ha dicho que necesita ayuda urgente?",
      options: ["Sí", "No"],
      level: "B",
      condition: "Sí",
      block: 2,
      stopOnYes: false,
      description: "Factores de alerta moderada"
    },
    {
      id: "sm_b5_interference",
      text: "¿Cómo interfieren los síntomas con su vida diaria?",
      options: ["Nada", "Un poco", "Moderada", "Mucha"],
      level: "B",
      condition: ["Moderada", "Mucha"],
      block: 2,
      stopOnYes: false,
      description: "Interferencia funcional"
    },
    {
      id: "sm_b6_substance_frequent",
      text: "¿Su uso de sustancias (alcohol, drogas) es frecuente?",
      options: ["Sí, frecuente", "Sí, ocasionalmente", "No"],
      level: "B",
      condition: "Sí, frecuente",
      block: 2,
      stopOnYes: false,
      description: "Uso de sustancias"
    },
    
    // NIVEL C - Prioridad media (Bloque 1: Estado general y seguimiento)
    {
      id: "sm_c1_mood",
      text: "¿Tiene malestar de ánimo general, más ansiedad, nerviosismo, insomnio o somnolencia?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 1,
      stopOnYes: false,
      description: "Estado general y seguimiento"
    },
    {
      id: "sm_c2_activities",
      text: "¿Tiene dificultades para realizar sus actividades habituales?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 1,
      stopOnYes: false,
      description: "Estado general y seguimiento"
    },
    {
      id: "sm_c3_substance_occasional",
      text: "¿Ha tomado más alcohol u otras sustancias de lo que pretendía en el último mes?",
      options: ["Sí, ocasionalmente", "Sí, frecuente", "No"],
      level: "C",
      condition: "Sí, ocasionalmente",
      block: 1,
      stopOnYes: false,
      description: "Consumo ocasional de sustancias"
    },
    {
      id: "sm_c4_panic",
      text: "¿Ha tenido crisis de angustia o ataques de pánico recientes?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 1,
      stopOnYes: false,
      description: "Estado general y seguimiento"
    },
    {
      id: "sm_c5_interference_mild",
      text: "¿Los síntomas interfieren 'Un poco' con su vida diaria?",
      options: ["Sí", "No"],
      level: "C",
      condition: "Sí",
      block: 1,
      stopOnYes: false,
      description: "Interferencia leve",
      dependsOn: "sm_b5_interference",
      showIf: "Un poco"
    },
    
    // NIVEL D - Baja prioridad (Bloque 4: Consultas administrativas/leves)
    {
      id: "sm_d1_prescription",
      text: "¿Tiene problemas con la receta o suministro de medicación?",
      options: ["Sí", "No"],
      level: "D",
      condition: "Sí",
      block: 4,
      stopOnYes: false,
      description: "Consultas administrativas/leves"
    },
    {
      id: "sm_d2_medication_doubts",
      text: "¿Tiene dudas sobre la pauta de medicación habitual o efectos?",
      options: ["Sí", "No"],
      level: "D",
      condition: "Sí",
      block: 4,
      stopOnYes: false,
      description: "Consultas administrativas/leves"
    },
    {
      id: "sm_d3_reports",
      text: "¿Necesita informe médico o trámite similar?",
      options: ["Sí", "No"],
      level: "D",
      condition: "Sí",
      block: 4,
      stopOnYes: false,
      description: "Consultas administrativas/leves"
    },
    {
      id: "sm_d4_no_interference",
      text: "¿Los síntomas NO interfieren en su vida diaria?",
      options: ["Sí", "No"],
      level: "D",
      condition: "Sí",
      block: 4,
      stopOnYes: false,
      description: "Sin interferencia funcional",
      dependsOn: "sm_b5_interference",
      showIf: "Nada"
    }
  ]
};