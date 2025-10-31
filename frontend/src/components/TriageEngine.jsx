import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import FileUploader from './FileUploader';

/**
 * SISTEMA DE TRIAJE MÉDICO - GLOBAL DOCTORS
 * 
 * Este sistema implementa algoritmos de triaje médico profesional para:
 * - Medicina General: Evaluación de síntomas generales en adultos
 * - Pediatría: Evaluación especializada por grupos de edad (0-18 años)
 * - Salud de la Mujer: Embarazo, puerperio y ginecología
 * 
 * Niveles de clasificación médica:
 * A - Emergencia crítica (112 inmediato)
 * B - Urgencia moderada (atención urgente) 
 * C - Consulta diferida (primeras horas)
 * D - No urgente (consulta programada)
 * 
 * @author Global Doctors Team
 * @version 2.0.0
 */

/* ===================================
   ALGORITMOS DE TRIAJE MÉDICO
=================================== */
const TRIAGE_ALGORITHMS = {
  
  /* ===================================
     MEDICINA GENERAL
     - Tipo: sequential (evalúa A→B→C→D)
     - Solo se detiene en emergencias (Nivel A)
     - Clasifica según nivel más urgente encontrado
  =================================== */
  'general-medicine': {
    name: 'Medicina General',
    type: 'sequential',
    blocks: [
      // NIVEL A - EMERGENCIAS CRÍTICAS (112 inmediato)
      // Síntomas que requieren atención hospitalaria inmediata
      {
        id: 'block_a',
        level: 'A',
        classification: 'Emergencia crítica',
        destination: 'Atención hospitalaria inmediata - Llamar 112',
        color: '#dc2626',
        instruction: 'Si presenta cualquiera de estos síntomas, llame al 112 inmediatamente:',
        questions: [
          {
            id: 'gm_a1',
            text: 'Debilidad súbita o entumecimiento, especialmente en un lado del cuerpo',
            type: 'boolean'
          },
          {
            id: 'gm_a2', 
            text: 'Dificultad para hablar o entender',
            type: 'boolean'
          },
          {
            id: 'gm_a3',
            text: 'Visión borrosa o doble de repente',
            type: 'boolean'
          },
          {
            id: 'gm_a4',
            text: 'Dificultad severa para respirar (cuesta que entre y salga el aire además de hacerlo con ruidos respiratorios)',
            type: 'boolean'
          },
          {
            id: 'gm_a5',
            text: 'Pérdida de conciencia o desmayo',
            type: 'boolean'
          },
          {
            id: 'gm_a6',
            text: 'Dolor en la cabeza muy intenso. Experimentado así por primera vez',
            type: 'boolean'
          },
          {
            id: 'gm_a7',
            text: 'Convulsiones o ataques',
            type: 'boolean'
          },
          {
            id: 'gm_a8',
            text: 'Algún sangrado abundante que no cede (por una herida/golpe, corte, metrorragia/regla...)',
            type: 'boolean'
          },
          {
            id: 'gm_a9',
            text: 'Dolor intenso en el pecho, especialmente si se extiende al brazo o mandíbula',
            type: 'boolean'
          },
          {
            id: 'gm_a10',
            text: 'Un golpe en la cabeza o golpe importante en el resto del cuerpo y además toma usted alguna medicación anticoagulante',
            type: 'boolean'
          }
        ]
      },
      
      // NIVEL B - URGENCIA MODERADA
      // Síntomas que requieren evaluación médica urgente pero no inmediata
      {
        id: 'block_b',
        level: 'B',
        classification: 'Urgencia moderada',
        destination: 'Evaluación por telemedicina - Posible derivación si empeora',
        color: '#ea580c',
        instruction: 'Seleccione todos los síntomas que presenta actualmente:',
        questions: [
          {
            id: 'gm_b1',
            text: 'Dificultad para respirar (cuesta un poco más de lo habitual, con algún ruido al hacerlo)',
            type: 'boolean'
          },
          {
            id: 'gm_b2',
            text: 'Latidos rápidos o irregulares del corazón, sin dolor en el pecho',
            type: 'boolean'
          },
          {
            id: 'gm_b3',
            text: 'Una quemadura pequeña y no severa',
            type: 'boolean'
          },
          {
            id: 'gm_b4',
            text: 'Un dolor de cabeza muy fuerte, pero sin otros síntomas neurológicos como debilidad',
            type: 'boolean'
          },
          {
            id: 'gm_b5',
            text: 'Una reacción alérgica leve, como ronchas o picazón',
            type: 'boolean'
          },
          {
            id: 'gm_b6',
            text: 'Presión arterial alta o baja, pero no está confundido ni mareado',
            type: 'boolean'
          },
          {
            id: 'gm_b7',
            text: 'Azúcar en sangre alta o baja, pero se siente bien',
            type: 'boolean',
            followUp: {
              question: '¿Puede ingresar los valores de azúcar en sangre?',
              type: 'text',
              placeholder: 'Ej: 180 mg/dl'
            }
          },
          {
            id: 'gm_b8',
            text: 'Vértigo o mareos',
            type: 'boolean'
          },
          {
            id: 'gm_b9',
            text: 'Fiebre mayor de 38,5°C o menos pero con muchos temblores',
            type: 'boolean'
          },
          {
            id: 'gm_b10',
            text: 'Una lesión menor por caída o golpe, sin deformidad',
            type: 'boolean'
          },
          {
            id: 'gm_b11',
            text: 'Un golpe en la cabeza o los ojos, sin pérdida de conciencia ni problemas de visión',
            type: 'boolean'
          }
        ]
      },
      
      // NIVEL C - CONSULTA DIFERIDA
      // Síntomas que requieren atención médica en las próximas horas
      {
        id: 'block_c',
        level: 'C',
        classification: 'Consultas diferidas',
        destination: 'Consulta por telemedicina - Primeras horas',
        color: '#f59e0b',
        instruction: 'Indique si presenta alguno de estos síntomas:',
        questions: [
          {
            id: 'gm_c1',
            text: 'Se siente cansado o mal en general, sin otros síntomas graves',
            type: 'boolean'
          },
          {
            id: 'gm_c2',
            text: 'Problemas digestivos leves, como malestar estomacal manejable',
            type: 'boolean'
          },
          {
            id: 'gm_c3',
            text: 'Dolor de garganta, dolor de oído o fiebre menor a 38.5°C',
            type: 'boolean'
          },
          {
            id: 'gm_c4',
            text: 'Dolor abdominal o dental leve a moderado',
            type: 'boolean'
          },
          {
            id: 'gm_c5',
            text: 'Dolor crónico, manejable con medicación (puede ser de espalda, relacionado con el cáncer...)',
            type: 'boolean'
          },
          {
            id: 'gm_c6',
            text: 'Molestias ginecológicas o urológicas',
            type: 'boolean'
          }
        ]
      },
      
      // NIVEL D - ATENCIÓN NO URGENTE  
      // Consultas de seguimiento, prevención o síntomas leves
      {
        id: 'block_d',
        level: 'D',
        classification: 'Atenciones no urgentes',
        destination: 'Consulta programada vía telemedicina',
        color: '#10b981',
        instruction: 'Seleccione el motivo de su consulta:',
        questions: [
          {
            id: 'gm_d1',
            text: 'Una lesión cutánea leve o picadura de insecto, que no se extiende rápidamente',
            type: 'boolean'
          },
          {
            id: 'gm_d2',
            text: 'Tos, pero sin dificultad para respirar',
            type: 'boolean'
          },
          {
            id: 'gm_d3',
            text: 'Ojos rojos con irritación leve (conjuntivitis leve)',
            type: 'boolean'
          },
          {
            id: 'gm_d4',
            text: 'Dolor muscular o calambres leves, que no le impiden realizar actividades diarias',
            type: 'boolean'
          },
          {
            id: 'gm_d5',
            text: 'Está gestionando una enfermedad crónica y necesita consejo o seguimiento',
            type: 'boolean'
          },
          {
            id: 'gm_d6',
            text: 'Necesita una revisión médica rutinaria o tiene dudas sobre su medicación o sintomatología',
            type: 'boolean'
          }
        ]
      }
    ]
  },

  /* ===================================
     PEDIATRÍA (0-18 años)
     - Tipo: sequential con grupos de edad
     - Evaluación especializada por edades
     - Criterios médicos pediátricos específicos
  =================================== */
  'pediatrics': {
    name: 'Pediatría',
    type: 'sequential',
    // Definición de grupos etarios para evaluación especializada
    ageGroups: {
      newborn: { min: 0, max: 28, label: 'Recién nacido (0-28 días)' },
      infant: { min: 29, max: 365, label: 'Lactante (1-12 meses)' },
      toddler: { min: 366, max: 1095, label: 'Niño pequeño (1-3 años)' },
      child: { min: 1096, max: 4380, label: 'Niño (3-12 años)' },
      adolescent: { min: 4381, max: 6570, label: 'Adolescente (12-18 años)' }
    },
    blocks: [
      // NIVEL A - EMERGENCIAS PEDIÁTRICAS (112 inmediato)
      // Síntomas críticos que ponen en riesgo la vida del menor
      {
        id: 'ped_block_a',
        level: 'A',
        classification: 'Emergencias pediátricas',
        destination: 'LLAMAR AL 112 INMEDIATAMENTE',
        color: '#dc2626',
        instruction: 'EMERGENCIA: Si el niño presenta cualquiera de estos síntomas, llame al 112 inmediatamente:',
        questions: [
          {
            id: 'ped_a1',
            text: 'Dificultad severa para respirar (el niño no puede hablar, está azul alrededor de los labios)',
            type: 'boolean',
            critical: true
          },
          {
            id: 'ped_a2',
            text: 'Está inconsciente o no responde cuando le habla',
            type: 'boolean',
            critical: true
          },
          {
            id: 'ped_a3',
            text: 'Convulsiones que duran más de 5 minutos o convulsiones repetidas',
            type: 'boolean',
            critical: true
          },
          {
            id: 'ped_a4',
            text: 'Sangrado abundante que no se puede controlar',
            type: 'boolean',
            critical: true
          },
          {
            id: 'ped_a5',
            text: 'Reacción alérgica severa (hinchazón de cara, dificultad para respirar)',
            type: 'boolean',
            critical: true
          },
          {
            id: 'ped_a6',
            text: 'Quemaduras extensas o quemaduras en cara, manos o genitales',
            type: 'boolean',
            critical: true
          },
          {
            id: 'ped_a7',
            text: 'Traumatismo craneal con pérdida de conciencia o vómitos repetidos',
            type: 'boolean',
            critical: true
          },
          {
            id: 'ped_a8',
            text: 'Dolor abdominal severo con vómitos persistentes (sospecha de obstrucción intestinal)',
            type: 'boolean',
            critical: true
          },
          {
            id: 'ped_a9',
            text: 'Fiebre muy alta (>40°C) en menores de 3 meses',
            type: 'boolean',
            critical: true,
            ageSpecific: ['newborn', 'infant']
          },
          {
            id: 'ped_a10',
            text: 'Intoxicación o ingestión de sustancias tóxicas',
            type: 'boolean',
            critical: true
          }
        ]
      },
      
      // NIVEL B - URGENCIA PEDIÁTRICA MODERADA
      // Síntomas que requieren evaluación médica urgente en niños
      {
        id: 'ped_block_b',
        level: 'B',
        classification: 'Urgencia pediátrica moderada',
        destination: 'Evaluación por telemedicina - Posible derivación según evolución',
        color: '#ea580c',
        instruction: 'Seleccione todos los síntomas que presenta el niño:',
        questions: [
          {
            id: 'ped_b1',
            text: 'Dificultad respiratoria leve a moderada (respira rápido pero puede hablar)',
            type: 'boolean'
          },
          {
            id: 'ped_b2',
            text: 'Fiebre alta (38.5-40°C) en niños mayores de 3 meses',
            type: 'boolean',
            ageSpecific: ['infant', 'toddler', 'child', 'adolescent']
          },
          {
            id: 'ped_b3',
            text: 'Vómitos frecuentes que le impiden retener líquidos',
            type: 'boolean'
          },
          {
            id: 'ped_b4',
            text: 'Diarrea con signos de deshidratación leve (boca seca, menos orina)',
            type: 'boolean'
          },
          {
            id: 'ped_b5',
            text: 'Dolor de oído severo, especialmente en menores de 2 años',
            type: 'boolean',
            ageSpecific: ['newborn', 'infant', 'toddler']
          },
          {
            id: 'ped_b6',
            text: 'Erupción cutánea con fiebre (posible enfermedad exantemática)',
            type: 'boolean'
          },
          {
            id: 'ped_b7',
            text: 'Golpe en la cabeza con dolor de cabeza persistente pero sin pérdida de conciencia',
            type: 'boolean'
          },
          {
            id: 'ped_b8',
            text: 'Dolor abdominal moderado sin vómitos severos',
            type: 'boolean'
          },
          {
            id: 'ped_b9',
            text: 'Llanto inconsolable en lactantes (puede indicar dolor severo)',
            type: 'boolean',
            ageSpecific: ['newborn', 'infant']
          },
          {
            id: 'ped_b10',
            text: 'Lesión menor con posible fractura (deformidad leve, dolor localizado)',
            type: 'boolean'
          }
        ]
      },
      
      // NIVEL C - CONSULTA PEDIÁTRICA DIFERIDA
      // Síntomas en niños que requieren atención en horas siguientes
      {
        id: 'ped_block_c',
        level: 'C',
        classification: 'Consultas pediátricas diferidas',
        destination: 'Consulta por telemedicina - Primeras horas',
        color: '#f59e0b',
        instruction: 'Indique si el niño presenta alguno de estos síntomas:',
        questions: [
          {
            id: 'ped_c1',
            text: 'Fiebre leve a moderada (37.5-38.5°C) con síntomas de resfriado',
            type: 'boolean'
          },
          {
            id: 'ped_c2',
            text: 'Tos persistente pero sin dificultad para respirar',
            type: 'boolean'
          },
          {
            id: 'ped_c3',
            text: 'Dolor de garganta con dificultad leve para tragar',
            type: 'boolean'
          },
          {
            id: 'ped_c4',
            text: 'Congestión nasal que le dificulta dormir o comer',
            type: 'boolean'
          },
          {
            id: 'ped_c5',
            text: 'Diarrea leve sin signos de deshidratación',
            type: 'boolean'
          },
          {
            id: 'ped_c6',
            text: 'Vómitos ocasionales que no impiden la ingesta de líquidos',
            type: 'boolean'
          },
          {
            id: 'ped_c7',
            text: 'Erupción cutánea sin fiebre (posible dermatitis o alergia)',
            type: 'boolean'
          },
          {
            id: 'ped_c8',
            text: 'Dolor de barriga leve, puede seguir jugando',
            type: 'boolean'
          },
          {
            id: 'ped_c9',
            text: 'Cambios en el apetito o el sueño, pero está activo durante el día',
            type: 'boolean'
          },
          {
            id: 'ped_c10',
            text: 'Irritabilidad o cambios de comportamiento leves',
            type: 'boolean'
          }
        ]
      },
      
      // NIVEL D - ATENCIÓN PEDIÁTRICA NO URGENTE
      // Controles rutinarios, preventivos y consultas de seguimiento
      {
        id: 'ped_block_d',
        level: 'D',
        classification: 'Atenciones pediátricas no urgentes',
        destination: 'Consulta programada vía telemedicina',
        color: '#10b981',
        instruction: 'Seleccione el motivo de la consulta del niño:',
        questions: [
          {
            id: 'ped_d1',
            text: 'Revisión de crecimiento y desarrollo (control del niño sano)',
            type: 'boolean'
          },
          {
            id: 'ped_d2',
            text: 'Consulta sobre alimentación o lactancia materna',
            type: 'boolean',
            ageSpecific: ['newborn', 'infant']
          },
          {
            id: 'ped_d3',
            text: 'Dudas sobre el calendario de vacunación',
            type: 'boolean'
          },
          {
            id: 'ped_d4',
            text: 'Problemas de sueño sin otros síntomas',
            type: 'boolean'
          },
          {
            id: 'ped_d5',
            text: 'Pequeñas lesiones cutáneas (rasguños, picaduras de insectos)',
            type: 'boolean'
          },
          {
            id: 'ped_d6',
            text: 'Estreñimiento leve o cambios en las deposiciones',
            type: 'boolean'
          },
          {
            id: 'ped_d7',
            text: 'Consultas sobre desarrollo motor o del lenguaje',
            type: 'boolean',
            ageSpecific: ['infant', 'toddler', 'child']
          },
          {
            id: 'ped_d8',
            text: 'Problemas de comportamiento o adaptación escolar',
            type: 'boolean',
            ageSpecific: ['child', 'adolescent']
          },
          {
            id: 'ped_d9',
            text: 'Consulta sobre higiene dental o cuidados preventivos',
            type: 'boolean'
          },
          {
            id: 'ped_d10',
            text: 'Seguimiento de tratamientos crónicos estables (asma controlada, etc.)',
            type: 'boolean'
          }
        ]
      }
    ]
  },

  /* ===================================
     SALUD DE LA MUJER
     - Tipo: conditional (3 flujos especializados)
     - Embarazo: Evaluación obstétrica completa
     - Puerperio: Atención postparto especializada  
     - Ginecología: Salud reproductiva general
  =================================== */
  'womens-health': {
    name: 'Salud de la Mujer',
    type: 'conditional',
    initialQuestion: {
      id: 'wh_initial',
      text: '¿Cuál es su situación actual?',
      type: 'select',
      options: [
        { value: 'pregnant', label: 'Estoy embarazada', followUp: 'pregnancy_weeks' },
        { value: 'postpartum', label: 'Soy puérpera (postparto)', followUp: 'days_postpartum' },
        { value: 'gynecological', label: 'Tengo consultas ginecológicas generales' }
      ]
    },
    flows: {
      // FLUJO EMBARAZO - Evaluación obstétrica especializada
      pregnant: {
        name: 'Gestación',
        additionalInfo: {
          id: 'pregnancy_weeks',
          text: '¿Cuántas semanas de gestación tiene?',
          type: 'number',
          min: 1,
          max: 42,
          placeholder: 'Ej: 32'
        },
        blocks: [
          {
            id: 'pregnant_a',
            level: 'A',
            classification: 'Atención hospitalaria urgente',
            destination: '112',
            color: '#dc2626',
            questions: [
              {
                id: 'pa1',
                text: '¿Tiene dolor torácico fuerte, dificultad respiratoria importante, sensación de asfixia?',
                type: 'boolean'
              },
              {
                id: 'pa2',
                text: '¿Tiene pérdida de sangre abundante vaginal (empapar varias compresas, coágulos grandes, mareo)?',
                type: 'boolean'
              },
              {
                id: 'pa3',
                text: '¿Ha tenido fuga de líquido amniótico (rotura de bolsa) antes de término (antes de las 37 semanas)?',
                type: 'boolean'
              },
              {
                id: 'pa4',
                text: '¿Tiene contracciones regulares muy intensas antes de lo esperado (ej. antes de 37 semanas) que no ceden con reposo?',
                type: 'boolean'
              },
              {
                id: 'pa5',
                text: '¿Tiene movimientos fetales muy disminuidos, casi ausentes, tras haber sido normales?',
                type: 'boolean'
              },
              {
                id: 'pa6',
                text: '¿Tiene síntomas sugestivos de preeclampsia severa (cefalea persistente intensa, visión borrosa, dolor abdominal superior, hinchazón repentina de cara/manos)?',
                type: 'boolean'
              }
            ]
          },
          {
            id: 'pregnant_b',
            level: 'B',
            classification: 'Consulta pronto',
            destination: 'Urgencia no emergente',
            color: '#ea580c',
            questions: [
              {
                id: 'pb1',
                text: '¿Tiene sangrado ligero vaginal (manchado o pocas pérdidas) que no está aumentando, sin dolor fuerte?',
                type: 'boolean'
              },
              {
                id: 'pb2',
                text: '¿Tiene contracciones leves / molestias similares a "tirones", que desaparecen con reposo?',
                type: 'boolean'
              },
              {
                id: 'pb3',
                text: '¿Tiene dolor de espalda / lumbar continuo, sin otros síntomas (sin fiebre, sin alteraciones de la orina)?',
                type: 'boolean'
              },
              {
                id: 'pb4',
                text: '¿Tiene náuseas / vómitos moderados que pueden mantenerse con líquidos, sin deshidratación severa?',
                type: 'boolean'
              }
            ]
          },
          {
            id: 'pregnant_c',
            level: 'C',
            classification: 'Consulta programada',
            destination: 'Videoconsulta no urgente',
            color: '#ca8a04',
            questions: [
              {
                id: 'pc1',
                text: '¿Tiene consultas rutinarias: dudas de alimentación, ejercicio, suplementación, bienestar general?',
                type: 'boolean'
              },
              {
                id: 'pc2',
                text: '¿Tiene cambios menores en el cuerpo que no molestan mucho: piernas pesadas, calambres, acidez?',
                type: 'boolean'
              },
              {
                id: 'pc3',
                text: '¿Tiene preguntas sobre preparación para el parto, clases prenatales, planes de maternidad?',
                type: 'boolean'
              }
            ]
          }
        ]
      },
      
      // FLUJO PUERPERIO - Atención postparto especializada
      postpartum: {
        name: 'Puerperio',
        additionalInfo: {
          id: 'days_postpartum',
          text: '¿Cuántos días han pasado desde el parto?',
          type: 'number',
          min: 0,
          max: 365,
          placeholder: 'Ej: 15'
        },
        blocks: [
          {
            id: 'postpartum_a',
            level: 'A',
            classification: 'Atención hospitalaria urgente',
            destination: '112',
            color: '#dc2626',
            questions: [
              {
                id: 'ppa1',
                text: '¿Tiene hemorragia postparto abundante (empapando compresa grande en ≤1 h, coágulos grandes, mareo/desmayo)?',
                type: 'boolean'
              },
              {
                id: 'ppa2',
                text: '¿Tiene fiebre ≥ 38.5 ºC con escalofríos, dolor abdominal severo o mal olor intenso en loquios?',
                type: 'boolean'
              },
              {
                id: 'ppa3',
                text: '¿Ha tenido pensamientos de hacer daño al bebé o de no poder cuidarlo?',
                type: 'boolean'
              }
            ]
          },
          {
            id: 'postpartum_b',
            level: 'B',
            classification: 'Consulta pronto',
            destination: 'Urgencia no emergente',
            color: '#ea580c',
            questions: [
              {
                id: 'ppb1',
                text: '¿Tiene sangrado moderado que no es abundante pero persiste o aumenta en lugar de disminuir?',
                type: 'boolean'
              },
              {
                id: 'ppb2',
                text: '¿Tiene fiebre moderada (≥ 38 ºC) con dolor localizado en cesárea, episiotomía o mama?',
                type: 'boolean'
              },
              {
                id: 'ppb3',
                text: '¿Tiene dolor en mama con enrojecimiento localizado + febrícula (Sospecha de mastitis inicial)?',
                type: 'boolean'
              }
            ]
          },
          {
            id: 'postpartum_c',
            level: 'C',
            classification: 'Consulta programada',
            destination: 'Videoconsulta no urgente',
            color: '#ca8a04',
            questions: [
              {
                id: 'ppc1',
                text: '¿Tiene dolor en episiotomía o cesárea que mejora con analgésicos simples?',
                type: 'boolean'
              },
              {
                id: 'ppc2',
                text: '¿Tiene congestión mamaria, dolor leve de pezón, dudas de lactancia sin fiebre?',
                type: 'boolean'
              },
              {
                id: 'ppc3',
                text: '¿Tiene dudas sobre cuidados del bebé, lactancia, anticoncepción, sexualidad postparto?',
                type: 'boolean'
              }
            ]
          }
        ]
      },
      
      other: {
        name: 'Otras Consultas Ginecológicas',
        blocks: [
          {
            id: 'other_a',
            level: 'A',
            classification: 'Urgencia ginecológica',
            destination: '112',
            color: '#dc2626',
            questions: [
              {
                id: 'oa1',
                text: '¿Tiene sangrado vaginal muy abundante (empapando >1 compresa/hora, coágulos grandes) o sensación de desmayo?',
                type: 'boolean'
              },
              {
                id: 'oa2',
                text: '¿Tiene dolor pélvico o abdominal súbito e intenso que no cede, con náuseas/vómitos o pérdida de conciencia?',
                type: 'boolean'
              },
              {
                id: 'oa3',
                text: '¿Tiene fiebre alta (≥ 38.5 ºC) con dolor abdominal/tensión en pelvis o secreción vaginal maloliente?',
                type: 'boolean'
              }
            ]
          },
          {
            id: 'other_b',
            level: 'B',
            classification: 'Consulta urgente',
            destination: 'Videoconsulta hoy mismo',
            color: '#ea580c',
            questions: [
              {
                id: 'ob1',
                text: '¿Tiene sangrado vaginal persistente fuera de tu regla o más abundante de lo habitual?',
                type: 'boolean'
              },
              {
                id: 'ob2',
                text: '¿Tiene dolor pélvico constante que limita actividades pero sin desmayo ni signos vitales alterados?',
                type: 'boolean'
              },
              {
                id: 'ob3',
                text: '¿Tiene secreción vaginal inusual (espesa, verdosa, mal olor) o picor vulvar/vaginal?',
                type: 'boolean'
              }
            ]
          },
          {
            id: 'other_c',
            level: 'C',
            classification: 'Atención programada',
            destination: 'Consejo / prevención',
            color: '#ca8a04',
            questions: [
              {
                id: 'oc1',
                text: '¿Quiere información para intentar quedarse embarazada (preconcepción: ácido fólico, etc.)?',
                type: 'boolean'
              },
              {
                id: 'oc2',
                text: '¿Tiene menstruaciones irregulares pero sin sangrado excesivo ni dolor invalidante?',
                type: 'boolean'
              },
              {
                id: 'oc3',
                text: '¿Quiere asesoramiento sobre anticoncepción, cambio de método, o efectos secundarios?',
                type: 'boolean'
              }
            ]
          }
        ]
      },

      // FLUJO GINECOLOGÍA - Salud reproductiva y ginecológica general
      gynecological: {
        name: 'Ginecología General',
        blocks: [
          {
            id: 'gyn_block_a',
            level: 'A',
            classification: 'Emergencia ginecológica',
            destination: 'LLAMAR AL 112 INMEDIATAMENTE',
            color: '#dc2626',
            instruction: 'Si presenta alguno de estos síntomas, llame inmediatamente al 112:',
            questions: [
              {
                id: 'gyn_a1',
                text: 'Dolor pélvico severo con signos de shock (palidez, mareo, sudoración fría)',
                type: 'boolean',
                critical: true
              },
              {
                id: 'gyn_a2',
                text: 'Hemorragia vaginal muy abundante que empapa compresas cada hora',
                type: 'boolean',
                critical: true
              },
              {
                id: 'gyn_a3',
                text: 'Fiebre muy alta (>39°C) con dolor abdominal severo y secreción maloliente',
                type: 'boolean',
                critical: true
              },
              {
                id: 'gyn_a4',
                text: 'Sospecha de embarazo ectópico: dolor abdominal severo con sangrado y mareo',
                type: 'boolean',
                critical: true
              }
            ]
          },
          {
            id: 'gyn_block_b',
            level: 'B',
            classification: 'Urgencia ginecológica moderada',
            destination: 'Evaluación ginecológica urgente - Acudir a urgencias',
            color: '#ea580c',
            instruction: 'Seleccione los síntomas que presenta:',
            questions: [
              {
                id: 'gyn_b1',
                text: 'Sangrado menstrual muy abundante o prolongado (más de 7 días)',
                type: 'boolean'
              },
              {
                id: 'gyn_b2',
                text: 'Dolor pélvico intenso que limita las actividades diarias',
                type: 'boolean'
              },
              {
                id: 'gyn_b3',
                text: 'Secreción vaginal con mal olor, color anormal y picor intenso',
                type: 'boolean'
              },
              {
                id: 'gyn_b4',
                text: 'Fiebre moderada (38-39°C) con síntomas urinarios o pélvicos',
                type: 'boolean'
              },
              {
                id: 'gyn_b5',
                text: 'Ausencia de menstruación con sospecha de embarazo y síntomas preocupantes',
                type: 'boolean'
              }
            ]
          },
          {
            id: 'gyn_block_c',
            level: 'C',
            classification: 'Consulta ginecológica diferida',
            destination: 'Consulta ginecológica por telemedicina - Primeras horas',
            color: '#f59e0b',
            instruction: 'Seleccione los síntomas o dudas que tiene:',
            questions: [
              {
                id: 'gyn_c1',
                text: 'Irregularidades menstruales sin sangrado excesivo',
                type: 'boolean'
              },
              {
                id: 'gyn_c2',
                text: 'Dolor menstrual que interfiere moderadamente con las actividades',
                type: 'boolean'
              },
              {
                id: 'gyn_c3',
                text: 'Secreción vaginal anormal sin otros síntomas severos',
                type: 'boolean'
              },
              {
                id: 'gyn_c4',
                text: 'Síntomas de síndrome premenstrual intensos',
                type: 'boolean'
              },
              {
                id: 'gyn_c5',
                text: 'Molestias relacionadas con métodos anticonceptivos',
                type: 'boolean'
              },
              {
                id: 'gyn_c6',
                text: 'Dudas sobre salud sexual o disfunciones leves',
                type: 'boolean'
              }
            ]
          },
          {
            id: 'gyn_block_d',
            level: 'D',
            classification: 'Consulta ginecológica no urgente',
            destination: 'Consulta ginecológica programada vía telemedicina',
            color: '#10b981',
            instruction: 'Seleccione el motivo de su consulta:',
            questions: [
              {
                id: 'gyn_d1',
                text: 'Revisión ginecológica rutinaria y citología',
                type: 'boolean'
              },
              {
                id: 'gyn_d2',
                text: 'Asesoramiento sobre métodos anticonceptivos',
                type: 'boolean'
              },
              {
                id: 'gyn_d3',
                text: 'Planificación familiar y fertilidad',
                type: 'boolean'
              },
              {
                id: 'gyn_d4',
                text: 'Educación sobre salud sexual y reproductiva',
                type: 'boolean'
              },
              {
                id: 'gyn_d5',
                text: 'Seguimiento de tratamientos ginecológicos crónicos',
                type: 'boolean'
              },
              {
                id: 'gyn_d6',
                text: 'Cuidados preventivos y promoción de la salud',
                type: 'boolean'
              }
            ]
          }
        ]
      }
    }
  },


};

