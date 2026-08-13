import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Chrome } from "./components/Chrome";
import ClueScene from "./scenes/ClueScene";
import EpilogueScene from "./scenes/EpilogueScene";
import QuestionScene from "./scenes/QuestionScene";
import RecordScene from "./scenes/RecordScene";
import RoomScene from "./scenes/RoomScene";
import SelectScene from "./scenes/SelectScene";
import TitleScene from "./scenes/TitleScene";

export default function App() {
  const loc = useLocation();
  return (
    <div className="app" data-path={loc.pathname}>
      <Chrome />
      <Routes>
        <Route path="/" element={<TitleScene />} />
        <Route path="/select" element={<SelectScene />} />
        <Route path="/room/:id" element={<RoomScene />} />
        <Route path="/room/:id/clue/:clueId" element={<ClueScene />} />
        <Route path="/room/:id/record" element={<RecordScene />} />
        <Route path="/room/:id/question" element={<QuestionScene />} />
        <Route path="/epilogue" element={<EpilogueScene />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
