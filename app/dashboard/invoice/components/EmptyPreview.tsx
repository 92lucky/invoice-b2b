export default function EmptyPreview() {
  return (
    <div className="h-175 border-2 border-dashed border-zinc-700 rounded-3xl flex flex-col items-center justify-center text-center px-6">
      <div className="w-20 h-20 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375H14.25V5.625A3.375 3.375 0 0010.875 2.25h-1.5A3.375 3.375 0 006 5.625V8.25H4.125A3.375 3.375 0 00.75 11.625v6.75A3.375 3.375 0 004.125 21.75h15.75a3.375 3.375 0 003.375-3.375v-1.5A2.625 2.625 0 0019.5 14.25z"
          />
        </svg>
      </div>

      <h3 className="text-white text-2xl font-semibold mb-2">
        No PDF Generated
      </h3>

      <p className="text-zinc-400 max-w-md">
        Fill the form above and click preview to generate invoice PDF.
      </p>
    </div>
  );
}