/* ===================================
   COMPONENTE PRINCIPAL DE TRIAJE
=================================== */

/**
 * TriageEngine - Motor de triaje médico interactivo
 * 
 * Componente principal que gestiona el proceso de triaje médico:
 * - Carga el algoritmo según la especialidad seleccionada
 * - Gestiona el flujo secuencial de preguntas
 * - Evalúa respuestas y determina nivel de urgencia
 * - Redirige según el resultado del triaje
 * 
 * @returns {JSX.Element} Interfaz de triaje interactiva
 */
function TriageEngine() {
  // Hooks de navegación y estado global
  const { specialty } = useParams();
  const navigate = useNavigate();
  const { user, currentSpecialty, patientInfo } = useApp();
  
  // Estados del componente
  const [currentFlow, setCurrentFlow] = useState(null);          // Algoritmo actual cargado
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0); // Índice del bloque actual (A,B,C,D)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Índice de pregunta dentro del bloque
  const [answers, setAnswers] = useState({});                    // Respuestas del usuario
  const [triageResult, setTriageResult] = useState(null);        // Resultado final del triaje
  const [isComplete, setIsComplete] = useState(false);           // Bandera de triaje completado
  const [flowState, setFlowState] = useState({});               // Estado para flujos condicionales (Salud Mujer)
  const [attachedFiles, setAttachedFiles] = useState([]);       // Archivos adjuntos del usuario
  const [showFileUploader, setShowFileUploader] = useState(false); // Mostrar subida de archivos

  /**
   * Efecto de inicialización - Carga el algoritmo de triaje
   * Valida que el usuario esté autenticado y la especialidad sea válida
   */
  useEffect(() => {
    // Verificar autenticación del usuario
    if (!user || !currentSpecialty) {
      navigate('/');
      return;
    }

    // Cargar algoritmo de la especialidad seleccionada
    const algorithm = TRIAGE_ALGORITHMS[specialty];
    if (!algorithm) {
      navigate('/specialties');
      return;
    }

    setCurrentFlow(algorithm);
  }, [user, currentSpecialty, specialty, navigate]);

  /**
   * Obtiene la pregunta actual según el flujo y estado del triaje
   * Maneja diferentes tipos de flujo (secuencial, condicional, prioridad)
   * @returns {Object|null} Objeto de pregunta actual o null
   */
  const getCurrentQuestion = () => {
    if (!currentFlow) return null;

    // Para flujos condicionales (Salud de la Mujer)
    if (currentFlow.type === 'conditional') {
      // Si es la pregunta inicial
      if (!flowState.selectedFlow) {
        return currentFlow.initialQuestion;
      }

      // Pregunta de información adicional (semanas de embarazo, días postparto)
      if (flowState.needsAdditionalInfo) {
        return currentFlow.flows[flowState.selectedFlow].additionalInfo;
      }

      // Preguntas del flujo seleccionado
      const selectedFlowData = currentFlow.flows[flowState.selectedFlow];
      const currentBlock = selectedFlowData.blocks[currentBlockIndex];
      return currentBlock?.questions[currentQuestionIndex];
    }

    // Para flujos secuenciales y de prioridad
    const currentBlock = currentFlow.blocks[currentBlockIndex];
    if (!currentBlock) return null;

    return currentBlock.questions[currentQuestionIndex];
  };

  /**
   * Maneja las respuestas del usuario y controla el flujo del triaje
   * - Almacena la respuesta del usuario
   * - Determina si debe detenerse (solo emergencias nivel A)
   * - Avanza a la siguiente pregunta o completa el triaje
   * @param {string} questionId - ID único de la pregunta
   * @param {boolean|string} answer - Respuesta del usuario
   */
  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    // Manejo especial para pregunta inicial de flujos condicionales
    if (currentFlow.type === 'conditional' && questionId === 'wh_initial') {
      const selectedOption = currentFlow.initialQuestion.options.find(opt => opt.value === answer);
      
      setFlowState({
        selectedFlow: answer,
        needsAdditionalInfo: !!selectedOption.followUp
      });
      return;
    }

    // Manejo de información adicional en flujos condicionales
    if (currentFlow.type === 'conditional' && flowState.needsAdditionalInfo) {
      setFlowState(prev => ({ ...prev, needsAdditionalInfo: false }));
      return;
    }

    // Verificar si la respuesta afirmativa debe detener el triage SOLO para nivel A (emergencias)
    if (currentFlow.type === 'sequential' && answer === true) {
      const currentBlock = getCurrentBlock();
      
      // Verificar si hay escalación (como en pediatría)
      const currentQuestion = getCurrentQuestion();
      if (currentQuestion.followUp?.escalation && answer === true) {
        completeTriageWithLevel(currentQuestion.followUp.escalation);
        return;
      }
      
      // SOLO detener el triaje si es nivel A (emergencia)
      if (currentBlock.level === 'A') {
        completeTriageWithLevel(currentBlock.level);
        return;
      }
      
      // Para otros niveles (B, C, D), continuar con el cuestionario
      // pero marcar que tiene síntomas de este nivel
    }



    // Avanzar a la siguiente pregunta
    moveToNextQuestion();
  };

  /**
   * Obtiene el bloque actual según el tipo de flujo
   * @returns {Object|null} Bloque actual de preguntas
   */
  const getCurrentBlock = () => {
    if (!currentFlow) return null;

    if (currentFlow.type === 'conditional' && flowState.selectedFlow) {
      return currentFlow.flows[flowState.selectedFlow].blocks[currentBlockIndex];
    }

    return currentFlow.blocks[currentBlockIndex];
  };

  const hasAnswersInLevel = (level, answersToCheck) => {
    let blocksToCheck = [];
    
    if (currentFlow.type === 'conditional' && flowState.selectedFlow) {
      // Para flujos condicionales, usar los bloques del flujo seleccionado
      blocksToCheck = currentFlow.flows[flowState.selectedFlow].blocks;
    } else {
      // Para flujos secuenciales y de prioridad, usar todos los bloques
      blocksToCheck = currentFlow.blocks;
    }
    
    return blocksToCheck
      .filter(block => block.level === level)
      .some(block => 
        block.questions.some(q => answersToCheck[q.id] === true)
      );
  };

  /**
   * Avanza a la siguiente pregunta o bloque del triaje
   * Controla el flujo secuencial A→B→C→D
   */
  const moveToNextQuestion = () => {
    const currentBlock = getCurrentBlock();
    
    if (currentQuestionIndex < currentBlock.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Pasar al siguiente bloque
      const totalBlocks = currentFlow.type === 'conditional' && flowState.selectedFlow 
        ? currentFlow.flows[flowState.selectedFlow].blocks.length
        : currentFlow.blocks.length;

      if (currentBlockIndex < totalBlocks - 1) {
        setCurrentBlockIndex(currentBlockIndex + 1);
        setCurrentQuestionIndex(0);
      } else {
        // Completar triage con el nivel más bajo encontrado
        completeTriageWithLowestLevel();
      }
    }
  };

  /**
   * Completa el triaje con un nivel específico de urgencia
   * @param {string} level - Nivel de urgencia (A, B, C, D)
   */
  const completeTriageWithLevel = (level) => {
    const result = findBlockByLevel(level);
    setTriageResult(result);
    
    // Si es nivel A (emergencia), ir directamente a la página de emergencia
    if (level === 'A') {
      navigate('/emergency', {
        state: {
          level: 'A',
          specialty: currentSpecialty.id,
          answers: answers,
          triageResult: {
            level: 'A',
            classification: result.classification,
            destination: result.destination
          }
        }
      });
      return;
    }
    
    // Para otros niveles, ir al uploader de archivos
    setShowFileUploader(true);
    setIsComplete(true);
  };

  const completeTriageWithLowestLevel = () => {
    // Encontrar el nivel más urgente (más bajo alfabéticamente) con respuestas afirmativas
    const levels = ['A', 'B', 'C', 'D'];
    
    for (const level of levels) {
      if (hasAnswersInLevel(level, answers)) {
        completeTriageWithLevel(level);
        return;
      }
    }

    // Si no hay respuestas afirmativas en ningún nivel, es nivel D por defecto
    completeTriageWithLevel('D');
  };

  const findBlockByLevel = (level) => {
    if (currentFlow.type === 'conditional' && flowState.selectedFlow) {
      return currentFlow.flows[flowState.selectedFlow].blocks.find(block => block.level === level);
    }
    return currentFlow.blocks.find(block => block.level === level);
  };

  const handleComplete = () => {
    if (!showFileUploader) {
      // Mostrar uploader de archivos primero
      setShowFileUploader(true);
      return;
    }

    // Generar número de caso aleatorio
    const caseNumber = `GBD-${Date.now().toString().slice(-6)}`;

    // Navegar a opciones de contacto en lugar de resultados directos
    navigate('/contact-options', {
      state: {
        specialty: currentSpecialty.id,
        triageResult: {
          level: triageResult.level,
          classification: triageResult.classification,
          destination: triageResult.destination
        },
        answers: answers,
        attachedFiles: attachedFiles,
        consultation: {
          id: caseNumber,
          caseNumber: caseNumber,
          status: 'submitted',
          triageLevel: triageResult.level,
          specialty: currentSpecialty.name
        },
        patientInfo: {
          name: user.name,
          email: user.email,
          basicInfo: 'Información del usuario registrado'
        }
      }
    });
  };

  const handleFilesSelected = (files) => {
    setAttachedFiles(files);
  };

  const handleSkipFiles = () => {
    // Generar número de caso aleatorio
    const caseNumber = `GBD-${Date.now().toString().slice(-6)}`;

    // Navegar a opciones de contacto sin archivos
    navigate('/contact-options', {
      state: {
        specialty: currentSpecialty.id,
        triageResult: {
          level: triageResult.level,
          classification: triageResult.classification,
          destination: triageResult.destination
        },
        answers: answers,
        attachedFiles: [],
        consultation: {
          id: caseNumber,
          caseNumber: caseNumber,
          status: 'submitted',
          triageLevel: triageResult.level,
          specialty: currentSpecialty.name
        },
        patientInfo: {
          name: user.name,
          email: user.email,
          basicInfo: 'Información del usuario registrado'
        }
      }
    });
  };

  const handleBack = () => {
    if (currentFlow.type === 'conditional') {
      if (flowState.needsAdditionalInfo) {
        setFlowState({ selectedFlow: null, needsAdditionalInfo: false });
        return;
      }
      if (flowState.selectedFlow && (currentBlockIndex > 0 || currentQuestionIndex > 0)) {
        if (currentQuestionIndex > 0) {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else if (currentBlockIndex > 0) {
          setCurrentBlockIndex(currentBlockIndex - 1);
          const prevBlock = getCurrentBlock();
          setCurrentQuestionIndex(prevBlock.questions.length - 1);
        }
        return;
      }
    }

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentBlockIndex > 0) {
      setCurrentBlockIndex(currentBlockIndex - 1);
      const prevBlock = getCurrentBlock();
      setCurrentQuestionIndex(prevBlock.questions.length - 1);
    }
  };

  /* ===================================
     RENDERIZADO CONDICIONAL - ESTADOS
  =================================== */
  
  // Estado de carga - Mientras se inicializa el algoritmo
  if (!currentFlow) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#17ab9c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>Cargando triage...</h2>
        </div>
      </div>
    );
  }

  // Estado de triaje completado - Subida opcional de archivos
  if (isComplete && showFileUploader) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#17ab9c' }}>
        <div style={{ padding: '32px 16px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px',
              padding: '32px'
            }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                  Adjuntar archivos
                </h2>
                <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '24px' }}>
                  Triatge completat. Pot adjuntar documents mèdics rellevants si ho desitja.
                </p>

                <FileUploader 
                  onFilesSelected={handleFilesSelected}
                  maxFiles={5}
                  acceptedTypes="image/*,.pdf,.doc,.docx"
                />

                <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                  <button
                    onClick={handleSkipFiles}
                    style={{
                      flex: 1,
                      padding: '16px 32px',
                      borderRadius: '8px',
                      border: '2px solid #e5e7eb',
                      backgroundColor: 'white',
                      color: '#6b7280',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Ometre arxius
                  </button>

                  <button
                    onClick={handleComplete}
                    style={{
                      flex: 1,
                      padding: '16px 32px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: '#17ab9c',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Finalitzar consulta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion();
  const currentBlock = getCurrentBlock();

  if (!currentQuestion) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#17ab9c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>Error al cargar las preguntas</h2>
        </div>
      </div>
    );
  }

  /* ===================================
     INTERFAZ PRINCIPAL DE TRIAJE
  =================================== */
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#17ab9c' }}>
      
      {/* HEADER - Información del triaje y progreso */}
      <div style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>
                Triatge - {currentFlow.name}
              </h1>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                {currentBlock ? `Evaluando síntomas - ${currentBlock.classification}` : 'Configuración inicial'}
              </p>
            </div>
            
            {/* Indicador de progreso */}
            {currentFlow.type !== 'conditional' || flowState.selectedFlow ? (
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                  Bloque {currentBlockIndex + 1} de {
                    currentFlow.type === 'conditional' && flowState.selectedFlow 
                      ? currentFlow.flows[flowState.selectedFlow].blocks.length
                      : currentFlow.blocks.length
                  }
                </div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                  Pregunta {currentQuestionIndex + 1} de {currentBlock?.questions.length || 0}
                </div>
              </div>
            ) : null}
          </div>
          
          {/* Barra de progreso */}
          {(currentFlow.type !== 'conditional' || flowState.selectedFlow) && currentBlock && (
            <div style={{ marginTop: '12px' }}>
              <div style={{ 
                width: '100%', 
                height: '6px', 
                backgroundColor: '#e5e7eb', 
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${((currentBlockIndex * currentBlock.questions.length + currentQuestionIndex + 1) / 
                    (currentFlow.type === 'conditional' && flowState.selectedFlow 
                      ? currentFlow.flows[flowState.selectedFlow].blocks.reduce((acc, block) => acc + block.questions.length, 0)
                      : currentFlow.blocks.reduce((acc, block) => acc + block.questions.length, 0)
                    )) * 100}%`,
                  height: '100%',
                  backgroundColor: currentBlock?.color || '#17ab9c',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL - Formulario de preguntas */}
      <div style={{ padding: '32px 16px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px',
            padding: '32px'
          }}>
            
            {/* Instrucciones específicas del bloque actual */}
            {currentBlock && currentBlock.instruction && (
              <div style={{ 
                backgroundColor: '#f0f9ff', 
                border: '2px solid #0ea5e9', 
                borderRadius: '8px', 
                padding: '16px', 
                marginBottom: '24px'
              }}>
                <p style={{ 
                  margin: 0, 
                  color: '#0c4a6e', 
                  fontSize: '16px', 
                  fontWeight: '500'
                }}>
                  📋 {currentBlock.instruction}
                </p>
              </div>
            )}
            
            {/* Instrucción general para triajes secuenciales */}
            {currentFlow.type === 'sequential' && currentBlock?.level !== 'A' && (
              <div style={{ 
                backgroundColor: '#f0fdf4', 
                border: '2px solid #16a34a', 
                borderRadius: '8px', 
                padding: '16px', 
                marginBottom: '24px'
              }}>
                <p style={{ 
                  margin: 0, 
                  color: '#15803d', 
                  fontSize: '14px', 
                  fontWeight: '500'
                }}>
                  ℹ️ Por favor, responda a todas las preguntas. El sistema evaluará todos sus síntomas para determinar el mejor tipo de atención médica para usted.
                </p>
              </div>
            )}

            {/* Question */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                {currentQuestion.text}
              </h2>
              {currentQuestion.description && (
                <p style={{ color: '#6b7280', fontSize: '16px', backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '8px' }}>
                  ℹ️ {currentQuestion.description}
                </p>
              )}
            </div>

            {/* Answer Options */}
            <div style={{ marginBottom: '32px' }}>
              {currentQuestion.type === 'boolean' && (
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button
                    onClick={() => handleAnswer(currentQuestion.id, true)}
                    style={{
                      flex: 1,
                      padding: '16px 24px',
                      borderRadius: '8px',
                      border: '2px solid #17ab9c',
                      backgroundColor: '#17ab9c',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Sí
                  </button>
                  <button
                    onClick={() => handleAnswer(currentQuestion.id, false)}
                    style={{
                      flex: 1,
                      padding: '16px 24px',
                      borderRadius: '8px',
                      border: '2px solid #e5e7eb',
                      backgroundColor: 'white',
                      color: '#374151',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    No
                  </button>
                </div>
              )}

              {currentQuestion.type === 'select' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(currentQuestion.id, option.value)}
                      style={{
                        padding: '16px',
                        borderRadius: '8px',
                        border: '2px solid #e5e7eb',
                        backgroundColor: 'white',
                        color: '#374151',
                        fontSize: '16px',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'number' && (
                <div>
                  <input
                    type="number"
                    min={currentQuestion.min || 0}
                    max={currentQuestion.max}
                    onChange={(e) => handleAnswer(currentQuestion.id, parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>
              )}

              {currentQuestion.type === 'text' && (
                <textarea
                  onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                  placeholder="Escriba su respuesta..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    resize: 'vertical',
                    outline: 'none'
                  }}
                />
              )}

              {currentQuestion.type === 'fever_check' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      Edad (meses)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="Edad en meses"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      Temperatura (°C)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="35"
                      max="45"
                      placeholder="Temperatura"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'end', gap: '8px' }}>
                    <button
                      onClick={() => {
                        // Lógica para evaluar fiebre según edad
                        handleAnswer(currentQuestion.id, true); // Simplificado
                      }}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#17ab9c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      Evaluar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={handleBack}
                disabled={currentBlockIndex === 0 && currentQuestionIndex === 0 && !flowState.selectedFlow}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '2px solid #e5e7eb',
                  backgroundColor: '#ffffff',
                  color: '#6b7280',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  opacity: (currentBlockIndex === 0 && currentQuestionIndex === 0 && !flowState.selectedFlow) ? 0.5 : 1
                }}
              >
                ← Anterior
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exportar componente principal
export default TriageEngine;