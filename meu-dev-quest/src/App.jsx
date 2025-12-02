import React, { useState, useEffect, useRef } from 'react';

// BANCO DE DADOS DE PERGUNTAS (MOCK)
const questionBank = {
  frontend: [
    { id: 'f1', difficulty: 'Fácil', question: 'O que significa a sigla HTML?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyperlink and Text Markup Language', 'Home Tool Markup Language'], answer: 'Hyper Text Markup Language' },
    { id: 'f2', difficulty: 'Fácil', question: 'Qual propriedade do CSS é usada para alterar a cor do texto de um elemento?', options: ['font-color', 'text-color', 'color', 'background-color'], answer: 'color' },
    { id: 'f3', difficulty: 'Média', question: 'Qual hook do React é usado para lidar com efeitos colaterais em componentes funcionais?', options: ['useState', 'useEffect', 'useContext', 'useReducer'], answer: 'useEffect' },
    { id: 'f4', difficulty: 'Média', question: 'O que o seletor `div > p` faz em CSS?', options: ['Seleciona todos os <p> dentro de uma <div>', 'Seleciona apenas os <p> que são filhos diretos de uma <div>', 'Seleciona a primeira <div> que contém um <p>', 'Seleciona todos os elementos <div> e <p>'], answer: 'Seleciona apenas os <p> que são filhos diretos de uma <div>' },
    { id: 'f5', difficulty: 'Difícil', question: 'O que é "Virtual DOM" no contexto do React?', options: ['Uma representação do DOM na memória para otimizar as atualizações', 'Um DOM que existe apenas em ambientes virtuais', 'Uma ferramenta de segurança para proteger o DOM', 'Uma versão mais antiga do DOM'], answer: 'Uma representação do DOM na memória para otimizar as atualizações' },
    { id: 'f6', difficulty: 'Difícil', question: 'Qual a finalidade do `webpack` em um projeto frontend moderno?', options: ['Gerenciar pacotes e dependências do projeto', 'Executar testes automatizados', 'Empacotar módulos JavaScript e outros assets para o navegador', 'Criar APIs REST para o frontend'], answer: 'Empacotar módulos JavaScript e outros assets para o navegador' },
  ],
  backend: [
    { id: 'b1', difficulty: 'Fácil', question: 'Qual linguagem é comumente associada ao framework Node.js?', options: ['Python', 'Java', 'JavaScript', 'Ruby'], answer: 'JavaScript' },
    { id: 'b2', difficulty: 'Fácil', question: 'O que significa a sigla SQL?', options: ['Structured Query Language', 'Simple Question Language', 'Standardized Query Logic', 'System Query Language'], answer: 'Structured Query Language' },
    { id: 'b3', difficulty: 'Média', question: 'Em uma arquitetura REST, qual método HTTP é tipicamente usado para criar um novo recurso?', options: ['GET', 'UPDATE', 'DELETE', 'POST'], answer: 'POST' },
    { id: 'b4', difficulty: 'Média', question: 'O que é um ORM (Object-Relational Mapping)?', options: ['Um banco de dados relacional', 'Uma técnica para converter dados entre sistemas incompatíveis', 'Uma linguagem de programação para servidores', 'Um tipo de firewall de banco de dados'], answer: 'Uma técnica para converter dados entre sistemas incompatíveis' },
    { id: 'b5', difficulty: 'Difícil', question: 'Qual a principal diferença entre um banco de dados SQL e NoSQL?', options: ['SQL é mais rápido que NoSQL', 'SQL usa tabelas e esquemas fixos, enquanto NoSQL é mais flexível (documentos, grafos, etc.)', 'SQL é open-source, NoSQL é pago', 'Não há diferença significativa'], answer: 'SQL usa tabelas e esquemas fixos, enquanto NoSQL é mais flexível (documentos, grafos, etc.)' },
    { id: 'b6', difficulty: 'Difícil', question: 'O que é "containerização" usando Docker?', options: ['Uma forma de compactar arquivos de um projeto', 'Um método de virtualização que empacota uma aplicação e suas dependências em um contêiner', 'Uma técnica de segurança para isolar o banco de dados', 'Um padrão de projeto para APIs'], answer: 'Um método de virtualização que empacota uma aplicação e suas dependências em um contêiner' },
  ],
  dados: [
    { id: 'd1', difficulty: 'Fácil', question: 'Qual biblioteca Python é amplamente utilizada para manipulação e análise de dados?', options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'], answer: 'Pandas' },
    { id: 'd2', difficulty: 'Fácil', question: 'O que significa a sigla "ETL" em engenharia de dados?', options: ['Execute, Test, Load', 'Extract, Transform, Load', 'Estimate, Track, Learn', 'Export, Translate, Link'], answer: 'Extract, Transform, Load' },
    { id: 'd3', difficulty: 'Média', question: 'Qual o objetivo principal do algoritmo de "Regressão Linear" em Machine Learning?', options: ['Classificar dados em categorias distintas', 'Agrupar dados semelhantes', 'Prever um valor numérico contínuo', 'Reduzir a dimensionalidade dos dados'], answer: 'Prever um valor numérico contínuo' },
    { id: 'd4', difficulty: 'Média', question: 'O que é um "Data Warehouse"?', options: ['Um backup de todos os dados da empresa', 'Um sistema para visualização de dados em tempo real', 'Um repositório central de dados integrados de uma ou mais fontes, usado para relatórios e análises', 'Um mercado online para comprar e vender dados'], answer: 'Um repositório central de dados integrados de uma ou mais fontes, usado para relatórios e análises' },
    { id: 'd5', difficulty: 'Difícil', question: 'Qual a diferença entre "Aprendizado Supervisionado" e "Não Supervisionado"?', options: ['Supervisionado usa dados rotulados para treinar o modelo, Não Supervisionado usa dados não rotulados', 'Supervisionado é mais rápido que Não Supervisionado', 'Supervisionado é usado para classificação, Não Supervisionado para regressão', 'Não há diferença prática'], answer: 'Supervisionado usa dados rotulados para treinar o modelo, Não Supervisionado usa dados não rotulados' },
    { id: 'd6', difficulty: 'Difícil', question: 'O que é o Teorema de Bayes e qual sua importância em ciência de dados?', options: ['Uma lei da física quântica', 'Um teorema que descreve a probabilidade de um evento, baseado em conhecimento prévio de condições relacionadas', 'Um algoritmo para ordenação de dados', 'Um princípio de design de banco de dados'], answer: 'Um teorema que descreve a probabilidade de um evento, baseado em conhecimento prévio de condições relacionadas' },
  ]
};

