import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login/Login"
import Life from "./Life/Person/Life";
import  Profile  from "./Life/Person/Profile";
import Diary from "./Life/Person/Diary";
import Notes from "./Life/Person/Notes";
import FamilyTree from "./Life/Person/FamilyTree";
import { SelfCare } from "./Life/Person/SelfCare";
import {FinanceDashboard } from "./Life/Finance/Dashboard";
import SocialCredits from "./Life/Person/SocialCredits";
import Layout from "./Layout/Layout";
import PersonalVault from "./Life/Person/PersonalVault";
import { DailyRhythm } from "./Life/Person/DailyRhythm";
import { WeatherMatrix } from "./Life/Miscellaneous/WeatherMatrix";
import SharesStocksTrading from "./Life/Finance/SharesStocksTrading";
import Feed from "./Life/Social/Feed";
import Messaging from "./Life/Social/Messaging";
import AI from "./Life/Person/AI";
import HomeDashboard from "./Life/Home/Home";
import HealthDashboard from "./Life/Health/Health";
import AIAnalytics from "./Life/AIAnalytics/AIAnalytics";
import LogMonitor from "./Life/LogMonitor/LogMonitor";
import AgenticAI from "./Life/AgenticAI/AgenticAI";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Life />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/agentic-ai" element={<AgenticAI />} />
            <Route path="/log-monitor" element={<LogMonitor />} />
            <Route path="/ai-analytics" element={<AIAnalytics />} />  
            <Route path="/profile" element={<Profile />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/personal-vault" element={<PersonalVault />} /> 
            <Route path="/daily-rhythm" element={<DailyRhythm />} />
            <Route path="/weather-matrix" element={<WeatherMatrix />} />
            <Route path="/family-tree" element={<FamilyTree />} />
            <Route path="/self-care" element={<SelfCare />} />
            <Route path="/social-credits" element={<SocialCredits />} />

            <Route path="/home/dashboard" element={<HomeDashboard />} />

            <Route path="/health/dashboard" element={<HealthDashboard />} />

            <Route path="/finance/dashboard" element={<FinanceDashboard />} />
            <Route path="/finance/shares-stocks-trading" element={<SharesStocksTrading />} />

            <Route path="/social/feed" element={<Feed />} />
            <Route path="/social/messaging" element={<Messaging />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
