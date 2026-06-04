import { Download, FileText, RefreshCcw, Settings, Wand2 } from "lucide-react";
import { businessConfig, heroImages } from "../data/plannerData";
import type { BusinessStrategy, BusinessType, CampaignProfile, ProgressSummary } from "../types/planner";
import { ActionButton } from "../components/ui/ActionButton";
import { MetricLabel } from "../components/ui/MetricLabel";
import { SectionHead } from "../components/ui/SectionHead";

type StrategyScreenProps = {
  profile: CampaignProfile;
  progress: ProgressSummary;
  strategy: BusinessStrategy;
  onPatchProfile: (patch: Partial<CampaignProfile>) => void;
  onExport: () => void;
  onPrint: () => void;
  onReset: () => void;
};

export function StrategyScreen({ profile, progress, strategy, onPatchProfile, onExport, onPrint, onReset }: StrategyScreenProps) {
  return (
    <div className="screen-flow">
      <section className="strategy-summary">
        <p className="caption">Resumen de campaña</p>
        <h2>Estrategia de lanzamiento</h2>
        <p>Revisa los componentes finales antes del despliegue oficial.</p>
      </section>

      <section className="config-card">
        <div className="config-row">
          <span><Settings size={15} /> Configuración</span>
          <strong className={profile.pixelReady ? "green-label" : "amber-label"}>
            {profile.pixelReady ? "Pixel activo" : "Pixel pendiente"}
          </strong>
        </div>
        <div className="two-col">
          <MetricLabel label="Audiencia" value={profile.audience || "Pendiente"} />
          <MetricLabel label="Presupuesto" value={`${profile.budget || 0} EUR / día`} />
        </div>
      </section>

      <section className="creative-strip">
        <div className="config-row">
          <span><Wand2 size={15} /> Creativos</span>
          <strong>{progress.completedDays} días listos</strong>
        </div>
        <div className="creative-cards">
          <img src={heroImages.creative} alt="" />
          <img src={heroImages.metrics} alt="" />
        </div>
      </section>

      <section className="next-steps-card">
        <SectionHead compact title="Próximos pasos" aside={<strong>{Math.max(0, 30 - progress.completedDays)} días restantes</strong>} />
        {strategy.emphasis.map((item, index) => (
          <div className="number-row" key={item}>
            <span>{index + 1}</span>
            <p>{item}</p>
          </div>
        ))}
      </section>

      <section className="profile-form compact-form">
        <label>
          <span>Tipo de negocio</span>
          <select value={profile.businessType} onChange={(event) => onPatchProfile({ businessType: event.target.value as BusinessType })}>
            {Object.entries(businessConfig).map(([value, config]) => (
              <option key={value} value={value}>{config.label}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Pixel listo</span>
          <button className={`toggle-button ${profile.pixelReady ? "is-on" : ""}`} type="button" onClick={() => onPatchProfile({ pixelReady: !profile.pixelReady })}>
            {profile.pixelReady ? "Activo" : "Pendiente"}
          </button>
        </label>
      </section>

      <ActionButton icon={<FileText size={17} />} onClick={onPrint}>
        Guardar como PDF
      </ActionButton>
      <ActionButton variant="secondary" icon={<Download size={17} />} iconPosition="start" onClick={onExport}>
        Exportar plan
      </ActionButton>
      <ActionButton variant="danger" icon={<RefreshCcw size={17} />} iconPosition="start" onClick={onReset}>
        Reiniciar estrategia
      </ActionButton>
    </div>
  );
}