// ÍCONES SVG (usados como componentes)
const IconCode = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const IconServer = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>;
const IconDatabase = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>;
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconPlay = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;

// AVATARES E INSÍGNIAS
const avatars = ['🤖', '👾', '🧑‍💻', '👩‍🚀', '🐱', '🦝'];
const badgeTiers = {
  iniciante: { name: 'Iniciante', points: 0, icon: '🥉' },
  veterano: { name: 'Veterano', points: 1000, icon: '🥈' },
  senior: { name: 'Sênior', points: 1900, icon: '🥇' },
};

// COMPONENTES DA APLICAÇÃO

// Componente de Autenticação (Login e Cadastro)
function AuthScreen({ onLogin, onSignup }) {
  const [isLogin, setIsLogin] = useState(true);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin({ email, password });
    } else {
      onSignup({ nickname, email, password });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg border border-teal-500">
        <h1 className="text-4xl font-bold text-center mb-2 text-teal-400">DevQuest</h1>
        <p className="text-center text-gray-400 mb-8">{isLogin ? 'Faça login para continuar sua jornada' : 'Crie sua conta para começar'}</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <input
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          )}
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button type="submit" className="w-full py-3 bg-teal-600 rounded-lg font-bold text-white hover:bg-teal-500 transition-colors duration-300">
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>
        <p className="text-center mt-6">
          {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-teal-400 hover:underline font-semibold">
            {isLogin ? 'Cadastre-se' : 'Faça login'}
          </button>
        </p>
      </div>
    </div>
  );
}

