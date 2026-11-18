export default function Stat({ icon: Icon, label, value, tint }) {
  return (
    <div className="stat">
      <div className={tint}>
        <Icon size={20} />
      </div>

      <p>{label}</p>

      <strong>{value ?? '—'}</strong>
    </div>
  );
}