export default function LoadingPreview() {
  return (
    <div className="h-175 flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-zinc-700 border-t-blue-500 rounded-full animate-spin mb-6" />

      <h3 className="text-white text-2xl font-semibold mb-2">Generating PDF</h3>

      <p className="text-zinc-400">Please wait a few seconds...</p>
    </div>
  );
}