// Componente Menu Principal
function MainMenu({ user, onNavigate }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-teal-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]">DevQuest</h1>
        <p className="text-xl text-gray-300 mt-2">Olá, {user.nickname}! Pronto para o desafio?</p>
      </div>
      <div className="space-y-6 w-full max-w-xs">
        <button onClick={() => onNavigate('track-selection')} className="w-full flex items-center justify-center gap-3 py-4 bg-teal-600 rounded-lg font-bold text-xl text-white hover:bg-teal-500 transition-transform transform hover:scale-105 duration-300 shadow-lg">
          <IconPlay /> INICIAR
        </button>
        <button onClick={() => onNavigate('profile')} className="w-full flex items-center justify-center gap-3 py-4 bg-gray-700 rounded-lg font-bold text-xl text-white hover:bg-gray-600 transition-transform transform hover:scale-105 duration-300 shadow-lg">
          <IconUser /> PERFIL
        </button>
      </div>
    </div>
  );
}

// Componente de Seleção de Trilha
function TrackSelection({ onSelectTrack, onBack }) {
  const tracks = [
    { id: 'backend', name: 'Backend', icon: <IconServer />, description: 'Teste seus conhecimentos em APIs, bancos de dados e lógica de servidor.' },
    { id: 'frontend', name: 'Frontend', icon: <IconCode />, description: 'Desafios sobre HTML, CSS, JavaScript e frameworks modernos.' },
    { id: 'dados', name: 'Dados', icon: <IconDatabase />, description: 'Perguntas sobre SQL, Pandas, Machine Learning e engenharia de dados.' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-10 text-teal-400">Escolha sua Trilha</h1>
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-4xl">
        {tracks.map(track => (
          <div key={track.id} onClick={() => onSelectTrack(track.id)} className="bg-gray-800 p-8 rounded-lg border border-gray-700 text-center cursor-pointer hover:border-teal-500 hover:scale-105 transition-all duration-300">
            <div className="text-teal-400 mx-auto mb-4 w-16 h-16 flex items-center justify-center">{React.cloneElement(track.icon, { width: 48, height: 48 })}</div>
            <h2 className="text-2xl font-bold mb-2">{track.name}</h2>
            <p className="text-gray-400">{track.description}</p>
          </div>
        ))}
      </div>
      <button onClick={onBack} className="mt-12 py-2 px-6 bg-gray-700 rounded-lg font-bold text-white hover:bg-gray-600 transition-colors">
        Voltar ao Menu
      </button>
    </div>
  );
}

// Componente do Quiz
function QuizScreen({ track, onQuizComplete }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Seleciona e embaralha as perguntas
    const allQuestions = questionBank[track];
    const easy = allQuestions.filter(q => q.difficulty === 'Fácil').sort(() => 0.5 - Math.random()).slice(0, 2);
    const medium = allQuestions.filter(q => q.difficulty === 'Média').sort(() => 0.5 - Math.random()).slice(0, 2);
    const hard = allQuestions.filter(q => q.difficulty === 'Difícil').sort(() => 0.5 - Math.random()).slice(0, 2);
    const quizQuestions = [...easy, ...medium, ...hard].sort(() => 0.5 - Math.random());
    setQuestions(quizQuestions);
  }, [track]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (timeLeft === 0 && !isAnswered) {
      handleAnswer(null); // Tempo esgotado conta como resposta errada
    }
  }, [timeLeft, isAnswered]);

  const handleAnswer = (option) => {
    if (isAnswered) return;

    clearInterval(timerRef.current);
    setIsAnswered(true);
    setSelectedAnswer(option);

    const currentQuestion = questions[currentQuestionIndex];
    if (option === currentQuestion.answer) {
      const basePoints = 100;
      const difficultyMultiplier = { 'Fácil': 1, 'Média': 2, 'Difícil': 3 }[currentQuestion.difficulty];
      const timeBonus = timeLeft * 10;
      setScore(prev => prev + (basePoints * difficultyMultiplier) + timeBonus);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsAnswered(false);
        setSelectedAnswer(null);
        setTimeLeft(20);
      } else {
        onQuizComplete(score);
      }
    }, 2000);
  };

  if (questions.length === 0) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">Carregando perguntas...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const difficultyColors = {
    'Fácil': 'text-green-400 bg-green-900/50',
    'Média': 'text-yellow-400 bg-yellow-900/50',
    'Difícil': 'text-red-400 bg-red-900/50',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <p className="text-xl">Pontuação: <span className="font-bold text-teal-400">{score}</span></p>
          <p className="text-xl">Tempo: <span className="font-bold text-teal-400">{timeLeft}s</span></p>
        </div>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <p className="text-lg text-gray-400">Pergunta {currentQuestionIndex + 1} / {questions.length}</p>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${difficultyColors[currentQuestion.difficulty]}`}>{currentQuestion.difficulty}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">{currentQuestion.question}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => {
              const isCorrect = option === currentQuestion.answer;
              let buttonClass = 'bg-gray-700 hover:bg-gray-600';
              if (isAnswered) {
                if (isCorrect) {
                  buttonClass = 'bg-green-600';
                } else if (selectedAnswer === option) {
                  buttonClass = 'bg-red-600';
                }
              }

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  className={`p-4 rounded-lg text-left text-lg transition-colors duration-300 ${buttonClass}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de Resultados
function ResultsScreen({ score, track, onNavigate }) {
  console.log('ResultsScreen Debug:', { score, badgeTiers });
  const getBadge = (finalScore) => {
    if (finalScore >= badgeTiers.senior.points) return badgeTiers.senior;
    if (finalScore >= badgeTiers.veterano.points) return badgeTiers.veterano;
    return badgeTiers.iniciante;
  };

  const badge = getBadge(score);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg text-center border border-teal-500 max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-4 text-teal-400">Quiz Finalizado!</h1>
        <p className="text-xl text-gray-300 mb-6">Sua pontuação final na trilha {track} foi:</p>
        <p className="text-7xl font-bold text-white mb-8 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{score}</p>
        <div className="bg-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Insígnia Conquistada:</h2>
          <p className="text-5xl mb-2">{badge.icon}</p>
          <p className="text-2xl font-bold text-teal-400">{badge.name}</p>
        </div>
        <div className="flex justify-center gap-4 mt-10">
          <button onClick={() => onNavigate('track-selection')} className="py-3 px-6 bg-teal-600 rounded-lg font-bold text-white hover:bg-teal-500 transition-colors">
            Jogar Novamente
          </button>
          <button onClick={() => onNavigate('menu')} className="py-3 px-6 bg-gray-600 rounded-lg font-bold text-white hover:bg-gray-500 transition-colors">
            Menu Principal
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente de Perfil
function ProfileScreen({ user, onUpdateAvatar, onBack }) {
  console.log('ProfileScreen Debug:', { badges: user.badges, badgeTiers });
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);

  const handleAvatarChange = (avatar) => {
    setSelectedAvatar(avatar);
    onUpdateAvatar(avatar);
  };

  const getBadgeForTrack = (track) => {
    const badgeInfo = user.badges[track];
    if (!badgeInfo) {
      return { name: 'Não Conquistada', icon: '❓', tier: 'none' };
    }
    if (badgeInfo.score >= badgeTiers.senior.points) return { ...badgeTiers.senior, tier: 'senior' };
    if (badgeInfo.score >= badgeTiers.veterano.points) return { ...badgeTiers.veterano, tier: 'veterano' };
    return { ...badgeTiers.iniciante, tier: 'iniciante' };
  };

  const badgeColors = {
    iniciante: 'border-amber-700',
    veterano: 'border-slate-400',
    senior: 'border-yellow-400',
    none: 'border-gray-600',
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-4 pt-12">
      <div className="w-full max-w-4xl">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center border border-gray-700 mb-8">
          <div className="text-8xl mb-4">{selectedAvatar}</div>
          <h1 className="text-4xl font-bold text-teal-400">{user.nickname}</h1>
          <p className="text-gray-400">{user.email}</p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Escolha seu Avatar:</h3>
            <div className="flex justify-center gap-4">
              {avatars.map(avatar => (
                <button
                  key={avatar}
                  onClick={() => handleAvatarChange(avatar)}
                  className={`text-4xl p-2 rounded-full transition-transform transform hover:scale-125 ${selectedAvatar === avatar ? 'bg-teal-500/30' : ''}`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-6">Galeria de Insígnias</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['frontend', 'backend', 'dados'].map(track => {
              const badge = getBadgeForTrack(track);
              return (
                <div key={track} className={`bg-gray-700 p-6 rounded-lg text-center border-2 ${badgeColors[badge.tier]}`}>
                  <h3 className="text-xl font-bold capitalize mb-2">{track}</h3>
                  <p className="text-6xl mb-2">{badge.icon}</p>
                  <p className={`text-xl font-semibold ${badge.tier !== 'none' ? 'text-teal-400' : 'text-gray-400'}`}>{badge.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-8">
          <button onClick={onBack} className="py-3 px-8 bg-gray-700 rounded-lg font-bold text-white hover:bg-gray-600 transition-colors">
            Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  );
}


// Componente Principal da Aplicação
export default function App() {
  const [page, setPage] = useState('auth'); // 'auth', 'menu', 'track-selection', 'quiz', 'results', 'profile'
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); // Simula um DB de usuários
  const [quizConfig, setQuizConfig] = useState({ track: null, finalScore: 0 });

  const handleSignup = (credentials) => {
    if (users.find(u => u.nickname === credentials.nickname || u.email === credentials.email)) {
      alert("Nickname ou e-mail já existem!");
      return;
    }
    const newUser = {
      id: users.length + 1,
      ...credentials,
      avatar: '🧑‍💻',
      badges: {},
    };
    setUsers([...users, newUser]);
    setUser(newUser);
    setPage('menu');
  };

  const handleLogin = (credentials) => {
    const foundUser = users.find(u => u.email === credentials.email && u.password === credentials.password);
    if (foundUser) {
      setUser(foundUser);
      setPage('menu');
    } else {
      alert("E-mail ou senha inválidos!");
    }
  };

  const handleSelectTrack = (track) => {
    setQuizConfig({ ...quizConfig, track });
    setPage('quiz');
  };

  const handleQuizComplete = (score) => {
    setQuizConfig({ ...quizConfig, finalScore: score });

    // Atualiza a melhor insígnia do usuário
    const currentUser = { ...user };
    const currentBest = currentUser.badges[quizConfig.track]?.score || 0;
    if (score > currentBest) {
      currentUser.badges[quizConfig.track] = { score };
      setUser(currentUser);

      // Atualiza no "banco de dados"
      setUsers(users.map(u => u.id === currentUser.id ? currentUser : u));
    }

    setPage('results');
  };

  const handleUpdateAvatar = (avatar) => {
    const updatedUser = { ...user, avatar };
    setUser(updatedUser);
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const renderPage = () => {
    switch (page) {
      case 'auth':
        return <AuthScreen onLogin={handleLogin} onSignup={handleSignup} />;
      case 'menu':
        return <MainMenu user={user} onNavigate={setPage} />;
      case 'track-selection':
        return <TrackSelection onSelectTrack={handleSelectTrack} onBack={() => setPage('menu')} />;
      case 'quiz':
        return <QuizScreen track={quizConfig.track} onQuizComplete={handleQuizComplete} />;
      case 'results':
        return <ResultsScreen score={quizConfig.finalScore} track={quizConfig.track} onNavigate={setPage} />;
      case 'profile':
        return <ProfileScreen user={user} onUpdateAvatar={handleUpdateAvatar} onBack={() => setPage('menu')} />;
      default:
        return <AuthScreen onLogin={handleLogin} onSignup={handleSignup} />;
    }
  };

  return (
    <div className="font-sans w-screen min-h-screen bg-gray-900">
      {renderPage()}
    </div>
  );
}

