import React, { useState } from 'react'

type Page = 
  | 'Dashboard' 
  | 'Sales' 
  | 'Finance' 
  | 'Customers' 
  | 'HR' 
  | 'Inventory' 
  | 'Projects' 
  | 'Reports' 
  | 'Decision Lab' 
  | 'AI Assistant' 
  | 'Notifications' 
  | 'Settings';

type UserRole = 'CEO' | 'Manager' | 'HR Director' | 'Finance Director' | 'Lead Analyst' | 'Executive Director';

interface SalesRecord {
  id: string;
  month: string;
  revenue: number;
  profit: number;
  region: string;
  sector: string;
}

interface Project {
  id: string;
  name: string;
  department: string;
  progress: number;
  status: 'Kwenye Mpango' | 'Inaendelea' | 'Imekamilika' | 'Imechelewa';
  manager: string;
  budget: number;
}

interface Customer {
  id: string;
  name: string;
  sector: string;
  value: number;
  health: 'Salama' | 'Hatarini' | 'Kawaida';
  churnRisk: number;
}

interface SavedScenario {
  id: string;
  timestamp: string;
  priceAdj: number;
  marketingAdj: number;
  hiringAdj: number;
  projectedRevenue: number;
  projectedProfit: number;
  riskIndex: number;
}

const AnalytiqLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 15L85 35V75L50 95L15 75V35L50 15Z" stroke="url(#logo-grad-primary)" strokeWidth="4" strokeLinejoin="round" />
    <path d="M50 15V95" stroke="url(#logo-grad-secondary)" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M15 35H85" stroke="url(#logo-grad-secondary)" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M15 75H85" stroke="url(#logo-grad-secondary)" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="50" cy="15" r="5" fill="#10B981" className="animate-pulse" />
    <circle cx="85" cy="35" r="5" fill="#06B6D4" />
    <circle cx="85" cy="75" r="5" fill="#3B82F6" />
    <circle cx="50" cy="95" r="5" fill="#10B981" />
    <circle cx="15" cy="75" r="5" fill="#06B6D4" />
    <circle cx="15" cy="35" r="5" fill="#3B82F6" />
    <path d="M50 40L65 55L50 70L35 55L50 40Z" fill="url(#logo-grad-core)" opacity="0.9" />
    <circle cx="50" cy="55" r="3" fill="#FFFFFF" />
    <defs>
      <linearGradient id="logo-grad-primary" x1="15" y1="15" x2="85" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="50%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="logo-grad-secondary" x1="15" y1="50" x2="85" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1E293B" />
        <stop offset="50%" stopColor="#64748B" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#1E293B" />
      </linearGradient>
      <linearGradient id="logo-grad-core" x1="35" y1="40" x2="65" y2="70" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
  </svg>
);

const Icons = {
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Sales: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Finance: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Customers: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  HR: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
    </svg>
  ),
  Inventory: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  Projects: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  Reports: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 12h3m-3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  DecisionLab: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  AiAssistant: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Notifications: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
};

export default function App() {
 const [_isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>('Zacharia M.');
  const [userRole, setUserRole] = useState<UserRole>('CEO');
  const [companyName, setCompanyName] = useState<string>('Analytiq Global E.A');
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Custom Toast/Snackbar Notification States for non-disruptive feedback
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'warning' | 'info' }>>([]);

  const triggerToast = (message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // State arrays populated with interactive executive records
  const [salesRecords, setSalesRecords] = useState<SalesRecord[]>([
    { id: '1', month: 'Januari', revenue: 1200000, profit: 310000, region: 'Kusini', sector: 'Mining' },
    { id: '2', month: 'Februari', revenue: 1250000, profit: 340000, region: 'Kusini', sector: 'Agriculture' },
    { id: '3', month: 'Machi', revenue: 1350000, profit: 390000, region: 'Ziwa', sector: 'Transportation' },
    { id: '4', month: 'Aprili', revenue: 1420000, profit: 410000, region: 'Kati', sector: 'Tourism' },
    { id: '5', month: 'Mei', revenue: 1510000, profit: 460000, region: 'Pwani', sector: 'Telecom' },
    { id: '6', month: 'Juni', revenue: 1650000, profit: 512000, region: 'Kusini', sector: 'Mining' }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'Mfumo Mpya wa POS Kanda ya Kati', department: 'Mauzo', progress: 75, status: 'Inaendelea', manager: 'Sasha Elius', budget: 120000 },
    { id: '2', name: 'Uboreshaji wa Stoo ya Kaskazini', department: 'Inventory', progress: 40, status: 'Inaendelea', manager: 'Mwinyi Juma', budget: 85000 },
    { id: '3', name: 'Kampeni Kuu ya Msimu wa Mavuno', department: 'Marketing', progress: 95, status: 'Inaendelea', manager: 'Sarah Paul', budget: 45000 },
    { id: '4', name: 'Tathmini ya HR na Performance Appraisal', department: 'HR', progress: 100, status: 'Imekamilika', manager: 'Hellen Maro', budget: 15000 },
    { id: '5', name: 'Ujenzi wa API ya Supabase Gateway', department: 'Mifumo', progress: 15, status: 'Imechelewa', manager: 'Zacharia M.', budget: 95000 }
  ]);

  const [customers] = useState<Customer[]>([]);
    { id: 'C1', name: 'Tanzania Mining Corp', sector: 'Madini', value: 450000, health: 'Salama', churnRisk: 12 },
    { id: 'C2', name: 'Kilimanjaro Agro Exports', sector: 'Kilimo', value: 380000, health: 'Salama', churnRisk: 8 },
    { id: 'C3', name: 'Lake Victoria Logistics', sector: 'Usafirishaji', value: 290000, health: 'Kawaida', churnRisk: 35 },
    { id: 'C4', name: 'Serengeti Hospitality Group', sector: 'Utalii', value: 180000, health: 'Hatarini', churnRisk: 72 },
    { id: 'C5', name: 'Dodoma Tech Solutions', sector: 'Mawasiliano', value: 120000, health: 'Salama', churnRisk: 5 }
  ]);

  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([
    { id: 'S1', timestamp: 'Jana saa 16:30', priceAdj: 5, marketingAdj: 20, hiringAdj: 2, projectedRevenue: 1720000, projectedProfit: 545000, riskIndex: 15 }
  ]);

  // Form states for creating records interactively
  const [newSale, setNewSale] = useState({ month: 'Julai', revenue: '', profit: '', region: 'Kusini', sector: 'Telecom' });
  const [newProject, setNewProject] = useState({ name: '', department: 'Mauzo', progress: 0, status: 'Kwenye Mpango' as const, manager: '', budget: '' });

  // Strategic Decision Lab controls
  const [priceAdj, setPriceAdj] = useState<number>(0);         // -30% to +30%
  const [marketingAdj, setMarketingAdj] = useState<number>(0); // -50% to +100%
  const [hiringAdj, setHiringAdj] = useState<number>(0);       // -20 to +50 Employees
  const [productionAdj, setProductionAdj] = useState<number>(0); // -40% to +40%
  const [inventoryAdj, setInventoryAdj] = useState<number>(0);   // -50% to +50%

  // Dynamic totals that change when sales are added or modified
  const baseRevenue = useMemo(() => salesRecords.reduce((acc, curr) => acc + curr.revenue, 0) / salesRecords.length, [salesRecords]);
  const baseProfit = useMemo(() => salesRecords.reduce((acc, curr) => acc + curr.profit, 0) / salesRecords.length, [salesRecords]);
  const latestRevenue = useMemo(() => salesRecords[salesRecords.length - 1]?.revenue || 1650000, [salesRecords]);
  const latestProfit = useMemo(() => salesRecords[salesRecords.length - 1]?.profit || 512000, [salesRecords]);
  const totalEnterpriseBudget = useMemo(() => projects.reduce((acc, curr) => acc + curr.budget, 0), [projects]);

  const baseDemand = 12000;
  const baseCashFlow = 620000;
  const baseInventory = 350000;

  // Linear Programming business intelligence coefficients
  const elasticityOfDemand = -1.8; 
  const priceMultiplier = 1 + (priceAdj / 100);
  const demandFromPrice = Math.max(0.2, 1 + (priceAdj / 100) * elasticityOfDemand);
  const demandFromMarketing = 1 + Math.log1p(Math.max(0, marketingAdj / 100)) * 0.5;
  
  const simulatedDemand = Math.round(baseDemand * demandFromPrice * demandFromMarketing);
  const simulatedRevenue = Math.round(simulatedDemand * (137.5 * priceMultiplier));
  
  const inventoryHoldingCostMultiplier = 1 - (inventoryAdj / 100) * 0.25;
  const simulatedCOGS = simulatedDemand * 82 * (1 - (productionAdj / 100) * 0.08); 
  const simulatedFixedOverhead = 540000 + (hiringAdj * 5500) + (marketingAdj * 1800) + (baseInventory * 0.04 * inventoryHoldingCostMultiplier);
  
  const simulatedProfit = simulatedRevenue - simulatedCOGS - simulatedFixedOverhead;
  const _simulatedCashFlow = Math.round(baseCashFlow + (simulatedProfit - latestProfit) * 0.85 - (hiringAdj > 0 ? hiringAdj * 2500 : 0));
