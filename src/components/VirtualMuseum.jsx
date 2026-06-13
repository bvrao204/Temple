import React, { useState } from 'react';
import { Landmark, GraduationCap, Award, CheckCircle2, XCircle } from 'lucide-react';

const ARCHITECTURE_STYLES = [
  {
    id: 'nagara',
    name: 'Nagara Style (Northern India)',
    period: '5th Century CE onwards',
    characteristics: [
      'Built on a raised stone platform (Jagati).',
      'Does not typically have elaborate boundary walls or massive gateway towers (Gopurams).',
      'The main tower (Shikhara) is beehive-shaped, curving gradually inward (Curvilinear spire).',
      'The tower is capped with a stone disc (Amalaka) and a pot-shaped crowning element (Kalasha).'
    ],
    example: 'Kedarnath Temple, Sun Temple (Konark), Khajuraho temples.'
  },
  {
    id: 'dravidian',
    name: 'Dravidian Style (Southern India)',
    period: '7th Century CE onwards (Pallava, Chola, Pandyan, Nayak)',
    characteristics: [
      'Enclosed within high compound walls.',
      'Features majestic entrance gateway towers (Gopurams) which are often taller than the inner shrine.',
      'The main tower (Vimana) is shaped like a stepped pyramid, rising hierarchically in storeys.',
      'Crowned with a dome-shaped monolithic capstone (Shikhara or Stupika).'
    ],
    example: 'Brihadeeswarar Temple (Thanjavur), Meenakshi Amman Temple (Madurai), Tirupati Balaji.'
  },
  {
    id: 'vesara',
    name: 'Vesara Style (Hybrid Style)',
    period: '8th Century CE onwards (Chalukyas, Hoysalas)',
    characteristics: [
      'A blend of both Nagara and Dravidian architectural features.',
      'The spire height is typically shorter, with circular or star-shaped base layouts.',
      'Features highly detailed, intricate, and ornate stone carvings covering almost every square inch of the surface.'
    ],
    example: 'Hoysaleswara Temple (Halebidu), Chennakeshava Temple (Belur).'
  }
];

const GLOSSARY = [
  { term: 'Garbhagriha', definition: 'The sanctum sanctorum or innermost chamber where the main deity idol (Murti) is housed.' },
  { term: 'Mandapa', definition: 'The pillared assembly hall or pavilion leading to the inner sanctum, used for prayers and gatherings.' },
  { term: 'Shikhara / Vimana', definition: 'The spire or tower rising above the sanctum. Called Shikhara in Northern India and Vimana in Southern India.' },
  { term: 'Gopuram', definition: 'The monumental, highly decorated entrance gateway towers characteristic of South Indian Dravidian temples.' },
  { term: 'Amalaka', definition: 'A stone disc with ribbed edges, placed on top of a Nagara spire representing a sacred lotus.' },
  { term: 'Antarala', definition: 'A small vestibule or passage connecting the Garbhagriha and the Mandapa.' }
];

const QUIZ_QUESTIONS = [
  {
    question: 'Which temple features the tallest Vimana (pyramidal tower) in the world, built using over 130,000 tons of granite?',
    options: ['Kedarnath Temple', 'Brihadeeswarar Temple', 'Meenakshi Temple', 'Somnath Temple'],
    answer: 'Brihadeeswarar Temple',
    explanation: 'The Brihadeeswarar Temple (Big Temple) in Thanjavur, built by Rajaraja Chola I in 1010 CE, holds the record for its 216-foot tall Vimana capped by an 80-ton monolithic stone cupola.'
  },
  {
    question: 'Which temple architecture style is characterised by curvilinear spires (beehive shaped) and the presence of an Amalaka disc?',
    options: ['Dravidian Style', 'Vesara Style', 'Nagara Style', 'Chola Style'],
    answer: 'Nagara Style',
    explanation: 'The Nagara style of Northern India features curvilinear spires (Shikharas) ending with a ribbed stone disc called an Amalaka.'
  },
  {
    question: 'Which active pilgrimage site is home to the world’s largest temple kitchen (Ananda Bazar) serving Mahaprasad to thousands daily?',
    options: ['Tirupati Balaji', 'Golden Temple', 'Jagannath Temple (Puri)', 'Kashi Vishwanath'],
    answer: 'Jagannath Temple (Puri)',
    explanation: 'The Jagannath Temple in Puri houses the world’s largest heritage kitchen, cooking in clay pots stacked vertically over firewood using solar alignment.'
  },
  {
    question: 'Which temple is constructed in the shape of a giant celestial chariot of the Sun God, pulled by seven horses and supported by 24 stone wheels?',
    options: ['Sun Temple, Konark', 'Somnath Temple', 'Meenakshi Temple', 'Brihadeeswarar Temple'],
    answer: 'Sun Temple, Konark',
    explanation: 'The 13th-century Konark Sun Temple in Odisha is built as a grand stone chariot of Surya, representing the solar calendar.'
  }
];

