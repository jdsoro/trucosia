import { Download, RefreshCcw, UserRound } from "lucide-react";
import { businessConfig, goalLabels } from "../data/plannerData";
import type { CampaignProfile, Goal, ProgressSummary } from "../types/planner";
import { ActionButton } from "../components/ui/ActionButton";
import { SectionHead } from "../components/ui/SectionHead";

type ProfileScreenProps = {
  profile: CampaignProfile;
  progress: ProgressSummary;
  onPatchProfile: (patch: Partial<CampaignProfile>) => void;
  onExport: () => void;
  onReset: () => void;
};

export function ProfileScreen({ profile, progress, onPatchProfile, onExport, onReset }: ProfileScreenProps) {
  return (
    <div className="screen-flow">
      <section className="profile-hero">
        <div className="avatar-circle"><UserRound size={28} /></div>
        <h2>{profile.brand || "Tu marca"}</h2>
        <p>{businessConfig[profile.businessType].strategy}</p>
      </section>

      <section className="profile-form">
        <label>
          <span>Marca</span>
          <input value={profile.brand} onChange={(event) => onPatchProfile({ brand: event.target.value })} />
        </label>
        <label>
          <span>Oferta</span>
          <textarea value={profile.offer} onChange={(event) => onPatchProfile({ offer: event.target.value })} />
        </label>
        <label>
          <span>Audiencia</span>
          <textarea value={profile.audience} onChange={(event) => onPatchProfile({ audience: event.target.value })} />
        </label>
        <div className="two-col form-pair">
          <label>
            <span>Objetivo</span>
            <select value={profile.goal} onChange={(event) => onPatchProfile({ goal: event.target.value as Goal })}>
              {Object.entries(goalLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Inicio</span>
            <input type="date" value={profile.launchDate} onChange={(event) => onPatchProfile({ launchDate: event.target.value })} />
          </label>
        </div>
        <div className="three-col">
          <label>
            <span>EUR/día</span>
            <input inputMode="decimal" value={profile.budget} onChange={(event) => onPatchProfile({ budget: event.target.value })} />
          </label>
          <label>
            <span>CPA máx.</span>
            <input inputMode="decimal" value={profile.cpaLimit} onChange={(event) => onPatchProfile({ cpaLimit: event.target.value })} />
          </label>
          <label>
            <span>ROAS mín.</span>
            <input inputMode="decimal" value={profile.roasTarget} onChange={(event) => onPatchProfile({ roasTarget: event.target.value })} />
          </label>
        </div>
      </section>

      <section className="next-steps-card">
        <SectionHead compact title="Estado del sistema" aside={<strong>{progress.percent}%</strong>} />
        <div className="number-row">
          <span>1</span>
          <p>{progress.completedDays}/30 días completados</p>
        </div>
        <div className="number-row">
          <span>2</span>
          <p>{progress.completedTasks}/{progress.totalTasks} tareas cerradas</p>
        </div>
      </section>

      <ActionButton icon={<Download size={17} />} iconPosition="start" onClick={onExport}>
        Descargar planificador
      </ActionButton>
      <ActionButton variant="danger" icon={<RefreshCcw size={17} />} iconPosition="start" onClick={onReset}>
        Reiniciar progreso
      </ActionButton>
    </div>
  );
}
