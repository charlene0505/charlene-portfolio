
export default function PillTab({ label, active, onClick }) {
  return (
    <button
      className={`flex w-full cursor-pointer px-1.5 md:px-4.5 py-2.25 font-sans text-xs md:text-sm  justify-center font-semibold ${
        active ? "bg-[#0c2a52] text-white" : "bg-white text-[#0c2a52]"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