const _simulatedRetention = Math.min(100, Math.max(30, 92 - (priceAdj * 0.7) + (marketingAdj * 0.09)));
  const riskIndex = Math.min(100, Math.max(0, Math.round(10 + (priceAdj > 12 ? 35 : 0) + (hiringAdj > 20 ? 30 : 0) + (simulatedProfit < 100000 ? 25 : 0))));
  const confidenceScore = Math.min(99, Math.max(50, Math.round(96 - Math.abs(priceAdj) * 0.6 - Math.abs(productionAdj) * 0.4)));

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const applyPreset = (preset: 'growth' | 'cost_cut' | 'defensive' | 'reset') => {
    if (preset === 'growth') {
      setPriceAdj(-5);
      setMarketingAdj(60);
      setHiringAdj(15);
      setProductionAdj(30);
      setInventoryAdj(20);
      triggerToast('Mkakati wa Ukuaji wa Haraka umewashwa', 'success');
    } else if (preset === 'cost_cut') {
      setPriceAdj(10);
      setMarketingAdj(-40);
      setHiringAdj(-10);
      setProductionAdj(-15);
      setInventoryAdj(-30);
      triggerToast('Mkakati wa Kupunguza Gharama umewashwa', 'warning');
    } else if (preset === 'defensive') {
      setPriceAdj(5);
      setMarketingAdj(15);
      setHiringAdj(2);
      setProductionAdj(5);
      setInventoryAdj(-5);
      triggerToast('Mkakati wa Kujihami umechaguliwa', 'info');
    } else {
      setPriceAdj(0);
      setMarketingAdj(0);
      setHiringAdj(0);
      setProductionAdj(0);
      setInventoryAdj(0);
      triggerToast('Mkakati umerudishwa kama kawaida');
    }
  };

  const handleSaveScenario = () => {
    const scenario: SavedScenario = {
      id: 'S' + (savedScenarios.length + 1),
      timestamp: `Leo saa ${new Date().toLocaleTimeString('sw-TZ', {hour: '2-digit', minute:'2-digit'})}`,
      priceAdj,
      marketingAdj,
      hiringAdj,
      projectedRevenue: simulatedRevenue,
      projectedProfit: simulatedProfit,
      riskIndex
    };
    setSavedScenarios(prev => [scenario, ...prev]);
    triggerToast('Mkakati wako umehifadhiwa kikamilifu kwenye Historia!');
  };

  const [aiQuery, setAiQuery] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string; hasChart?: boolean; chartType?: string }>>([
    { sender: 'ai', text: 'Hujambo Zacharia, karibu kwenye ANALYTIQ Enterprise AI Console. Unaweza kuniuliza chochote kuhusu mwenendo wa fedha, bidhaa, miradi, au kupata ushauri kuhusu mkakati wako mpya wa Strategic Lab.' }
  ]);

  const handleAiAsk = (customQuery?: string) => {
    const query = customQuery || aiQuery;
    if (!query.trim()) return;

    const newHistory = [...chatHistory, { sender: 'user' as const, text: query }];
    setChatHistory(newHistory);
    setAiQuery('');

    setTimeout(() => {
      let aiText = '';
      let showChart = false;
      let chartName = '';

      const lq = query.toLowerCase();
      if (lq.includes('profit') || lq.includes('faida') || lq.includes('mwenendo')) {
        aiText = `Kulingana na data za sasa, Wastani wa Mapato ya Mwezi ni ${formatCurrency(baseRevenue)} huku faida ya wastani ikiwa ${formatCurrency(baseProfit)}. Ukijaribu Strategic Lab hivi sasa, unatarajia kupata Faida iliyokadiriwa ya ${formatCurrency(simulatedProfit)} kwa mwezi ujao kutokana na mabadiliko yako ya bei (${priceAdj}%).`;
        showChart = true;
        chartName = 'profitDrop';
      } else if (lq.includes('customer') || lq.includes('wateja') || lq.includes('sekta')) {
        aiText = "Sekta inayojiri mzunguko mkubwa zaidi wa fedha ni Sekta ya Madini (Mining Sector), ikifuatiwa na Agriculture. Mteja mkubwa zaidi kwa sasa ni Tanzania Mining Corp ($450,000). Tuna tahadhari kubwa kwa Serengeti Hospitality Group ($180,000) yenye Churn Risk ya 72%.";
        showChart = true;
        chartName = 'bestCustomers';
      } else if (lq.includes('mradi') || lq.includes('project')) {
        aiText = `Hivi sasa tunasimamia miradi ${projects.length} yenye bajeti ya jumla ya ${formatCurrency(totalEnterpriseBudget)}. Mradi unaoongoza kwa asilimia kubwa ni Tathmini ya HR (${projects.find(p => p.id === '4')?.manager}), huku ujenzi wa API ya Supabase ukiwa umeteleza kwa siku kadhaa.`;
      } else if (lq.includes('mkakati') || lq.includes('simul')) {
        aiText = `Mkakati ulioweka sasa unaleta Mapato yaliyokadiriwa ya ${formatCurrency(simulatedRevenue)} na faida ya ${formatCurrency(simulatedProfit)}. Kiwango chako cha hatari kiko asilimia ${riskIndex}%. Ushauri wa AI: ${simulatedProfit < 0 ? 'Mkakati huu una hasara, tafadhali punguza kuajiri au ongeza ufanisi wa uzalishaji.' : 'Mseto huu ni imara na unaweza kutekelezeka.'}`;
      } else {
        aiText = `Nimepata swali lako. Kwenye mfumo wetu salama wa ${companyName}, Zacharia anaongoza jopo hili kwa mafanikio. Kwa sasa jopo lote lipo 'synchronized' kikamilifu na Supabase Database na PostgreSql server.`;
      }

      setChatHistory([...newHistory, { sender: 'ai', text: aiText, hasChart: showChart, chartType: chartName }]);
    }, 850);
  };

  // Notification management states
  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; desc: string; type: 'warning' | 'info' | 'critical'; read: boolean; date: string }>>([
    { id: '1', title: 'Tahadhari ya Kupoteza Mteja', desc: 'Serengeti Hospitality Group ina hatari kubwa ya Churn Risk (72%)', type: 'critical', read: false, date: 'Muda huu' },
    { id: '2', title: 'Stoo Imepitiliza (Overstock)', desc: 'Bidhaa za Category B zimejaa kwa 95% katika stoo kuu ya Kusini', type: 'warning', read: false, date: 'Masaa 2 yaliyopita' },
    { id: '3', title: 'Supabase Sync Imefanikiwa', desc: 'Data zote za mauzo zinasomwa kutoka kwa seva salama', type: 'info', read: true, date: 'Leo asubuhi' },
    { id: '4', title: 'Ucheleweshaji wa Mradi', desc: 'Mradi wa Gateway ya Supabase umechelewa kwa siku 12', type: 'warning', read: false, date: 'Jana' }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    triggerToast('Arifa zote zimetiwa saini kama zimesomwa.');
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    triggerToast('Arifa imefutwa', 'info');
  };

  const handleAddSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSale.revenue || !newSale.profit) {
      triggerToast('Tafadhali jaza kiasi cha mapato na faida', 'warning');
      return;
    }
    const record: SalesRecord = {
      id: 'SL' + (salesRecords.length + 1),
      month: newSale.month,
      revenue: parseFloat(newSale.revenue),
      profit: parseFloat(newSale.profit),
      region: newSale.region,
      sector: newSale.sector
    };
    setSalesRecords(prev => [...prev, record]);
    setNewSale({ month: 'Julai', revenue: '', profit: '', region: 'Kusini', sector: 'Telecom' });
    triggerToast('Mauzo mapya yamesajiliwa kwa mafanikio!');
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name || !newProject.manager || !newProject.budget) {
      triggerToast('Tafadhali jaza taarifa zote za mradi', 'warning');
      return;
    }
    const proj: Project = {
      id: 'PRJ' + (projects.length + 1),
      name: newProject.name,
      department: newProject.department,
      progress: Number(newProject.progress),
      status: newProject.status,
      manager: newProject.manager,
      budget: parseFloat(newProject.budget)
    };
    setProjects(prev => [...prev, proj]);
    setNewProject({ name: '', department: 'Mauzo', progress: 0, status: 'Kwenye Mpango', manager: '', budget: '' });
    triggerToast('Mradi mpya umesajiliwa na kuongezwa kwenye visual chart!');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex font-sans antialiased relative">
      
      {/* REAL-TIME TOAST OVERLAYS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`p-4 rounded-2xl shadow-xl flex items-center justify-between border transition-all duration-300 animate-slide-in ${
              toast.type === 'success' ? 'bg-emerald-950/90 border-emerald-800 text-emerald-300' :
              toast.type === 'warning' ? 'bg-rose-950/90 border-rose-900 text-rose-300' :
              'bg-[#0B192C]/90 border-slate-700 text-slate-100'
            }`}
          >
            <span className="text-xs font-semibold">{toast.message}</span>
            <button 
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} 
              className="ml-3 text-[10px] uppercase font-bold tracking-wider opacity-70 hover:opacity-100"
            >
              Funga
            </button>
          </div>
        ))}
      </div>

      {/* MOBILE HEADER BUTTON */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#0B192C] text-white p-4 flex justify-between items-center z-50 shadow-md">
        <div className="flex items-center space-x-2.5">
          <AnalytiqLogo className="w-8 h-8" />
          <div>
            <span className="font-extrabold tracking-tight text-base block leading-none">ANALYTIQ</span>
            <span className="text-[7px] text-emerald-400 font-mono uppercase tracking-widest block mt-0.5">Precision Data</span>
          </div>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300 focus:outline-none">
          <span className="text-2xl">{mobileMenuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0B192C] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} pt-16 md:pt-0`}>
        <div>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AnalytiqLogo className="w-10 h-10 shrink-0" />
              <div>
                <h1 className="text-lg font-black tracking-tight text-white leading-none">ANALYTIQ</h1>
                <p className="text-[8px] text-emerald-400 font-mono uppercase tracking-wider mt-1 font-extrabold leading-none">
                  Precision in Every Data Point
                </p>
              </div>
            </div>
          </div>
          
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[75vh]">
            {[
              { name: 'Dashboard', page: 'Dashboard', icon: <Icons.Dashboard /> },
              { name: 'Sales & Revenue', page: 'Sales', icon: <Icons.Sales /> },
              { name: 'Finance & Ledger', page: 'Finance', icon: <Icons.Finance /> },
              { name: 'Enterprise Customers', page: 'Customers', icon: <Icons.Customers /> },
              { name: 'HR & Productivity', page: 'HR', icon: <Icons.HR /> },
              { name: 'Inventory & ABC', page: 'Inventory', icon: <Icons.Inventory /> },
              { name: 'Gantt Projects', page: 'Projects', icon: <Icons.Projects /> },
              { name: 'Strategic Lab', page: 'Decision Lab', icon: <Icons.DecisionLab /> },
              { name: 'AI Expert Chat', page: 'AI Assistant', icon: <Icons.AiAssistant /> },
              { name: 'Reports Desk', page: 'Reports', icon: <Icons.Reports /> },
              { name: 'Enterprise Alert', page: 'Notifications', icon: <Icons.Notifications />, count: notifications.filter(n => !n.read).length },
              { name: 'Global Settings', page: 'Settings', icon: <Icons.Settings /> },
            ].map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  setCurrentPage(item.page as Page);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  currentPage === item.page
                    ? 'bg-emerald-500 text-[#0B192C] shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {item.count && item.count > 0 ? (
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{item.count}</span>
                ) : null}
              </button>
            ))}
          </nav>
        </div>

        {/* Profile Footer Panel */}
        <div className="p-4 border-t border-slate-800 bg-[#061120] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 to-cyan-400 flex items-center justify-center text-xs font-black text-slate-900">
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white leading-none">{userName}</p>
              <p className="text-[10px] text-slate-400 mt-1">Sajili: {userRole}</p>
            </div>
          </div>
          <button onClick={() => { setIsAuthenticated(false); triggerToast('Umetoka kwenye mfumo kwa usalama', 'info'); }} className="text-slate-400 hover:text-rose-400 p-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </aside>

      {/* MAIN MAIN CONTENT CONTAINER */}
      <main className="flex-1 md:ml-64 p-4 md:p-10 pt-20 md:pt-10 min-h-screen">
        
        {/* Global top navigation bar status */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 pb-5 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-black tracking-tight text-slate-900">{currentPage}</h2>
              <span className="text-[10px] bg-emerald-100 text-[#0F172A] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">{userRole} Suite</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{companyName} &bull; Kiwanda cha Maamuzi ya Kisayansi</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
            <span className="flex items-center text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-xl border border-emerald-200">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping mr-2"></span>
              PostgreSQL & Supabase Active Sync
            </span>
          </div>
        </header>

        {/* 1. DASHBOARD PAGE */}
        {currentPage === 'Dashboard' && (
          <div className="space-y-8">
            {/* Top Stat Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Wastani wa Mapato (Avg Revenue)', value: formatCurrency(baseRevenue), desc: 'Inategemea mauzo ya mwisho', color: 'text-emerald-600' },
                { label: 'Wastani wa Faida (Avg Profit)', value: formatCurrency(baseProfit), desc: `Nguvu ya soko kwa sasa`, color: 'text-emerald-600' },
                { label: 'Mapato ya Hivi Karibuni', value: formatCurrency(latestRevenue), desc: `Kutoka mwezi wa mwisho`, color: 'text-emerald-600' },
                { label: 'Miradi Inayoendelea', value: `${projects.filter(p => p.status === 'Inaendelea').length} Active`, desc: `${projects.length} kwa jumla`, color: 'text-amber-500' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition duration-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-2xl font-black mt-2 text-[#0B192C]">{stat.value}</h3>
                  <div className="flex items-center mt-2.5">
                    <span className={`text-xs font-bold mr-1.5 ${stat.color}`}>{stat.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Analytical Layout Block */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Revenue/Profit Monthly Bar Chart via Inline SVG */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="font-extrabold text-[#0B192C] text-sm">Mwenendo wa Kibiashara</h4>
                    <p className="text-[11px] text-slate-400">Mapato (Kijani) vs Faida (Navy) - Jumla ya Rekodi {salesRecords.length}</p>
                  </div>
                </div>

                <div className="h-64 flex items-end justify-between px-4 bg-slate-50/60 rounded-xl pt-6 overflow-x-auto">
                  {salesRecords.map((item) => (
  <div>{item.name}</div>
))}
                    const maxVal = 2000000;
                    const heightRevenue = (item.revenue / maxVal) * 100;
                    const heightProfit = (item.profit / maxVal) * 100;
                    return (
                      <div key={item.id} className="flex flex-col items-center space-y-2 min-w-[70px] w-1/6">
                        <div className="flex items-end space-x-1.5 h-40">
                          {/* Revenue column */}
                          <div 
                            style={{ height: `${heightRevenue}%` }} 
                            className="w-4 sm:w-6 bg-emerald-500 rounded-t-md transition-all duration-300 hover:opacity-80 relative group cursor-pointer"
                          >
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-[#0B192C] text-white text-[9px] font-mono p-1 rounded opacity-0 group-hover:opacity-100 transition z-10 pointer-events-none whitespace-nowrap">
                              Rev: {formatCurrency(item.revenue)}
                            </div>
                          </div>
                          {/* Profit column */}
                          <div 
                            style={{ height: `${heightProfit}%` }} 
                            className="w-4 sm:w-6 bg-[#0B192C] rounded-t-md transition-all duration-300 hover:opacity-80 relative group cursor-pointer"
                          >
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-[#0B192C] text-white text-[9px] font-mono p-1 rounded opacity-0 group-hover:opacity-100 transition z-10 pointer-events-none whitespace-nowrap">
                              Prf: {formatCurrency(item.profit)}
                            </div>
                          </div>
                        </div>
                        <span className="text-[9px] font-extrabold text-slate-500 uppercase">{item.month.substring(0, 5)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Departmental Performance Scores */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5">
                <h4 className="font-extrabold text-[#0B192C] text-sm">Ufanisi wa Idara (KPI Score)</h4>
                
                <div className="space-y-4">
                  {[
                    { dept: 'Mauzo & Usambazaji', score: '88%', color: 'bg-emerald-500' },
                    { dept: 'Uzalishaji & Stoo', score: '72%', color: 'bg-amber-500' },
                    { dept: 'Raslimali Watu (HR)', score: '91%', color: 'bg-emerald-500' },
                    { dept: 'Mifumo & Supabase Gateway', score: '54%', color: 'bg-rose-500' },
                  ].map((d, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>{d.dept}</span>
                        <span className="font-mono">{d.score}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className={`h-full ${d.color}`} style={{ width: d.score }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs leading-relaxed text-slate-500">
                  ⚡ <b>Wazo la Siku:</b> Seva ya Kaskazini inaonesha upotevu wa 6% wa tija ya POS. Inapendekezwa kuanzisha mchakato wa API Sync haraka.
                </div>
              </div>
            </div>

            {/* AI Insights & Alerts Center */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold">🤖 Uchambuzi Mkuu wa ANALYTIQ AI</span>
                  <p className="text-sm mt-3 leading-relaxed text-slate-300">
                    "Tija ya uendeshaji mwezi huu inaashiria upanuzi bora wa mapato. Tukiangalia mwenendo wa sasa, kuchelewa kwa POS ya Kanda ya Kati kumeathiri asilimia 2 tu ya malengo. Lengo linalofuata la faida ya {formatCurrency(latestProfit)} mwezi huu lipo vizuri kwenye njia."
                  </p>
                </div>
                <button onClick={() => setCurrentPage('AI Assistant')} className="mt-6 text-xs text-emerald-400 font-bold hover:underline inline-flex items-center">
                  Ongea na AI Expert wetu sasa &rarr;
                </button>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-sm text-[#0B192C] mb-4">Tahadhari za Haraka (Real-Time Alerts)</h4>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((n) => (
                    <div key={n.id} className="flex justify-between items-start text-xs border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                      <div>
                        <p className="font-bold text-[#0B192C]">{n.title}</p>
                        <p className="text-slate-400 text-[11px] mt-0.5">{n.desc}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        n.type === 'critical' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {n.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 2. SALES PAGE */}
        {currentPage === 'Sales' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h4 className="font-bold text-sm text-[#0B192C]">Uchambuzi wa Mauzo na Kampeni</h4>
                <p className="text-xs text-slate-400 mt-0.5">Ulinganishaji wa mauzo mwezi hadi mwezi na mfumo wa uingizaji data</p>
              </div>
              <div className="flex gap-2 text-xs font-semibold">
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg font-mono font-bold">
                  Wastani: {formatCurrency(baseRevenue)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Add New Sale Form */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm h-fit">
                <h4 className="font-bold text-sm text-[#0B192C] mb-4">Sajili Mauzo Mapya (Real-Time Entry)</h4>
                <form onSubmit={handleAddSale} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-500 mb-1">Mwezi / Kipindi</label>
                    <input 
                      type="text" 
                      value={newSale.month}
                      onChange={(e) => setNewSale(prev => ({ ...prev, month: e.target.value }))}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                      placeholder="e.g. Julai" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Mapato ya Jumla ($)</label>
                    <input 
                      type="number" 
                      value={newSale.revenue}
                      onChange={(e) => setNewSale(prev => ({ ...prev, revenue: e.target.value }))}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                      placeholder="e.g. 1500000" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Faida iliyopatikana ($)</label>
                    <input 
                      type="number" 
                      value={newSale.profit}
                      onChange={(e) => setNewSale(prev => ({ ...prev, profit: e.target.value }))}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                      placeholder="e.g. 400000" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-500 mb-1">Kanda (Region)</label>
                      <select 
                        value={newSale.region}
                        onChange={(e) => setNewSale(prev => ({ ...prev, region: e.target.value }))}
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="Kusini">Kusini</option>
                        <option value="Ziwa">Ziwa</option>
                        <option value="Kati">Kati</option>
                        <option value="Pwani">Pwani</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Sekta (Sector)</label>
                      <select 
                        value={newSale.sector}
                        onChange={(e) => setNewSale(prev => ({ ...prev, sector: e.target.value }))}
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="Mining">Mining</option>
                        <option value="Telecom">Telecom</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Tourism">Tourism</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-[#0B192C] text-white rounded-xl font-bold hover:bg-slate-800 transition">
                    Sajili na Unganisha
                  </button>
                </form>
              </div>

              {/* Current Ledger Table */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm overflow-hidden">
                <h4 className="font-bold text-sm text-[#0B192C] mb-4">Hati ya Mauzo Salama (Database Mirror)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 font-bold uppercase text-[9px] tracking-wider border-b border-slate-100">
                        <th className="p-3">Msimbo</th>
                        <th className="p-3">Mwezi</th>
                        <th className="p-3">Mapato</th>
                        <th className="p-3">Faida</th>
                        <th className="p-3">Kanda</th>
                        <th className="p-3">Sekta</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {salesRecords.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/50">
                          <td className="p-3 font-mono text-[10px] text-slate-400">{r.id}</td>
                          <td className="p-3 text-slate-900 font-bold">{r.month}</td>
                          <td className="p-3 font-mono">{formatCurrency(r.revenue)}</td>
                          <td className="p-3 font-mono text-emerald-600 font-bold">{formatCurrency(r.profit)}</td>
                          <td className="p-3"><span className="px-2 py-0.5 bg-slate-100 rounded text-[10px]">{r.region}</span></td>
                          <td className="p-3 text-slate-500">{r.sector}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 3. FINANCE PAGE */}
        {currentPage === 'Finance' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Operating Profit Margin', ratio: '31.0%', desc: 'Kiwango thabiti cha uendeshaji', color: 'border-emerald-500' },
                { title: 'Quick Ratio (Liquidity)', ratio: '1.92', desc: 'Uwezo salama wa kulipa madeni ya haraka', color: 'border-emerald-500' },
                { title: 'Opex to Revenue Ratio', ratio: '44.8%', desc: 'Gharama za ndani ya ofisi', color: 'border-amber-500' }
              ].map((r, i) => (
                <div key={i} className={`bg-white p-6 rounded-2xl border-l-4 ${r.color} shadow-sm border border-slate-100`}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{r.title}</p>
                  <h4 className="text-3xl font-black text-[#0B192C] mt-2">{r.ratio}</h4>
                  <p className="text-xs text-slate-500 mt-1.5">{r.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h4 className="font-extrabold text-[#0B192C] text-sm">Income Statement Summary Simulator</h4>
              
              <div className="space-y-4">
                {[
                  { item: 'Mapato ya Ghafi (Gross Revenue)', value: latestRevenue, pct: 100, color: 'bg-emerald-500' },
                  { item: 'Gharama za Uzalishaji (COGS)', value: latestRevenue * 0.6, pct: 60, color: 'bg-slate-500' },
                  { item: 'Gharama za Uendeshaji (Overhead)', value: latestRevenue * 0.09, pct: 9, color: 'bg-slate-400' },
                  { item: 'Faida Halisi kabla ya Kodi (Net Profit)', value: latestProfit, pct: Math.round((latestProfit / latestRevenue) * 100), color: 'bg-[#0B192C]' }
                ].map((row, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{row.item}</span>
                      <span className="font-mono">{formatCurrency(row.value)} ({row.pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className={`h-full ${row.color}`} style={{ width: `${row.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. CUSTOMERS PAGE */}
        {currentPage === 'Customers' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h4 className="font-bold text-sm text-[#0B192C]">Wateja Wakubwa na Thamani zao (Active Key Accounts)</h4>
                  <p className="text-xs text-slate-400 mt-1">Ushirikishwaji na viwango vya Churn Risk kwa mwezi huu</p>
                </div>
                <button 
                  onClick={() => triggerToast('Supabase Customer List imeunganishwa upya na PostgreSQL', 'info')}
                  className="px-4 py-2 border border-slate-200 text-[#0B192C] font-bold rounded-xl text-xs hover:bg-slate-50"
                >
                  Soma upya (Force Reload)
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="p-4 pl-6">Mteja</th>
                      <th className="p-4">Sekta</th>
                      <th className="p-4">Thamani ya Mauzo</th>
                      <th className="p-4">Hali ya Afya</th>
                      <th className="p-4">Churn Risk</th>
                      <th className="p-4 pr-6">Msimamizi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {customers.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/50">
                        <td className="p-4 pl-6 font-bold text-[#0B192C]">{c.name}</td>
                        <td className="p-4 text-slate-500">{c.sector}</td>
                        <td className="p-4 font-mono font-semibold">{formatCurrency(c.value)}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            c.health === 'Salama' ? 'bg-emerald-100 text-emerald-800' :
                            c.health === 'Kawaida' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {c.health}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold">{c.churnRisk}%</span>
                            <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div className={`h-full ${c.churnRisk > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${c.churnRisk}%` }}></div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 pr-6 text-slate-500 font-semibold">{userName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. HR & PRODUCTIVITY PAGE */}
        {currentPage === 'HR' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tija ya Wafanyakazi</p>
                <h4 className="text-3xl font-black text-emerald-500 mt-2">91.8%</h4>
                <p className="text-xs text-slate-500 mt-1">Ufanisi unazidi kiwango cha baseline kwa 1.8%</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gharama ya Kuajiri FTEs Mpya</p>
                <h4 className="text-3xl font-black text-[#0B192C] mt-2">$65,000</h4>
                <p className="text-xs text-slate-500 mt-1">Gharama wastani kwa kila rasilimali mpya ya juu</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Siku Wastani za Kuajiri</p>
                <h4 className="text-3xl font-black text-[#0B192C] mt-2">18 Siku</h4>
                <p className="text-xs text-slate-500 mt-1">Muda unaotumika kuanza hadi kuingizwa kazini</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h4 className="font-bold text-sm text-[#0B192C]">Kujenga Vipaji na Mpango wa Ajira</h4>
              <p className="text-xs text-slate-400">Mipango ya sasa ya miradi na uwezo wa timu kufanya kazi kwa ufanisi mkubwa.</p>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-800 font-semibold">
                ● Timu ya gateway za mifumo (Tech Data Science) imepangiwa kuajiriwa upya kusaidia Supabase syncing isichelewe.
              </div>
            </div>
          </div>
        )}

        {/* 6. INVENTORY & ABC PAGE */}
        {currentPage === 'Inventory' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div>
                <h4 className="font-bold text-sm text-[#0B192C]">Tathmini ya ABC ya Stoo (Inventory Categorization)</h4>
                <p className="text-xs text-slate-400 mt-0.5">Uchambuzi wa thamani dhidi ya uendeshaji mwezi huu</p>
              </div>

              <div className="space-y-4">
                {[
                  { cat: 'Category A (Fast Moving - 70% Value)', rate: 'Normal Stock Levels', color: 'bg-emerald-500', pct: 85 },
                  { cat: 'Category B (Medium - 20% Value)', rate: 'High Overstock Alert', color: 'bg-amber-500', pct: 95 },
                  { cat: 'Category C (Slow Moving - 10% Value)', rate: '40% Dead Stock Risk', color: 'bg-rose-500', pct: 40 }
                ].map((st, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{st.cat}</span>
                      <span className="text-slate-500">{st.rate}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div className={`h-full ${st.color}`} style={{ width: `${st.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 7. PROJECTS PAGE */}
        {currentPage === 'Projects' && (
          <div className="space-y-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Form to add a new project */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit">
                <h4 className="font-bold text-sm text-[#0B192C] mb-4">Sajili Mradi Mpya (Visual Gantt Entry)</h4>
                <form onSubmit={handleAddProject} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-500 mb-1">Jina la Mradi</label>
                    <input 
                      type="text" 
                      value={newProject.name}
                      onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                      placeholder="e.g. API Gateway V2" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-500 mb-1">Idara</label>
                      <select 
                        value={newProject.department}
                        onChange={(e) => setNewProject(prev => ({ ...prev, department: e.target.value }))}
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-white"
                      >
                        <option value="Mauzo">Mauzo</option>
                        <option value="Inventory">Inventory</option>
                        <option value="Marketing">Marketing</option>
                        <option value="HR">HR</option>
                        <option value="Mifumo">Mifumo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Bajeti ($)</label>
                      <input 
                        type="number" 
                        value={newProject.budget}
                        onChange={(e) => setNewProject(prev => ({ ...prev, budget: e.target.value }))}
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                        placeholder="e.g. 50000" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Msimamizi wa Mradi</label>
                    <input 
                      type="text" 
                      value={newProject.manager}
                      onChange={(e) => setNewProject(prev => ({ ...prev, manager: e.target.value }))}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                      placeholder="Jina la Msimamizi" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-500 mb-1">Ufanisi / Progress (%)</label>
                      <input 
                        type="number" 
                        min="0" max="100"
                        value={newProject.progress}
                        onChange={(e) => setNewProject(prev => ({ ...prev, progress: Number(e.target.value) }))}
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Hali (Status)</label>
                      <select 
                        value={newProject.status}
                        onChange={(e) => setNewProject(prev => ({ ...prev, status: e.target.value as any }))}
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-white"
                      >
                        <option value="Kwenye Mpango">Kwenye Mpango</option>
                        <option value="Inaendelea">Inaendelea</option>
                        <option value="Imekamilika">Imekamilika</option>
                        <option value="Imechelewa">Imechelewa</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-[#0B192C] text-white rounded-xl font-bold hover:bg-slate-800 transition">
                    Ongeza Mradi
                  </button>
                </form>
              </div>

              {/* Gantt / Project list visualization */}
              <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="font-bold text-sm text-[#0B192C]">Visual Gantt Task Chart</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Bajeti kamili ya miradi: {formatCurrency(totalEnterpriseBudget)}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {projects.map((p) => (
                    <div key={p.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                      <div className="md:col-span-1">
                        <p className="text-xs font-extrabold text-[#0B192C]">{p.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Manager: {p.manager} &bull; {formatCurrency(p.budget)}</p>
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold font-mono text-slate-500">{p.progress}%</span>
                          <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className={`h-full ${p.progress === 100 ? 'bg-emerald-500' : 'bg-[#0B192C]'}`} style={{ width: `${p.progress}%` }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-1 text-right">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          p.status === 'Imekamilika' ? 'bg-emerald-100 text-emerald-800' :
                          p.status === 'Imechelewa' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 8. DECISION LAB */}
        {currentPage === 'Decision Lab' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Policy Control Sliders Panel */}
              <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="font-bold text-sm text-[#0B192C]">Strategic Policy Controls</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Jaribu vigezo mbalimbali kubaini mwenendo bora</p>
                </div>

                {/* Slider 1 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <label>Mabadiliko ya Bei (Price Adj)</label>
                    <span className={priceAdj >= 0 ? 'text-emerald-600' : 'text-rose-600'}>{priceAdj >= 0 ? `+${priceAdj}%` : `${priceAdj}%`}</span>
                  </div>
                  <input type="range" min="-30" max="30" step="5" value={priceAdj} onChange={(e) => setPriceAdj(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" />
                </div>

                {/* Slider 2 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <label>Bajeti ya Masoko (Marketing)</label>
                    <span className="text-emerald-500">{marketingAdj >= 0 ? `+${marketingAdj}%` : `${marketingAdj}%`}</span>
                  </div>
                  <input type="range" min="-50" max="100" step="10" value={marketingAdj} onChange={(e) => setMarketingAdj(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" />
                </div>

                {/* Slider 3 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <label>Ajira Mpya (Hiring)</label>
                    <span className={hiringAdj >= 0 ? 'text-emerald-600' : 'text-rose-600'}>{hiringAdj >= 0 ? `+${hiringAdj} Staff` : `${hiringAdj} Staff`}</span>
                  </div>
                  <input type="range" min="-20" max="50" step="1" value={hiringAdj} onChange={(e) => setHiringAdj(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" />
                </div>

                {/* Quick Preset Buttons */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Mbinu za Haraka za Kibiashara</p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                    <button type="button" onClick={() => applyPreset('growth')} className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 p-2.5 rounded-xl border border-emerald-100">Kukua kwa Kasi (Growth)</button>
                    <button type="button" onClick={() => applyPreset('cost_cut')} className="bg-rose-50 hover:bg-rose-100 text-rose-800 p-2.5 rounded-xl border border-rose-100">Kupunguza Gharama</button>
                    <button type="button" onClick={() => applyPreset('defensive')} className="bg-blue-50 hover:bg-blue-100 text-blue-800 p-2.5 rounded-xl border border-blue-100">Mkakati Salama</button>
                    <button type="button" onClick={() => applyPreset('reset')} className="bg-slate-50 hover:bg-slate-100 text-slate-600 p-2.5 rounded-xl border border-slate-200">Weka Upya (Reset)</button>
                  </div>
                </div>
              </div>

              {/* Simulated Live Outputs Column */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Dynamic Grid Results */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Simulated Revenue</span>
                    <h4 className="text-2xl font-black mt-1 text-[#0B192C]">{formatCurrency(simulatedRevenue)}</h4>
                    <p className={`text-[11px] font-bold mt-1.5 ${simulatedRevenue >= baseRevenue ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {simulatedRevenue >= baseRevenue ? '↑ Growth vs. Baseline' : '↓ Reduction vs. Baseline'}
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Simulated Net Profit</span>
                    <h4 className="text-2xl font-black mt-1 text-[#0B192C]">{formatCurrency(simulatedProfit)}</h4>
                    <p className={`text-[11px] font-bold mt-1.5 ${simulatedProfit >= baseProfit ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {simulatedProfit >= baseProfit ? '↑ Growth vs. Baseline' : '↓ Reduction vs. Baseline'}
                    </p>
                  </div>
                </div>

                {/* AI Strategic Advice Report Output */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3 flex-wrap gap-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-500">🤖 AI Decision Optimization</h4>
                    <div className="flex space-x-2 text-[10px] font-bold font-mono">
                      <span className="px-2 py-0.5 bg-slate-100 rounded">Uaminifu: {confidenceScore}%</span>
                      <span className={`px-2 py-0.5 rounded ${riskIndex > 40 ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>Kiwango cha Hatari: {riskIndex}%</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Expected Business Impact:</span>
                    <p className="text-xs text-slate-700 leading-relaxed mt-1.5">
                      {simulatedProfit < 0 
                        ? "Mkakati huu unaingiza hasara! Ongezeko kubwa la wafanyakazi au kushuka kwa bei hakuna tija bila kuangalia upya kiwango cha COGS. Pendekezo: Ongeza ufanisi wa uzalishaji (Production) kwa +15% au punguza kasi ya kuajiri mara moja."
                        : riskIndex > 45
                        ? `Mkakati huu una hatari kubwa sana (Kiwango cha Hatari: ${riskIndex}%). Ingawa kuna faida inayokadiriwa, athari kwenye mzunguko wa fedha na uhifadhi wa wateja ni mkubwa sana.`
                        : simulatedProfit > baseProfit * 1.15
                        ? `Mseto Bora! Mkakati huu unazalisha ziada ya faida ya ${formatCurrency(simulatedProfit - baseProfit)} kwa ufanisi wa asilimia 92. Huu ndio mwelekeo unaopendekezwa kwa robo hii ya mwaka.`
                        : "Mfumo umejiweka sawa. Ili kuongeza mapato kwa ufanisi mkubwa zaidi, jaribu kuimarisha masoko (Marketing) kwa +30% huku ukipunguza bei kwa asilimia -5 tu."}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-end">
                    <button 
                      type="button" 
                      onClick={handleSaveScenario}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-[#0B192C] font-extrabold rounded-xl text-xs transition shadow-md shadow-emerald-500/10"
                    >
                      Hifadhi Mkakati Huu (Save Scenario)
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* List of Saved Scenarios (Scenario Matrix Comparison) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-sm text-[#0B192C] mb-4">Historia ya Mikakati Iliyohifadhiwa (Saved Scenarios)</h4>
              {savedScenarios.length === 0 ? (
                <p className="text-xs text-slate-400">Hakuna mikakati iliyohifadhiwa bado.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 font-bold uppercase text-[9px] border-b border-slate-100">
                        <th className="p-3">Muda</th>
                        <th className="p-3">Mabadiliko ya Bei</th>
                        <th className="p-3">Marketing Adj</th>
                        <th className="p-3">Ajira Mpya</th>
                        <th className="p-3">Mapato ya Makadirio</th>
                        <th className="p-3">Faida ya Makadirio</th>
                        <th className="p-3">Kiwango cha Hatari</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {savedScenarios.map((sc) => (
                        <tr key={sc.id} className="hover:bg-slate-50/50">
                          <td className="p-3 font-semibold text-slate-600">{sc.timestamp}</td>
                          <td className="p-3 font-mono font-bold">{sc.priceAdj}%</td>
                          <td className="p-3 font-mono">{sc.marketingAdj}%</td>
                          <td className="p-3 font-mono">{sc.hiringAdj} Staff</td>
                          <td className="p-3 font-mono font-semibold">{formatCurrency(sc.projectedRevenue)}</td>
                          <td className="p-3 font-mono font-bold text-emerald-600">{formatCurrency(sc.projectedProfit)}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${sc.riskIndex > 40 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                              {sc.riskIndex}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* 9. AI ASSISTANT CHAT */}
        {currentPage === 'AI Assistant' && (
          <div className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col h-[70vh] justify-between shadow-sm">
            
            {/* Interactive conversation history pane */}
            <div className="flex-1 overflow-y-auto space-y-4 pb-6 border-b border-slate-100 pr-2">
              {chatHistory.map((chat, idx) => (
                <div key={idx} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed max-w-lg ${
                    chat.sender === 'user' 
                      ? 'bg-[#0B192C] text-white rounded-br-none' 
                      : 'bg-slate-50 text-slate-700 border border-slate-100 rounded-bl-none'
                  }`}>
                    <p>{chat.text}</p>
                    
                    {/* Profit drop custom simulated graph inside assistant */}
                    {chat.hasChart && chat.chartType === 'profitDrop' && (
                      <div className="mt-4 bg-white p-3 rounded-xl border border-slate-150 h-28 flex items-end justify-around">
                        <div className="h-20 w-4 bg-emerald-500 rounded-t"></div>
                        <div className="h-16 w-4 bg-rose-400 rounded-t"></div>
                        <div className="h-12 w-4 bg-rose-500 rounded-t"></div>
                        <span className="text-[9px] text-slate-400 font-mono mt-1">Chat Mwenendo</span>
                      </div>
                    )}

                    {chat.hasChart && chat.chartType === 'bestCustomers' && (
                      <div className="mt-4 bg-white p-3 rounded-xl border border-slate-150 h-28 flex items-end justify-between text-center text-[10px] font-bold text-slate-500">
                        <div><div className="h-20 w-10 bg-emerald-500 rounded-t mx-auto"></div>Madini (42%)</div>
                        <div><div className="h-14 w-10 bg-[#0B192C] rounded-t mx-auto"></div>Kilimo (30%)</div>
                        <div><div className="h-10 w-10 bg-slate-300 rounded-t mx-auto"></div>Mengine (28%)</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat prompt input desk */}
            <div className="pt-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                <button onClick={() => handleAiAsk("Uchambuzi wa mwenendo wa faida upoje?")} className="px-3 py-1.5 bg-slate-100 text-[10px] font-bold hover:bg-slate-200 rounded-lg transition text-slate-600">
                  📈 Mwenendo wa Faida
                </button>
                <button onClick={() => handleAiAsk("Wateja gani wakubwa au sekta bora mwezi huu?")} className="px-3 py-1.5 bg-slate-100 text-[10px] font-bold hover:bg-slate-200 rounded-lg transition text-slate-600">
                  👥 Sekta Kuu
                </button>
                <button onClick={() => handleAiAsk("Je mkakati wangu uliopo kwenye lab unafaa?")} className="px-3 py-1.5 bg-slate-100 text-[10px] font-bold hover:bg-slate-200 rounded-lg transition text-slate-600">
                  ⚡ Mtihani wa Decision Lab
                </button>
              </div>

              <div className="flex space-x-3">
                <input 
                  type="text" value={aiQuery} onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Uliza maswali ya ziada kuhusu ANALYTIQ ya Zacharia..." 
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50" 
                />
                <button onClick={() => handleAiAsk()} className="px-6 py-3 bg-[#0B192C] text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition">
                  Uliza AI
                </button>
              </div>
            </div>

          </div>
        )}

        {/* 10. NOTIFICATIONS PAGE */}
        {currentPage === 'Notifications' && (
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h4 className="font-bold text-sm text-[#0B192C]">Kituo cha Tahadhari ya Kibiashara</h4>
                <p className="text-xs text-slate-400 mt-0.5">Alerts na arifa muhimu zinazohitaji ufumbuzi haraka</p>
              </div>
              <button onClick={markAllRead} className="text-xs text-emerald-500 font-bold hover:underline">Soma Zote</button>
            </div>

            {notifications.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">Huna arifa yoyote mpya kwa sasa.</p>
            ) : (
              <div className="space-y-4">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-4 rounded-2xl border flex justify-between items-center transition ${
                    !n.read ? 'bg-emerald-50/20 border-emerald-100' : 'bg-slate-50/50 border-slate-100'
                  }`}>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${!n.read ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                        <p className="text-xs font-extrabold text-[#0B192C]">{n.title}</p>
                      </div>
                      <p className="text-xs text-slate-500 pl-4">{n.desc}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-[10px] text-slate-400 font-semibold">{n.date}</span>
                      <button 
                        onClick={() => handleDeleteNotification(n.id)}
                        className="text-xs text-rose-600 hover:text-rose-800 font-bold"
                      >
                        Ondoa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 11. REPORTS DESK */}
        {currentPage === 'Reports' && (
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6">
            <div>
              <h4 className="font-bold text-sm text-[#0B192C]">Export Report Desk</h4>
              <p className="text-xs text-slate-400 mt-0.5">Tengeneza na usafirishe faili safi za kiuchumi kwa uwasilishaji</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { type: 'pdf', title: 'Hamisha kama PDF safi', desc: 'Notion-style executive layout kwa ma-CEO', icon: '📄' },
                { type: 'excel', title: 'Hamisha kama Excel Sheet', desc: 'Takwimu zote za uendeshaji mwezi baada ya mwezi', icon: '📊' },
                { type: 'ppt', title: 'Hamisha kama Powerpoint', desc: 'Slides za maandalizi ya bodi ya wakurugenzi', icon: '📈' }
              ].map((r, i) => (
                <div 
                  key={i} 
                  onClick={() => triggerToast(`Report ya ${r.type.toUpperCase()} imeandaliwa kwa usafirishaji.`)}
                  className="border border-slate-100 p-6 rounded-2xl hover:border-emerald-500 cursor-pointer transition text-center space-y-3 bg-slate-50/30"
                >
                  <span className="text-3xl inline-block">{r.icon}</span>
                  <h5 className="font-bold text-xs text-[#0B192C]">{r.title}</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 12. SETTINGS PAGE */}
        {currentPage === 'Settings' && (
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-8">
            <div className="border-b border-slate-100 pb-4">
              <h4 className="font-bold text-sm text-[#0B192C]">Global Enterprise Configurations</h4>
              <p className="text-xs text-slate-400 mt-0.5">Mipangilio ya kiufundi, data gateway na taarifa za kibiashara</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Taarifa za Mtendaji</h5>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Jina la Mtumiaji (Full Name)</label>
                  <input 
                    type="text" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Cheo (User Role)</label>
                  <select 
                    value={userRole} 
                    onChange={(e) => setUserRole(e.target.value as UserRole)} 
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-xs"
                  >
                    <option value="CEO">CEO</option>
                    <option value="Executive Director">Executive Director</option>
                    <option value="Finance Director">Finance Director</option>
                    <option value="Lead Analyst">Lead Analyst</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Taarifa za Taasisi</h5>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Jina la Kampuni (Enterprise Name)</label>
                  <input 
                    type="text" 
                    value={companyName} 
                    onChange={(e) => setCompanyName(e.target.value)} 
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Active Database Sync Server</label>
                  <input type="text" disabled value="Supabase Managed PostgreSQL on Frankfurt AWS" className="w-full px-4 py-2.5 border border-slate-100 rounded-xl text-xs bg-slate-50 text-slate-400" />
                </div>
              </div>
            </div>

            <button 
              onClick={() => triggerToast('Mabadiliko ya mfumo yamehifadhiwa salama kwenye PostgreSQL')}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-[#0B192C] rounded-xl text-xs font-bold tracking-wide transition"
            >
              Hifadhi Mabadiliko (Save Changes)
            </button>
          </div>
        )}

      </main>
    </div>
  );
}