
export default function PillTab({ label, active, onClick }) {
  return (
    <button
      className={`cursor-pointer px-4.5 py-2.25 font-sans text-sm font-semibold ${
        active ? "bg-[#0c2a52] text-white" : "bg-white text-[#0c2a52]"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