export default function VirtualMuseum() {
  const [activeStyle, setActiveStyle] = useState(ARCHITECTURE_STYLES[0].id);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerSubmit = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === QUIZ_QUESTIONS[quizIndex].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (quizIndex + 1 < QUIZ_QUESTIONS.length) {
      setQuizIndex(quizIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="container animate-fade-in-up" style={{ padding: '20px 0' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          background: 'rgba(255, 111, 60, 0.12)',
          borderRadius: 'var(--radius-full)',
          color: 'var(--saffron)',
          marginBottom: '10px'
        }}>
          <Landmark size={18} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-title)', letterSpacing: '1px' }}>Virtual Heritage Museum</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Temple Architecture & Legacy</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
          Explore the historical evolution of sacred geometry, stone carvings, and architectural styles across the sub-continent.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '30px',
        alignItems: 'start'
      }} className="museum-layout">
        
        {/* Left Column: Architecture styles and glossary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Architecture tabs */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '20px' }}>
              Styles of Indian Temple Architecture
            </h2>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
              {ARCHITECTURE_STYLES.map(style => (
                <button
                  key={style.id}
                  onClick={() => setActiveStyle(style.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid ' + (activeStyle === style.id ? 'var(--saffron)' : 'var(--border-color)'),
                    background: activeStyle === style.id ? 'rgba(255, 111, 60, 0.08)' : 'transparent',
                    color: activeStyle === style.id ? 'var(--saffron)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {style.name.split(' (')[0]}
                </button>
              ))}
            </div>

            {(() => {
              const currentStyle = ARCHITECTURE_STYLES.find(s => s.id === activeStyle);
              return (
                <div style={{ animation: 'fadeInUp 0.3s' }}>
                  <h3 style={{ color: 'var(--saffron)', marginBottom: '4px', fontSize: '1.2rem' }}>{currentStyle.name}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Historical Period: {currentStyle.period}</span>
                  
                  <div style={{ margin: '16px 0' }}>
                    <h4 style={{ fontSize: '0.95rem', marginBottom: '8px' }}>Key Architectural Rules:</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {currentStyle.characteristics.map((c, i) => (
                        <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', marginTop: '8px', flexShrink: 0 }}></span>
                          <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p style={{ margin: 0, padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}>
                    <strong>Notable Examples:</strong> {currentStyle.example}
                  </p>
                </div>
              );
            })()}
          </div>

          {/* Glossary Panel */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '20px' }}>
              Architectural Glossary (Vastu Shastra)
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="grid-2">
              {GLOSSARY.map((g, idx) => (
                <div key={idx} style={{ padding: '12px 16px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                  <h4 style={{ color: 'var(--gold)', marginBottom: '4px', fontSize: '0.95rem' }}>{g.term}</h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{g.definition}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Cultural Quiz */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '20px' }}>
            <GraduationCap size={20} color="var(--saffron)" />
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Heritage Challenge</h2>
          </div>

          {!quizFinished ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                <span>Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}</span>
                <span>Score: {score}</span>
              </div>

              <h4 style={{ fontSize: '1.05rem', lineHeight: '1.5', marginBottom: '18px' }}>
                {QUIZ_QUESTIONS[quizIndex].question}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {QUIZ_QUESTIONS[quizIndex].options.map((option, idx) => {
                  let buttonStyle = {
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'transparent',
                    color: 'var(--text-primary)',
                    textAlign: 'left',
                    cursor: isAnswered ? 'default' : 'pointer',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  };

                  if (isAnswered) {
                    if (option === QUIZ_QUESTIONS[quizIndex].answer) {
                      buttonStyle.background = 'rgba(46, 125, 50, 0.12)';
                      buttonStyle.borderColor = 'var(--success)';
                      buttonStyle.color = 'var(--success)';
                    } else if (option === selectedOption) {
                      buttonStyle.background = 'rgba(211, 47, 47, 0.12)';
                      buttonStyle.borderColor = 'var(--danger)';
                      buttonStyle.color = 'var(--danger)';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(option)}
                      style={buttonStyle}
                      className={!isAnswered ? "quiz-option-hover" : ""}
                    >
                      <span>{option}</span>
                      {isAnswered && option === QUIZ_QUESTIONS[quizIndex].answer && <CheckCircle2 size={16} />}
                      {isAnswered && option === selectedOption && option !== QUIZ_QUESTIONS[quizIndex].answer && <XCircle size={16} />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div style={{ animation: 'fadeInUp 0.2s' }}>
                  <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontSize: '0.88rem', color: 'var(--text-secondary)', borderLeft: '3px solid var(--gold)' }}>
                    <strong>Explanation: </strong> {QUIZ_QUESTIONS[quizIndex].explanation}
                  </div>
                  <button onClick={handleNextQuestion} className="btn btn-primary" style={{ width: '100%' }}>
                    {quizIndex + 1 < QUIZ_QUESTIONS.length ? 'Next Question' : 'Finish Quiz'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0', animation: 'fadeInUp 0.3s' }}>
              <Award size={48} color="var(--gold)" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Challenge Complete!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>
                You scored <strong>{score} out of {QUIZ_QUESTIONS.length}</strong> questions correct.
              </p>
              
              <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                {score === QUIZ_QUESTIONS.length ? 'Dharmik Scholar! You possess immaculate knowledge about our cultural heritage.' : 'Great attempt! Keep exploring temple archives to discover more mysteries.'}
              </div>

              <button onClick={resetQuiz} className="btn btn-secondary" style={{ width: '100%' }}>
                Try Again
              </button>
            </div>
          )}
        </div>

      </div>

      <style>{`
        .quiz-option-hover:hover {
          background: var(--bg-secondary) !important;
          border-color: var(--border-focus) !important;
        }
        @media (max-width: 900px) {
          .museum-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
