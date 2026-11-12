import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Estimate from "./pages/Estimate";
import JunkRemoval from "./pages/JunkRemoval";
import GarageCleanout from "./pages/GarageCleanout";
import HouseCleaning from "./pages/HouseCleaning";
import NotFound from "./pages/NotFound";

/** Every path here is prerendered to static HTML at build time (see scripts/prerender.mjs). */
export const PRERENDER_PATHS = ["/", "/estimate", "/junk-removal", "/garage-cleanout", "/house-cleaning", "/404"];

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/estimate" element={<Estimate />} />
    <Route path="/junk-removal" element={<JunkRemoval />} />
    <Route path="/garage-cleanout" element={<GarageCleanout />} />
    <Route path="/house-cleaning" element={<HouseCleaning />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
